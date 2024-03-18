// *****************************
// @author - Prathamesh Patil  **
// ****************************
import React from 'react'
import { BsCurrencyRupee } from 'react-icons/bs';

const FilterCard = ({name, type, price}) => {
  return (
    <div className='card mb-2 m-auto animate__animated animate__flipInY' style={{ width: '14rem' }}>
                <div className='card-body text-center'>
                    <h4 className='col-prim p-1'>{name}</h4>
                    <p className='fs-4 fw-bold'><BsCurrencyRupee className='fs-4' />{price}</p>
                    <p className={`fs-6 ${type === 'veg'? 'text-success' : 'text-danger'}`}>{type[0].toUpperCase() + type.slice(1)}</p>
                </div>
            </div>
  )
}

export default FilterCard
