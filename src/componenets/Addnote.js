import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/noteContext';

const Addnotes = (props) => {
  const Context = useContext(NoteContext)
  
  const [note, setNote] = useState({ title: "", description: "", Tag: "" })
  const  { addnote  }  = Context;
  
  const handlesubmit = (e) => {
    props.showAlert("Note Added successfully" , "success")
    e.preventDefault();
    addnote(note.title , note.description, note.Tag);
    setNote({title: "", description: "", Tag: "" })
    
  }

  const onchange = (e) => {
    setNote({...note,[e.target.name]: e.target.value })
  }
  return (
    <div className="my-4">
      <h1>Add Notes</h1>
      <form>
        <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp"value={note.title} onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description"value={note.description} onChange={onchange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="Tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="Tag" name="Tag" value={note.Tag} onChange={onchange} minLength={3} required/>
        </div>
        {/* <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handlesubmit}>Add Note</button>
      </form>
    </div>
  )
}

export default Addnotes