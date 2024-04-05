import './Archived.css'
import axios from '../api/axios'
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export const Archived = () => {

    const [notes, setNotes] = useState([])
    const URI = "/api/notes/"
    const deleteURI = "/api/notes/"
    const updateURI = "/api/notes/update/"

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = async () => {
        try {
            const res = await axios.get(URI)
            const notes = res.data.filter(note => note.ARCHIVED !== 0)
            console.log(notes)
            setNotes(notes)
        } catch (err) {
            console.log(err)
        }
    }
    const deleteNote = async (noteID) => {
        try {
            await axios.delete(`${deleteURI}${noteID}`,
                {
                    headers: { 'Content-type': 'application/json' },
                    withCredentials: true
                }
            );
            const updated = notes.filter((note) => note.noteID !== noteID);
            setNotes(updated);
        } catch (err) {
            console.log(err)
        }
    }

    const unarchiveNote = async (noteID) => {
        try {
            console.log(noteID)
            await axios.put(`${updateURI}`,
                JSON.stringify({ columnName: "ARCHIVED", value: 0, noteID: noteID }),
                {
                    headers: { 'Content-type': 'application/json' },
                    withCredentials: true
                }
            );
            const updated = notes.filter((note) => note.noteID !== noteID);
            setNotes(updated);
        } catch (err) {
            console.log(err)
        }
    
    }

    return(
        <>  
        <div data-aos-duration="1000" data-aos="zoom-in-down">
            <h1 className="notesTitle">Let's take a look at these old notes 🗂️</h1>
        </div>
        {
        notes.length === 0 ? (
        <>
                <h2 data-aos="fade-right" data-aos-delay="1000" className="emptyNote">You haven't got any notes yet, come on let's write some!</h2>
                <div data-aos="fade-right" data-aos-delay="1000" className="d-flex justify-content-center">
                <Link to="/create"><button className="btnToCreate">Let's go!</button></Link>
                </div>
                
        </>
        ) : (
            notes.map(note => (
                <div data-aos="fade-right" data-aos-delay="1000"  className='noteDiv d-flex justify-content-around align-items-center' key={note.noteID}>
                    <div className='d-flex flex-column justify-content-center align-items-start'>
                        
                            <p className='noteText'>Category: {note.CATEGORY}</p>
                            <p className='noteText'>Tag: {note.TAG}</p>
                            <p className='noteText'>Note: {note.NOTE}</p>
                      
                    </div>
                    <div>
                        <button onClick={()=>deleteNote(note.noteID)} className="deleteBtn">Delete</button>
                        <button onClick={()=>unarchiveNote(note.noteID)} className="unarchiveBtn">Unarchive</button>
                    </div>
                </div>


            ))
        )}
    </>
    )
}