import './Login.css'
import axios from '../api/axios.js'
import { useState } from 'react'

const URI = "/api/users/login"

export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(URI,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-type': 'application/json' },
                    withCredentials: true
                }
            );
                setSuccessMsg('Login successful!')
                setUsername('')
                setPassword('')
                setErrorMsg('')
                setTimeout(() => {
                    window.location.href = 'http://localhost:3000/home'
                  }, 1000)

        } catch (err) {
            console.log(err.response.status)
            if (err.response.status === 400){
                setSuccessMsg('')
                setErrorMsg('Wrong credentials, please try again')
            }
            else if (!err?.response) {
                setSuccessMsg('')
                setErrorMsg('Server response failed')
            } else {
                setSuccessMsg('')
                setErrorMsg('Unknown Error')
            }
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center cont">
        <div className="d-flex justify-content-center flex-column align-items-center formcont">
            <h2 className='loginSubtitle'>Welcome Ensolvers!</h2>
            <form onSubmit={handleSubmit}>
                <p aria-live="assertive" className={errorMsg ? 'errorMsg' : 'hidden'}>{errorMsg}</p>
                <p aria-live="assertive" className={successMsg ? 'successMsg' : 'hidden'}>{successMsg}</p>

                <div className="inputForm d-flex flex-column">
                    <label htmlFor="">User</label>
                    <input value={username} placeholder='Your username?' onChange={(e) => setUsername(e.target.value)} type="text" />
                </div>
                <div className="inputForm d-flex flex-column">
                    <label htmlFor="">Password</label>
                    <input value={password} placeholder='Your password?' onChange={(e) => setPassword(e.target.value)} type="password" />
                </div>
                <div className="d-flex justify-content-around">
                    <button type="submit" className="bton">Login</button>
                </div>
            </form >
            </div>
        </div>

    )
}