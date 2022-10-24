import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"

    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    //Get all Note
    const getNotes = async () => {

        //API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    }


    //Add a Note
    const addNote = async (title, description, tag) => {

        //API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = {
            "title": title,
            "description": description,
            "tag": tag,
        }
        setNotes(notes.concat(note));
    }

    //Delete a Note
    const deleteNote = async (id) => {
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = response.json();
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        //API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = response.json();


        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let value of newNotes) {

            let element = value;
            if (element._id === id) {
                value.title = title;
                value.description = description;
                value.tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, deleteNote, addNote, getNotes, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState; 