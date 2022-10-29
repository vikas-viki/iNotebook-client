import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useHistory } from 'react-router-dom';
import "../Styles/Notes.css"

const Notes = (props) => {
    const history = useHistory();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote, getSpecificNotes } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        } else {
            history.push("login")
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const [searchText, setSearchText] = useState("")

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showMsg("Note edited successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const searchByFilter = () => {
        getSpecificNotes(searchText);
    }
    return (
        <>
            <AddNote showMsg={props.showMsg} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog .modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-bottom-0">
                            <input type="text" style={{ width: "100%", border: "none", background: "none" }} className=" text-center border-bottom  p-0 fs-3" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body pt-0">
                            <form className="my-3">
                                <div className="mb-3">
                                    <textarea style={{ width: "100%", border: "none", background: "none", fontSize: "18px" }} id="edescription" rows={20} name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <div className='d-flex justify-content-between pb-3'>
                    <h2>You Notes</h2>
                    <div className='d-flex flex-row'>
                        <form className='d-flex' onSubmit={(e) => { searchByFilter(); e.preventDefault(); }}>
                            <input
                                type="text"
                                className='form-control mx-3'
                                placeholder='Search note by title'
                                value={searchText}
                                onChange={(e) => {
                                    setSearchText(e.target.value)
                                }} />
                            <button type="submit" className=' btn btn-secondary'>Search</button>
                        </form>
                    </div>
                </div>
                <hr />
                <div className="container mx-2">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} showMsg={props.showMsg} />
                })}
            </div>
        </>
    )
}

export default Notes
