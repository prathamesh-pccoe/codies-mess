// *****************************
// @author - Prathamesh Patil  **
// ****************************

import React from 'react'
import { MdOutlineRestaurant } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Nav from './Nav';
import { BsCurrencyRupee, BsPinMapFill } from 'react-icons/bs';
import ReviewForm from "../Review/ReviewForm";
import ReviewSection from '../Review/ReviewSection';
import ReactStars from 'react-rating-stars-component';
import {AiFillStar} from 'react-icons/ai'

const Profile = () => {
    let navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        menu: "",
        description: "",
        address: "",
        price: "",
        location: "",
        stars: 0
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const loadProfile = async () => {
        let findEmail = localStorage.getItem("findEmail");
        if (!findEmail) {
            navigate('/home');
        }
        await fetch('http://localhost:5000/get-hotel', {

            method: "POST",

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ email: findEmail })
        }).then(res => res.json())
            .then(async data => {
                let resData = data.data;
                console.log(resData)
                setData({
                    name: resData.name,
                    menu: resData.menu,
                    price: resData.price,
                    description: resData.description,
                    address: resData.address,
                    location: resData.location,
                    stars: resData.stars
                });
            }).catch(error => {
                console.log('error');
            });
    }

    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <>
            <Nav />
            <div className='container d-flex justify-content-center'>
                <div className='m-auto p-4 animate__animated animate__fadeIn mt-4'>
                    <div className='d-flex flex-wrap align-items-center'>
                        <div className='border mx-2 p-3 position-relative mb-2'>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <MdOutlineRestaurant className='fs-1 me-4 col-prim' />
                                </div>
                                <div>
                                    <h2 className='col-prim py-1'>{capitalizeFirstLetter(data.name)}</h2>
                                    <p className='fs-5 fw-bold'>{data.menu}</p>
                                    <p className='fs-5 fw-bold'><BsCurrencyRupee className='fs-4' /> {data.price}</p>
                                </div>
                            </div>
                            <hr></hr>
                            <div className='text-center'>
                                <div className='mt-2'>
                                    <span className='fs-5 fw-normal col-prim'>About: </span>
                                    <span className='fs-5 fw-normal'>{data.description}</span>
                                </div>
                                <div className='mt-2'>
                                    <span className='fs-5 fw-normal col-prim'>Address: </span>
                                    <span className='fs-5 fw-normal'>{data.address}</span>
                                </div>
                                <a href={data.location}><p className='fs-5 fw-normal mt-3' style={{ cursor: "pointer" }}>Find on Map <BsPinMapFill className='fs-4' /></p></a>
                            </div>
                            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-prim fs-6 d-flex" style={{ left: '85%', zIndex: '1' }}>
                                <AiFillStar className='text-warning mx-1'/>{data.stars}
                            </span>
                        </div>
                        <div className='mx-auto'>
                            <ReviewForm email={localStorage.getItem("findEmail")} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <ReviewSection />
            </div>
        </>
    )
}

export default Profile
