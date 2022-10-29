import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3" style={{height: "13rem", border: "1px solid grey "}}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title text-center">{note.title}</h5>
                        <span>
                            <i className="far fa-trash-alt mx-2"
                                onClick={() => {
                                    deleteNote(note._id)
                                    props.showMsg("Note delted successfully", "success")
                                }}></i>
                            <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
                        </span>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem
