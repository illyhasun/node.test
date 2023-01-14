import React from 'react'
import { Link } from 'react-router-dom'

export const LoginPage = () => {
    return(
        <form onSubmit={e => e.preventDefault()}>
            <h1>Авторизація</h1>
            <label>Username: <input type="text"placeholder='Username'></input></label>
            <label>Password: <input type="password"placeholder='Password'></input></label>
            <div>
                <button type="submit">Увійти</button>
                <Link to={'/register'}>Немає аккаунту?</Link>
            </div>
        </form>
    )
}