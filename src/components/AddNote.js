import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;


    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: '', description: '', tag: '' });
        props.showAlert("Added successfully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="container">
                <h1 className='mb-5'>Add a Note</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control add-note-input" id="title" value={note.title} name="title" aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control add-note-input" value={note.description} id="description" name="description" onChange={onChange} style={{ 'height': '10rem' }} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control add-note-input" id="tag" name="tag" onChange={onChange} value={note.tag} required />
                    </div>
                    <button type="submit" className="btn btn-dark">Add to notes</button>
                </form>
            </div>
        </>
    )
}

export default AddNote;