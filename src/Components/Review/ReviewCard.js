// *****************************
// @author - Prathamesh Patil  **
// ****************************

import React from 'react'
import { HiUserCircle } from 'react-icons/hi';


const ReviewCard = ({review, author}) => {
    return (
        <>
            <div class="card m-auto" style={{ width: "18rem" }}>
                <div class="card-body">
                    <p class="card-text fst-italic">{`"${review}"`}</p>
                        <h5 class="card-title d-flex align-items-center"><HiUserCircle className='mx-1 fs-3 col-prim' />{author}</h5>
                </div>
            </div>
        </>
    )
}

export default ReviewCard
