import React, { useEffect, useState } from 'react'
import axios from "axios"
import { FaTrash } from "react-icons/fa";

import $ from "jquery";

function Home() {

    let token = JSON.parse(localStorage.getItem("token"))
    let user_id=token.id;

    

    const [notes, setNotes] = useState([])
    let [note, setNote] = useState({title:"",desc:"",user_id}); 


    async function getAllNotes() {
        let { data } = await axios.get('http://localhost:3000/getallnotes', {
            headers: {
                
                user_id
            }
        })

        if (data.message === "success") {
            console.log(data.findUser.Notes.length);
            if(data.findUser.Notes.length!==0){
                console.log(data.findUser.Notes);
                setNotes(data.findUser.Notes)
            }else{
                console.log(`no notes`);
                setNotes([])
            }
            
        } else {
            setNotes([])
        }

    }
    

    useEffect(() => {
        getAllNotes()
        
    }, [])


    function getNote(e ) {
        // setNote({...note,[e.target.name]:e.target.value})
        // console.log(note);
        note={...note}
        note[e.target.name]= e.target.value
        setNote(note)
        console.log(note);
    }

    async function addNote(e) {
        e.preventDefault()
        let { data } = await axios.post('http://localhost:3000/addnote', note)
        console.log(data);

        if (data.message === "success") {
            console.log(data);
            getAllNotes()
            $("#exampleModal").fadeOut(()=>{
                $(".modal-backdrop").fadeOut()
            })
        }
        }
    


    async function deleteNote(id) {
        
        let { data } = await axios.delete(`http://localhost:3000/delete/${id}/${user_id}`)
if(data.message==='success'){
    getAllNotes()
}
        
    }




    return (
        <>
            <div className="container my-5">
                
                <h1>Hello {token.first_name }</h1>
                <div className="col-md-12 text-end">
                    <a className="add p-2 btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fas fa-plus-circle"></i> Add
                        New</a>
                </div>
            </div>


            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form onSubmit={addNote}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input onChange={getNote} placeholder="Type Title" name="title" className="form-control" type="text" />
                                <textarea onChange={getNote} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="modal-footer">
                                {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                <button data-bs-dismiss="modal" type="submit" className="btn btn-info"><i className="fas fa-plus-circle"></i> Add Note</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>



            {/* <!-- ==========================Notes=============================== --> */}

            <div className="container">
                <div className="row">
{notes.length===0?<h1  >NO NOTES</h1>:console.log(notes.length)}
                    {notes.map((note, index) => {
                        return (
                            <div key={index} className="col-md-4 my-4">
                                <div className="note p-4">
                                    <h3 className="float-start">{note.title}</h3>
                                    <a ><i className="fas fa-edit float-end edit"></i></a>
                                    {/* <a onClick={() => { deleteNote(note.id) }} > <i className="fas fa-trash-alt float-end px-3 del"></i></a> */}
                                    <FaTrash onClick={() => { deleteNote(note.id) }}  size='2em' className="  float-end  del" />

                                    <span className="clearfix"></span>
                                    <p>{note.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default Home
