import React from 'react'
import {FaSignInAlt,FaSignOutAlt,FaUser} from'react-icons/fa'
import { Link ,useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { logout } from 'state/auth/adminIndex'
function Header() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {admin}=useSelector((state)=>state.auth)||{}
  const onLogout=()=>{
    dispatch(logout())
    navigate('/')
  }
  return (
    <div className='header'>
      <div className='logo'>
        <Link to="/admin">sociogram admin</Link>
      </div>
      <ul>
        {admin ? (
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/adminlogin'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default Header