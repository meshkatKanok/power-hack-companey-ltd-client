import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../App";
import PaginatedItems from "../Components/BillingsPagination";
import Modal from "./../Components/Modal";
const BillingList = () => {
  const navigate = useNavigate();
  const { user, setPaidTotal ,newPlusNum} = useContext(AuthContext);
  const [billings, setBillings] = useState([]);
  const [searchedBillings, setSearchedBillings] = useState([]);
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [oldData, setOldData] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, [navigate]);

  /*   Handle Delete Billings  */
  const deleteBilling = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText:"No"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://power-hack-companyltd.vercel.app/api/delete-billing/:id?id=${id}&&email=${user.email}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
          .then((res) => {
            const result = res.data;
            if (result.success) {
              Swal.fire("Deleted!", result.message, "success");
              refetch();
            }
          })
          .catch((err) => toast.error(err.message));
      }
    });
  };

  /* Getting the list of billing items based on Users */
  const { data, isLoading, refetch } = useQuery(
    ["billingsData", user],
    async () =>
      await fetch(
        `https://power-hack-companyltd.vercel.app/api/billing-list?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      ).then((res) => res.json())
  );

  useEffect(() => {
    setBillings(data?.data);
    setSearchedBillings(data?.data);
    /* Paid Total */
    const paidTotal = data?.data.reduce(
      (acc, item) => acc + item.paid_amount,
      0
    );
    setPaidTotal(paidTotal);
  }, [data, setPaidTotal]);

  /* SEARCH BILLING USING FULL NAME, EMAIL, PHONE NUMBER */
  const handleSearch = async (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredBilling = billings.filter(
      (item) =>
        item.name.toLowerCase().includes(searchValue) ||
        item.email.toLowerCase().includes(searchValue) ||
        item.phone.toLowerCase().includes(searchValue)
    );
    setSearchedBillings(filteredBilling);
  };

  /* TRY TO EDIT BILLINGS DATA FROM DATABASE */
  const editingBillings = async (id, name, email, phone, paid_amount) => {
    const prevData = { id, name, email, phone, paid_amount };
    if (id) {
      setIsUpdateForm(true);
      setOldData(prevData);
    }
  };

  return (
    <section id="billing" className="p-10 h-screen">
      <div className="container mx-auto font-poppins">
        <div className="title text-center mb-5">
          <h3 className="text-3xl font-poppins font-semibold text-black">Billing Data</h3>
          <span>See your All Billing Data</span>
        </div>
        {/* Billing Header  */}
        <div className="header bg-gray-400 rounded-md">
          <div className="flex-wrap gap-4 navbar">
            <div className="sm:flex-1 flex-col sm:flex-row w-full">
              <a href="/" className="btn btn-ghost normal-case text-black text-xl mr-3">
                Billing All Data
              </a>
              <div className="form-control ">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered "
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="flex-none gap-2 justify-center items-center w-full sm:justify-start sm:items-start sm:w-auto">
              <label
                onClick={() => setIsUpdateForm(false)}
                htmlFor="my-modal-3"
                className="btn btn-primary rounded-md bg-white text-black border-none hover:bg-white"
              >
                Add New Billing
              </label>
            </div>
          </div>
        </div>
        {/* Billing Header end */}
        <div className="overflow-x-auto my-6 overflow-y-hidden">
          {searchedBillings?.length > 0 ? (
            !isLoading ? (
              <>
                {" "}
                <PaginatedItems
                  searchedBillings={searchedBillings}
                  itemsPerPage={10}
                  editingBillings={editingBillings}
                  deleteBilling={deleteBilling}
                />
              </>
            ) : (
              <div className="text-center py-5">
                <h3 className="text-xl font-bold">Loading...</h3>
              </div>
            )
          ) : (
            <div className="text-center py-10">
              <h3 className="text-2xl">No Data Found</h3>
              <label
                htmlFor="my-modal-3"
                className="btn btn-primary bg-gray-400 hover:bg-gray-400 text-white border-none rounded-md mt-7"
              >
                Add New Billing 
              </label>
            </div>
          )}
        </div>
      </div>
      <Modal refetch={refetch} isUpdateForm={isUpdateForm} oldData={oldData} />
    </section>
  );
};

export default BillingList;
