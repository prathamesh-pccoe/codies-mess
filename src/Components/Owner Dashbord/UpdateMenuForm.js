// *****************************
// @author - Prathamesh Patil  **
// ****************************

import React, { useState } from 'react'
import { useEffect } from 'react';

const UpdateMenuForm = () => {

    const [rerender, setRerender] = useState(false);
    const [notification, setNotification] = useState({
        state: false,
        message: ''
    })
    const [formValue, setFormValue] = useState({
        price: '',
        menu: ''
    });

    const loadMenu = async ()=>{
        let auth_token = localStorage.getItem('auth_token');
        if (!auth_token) {
            // eslint-disable-next-line no-restricted-globals
            location.assign('/');
        }
        await fetch('http://localhost:5000/get-menu', {

            method: "POST",

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ auth_token: auth_token })
        }).then(res => res.json())
            .then(async data => {
                console.log(data);
                setFormValue({
                    menu: data.menu,
                    price: data.price
                });
            }).catch(error => {
                console.log('error');
            });
    }
    useEffect(()=>{
        loadMenu();
    },[]);
   

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async () => {
        try {
            let auth_token = localStorage.getItem('auth_token');
            await fetch('http://localhost:5000/update-menu', {

                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    auth_token: auth_token,
                    menu: formValue.menu,
                    price: formValue.price
                })
            }).then(res => res.json())
                .then(async (data) => {
                    if (!data.error) {
                        setNotification({ state: true, message: "Menu Updated Successfully!" })
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
                notification.state && <div className="alert alert-success mt-2 text-center" style={{ position: "absolute", zIndex: "2" }} role="alert">
                    {notification.message}
                </div>
            }
            <section className='form mt-3 border p-3 rounded animate__animated animate__slideInRight'>
                <h3 className='text-center mb-4'>Update Menu</h3>

                <div className='m-auto'>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Menu</label>
                            <input type="text" className="form-control search" id="menu" name="menu" value={formValue.menu} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input type="text" className="form-control search" id="price" name="price" value={formValue.price} onChange={handleChange} />
                        </div>
                        <div className='text-center d-flex flex-column'>
                            <button onClick={(e) => { e.preventDefault(); handleSubmit() }} className="btn btn-primary mb-2">Update</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default UpdateMenuForm
