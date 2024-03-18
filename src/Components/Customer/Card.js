// *****************************
// @author - Prathamesh Patil  **
// ****************************
import React from 'react'
import { BsCurrencyRupee } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {AiFillStar} from 'react-icons/ai'

const Card = ({ email, name, menu, price,stars }) => {
    let navigate = useNavigate();
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const openProfile = () => {
        localStorage.setItem('findEmail', email);
        navigate('/profile');
    }
    return (
        <>
            <div key={email} className='card mb-2 m-auto animate__animated animate__flipInY' style={{ width: "18rem" }}>
                <div className='card-body text-center'>
                    <h2 className='py-1'>{capitalizeFirstLetter(name)}</h2>
                    <p className='fs-3 fw-normal'>{menu}</p>
                    <p className='fs-4 fw-bold'><BsCurrencyRupee className='fs-4' />{price}</p>
                    <a onClick={openProfile} className="btn btn-primary">Explore</a>
                </div>
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-prim fs-6 d-flex" style={{ left: '85%', zIndex: '1' }}>
                    <AiFillStar className='text-warning mx-1' />{stars}
                </span>
            </div>
        </>
    )
}

export default Card
