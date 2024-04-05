import './Create.css'
import axios from '../api/axios.js'
import { useState } from 'react'
import {Link} from 'react-router-dom'

const URI = "/api/notes/create"

export const Create = () => {


    const [category, setCategory] = useState('')
    const [tag, setTag] = useState('')
    const [note, setNote] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [link, setLink] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(URI,
                JSON.stringify({ category, tag , note}),
                {
                    headers: { 'Content-type': 'application/json' },
                    withCredentials: true
                }
            );
            setSuccessMsg('Your note has been created successfully!')
            setCategory('')
            setTag('')
            setNote('')
            setErrorMsg('')

        } catch (err) {
            console.log(err)
            if (err.response.status === 403) {
                setSuccessMsg('')
                setErrorMsg('Session expired, please login again')
                setLink('Here')
            }
            else if (err.response.data.code === 1) {
                setSuccessMsg('')
                setErrorMsg('All fields are required')
            } else if (err.response.data.code === 2){
                setErrorMsg('Exceeded maxium characters')
            } else {
                setSuccessMsg('')
                setErrorMsg('Unknown Error')
            }
        }
    }


    return (<>
        <div className='titleHome d-flex justify-content-center align-items center' data-aos-duration="1000" data-aos="zoom-in">
            <h1>Cool, let's get started! 🚀</h1>
        </div>

        <div className='d-flex justify-content-center' data-aos="zoom-in-up" data-aos-delay="1000">
            <form className='noteForm' onSubmit={handleSubmit}>
                <p aria-live="assertive" className={errorMsg ? 'errorMsg' : 'hidden'}>{errorMsg} <Link to="/">{link}</Link></p>
                <p aria-live="assertive" className={successMsg ? 'successMsg' : 'hidden'}>{successMsg}</p>
                <div className="inputForm d-flex flex-column">
                    <label htmlFor="">Category</label>
                    <input className='categoryInput' value={category} onChange={(e) => setCategory(e.target.value)} type="text" />
                </div>
                <div className="inputForm d-flex flex-column">
                    <label htmlFor="">Tag</label>
                    <input className='tagInput' value={tag} onChange={(e) => setTag(e.target.value)} type="text" />
                </div>
                <div className="inputForm d-flex flex-column">
                    <label htmlFor="">Note (500 characters maxium)</label>
                    <textarea className='noteInput' value={note} onChange={(e) => setNote(e.target.value)} type="text" />
                </div>
                <div className="d-flex justify-content-around">
                    <button type="submit" className="btonNote">Create!</button>
                    <Link to="/home"><button  className="btonNote">Home</button></Link>
                </div>
            </form>
        </div>

    </>
    )
}