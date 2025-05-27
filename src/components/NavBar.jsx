import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
    // Subscribe to the user state from the Redux store
    // This will allow us to access the user information throughout the component
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to handle user logout
    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + '/logout', {}, {
                withCredentials: true 
            })
            dispatch(removeUser());
            return navigate('/login'); 

        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    return (
        <>
            <div className="navbar bg-base-300">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">👩‍💻 Dating APP</Link>
                </div>
                {user && <div className="flex-none gap-2"><p>Welcome {user.firstName}</p>
                    <div className="dropdown dropdown-end mx-5">

                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user.photoUrl} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a onClick={handleLogout} >Logout</a></li>
                        </ul>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default NavBar