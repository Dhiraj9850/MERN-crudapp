import React,{useState,useEffect} from 'react'
import '../Compo-css/Viewnote.css';
import { useParams } from 'react-router-dom';

const Viewnotes = () => {

  const[noteView,setNoteView] = useState([]);
  console.log(noteView);

  const {id}  = useParams("");
  console.log(id);


  const getdata =async()=>{
   
    const res = await fetch(`/getnote/${id}`,{
       method:"GET",
       headers:{
          "Content-Type":"application/json"
       },
    });

    const data = await res.json();
    console.log(data);

    if(res.status === 422|| !data){
        // alert("please enter data")
        console.log("error");
    }
    else{
        setNoteView(data);
        console.log("get data");
    }
}
  
 useEffect(()=>{
   getdata();
 });
 
  return (
    <div>
        <div className="container">
            <h3 className="main-heading">View Your Notes Here.....</h3>
          <div className="view-note">
             <h5><span>Name : </span>{noteView.name}</h5>
             <h6><span>Description : </span>{noteView.desc}</h6>
          </div>
         
        </div>
    </div>
  )
}

export default Viewnotes
