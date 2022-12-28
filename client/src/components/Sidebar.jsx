import React from 'react'
import { BsHouseFill, BsPeopleFill, BsBoxArrowRight } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
    const navigate=useNavigate()
    const adminHome=()=>{
        navigate('/admin/dashboard')
    }
    const adminuserList=()=>{
        navigate('/admin/user-list')
    }
    
  return (
    <div className='adminsidebar-main '>
    <div className="adminsidebar-options">
        <div className='adminsidebar-text' onClick={adminHome}>    <BsHouseFill /> Home</div>
    </div>
    <div className="adminsidebar-options">
        <div className='adminsidebar-text' onClick={adminuserList}>  <BsPeopleFill />  Users List</div>
    </div>

   
</div>
  )
}

export default Sidebar