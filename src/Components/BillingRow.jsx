const BillingRow = ({
  _id,
  name,
  email,
  phone,
  paid_amount,
  deleteBilling,
  editingBilling,
}) => {
  return (
    <tr className="text-center">
      <th style={{ border:'2px solid gray',marginTop:'10px'}}>{_id.slice(0, 12) || "Loading..."}</th>
      <td style={{ border:'2px solid gray',marginTop:'10px'}}>{name}</td>
      <td style={{ border:'2px solid gray',marginTop:'10px'}}>{email}</td>
      <td style={{ border:'2px solid gray',marginTop:'10px'}}>{phone}</td>
      <td style={{ border:'2px solid gray',marginTop:'10px'}}>{paid_amount}</td>
      <td style={{ border:'2px solid gray',marginTop:'10px'}}>
        {" "}
        <label 
          onClick={() => editingBilling(_id, name, email, phone, paid_amount)}
          htmlFor="my-modal-3"
          className="btn btn-sm btn-secondary rounded-none  hover:bg-gray-400 border-none text-white bg-gray-400"
        >
          Edit
        </label>
      </td>
      <td style={{ border:'2px solid gray',marginTop:'10px'}}>
        <button 
          onClick={() => deleteBilling(_id)}
          className="btn btn-sm btn-secondary rounded-none  hover:bg-gray-400 border-none text-white bg-gray-400"
        >
         Delete
        </button>
      </td>
    </tr>
  );
};

export default BillingRow;
