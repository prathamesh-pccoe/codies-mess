// *****************************
// @author - Prathamesh Patil  **
// ****************************

import React from 'react'
import { BsFilterRight } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { MdOutlineFoodBank } from 'react-icons/md';


const OptionCard = ({ toggleMenu }) => {

  return (
    <div className='d-flex gap-4 mt-3 justify-content-center option-card'>
      <a className="btn btn-primary" onClick={() => toggleMenu(1)}><span className='mobile-hide'>All Menus </span> <MdOutlineFoodBank className='fs-5 ms-1' /></a>
      <a className="btn btn-primary" onClick={() => toggleMenu(2)}><span className='mobile-hide'>Search Menus</span> <BiSearch className='fs-5 ms-1' /> </a>
      <a className="btn btn-primary" onClick={() => toggleMenu(3)}><span className='mobile-hide'>Filter</span> <BsFilterRight className='fs-5 ms-1' /></a>
    </div>
  )
}

export default OptionCard
