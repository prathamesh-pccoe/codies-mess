// *****************************
// @author - Prathamesh Patil  **
// ****************************

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from './Card';

const AllMenus = () => {
  const [menus, setMenus] = useState([])

  const loadMenu = async () => {
    try {
      await fetch('http://localhost:5000/all-menu', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(async data => {
      let menuData = data.data;
      menuData.sort(function(a,b){
        return b.stars - a.stars;
      })
      console.log(menuData)
      setMenus(menuData);
    });

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadMenu();
  }, [])

  return (
    <div className='container animate__animated animate__fadeIn'>
      <h2 className='text-center mt-3 mb-3 py-1'>Today's Menu</h2>
      <div className='d-flex flex-wrap gap-2'>
        {
          menus === [] ? 
          <div className='m-auto mt-3'>
              <h3 className='col-prim animate__animated animate__shakeX'>No Items</h3>
            </div>
           :
           menus.map((item) => {
            return (
              <Card email={item.email} name={item.name} menu={item.menu} price={item.price} stars={item.stars}/>
            )
          }) 
        }
      </div>

    </div>
  )
}

export default AllMenus
