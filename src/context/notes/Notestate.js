
import noteContext from "./noteContext";
import { useState } from "react";




const Notestate = (props) => {
  const Host = "http://127.0.0.1:5000"
  const noteinitial = {}
  const [notes, setNotes] = useState(noteinitial)
  // const authToken = localStorage.getItem('token');



  //  Getallnotes notes 
  const GetNotes = async () => {

    // API call
    const response = await fetch(`${Host}/api/notes/fetchallnotes`, {

      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MzNlMzM3NDA3MjAxMTcyMjllYTEzIn0sImlhdCI6MTY4NDIyNTU4N30.9gc_T_PUm8-RfWDCYUH4CImM6r3qg3-E-7-TJD7yxNg",

      },

    });
    const json = await response.json()
    console.log(json);
    setNotes(json)
  }

  //  Add notes 
  const addnote = async (title, description, tag,) => {
    // TODO api call
    // API call
    const response = await fetch(`${Host}/api/notes/addnote`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MzNlMzM3NDA3MjAxMTcyMjllYTEzIn0sImlhdCI6MTY4NDIyNTU4N30.9gc_T_PUm8-RfWDCYUH4CImM6r3qg3-E-7-TJD7yxNg",

      },

      body: JSON.stringify({ title, description, tag }),
    });


    const note = await response.json();
    console.log(note)
    setNotes(notes.concat(note))

    // console.log(note)


    // 6449f76018e45bd9aa5427f7
  }


  //Delete notes
  const deletenote = async (id) => {


    // API call
    const response = await fetch(`${Host}/api/notes/deletenote/${id}`, {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MzNlMzM3NDA3MjAxMTcyMjllYTEzIn0sImlhdCI6MTY4NDIyNTU4N30.9gc_T_PUm8-RfWDCYUH4CImM6r3qg3-E-7-TJD7yxNg",

      },

    });
    const json = await response.json()
    console.log(json)

    // console.log("delete the note with" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)

  }




  //Edit notes

  const Editnote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${Host}/api/notes/updatenote/${id}`, {

      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MzNlMzM3NDA3MjAxMTcyMjllYTEzIn0sImlhdCI6MTY4NDIyNTU4N30.9gc_T_PUm8-RfWDCYUH4CImM6r3qg3-E-7-TJD7yxNg",

      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json()
    console.log(json)
    // const json = response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit note in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }

  return (
    <noteContext.Provider value={{ notes, addnote, deletenote, Editnote, GetNotes, }}>
      {props.children}
    </noteContext.Provider>

  )
}

export default Notestate;