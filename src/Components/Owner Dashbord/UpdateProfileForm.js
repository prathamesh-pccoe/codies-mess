// *****************************
// @author - Prathamesh Patil  **
// ****************************

import React, { useState } from 'react'
import { useEffect } from 'react';

const UpdateProfileForm = () => {
    const [rerender, setRerender] = useState(false);
    const [notification, setNotification] = useState({
        state: false,
        message: ''
    })
    
    const loadData = async () => {
        let auth_token = localStorage.getItem('auth_token');
        if (!auth_token) {
            // eslint-disable-next-line no-restricted-globals
            location.assign('/');
        }
        await fetch('http://localhost:5000/get-owner', {

            method: "POST",

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ auth_token: auth_token })
        }).then(res => res.json())
            .then(async data => {
                if (!data.error) {
                    let resData = data.data;
                    setFormValue({
                        name: resData.name,
                        description: resData.description,
                        address: resData.address,
                        location: resData.location,
                        password: resData.password
                    });
                }
            }).catch(error => {
                console.log('error')

            });
    }
    useEffect(() =>{ loadData()}, []);

    const [formValue, setFormValue] = useState({
        name: '',
        description: '',
        address: '',
        location: '',
        password: ''
    });

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    //Update Owner
    const handleSubmit = async () => {
        try {
            let auth_token = localStorage.getItem('auth_token');
            await fetch('http://localhost:5000/update-owner', {

            method: "POST",

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ auth_token: auth_token,
             name: formValue.name,
             description: formValue.description,
             location: formValue.location,
             address: formValue.address,
             password: formValue.password
            })
        }).then(res => res.json())
            .then(async (data) => {
                if(!data.error){
                    setNotification({ state: true, message: "Profile Updated Successfully!" })
                    setTimeout(() => { setNotification({ state: false, message: null }); setRerender(!rerender); }, 2000);
                }
                
            }).catch(error => {
                console.log('error')

            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        {
                notification.state && <div className="alert alert-success mt-2 text-center" style={{position:"absolute" ,zIndex:"2"}} role="alert">
                    {notification.message}
                </div>
            }
        <section className='form mt-3 border p-3 rounded animate__animated animate__slideInRight'>
            <h3 className='text-center mb-1'>Update Profile</h3>

            <div className='m-auto'>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control search" id="name" name="name" value={formValue.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input type="text" id="description" name="description" value={formValue.description} onChange={handleChange} className="form-control search" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" id="address" name="address" value={formValue.address} onChange={handleChange} className="form-control search" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Location</label>
                        <input type="text" id="location" name="location" value={formValue.location} onChange={handleChange} className="form-control search" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="text" id="password" name="password" value={formValue.password} onChange={handleChange} className="form-control search" />
                    </div>
                    <div className='text-center d-flex flex-column'>
                        <button onClick={(e)=>{
                            e.preventDefault();handleSubmit()}} className="btn btn-primary mb-2">Update</button>
                    </div>
                </form>
            </div>
            
        </section>
        </>
    )
}

export default UpdateProfileForm
