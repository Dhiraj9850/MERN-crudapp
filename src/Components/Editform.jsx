import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import '../Compo-css/Editform.css';
import { updatedata } from './Context/Contextprovider';

const Editform = () => {
  
  const history = useHistory("");

  const [inputValue, setInputValue] = useState({
    name: "",
    desc: ""
  })

  const{alertforupData,setAlertforupData} = useContext(updatedata);

  const setData = (e) => {
    const { name, value } = e.target;
    setInputValue((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  }

  const { id } = useParams("");
  console.log(id);


  const getdata = async () => {
    const res = await fetch(`/getnote/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      // alert("please enter data")
      console.log("error");
    }
    else {
      setInputValue(data);
      console.log("get data");
    }
  }

  useEffect(() => {
    getdata();
  },[]);


  const updatenote = async (e) => {
    e.preventDefault();
     const{name,desc} = inputValue;

    const res2 = await fetch(`/updatenote/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        name,desc
      })
    });

    const data2 = await res2.json();
    console.log(data2);

    if(res2.status === 422 || !data2){
      alert("fill the data2")
    }
    else{
      alert("data updated")
      history.push('/');
      setAlertforupData(data2);
    }
  }




  return (
    <div>
      <h3 className="main-heading">Edit Notes</h3>
      <div className="add-note">
        <div className="note-title">
          <label htmlFor="title">Note Title:</label>
          <input type="text" value={inputValue.name} onChange={setData} className="note-name" name="name" id="name" />
        </div>


        <div className="note-desc">
          <label htmlFor="desc">Note Description;</label>
          <textarea name="desc" id="desc" value={inputValue.desc} onChange={setData} cols="55" rows="6"></textarea>
        </div>


        <button className="submitbtn" onClick={updatenote}>Submit</button>

      </div>
    </div>
  )
}

export default Editform