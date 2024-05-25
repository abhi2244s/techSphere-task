import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import ForYou from './components/ForYou/ForYou'
import './Home.scss'
import axios from 'axios'
import {IoIosMenu }  from 'react-icons/io'

const Home = () => {
    const showMenu = ()=>{

    }

    return (
        <>
            <div className='homeContainer'>
                <div className='sidebar-container '>
                    <Sidebar />
                </div>
                {/* <div className='border-container' onClick={showMenu}>
                 <IoIosMenu size=  {30} color='white'/>
                </div> */}
                <div className='for-you'>
                    <ForYou />
                </div>
            </div>
        </>
    )
}

export default Home
