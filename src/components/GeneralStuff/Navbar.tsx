import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useAuthContext } from '../../hooks/user-operations'
import { AUTH_TYPES } from '../../helpers/context-dispatcher-enums'
import './Navbar.css'
export default function Header() {
    const { state: { token, rol }, dispatch } = useAuthContext()
    const navRef = useRef<HTMLElement>(null)
    const quitResponsiveNav = () => navRef.current?.classList.remove('responsive-nav')
    const addResponsiveNav = () => navRef.current?.classList.add('responsive-nav')
    return (
        <header className='header-nav'>
            <h2>D1G1-EVALUATE</h2>
            <nav className='navbar' ref={navRef}>
                <Link to='/' onClick={quitResponsiveNav}>Home</Link>
                <Link to='/get-started' onClick={quitResponsiveNav}>Get started</Link>
                {(token && rol === 'super') && <Link to='/leagues' onClick={quitResponsiveNav}>Leagues</Link>}
                {token && <>
                    <Link to='/compare' onClick={quitResponsiveNav}>Compare</Link>
                    <Link to='' onClick={() => {
                        quitResponsiveNav()
                        dispatch({ type: AUTH_TYPES.LOGOUT })
                    }}>Logout</Link>
                </>}
                {!(token) && <>
                    <Link to='/signup' onClick={quitResponsiveNav}>Signup</Link>
                    <Link to='/login' onClick={quitResponsiveNav}>Login</Link>
                </>}
                <button className='nav-btn nav-close-btn' onClick={quitResponsiveNav}>
                    <FaTimes />
                </button>
            </nav>
            <button className='nav-btn' onClick={addResponsiveNav}>
                <FaBars />
            </button>
        </header>
    )
}