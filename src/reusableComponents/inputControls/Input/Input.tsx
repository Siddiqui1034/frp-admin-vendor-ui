import React from 'react'
import Image from 'next/image'

type propsType = {
    lbl: String,
    isRequired: boolean,
    type?: any, 
    name: any,
    // values: any,
    placeholder?: any,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error: String,
    options?: any,
    values?: any,
    lblColumns?: any,
    errorMsgColumns?: any,
    inputCtrlColumns?: any
    value?: string,
    src?: any,
    
}

const Input = ({  value, src, lbl, isRequired, type, name, placeholder, handleChange, error, options, values, lblColumns, errorMsgColumns, inputCtrlColumns}: propsType)=> {
 
  const fnPrepareInputControls= () => {
  switch(type){
    case "text":
    case "password":
    case "number":
      return <input  value={value} className='form-control' onChange={handleChange} type={type} name={name} placeholder={placeholder}  />
    
    case "radio" :
    return <>
    {
      options?.map( (opt:any, index:any)=>{
        return <React.Fragment key={`opt_${index}`}>
          <input onChange={handleChange} type={type} name={name} value={values[index]} placeholder={placeholder} />
                  <span className={`ms-2 me-4`}>{opt}</span>
                </React.Fragment>
      })
    }
    </> 
    case "file":
    return <>
    <input className='form-control' onChange={handleChange} type={type} name={name} placeholder={placeholder} /> 
    <p>
      <Image className='mt-3' src={ `${ src ? src : "/defaultImage.png"}`} width={100} height={100} alt='defaultImage'/>
    </p>
    </> 
    case "dropdown": 
      return <div></div>
    default :
    return <div></div>
  } 
 }
  return (
    <div className='row my-3'>

      <div className={`col-${lblColumns} text-end`}>
        <b>{lbl} { isRequired && <span className='text-danger'>*</span>}</b>
      </div>

      <div className={`col-${inputCtrlColumns}`}  >
            {/* <input onChange={handleChange} className={``} type={type} name={name} placeholder={placeholder} /> */}
            {fnPrepareInputControls()}
      </div>

      <div className={`col-${errorMsgColumns}`}>
        {error && <b className={`text-danger`}>{error}</b>}
      </div>

    </div>
  )
}

export default Input
