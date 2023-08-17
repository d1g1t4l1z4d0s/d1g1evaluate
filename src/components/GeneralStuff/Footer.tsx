import { Link } from 'react-router-dom'
import { Github, Instagram, Linkedin } from './Icons'
import './Footer.css'

export default function Footer() {
    return (
        <footer className='page-footer'>
            <div className='network-icons'>
                <Link to='https://github.com/HaissanKhufash?tab=repositories' target='_blank'>
                    <Github />
                </Link>
                <Link to='https://www.instagram.com/d1g1t4l1z4d0s/' target='_blank'>
                    <Instagram />
                </Link>
                <Link to='https://www.linkedin.com/in/haissan-khufash-827191225/' target='_blank'>
                    <Linkedin />
                </Link>
            </div>
            <h6 style={{textAlign: 'center', marginTop: '10px'}}>&copy;Copyright D1G1T4L1Z4D0S.</h6>
        </footer>
    )
}