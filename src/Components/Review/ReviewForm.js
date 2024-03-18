// *****************************
// @author - Prathamesh Patil  **
// ****************************

import React, { useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { FcApproval } from 'react-icons/fc';
import { useEffect } from 'react';

const ReviewForm = ({ email }) => {

    const [hasRated, setHasRated] = useState(false);
    const auth_token = localStorage.getItem("auth_token");

    const loadReview = async () => {
        await fetch('http://localhost:5000/check-rate', {

            method: "POST",

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ auth_token: auth_token, email: email })
        }).then(res => res.json())
            .then(async data => {
                setHasRated(data.hasRated);
            }).catch(error => {
                console.log('error');
            });
    }
    useEffect(() => {
        loadReview();
    }, []);

    const [formValue, setFormValue] = useState({
        review: '',
        stars: 0,
        role: 'customer',
    });

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }
    const ratingChanged = (newRating) => {
        formValue.stars = newRating;
    };

    const rate = async () => {
        await fetch('http://localhost:5000/rate-mess', {

            method: "POST",

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ auth_token: auth_token, email: email, stars:formValue.stars, review: formValue.review })
        }).then(res => res.json())
            .then(async data => {
                setHasRated(data.hasRated);
            }).catch(error => {
                console.log('error');
            });
        
        loadReview();
    }
    return (
        <>
            <section className='login border p-3 rounded animate__animated animate__fadeIn'>
                <h3 className='text-center mb-4'>Review</h3>
                <div className='m-auto'>
                    {hasRated && <div className='d-flex justify-content-center py-2'>
                        <FcApproval className='fs-4 fa-beat mx-1' /> <span>Already Reviewed! </span>
                    </div>}
                    {!hasRated && 
                    <form>
                            <div className="mb-3">
                                <textarea className="form-control search" placeholder='Review Message' id="review" name="review" value={formValue.review} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <ReactStars count={5} name="stars" value={formValue.stars} onChange={ratingChanged} size={24} activeColor="#ffd700" classNames="m-auto" />
                            </div>
                            <div className='text-center d-flex flex-column'>
                                <button className="btn btn-primary mb-2" onClick={(e) => { e.preventDefault(); rate() }} >Submit Review</button>
                            </div>


                        </form>}
                </div>         
            </section>
        </>
    )
}

export default ReviewForm
