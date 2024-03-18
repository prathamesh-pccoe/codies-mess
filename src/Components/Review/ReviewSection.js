// *****************************
// @author - Prathamesh Patil  **
// ****************************
import React from 'react'
import { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm';

const ReviewSection = () => {

    const [data, setData] = useState([]);
    const loadData = async () => {
        let email = localStorage.getItem("findEmail");
        await fetch('http://localhost:5000/get-reviews', {

            method: "POST",

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ email: email })
        }).then(res => res.json())
            .then(async data => {
                setData(data.review);
                console.log(data.review);
            }).catch(error => {
                console.log('error');
            });
    }
    useEffect(() => {
        loadData();
    }, [ReviewForm]);

    var elementKey = 0;
    return (
        <>
            <h1 className='col-prim fs-3'>Reviews</h1>
            <hr />
            {data.length == 0 && <p className='lead fw-normal'>No Reviews</p>}
            <div className='row mb-3'>
                {

                    data.map((element) => {
                        return (
                            <div className='mx-1 col-12 col-md-4 col-lg-3 mb-2'>
                                <ReviewCard key={elementKey++} review={element.review} author={element.author} />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ReviewSection
