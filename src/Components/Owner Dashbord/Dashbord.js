// *****************************
// @author - Prathamesh Patil  **
// ****************************

import React, {useState}from 'react'
import UpdateMenuForm from './UpdateMenuForm'
import UpdateProfileForm from './UpdateProfileForm'
import { SiCodio } from 'react-icons/si';
import { BiLogOut } from 'react-icons/bi';
import { MdSystemUpdateAlt } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import MenuBtn from '../../img/menu-btn.png';
import { useNavigate } from 'react-router-dom';


const Dashbord = () => {

    const [showSideBar, setShowSideBar] = useState(true);

    const navigate = useNavigate();
    const [section, setSection] = useState(1);

    const handleTabClick = (tabIndex) => {
        setSection(tabIndex);
    }

    const logout = ()=>{
        localStorage.clear();
        navigate("/");
    }

    return (
        <>
            <div className="container-fluid">
                <div className={`menu-btn ${showSideBar ? "cross-btn" : "ham-btn"}`} onClick={()=>{setShowSideBar(!showSideBar)}}></div>
                <div className='row'>
                    <div className={`responsive-side ${showSideBar ? "show-component" : "hide-component"} responsive-side-mobile-control col-1 col-sm-3 col-md-3 col-lg-3 bg-prim text-light slider pt-3 animate__animated animate__slideInLeft`}>
                        <h2 className='fs-1'><SiCodio className='fs-2 brand_name'/>odies Mess<span className='brand_name fw-bold fs-2 text-warning'>.</span></h2>
            
                        <hr></hr>
                        <ul className='navbar-nav' >
                            <li className={`nav-item py-3 ${section===1? `text-warning fw-bolder` : ``}`} onClick={() => handleTabClick(1)}>
                                <a className="nav-link"><CgProfile className='mx-3 cursor-pointer'/>Update Profile</a>
                            </li>

                            <li className={`nav-item py-3 ${section===2? `text-warning fw-bolder` : ``}`} onClick={() => handleTabClick(2)}>
                                <a className="nav-link"><MdSystemUpdateAlt className='mx-3 cursor-pointer'/> Update Menu</a>
                            </li>

                            <li className="nav-item py-3 " onClick={logout}>
                                <a className="nav-link"><BiLogOut className='mx-3 cursor-pointer'/> Log Out</a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-11 col-sm-9 col-md-9 col-lg-9 d-flex justify-content-center align-items-center'>
                        {
                            section === 1? <UpdateProfileForm/> : <UpdateMenuForm/>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashbord
