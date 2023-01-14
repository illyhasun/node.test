import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/features/auth/authSlice'
import instance from '../utils/axios'
export const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { status } = useSelector((state) => state.auth)
    console.log(status)
    // if(status === 400){
    //     // console.log(status)
    // }
    // let response = fetch(instance)

//     fetch('https://my-api.com/endpoint')
//   .then(response => {
//     if (response.status === 200) {
//       // the JSON is valid, so we can parse it and use it
//       return response.json();
//     } else {
//       // the JSON is invalid, so we should handle the error
//       throw new Error('Invalid JSON');
//     }
//   })
//   .then(data => {
//     // use the data here
//   })
//   .catch(error => {
//     // handle the error here
//   });

    // console.log(status)
    const dispatch = useDispatch()

    const handleSubmit = () => {
        try{
            dispatch(registerUser({username, password}))
            setPassword('')
            setUsername('')
        }
        catch(e) {
            console.log(e)
        }
    }

    return(
        <form onSubmit={e => e.preventDefault()}>
            <h1>Регестрація</h1>
            <h4>{status}</h4>
            <label>Username: <input 
                type="text"
                placeholder='Username'
                value={username}
                onChange={e => setUsername(e.target.value)}
            ></input></label>
            <label>Password: <input 
                type="password"
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            ></input></label>
            <div>
                <button 
                    type="submit"
                    onClick={handleSubmit}
                    >Зареєструватися
                </button>

                <Link to={'/login'}>Вже зареєстровані?</Link>
            </div>
        </form>
    )
}