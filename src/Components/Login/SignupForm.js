// *****************************
// @author - Prathamesh Patil  **
// ****************************

import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { SiCodio } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';

export const SignupForm = () => {

    const navigate = useNavigate();

    const isValid = () => {
        let email = formValue.email;
        console.log(email)
        let password = formValue.password;
        let name = formValue.name;
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
        else if (name.length < 3) {
            valid = false;
            setError({
                error: true,
                message: "The name should be at least 3 characters long"
            });
        }
        return valid;
    }

    const [error, setError] = useState({
        error: false,
        message: ''
    })

    const [rerender, setRerender] = useState(false);

    const [formValue, setFormValue] = useState({
        name: "",
        email: "",
        role: "customer",
        password: ""
    });

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formValue)
        if (!isValid()) {
            setTimeout(() => { setError({ error: false, message: null }); setRerender(!rerender); }, 5000);
        } else {
            await fetch('http://localhost:5000/signup', {

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
                        setError({ error: true, message: "User with the given Email already exists! Try a different one!" })
                        setTimeout(() => { setError({ error: false, message: null }); setRerender(!rerender); }, 2000);
                    }
                }).catch(error => {
                    console.log('error')
                    setError({ error: true, message: "Problem occured while reaching the server:( Check your internet connection !" })
                    setTimeout(() => { setError({ error: false, message: null }); setRerender(!rerender); }, 5000);
                });
        }
    }

    return (
        <>
            <div className='d-flex flex-column align-items-center'>
                <h3 className='fs-3 flex-fill col-prim'><SiCodio className='fs-1 col-prim' />odies Mess<span className=' fw-bold fs-1 text-warning'>.</span></h3>
          
            <section className='m-auto login mt-3 border p-3 rounded animate__animated animate__fadeIn'>
                <h3 className='text-center mb-4'>Sign Up</h3>
                <div className='m-auto'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="name" id="name" name="name" className="form-control search"
                                onChange={handleChange}
                                value={formValue.name} aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" id="email" name="email" className="form-control search"
                                onChange={handleChange}
                                value={formValue.email} aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3 d-flex">
                            <label className="form-label">Role:</label>
                            <div className="form-check ms-3">
                                <input className="form-check-input custom-control" checked={formValue.role=="customer"} type="radio" name="role" onChange={handleChange} value="customer" id="customer" />
                                <label className="form-check-label" for="customer">
                                    Customer
                                </label>
                            </div>
                            <div className="form-check ms-3">
                                <input className="form-check-input" type="radio" name="role"
                                    onChange={handleChange} checked={formValue.role=="owner"} value="owner" id="owner" />
                                <label className="form-check-label" for="owner">
                                    Owner
                                </label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Create Password</label>
                            <input type="password" id="password" name="password" className="form-control search"
                                onChange={handleChange}
                                value={formValue.password} />
                        </div>
                        <div className='text-center d-flex flex-column'>
                            <button type="submit" className="btn btn-primary mb-2">Sign Up</button>
                            <Link to='/'><button><a className='text-center'>Already have an account? <span className='text-danger'>Login</span></a></button></Link>
                        </div>
                    </form>
                </div>
            </section>
            {
                error.error && <div className="alert alert-danger mt-2 text-center" role="alert">
                    {error.message}
                </div>
            }
            </div>
            </>
    )
}
