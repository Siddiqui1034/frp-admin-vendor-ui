import React from 'react'
import styles from './Loader.module.css'
import Image from 'next/image'

const Loader = () => {
  return (<>
    <div className={`${styles.mask}`}>  
    </div>
    <Image src="/loader2.gif" alt="Loading..." width={200} height={200} />
    </>
  )
}

export default Loader
