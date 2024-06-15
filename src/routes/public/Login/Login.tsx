import React, { useState } from 'react'
import config from './configuration.json'
import Input from '@/reusableComponents/inputControls/Input/Input'
import Button from '@/reusableComponents/inputControls/Button/Button';
import { fieldValidation, formValidation } from '@/services/validations'
import { LOGIN_GQL } from '@/services/graphql/logingql';
import { useAppContext } from '@/statemanagement/appContext';
import { useLazyQuery } from '@apollo/client';
import { error } from 'console';
import { AppCookie } from '@/services/cookies';
import Loader from '@/reusableComponents/Loader/Loader';

const Login = () => {

  const [formControls, setFormControls] = useState(config)
  // const [showLoader, setShowLoader] = useState(false)
  const { dispatch }: any = useAppContext()
  const [fnLogin] = useLazyQuery(LOGIN_GQL)

  const handleClick = async () => {
    try {
      const [isFormValid, dataObj] = formValidation(formControls, setFormControls)
      if (!isFormValid) return;
      dispatch({
        type: "LOADER",
        payload: true
      })

      // Graph endpoints 
      const res = await fnLogin({
        variables: { data: dataObj },
      })

      const { login } = res?.data
      if (login) {
        const { role, token, uid } = login;
        AppCookie.setCookie("token", token)
        AppCookie.setCookie("role", role)
        AppCookie.setCookie("uid", uid)
        dispatch({
          type: "LOGIN",
          payload: {
            isLoggedIn: true,
            role,
            uid
          }
        })
      } else {
        dispatch({
          type: "TOASTER",
          payload: {
            isShowToaster: true,
            toasterMessage: "Check userid and password",
            toasterBG: "red"
          }
        })
      }
    }
    catch (exception) {
      console.error("Login Page exception", exception);
    }
    finally {
      dispatch({
        type: "LOADER",
        payload: false
      })
    }
  }

  const handleChange = (eve: any) => {
    fieldValidation(eve, formControls, setFormControls);
  }

  return (
    <div className='row container-fluid'>

      <h3 className='text-center my-5'>Login</h3>
      {
        formControls.map((obj, index) => {
          return <Input key={`input_${index}`} {...obj} handleChange={handleChange} />
        })
      }
      <Button text="Login" handleClick={handleClick} bgColor="white" />
    </div>
  )
}

export default Login
