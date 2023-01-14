import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {

    const activeClass = ({isActive}) => isActive ? 'active' : ''

    const isAuth = false

    return(
        <header>
            <span>E</span>
            
                {
                    isAuth &&
                        <ul>
                            <li><NavLink to={'/'} className={activeClass}>Головна</NavLink></li>
                            <li><NavLink to={'/posts'} className={activeClass}>Пости</NavLink></li>
                            <li><NavLink to={'/new'} className={activeClass}>Додати пости</NavLink></li>
                        </ul>
                }
            
            <div>
                {
                    isAuth ? (
                        <button>Вийти</button>
                    ) : (
                        <Link to={'login'}>Увійти</Link>
                    )
                }
            </div>
        </header>

    )
}