import React from 'react'
import styles from './Modal.module.css'

const Modal = ({modalActions}:any) => {

    return (<>
        <div className={`${styles.modalMask}`} >
        </div>

        <div>
            <h4>Are you sure?</h4>
            <button onClick={ ()=> modalActions("C") }  className='btn btn-dark'>Cancel</button>
            <button onClick={ ()=> modalActions("O") } className='btn btn-dark'>OK</button>
        </div>
    </>
    )
}

export default Modal
