import { useState } from 'react'
import profilePic from '../profilePic.png'
import './Home.css'
import Modal from './Modal'
const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const handleProfileIcon = () => {
        setShowModal(!showModal);
    }
    return(
        <div className="home-div">
            <nav id="home-nav">
            <div className='nav-left-div'>

            </div>
            <div className='nav-right-div'>
                <div className="profile-icon" >
                    <img id='profilePic' src = {profilePic} onClick={handleProfileIcon}/>
                    {showModal && <Modal/>}
                </div>
            </div>
            </nav>
        </div>
    )
}
export default Home