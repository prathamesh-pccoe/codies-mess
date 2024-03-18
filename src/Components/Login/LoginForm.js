// *****************************
// @author - Prathamesh Patil  **
// ****************************

import React, { useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom';
import { SiCodio } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import RestaurantImage from './../../img/restaurant.png';

export const LoginForm = () => {
    const navigate = useNavigate();
    const [rerender, setRerender] = useState(false);

    const isValid = () => {
        let email = formValue.email;
        let password = formValue.password;
        let valid = true;
        if (email.search(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-]+$/) === -1) {
            valid = false;
            setError({
                error: true,
                message: "Please provide a valid Email Id"
            });
        } else if (password.length < 8) {
            valid = false;
            setError({
                error: true,
                message: "The password should be at least 8 characters long"
            });
        }
        return valid;
    }
    const [error, setError] = useState({
        error: false,
        message: ''
    })

    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
        role: 'customer'
    });

    const login = async () => {
        console.log(formValue)
        if (!isValid()) {
            setTimeout(() => { setError({ error: false, message: null }); setRerender(!rerender); }, 5000);
        } else {
            await fetch('http://localhost:5000/login', {

                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(formValue)
            }).then(res => res.json())
                .then(async data => {
                    if (!data.error) {
                        localStorage.setItem("auth_token", data.auth_token);
                        localStorage.setItem("role", data.role);
                        if (formValue.role == 'customer') {
                            navigate("/home");

                        }
                        else {
                            navigate("/dashboard");
                        }
                    }
                    else {
                        setError({ error: true, message: "Invalid Credentials!" })
                        setTimeout(() => { setError({ error: false, message: null }); setRerender(!rerender); }, 2000);
                    }
                }).catch(error => {
                    console.log('error')
                    setError({ error: true, message: "Problem occured while reaching the server:( Check your internet connection !" })
                    setTimeout(() => { setError({ error: false, message: null }); setRerender(!rerender); }, 5000);
                });
        }

    }


    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabIndex) => {
        if (tabIndex == 1) {
            setFormValue({
                email: formValue.email,
                password: formValue.password,
                role: 'customer'
            });
        }
        else {
            setFormValue({
                email: formValue.email,
                password: formValue.password,
                role: 'owner'
            });
        }
        setActiveTab(tabIndex);
    }

    return (
        <>
            <div className='d-flex flex-column align-items-center'>
                <h3 className='fs-3 col-prim'><SiCodio className='fs-1 col-prim' />odies Mess<span className=' fw-bold fs-1 text-warning'>.</span></h3>
                <section className='login border p-3 rounded animate__animated animate__fadeIn'>
                    <h3 className='text-center mb-4'>Login</h3>
                    <div className='m-auto'>
                        <div className='d-flex gap-5 mb-4 justify-content-center align-item-center'>
                            <button onClick={() => handleTabClick(1)} className={`rounded ${activeTab === 1 ? 'active-btn' : ''}`}>Customer</button>
                            <button onClick={() => handleTabClick(2)} className={`rounded ${activeTab === 2 ? 'active-btn' : ''}`}>Owner</button>
                        </div>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control search" id="email" name="email" value={formValue.email} onChange={handleChange} aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" id="password" name="password" value={formValue.password} onChange={handleChange} className="form-control search" />
                            </div>
                            <div className='text-center d-flex flex-column'>
                                <button onClick={(e) => { e.preventDefault(); login() }} className="btn btn-primary mb-2">Login</button>
                                <Link to='/signup'><button><a className='text-center'>Sign Up</a></button></Link>
                            </div>
                        </form>
                    </div>
                </section>
                {
                    error.error && <div className="alert alert-danger mt-2 text-center" role="alert">
                        {error.message}
                    </div>
                }
                <img src={RestaurantImage}/>
            </div>
            
        </>
    )
}
