import React, { useState } from 'react'
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import '../Compo-css/Addform.css';
import { adddata} from './Context/Contextprovider';


const Addform = () => {
  const{alertforData,setAlertforData} = useContext(adddata);
 

  const history = useHistory("");
 

  const [inputValue, setInputValue] = useState({
    name: "",
    desc: ""
  })

  const setData = (e) => {
    const { name, value } = e.target;
    setInputValue((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  }

  const addInputData =async(e)=>{
    e.preventDefault();
     const {name,desc} = inputValue;

      const res = await fetch("/addform",{
         method:"POST",
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify({
            name,desc 
         })
      });

      const data = await res.json();
      console.log(data);

      if(res.status === 422|| !data){
          alert("please enter data")
          // console.log("error");
      }
      else{
          alert("data added successfully!")
          console.log("data added");
          history.push('/')
          setAlertforData(data);
      }
  }

  
  return (
    <div>
      <h3 className="main-heading">Add Notes</h3>
      <div className="add-note">
        <div className="note-title">
          <label htmlFor="title">Note Title:</label>
          <input type="text" value={inputValue.name} onChange={setData} className="note-name" name="name" id="name" />
        </div>


        <div className="note-desc">
          <label htmlFor="desc">Note Description:</label>
          <textarea name="desc" id="desc" value={inputValue.desc} onChange={setData} cols="55" rows="6"></textarea>
        </div>


        <button className="submitbtn" onClick={addInputData}>Submit</button>

      </div>
    </div>
  )
}

export default Addform