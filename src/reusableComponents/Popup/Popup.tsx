import React, { useEffect, useState } from 'react'
import styles from './Popup.module.css'

const Popup = ( {closePopup, handleFormSubmit, children}:any) => {
  
  const [right,setRight] = useState(-400)

  useEffect(()=>{
    setRight(0)
  }, [])

  return (
  <> 
    <div className={styles.popupMask}>      
    </div>
    <div style={{right}} className={`py-2 container-fluid ${styles.popupContent}`}>
        
        <b onClick={closePopup} className={`${styles.popupCloseBtn}`}>X</b>

        <div >
            {children}
        </div>

        <button onClick={handleFormSubmit} className={`${styles.popupSubmitBtn}`}>Submit</button>
    </div>
     </>  
  )
}

export default Popup
