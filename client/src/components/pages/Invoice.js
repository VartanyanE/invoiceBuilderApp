import React, { useEffect, useState, useContext } from "react";
import {createInvoice} from "../../utils/API";
import UserContext from "../../context/UserContext";

export default function Invoice() {

    const { userData } = useContext(UserContext);
    
        const [data, setData] = useState([{
            
        }]);
console.log(data)
    const handleSubmit = async (event) => {
    event.preventDefault();
    await setData({ creator: userData.user.id})
     await createInvoice(data);
     
     
 };
    
    return (
        
    <div>
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
      <br />
       <label>Due Date</label>
      <input
        value={data.dueDate}
        onChange={(e) => setData({ ...data, dueDate: e.target.value })}
      />
       <br />
      <label>Description</label>
      <input
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />
      <br />
      <label>Hours</label>
      <input
        value={data.hours}
        onChange={(e) => setData({ ...data, hours: e.target.value })}
      />
      <br />
      <button type="submit">Submit Data</button>
    </form>

        </div>
    )
}
