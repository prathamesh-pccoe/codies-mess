// *****************************
// @author - Prathamesh Patil  **
// ****************************

import React from 'react'
import { BiLogOut } from 'react-icons/bi';
import { SiCodio } from 'react-icons/si';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Nav = () => {
  
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const logout = ()=>{
    localStorage.clear();
    navigate("/");
}

  const loadName = async ()=>{
    let auth_token = localStorage.getItem('auth_token');
    await fetch('http://localhost:5000/get-customer', {

                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({auth_token:auth_token})
            }).then(res => res.json())
                .then(async data => {
                    setName(data.data.name);
                }).catch(error => {
                    console.log('error')
                    
                });
  }
  useEffect(()=>{
    loadName();
  }, []);

  return (
    <>
    <div className='container pt-2 home-nav'>
        <div className='d-flex align-items-center'>
        <h2 className='fs-3 flex-fill col-prim py-1'><SiCodio className='fs-2 col-prim'/>odies Mess<span className=' fw-bold fs-2 text-warning'>.</span></h2>
        
        <p className='mx-4 my-2 lead fw-normal'>Welcome, {name}</p>
        <BiLogOut onClick={logout} className='fs-4 col-prim hover' style={{cursor:"pointer"}} title="Log Out" data-toggle="tooltip" data-placement="bottom"/>
        </div>
    <hr></hr>
    </div>
    </>
  )
}

export default Nav
