import React from 'react'
import ReusableButton from '../ReusableButton/ReusableButton'
import { BiLoader } from 'react-icons/bi'

const Introduction = () => {
  return (

    <div>Introduction
      <br />
      <ReusableButton className='rb_style' variant='customPrimary'>Click me</ReusableButton>
      <br />
      <ReusableButton className='rb_style' startIcon={<BiLoader />}>
        Save Changes
      </ReusableButton>
    </div>
  )
}

export default Introduction