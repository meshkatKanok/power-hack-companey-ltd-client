import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./../App";
const Modal = ({ refetch, isUpdateForm, oldData }) => {
  const { user } = useContext(AuthContext);
  /* Handle Billing data */
  const handleBilling = async (event) => {
    event.preventDefault();
    /* selections */
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const paidAmount = event.target.paid_amount.value;

    /* Error Handling */
    if (!name) return toast.error(`Name Field is required.`);

    if (!email) return toast.error(`Email field is required.`);

    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email) === false)
      return toast.error(`Please enter a valid email address.`);

    if (!phone) return toast.error(`Phone field is required.`);

    if (phone.length < 11) return toast.error(`Phone field must be 11 digits.`);

    if (/^(?:(?:\+|00)88|01)?\d{11}$/.test(phone) === false)
      return toast.error(
        `Please enter a valid phone number. ex- +8801215454445`
      );

    if (!paidAmount) return toast.error(`Paid Amount field is required.`);

    /* calling api to save data  */
    const billingData = {
      name: name,
      email: email,
      phone: phone,
      paid_amount: parseInt(paidAmount),
      author: {
        name: user?.name,
        email: user?.email,
        id: user?._id,
      },
    };

    await fetch(`https://power-hack-companyltd.vercel.app/api/add-billing`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(billingData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          refetch();
          toast.success(data.message);
          event.target.reset();
        }
      });
  };

  /*  Handle Update BIlling */
  const handleUpdateBilling = async (event) => {
    event.preventDefault();
    /* selections */
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const paidAmount = event.target.paid_amount.value;

    /* Error Handling */
    if (!name) return toast.error(`Name Field is required.`);

    if (!email) return toast.error(`Email field is required.`);

    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email) === false)
      return toast.error(`Please enter a valid email address.`);

    if (!phone) return toast.error(`Phone field is required.`);

    if (phone.length < 11) return toast.error(`Phone field must be 11 digits.`);

    if (/^(?:(?:\+|00)88|01)?\d{11}$/.test(phone) === false)
      return toast.error(
        `Please enter a valid phone number. ex- +8801789011636`
      );

    if (!paidAmount) return toast.error(`Paid Amount field is required.`);
    /* calling api to save data  */
    const billingData = {
      name: name,
      email: email,
      phone: phone,
      paid_amount: parseInt(paidAmount),
    };
    await fetch(
      `https://power-hack-companyltd.vercel.app/api/update-billing/:id?id=${oldData.id}&&email=${user.email}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(billingData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          refetch();
          toast.success(data.message);
          event.target.reset();
        }
      });
  };

  return (
    <form
   
      action=""
      onSubmit={isUpdateForm ? handleUpdateBilling : handleBilling}
    >
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal font-poppins">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm text-white hover:bg-red-600   bg-red-600 border-none btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            {isUpdateForm
              ? "Update Billing Data"
              : "Add a New Billing Data"}
          </h3>
          <div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">FullName</span>
              </label>
              <input
                type="text"
                placeholder="Name here"
                className="input input-bordered "
                name="name"
                defaultValue={isUpdateForm ? oldData.name : ""}
              />
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email here"
                className="input input-bordered "
                name="email"
                defaultValue={isUpdateForm ? oldData.email : ""}
              />
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                placeholder="Phone No here"
                className="input input-bordered "
                name="phone"
                defaultValue={isUpdateForm ? oldData.phone : ""}
              />
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Paid Amount</span>
              </label>
              <input
                type="number"
                placeholder="Paid Amount"
                className="input input-bordered "
                name="paid_amount"
                defaultValue={isUpdateForm ? oldData.paid_amount : ""}
              />
            </div>
            <div className="my-5">
              <button className="btn btn-primary rounded-none w-full bg-[tomato] hover:bg-[tomato] text-white border-none">
                {isUpdateForm ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Modal;
