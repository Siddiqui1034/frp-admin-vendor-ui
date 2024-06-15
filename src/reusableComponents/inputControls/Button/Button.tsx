import React from 'react'
import styles from './Button.module.css'

type buttonPropTypes ={
    text: String,
    handleClick: () => void, 
    bgColor?: any,
    color?: any
}

const Button = ({text, handleClick, bgColor, color} : buttonPropTypes) => { // we can expect background of the button accordingly and text inside the button and what action it will perform on button click
  return (
    <div className='row'>

      <div className='offset-5 col-7'>
      <button  onClick={handleClick} className={`btn px-3 py-2 mx-2 my-2 ${styles.button}`} style={{backgroundColor: bgColor, color: color}}>{text}</button>
      </div>

    </div>
   
  )
}

export default Button
