// *****************************
// @author - Prathamesh Patil  **
// ****************************
import React from 'react'
import { MdFastfood } from 'react-icons/md';
import SearchMenu from './SearchMenu';


const Banner = () => {
  return (
    <div className='bg-hero text-light d-flex align-items-center flex-column justify-content-center animate__fadeIn animate__animated mt-5'>
        <h1 className='fw-bolder fs-1 fst-italic py-1'>Welcome</h1>
        <h2 className='mt-3 mb-4 fw-normal fs-1 py-1 text-center lh-lg'>Effortless meal planning for a healthier you <br/> with our app! <MdFastfood className='fs-2 text-warning fa-fade'/> </h2>
    </div>
  )
}

export default Banner
