import React from 'react'
import config from './configuration.json'
import Link from 'next/link'

const VendorMenu = () => {
  return (
    <div>
      {
      config?.map(({text, path, id}, ind, arr)=>{
        return <Link key={`menu_${id}`} id={id} href={`/vendors/${path}`}>{text} </Link>
      })
      }
    </div>
  )
}

export default VendorMenu
