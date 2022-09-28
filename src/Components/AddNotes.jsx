import React, { useContext, useEffect, useState } from 'react'
import '../Compo-css/AddNotes.css';
import { Link } from 'react-router-dom';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { adddata, deletedata, updatedata } from './Context/Contextprovider';


const AddNotes = () => {


  const [noteData, setNoteData] = useState([]);
  console.log(noteData);

  const { alertforData, setAlertforData } = useContext(adddata);
  const { alertforupData, setAlertforupData } = useContext(updatedata);
  const { alertfordltData, setAlertfordltData } = useContext(deletedata);

  const getdata = async (e) => {

    const res = await fetch("/getdata", {
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
      setNoteData(data);
      console.log("get data");
    }
  }

  useEffect(() => {
    getdata();
  }, [])


  const deleteNote = async (id) => {
    const res2 = await fetch(`/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error on deleting data");
    }
    else {
      console.log("data deleted");
      getdata();
      setAlertfordltData(deletedata);
    }
  }
  return (
    <>
      {
        alertforData ?
          <>
            <div className="alert alert-success alert-dismissible fade show" role="alert" id="alertbox">
              <strong>SUCCESS!</strong>Your Note <strong> {alertforData.name} </strong>is added successfully.
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </> :""
     }
     {
        alertforupData ?
          <>
            <div className="alert alert-success alert-dismissible fade show" role="alert" id="alertbox">
              <strong>SUCCESS!</strong>Your Note is updated successfully!
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </> :""
      }
     {
        alertfordltData ?
          <>
            <div className="alert alert-danger alert-dismissible fade show" role="alert" id="alertbox">
              Your Note <strong>{alertfordltData.name}</strong> is deleted successfully!
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </> :""
      }

      <div className="main-container">
        <h3 className="main-heading">Add Daily Notes Now...</h3>
        <div className="add-data">
          <div className="add-btn">
            <Link className="btn  btn-outline-success mt-2" to="/addform"><i className="bi bi-plus-lg"></i> Add new Note</Link>

          </div>

        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">sr.no</th>
              <th scope="col" className="title-col">Title</th>
              <th scope="col" className="desc-col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>

            {
              noteData.map((element, id) => {
                return (
                  <tr key={id}>
                    <th scope="row">{id + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.desc}</td>
                    <td>
                      <Link className="btn btn-sm btn-outline-dark mx-2" to={`viewnotes/${element._id}`}><FontAwesomeIcon icon={faEye} /></Link>
                      <Link className="btn btn-sm btn-outline-success mx-2" to={`editform/${element._id}`}><FontAwesomeIcon icon={faPenToSquare} /></Link>
                      <button className="btn btn-sm btn-outline-danger mx-2" onClick={() => deleteNote(element._id)}><FontAwesomeIcon icon={faTrash} /></button>
                    </td>

                  </tr>

                )
              })
            }
          </tbody>
        </table>
      </div>
    </>




  )
}

export default AddNotes