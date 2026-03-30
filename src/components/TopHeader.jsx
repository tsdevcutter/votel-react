import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './topheader.css';
import HeaderLogo from './../assets/logo.png';
import {FaBars, FaRegWindowClose} from 'react-icons/fa';

function TopHeader() {

    const [navOverLayMenu, setNavOverLayMenu]                   = useState(false);
  return (
    <div className="nav-topline-row">
        <div className="nav-inner-row">
            <div className="logo-box">
               <Link to={"/"}> <img src={HeaderLogo} className="logo-one" alt="VoteLogs - Logo" /></Link>
            </div>
            <div className="right-sect">
                <button className="btn-unstyle" onClick={() => setNavOverLayMenu(true)}><FaBars /></button>
                
            </div>
        </div>
        {
            navOverLayMenu && (
                <div className="navigation-overlay">
                      <button className="btn-unstyle nav-button-size1" onClick={() => setNavOverLayMenu(false)}> <FaRegWindowClose/></button>
                    <div className="navigate-menue">
                        <ul className="nav-items" onClick={() => setNavOverLayMenu(false)}>
                            <li><Link to={"/"}>HOME</Link></li>
                            <li><Link to={"/miss-south-africa"}>Miss South Africa</Link></li>
                            <li><Link to={"/competitions"}>Competitions</Link></li>
                            <li><Link to={"/register"}>Register</Link></li>
                        </ul>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default TopHeader