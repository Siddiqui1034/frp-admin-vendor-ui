import React, {useEffect, useRef, useState} from 'react'
import styles from './Toaster.module.css'
import { useAppContext } from '@/statemanagement/appContext'



export const Toaster = () => {

    const [count, setCount] = useState(0)
    const {state, dispatch}:any =useAppContext()
    const {toasterMessage, toasterBG} = state;
    const intervalref:any = useRef()

    useEffect(()=>{
        intervalref.current = setInterval(()=>{
            setCount((prev)=>{
                if(prev > 250 ){

                //    clearInterval(intervalId)
                //     dispatch({
                //         type: "TOASTER",
                //         payload: {
                //             isShowToaster: false,
                //             toasterMessage: '',
                //             toasterBG: ''
                //         }
                //     })

                fnClear();

                }
                return prev + 1;
            })
        }, 33 )
    }, [])

    const fnHideToaster = () =>{
        fnClear();
    }

    const fnClear = () =>{
        clearInterval(intervalref.current)
        setCount(0)
        dispatch({
            type: "TOASTER",
            payload: {
                isShowToaster: false,
                toasterMessage: '',
                toasterBG: ''
            }

        })
    }

  return (
    <div  className={`${styles.appToaster}`}>
      <span className='ms-2'>{toasterMessage}</span>
      <b onClick={fnHideToaster} className={`${styles.button}`}>X</b>
        <div style={{ width:count, background: toasterBG}}></div>
    </div>
  )
}

export default Toaster
