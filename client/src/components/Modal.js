import { Link } from 'react-router-dom'
import './Modal.css'
const Modal = () => {
    return(
        <div className="modal">
        <Link to = '/profile' style={{textDecoration:"none", color:"black"}}>
            <div className="profile">
                <p>Profile</p>
            </div>
        </Link>
        <Link to = '/settings' style={{textDecoration:"none", color:"black"}}>
            <div className="profileSetting">
                <p>Settings</p>
            </div>
        </Link>
        <Link to = '/logout' style={{textDecoration:"none", color:"black"}}>
            <div className="logout">
                <p>Log Out</p>
            </div>
        </Link>
        </div>
    )
}
export default Modal