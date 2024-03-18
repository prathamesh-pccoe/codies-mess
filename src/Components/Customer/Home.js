// *****************************
// @author - Prathamesh Patil  **
// ****************************

import React, { useState } from 'react'
import AllMenus from './AllMenus';
import Banner from './Banner';
import Filter from './Filter';
import Nav from './Nav'
import OptionCard from './OptionCard'
import SearchMenu from './SearchMenu';

const Home = () => {
  const [option, setOption] = useState(0);
  const toggleMenu = (tabIndex) => {
    setOption(tabIndex);
  }
  return (
    <>
      <Nav/>
      <OptionCard toggleMenu={toggleMenu} />
      {
        option === 0 ? <Banner/> : 
        option === 1 ? <AllMenus /> : 
        option === 2 ? <SearchMenu /> : 
        option === 3 ? <Filter /> : <></>
      }
    </>
  )
}

export default Home
