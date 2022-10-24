import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    let { note, updateNote } = props;
    let date = new Date(note.date);
    note.date = date.toDateString();
    // {note: {
    //     title: 'title',
    //     description: 'description'
    // }}
    return (
        <div className="col-md-3 my-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5><span className="badge text-bg-warning my-2">{note.tag}</span>
                    <p className="card-text">{note.description}</p>
                    <hr />
                    <p className="card-text blockquote-footer mt-3">Created on {note.date}</p>
                    <hr />
                    <div>
                        <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted successfully", "success"); }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note); }}></i>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Noteitem;