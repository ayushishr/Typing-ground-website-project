import AccountCircle  from './AccountCircle';
import React from 'react'
import Logoimg from '../Logoimg.jpg'
const Header = () => {
  return (
    <div className='header'>
        <div className='logo'>
    <img className='logo-img' src={Logoimg} style={{width:'80px',height:'70px', borderRadius: '50%'}}/>
        </div> 
        <div className='user-icon'>
           <AccountCircle/>
        </div>
    </div>
  )
}

export default Header
