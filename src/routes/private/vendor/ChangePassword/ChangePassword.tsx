"use client"
import React, { useState } from 'react'
import styles from './ChangePassword.module.css'
import config from './configuration.json'
import Button from '@/reusableComponents/inputControls/Button'
import Input from '@/reusableComponents/inputControls/Input/Input'
import { formValidation, fieldValidation } from '@/services/validations'


const ChangePassword = () => {

    const [formControls, setFormControls] = useState(config);
  
    const handleChangePwd = async () => {
      try {
        const [isFormValid, dataObj] = formValidation(formControls, setFormControls)
        if (!isFormValid) return;
      }
      catch (exception) {
        console.error("Login Page exception", exception);
      }
      finally {
      
      }
    }
  
    const handleChange = (eve: any) => {
      fieldValidation(eve, formControls, setFormControls);
    }

    
    return (
        <div className='container-fluid '>
            <h3 className='text-center my-5'>Change Password</h3>
            {
                formControls.map((obj, index) => {
                    return <Input key={`input_${index}`} {...obj} handleChange={handleChange} />
                })
            }
            <Button align="text-center" text="Change Password" handleClick={handleChangePwd} bgColor="black" color="white" />

        </div>
    )
}

export default ChangePassword
