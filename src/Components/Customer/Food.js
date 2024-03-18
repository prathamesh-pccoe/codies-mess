// *****************************
// @author - Prathamesh Patil  **
// ****************************

import React from 'react'

const Food = ({ setFilterCategory }) => {
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value)
  }

  return (
    <div className='row mb-3'>
    <div className='col-8 col-md-6 col-sm-8 col-lg-6'>
    <div className='d-flex flex-wrap gap-2 justify-content-center'>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="category" id="veg" value="veg" checked={category === 'veg'}
          onChange={handleChange} />
        <label className="form-check-label" htmlFor="veg">
          Veg
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="category" id="nonveg" value="nonveg" checked={category === 'nonveg'}
          onChange={handleChange} />
        <label className="form-check-label" htmlFor="nonveg">
          Non Veg
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="category" id="vegan" value="vegan" checked={category === 'vegan'}
          onChange={handleChange} />
        <label className="form-check-label" htmlFor="vegan">
          Vegan
        </label>
      </div>
      </div>
      </div>

      <div className='col-4 col-md-6 col-sm-4 col-lg-6'>

      <div className="form-check">
        <button className="btn btn-primary" type="submit" name="sortby" id="vegan" onClick={() => {
          setFilterCategory(category)
        }}> Apply </button>
      </div>
      </div>
    </div>
  )
}

export default Food
