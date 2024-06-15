import React, { useEffect, useState, useRef } from 'react'
import config from './configuration.json'
import Link from 'next/link'
import styles from './AdminMenu.module.css'
import { usePathname, useRouter } from 'next/navigation'
import Modal from '@/reusableComponents/Modal'
import { AppCookie } from '@/services/cookies'

const AdminMenu = () => {

  const pathName = usePathname()
  const router = useRouter()
  const [activeMenu, setActiveMenu] = useState(pathName?.split('/')?.pop() || "home"); //when refresh d page, it should highlight selected menuItem & when no root selected should be home
  const [isShowModal, setIsShowModal] = useState(false)
  const [isMobileView, setISMobileView] = useState()
  const [left, setLeft] = useState(-130)

  const timerId: any = useRef()

  const fnResize = () => {
    clearTimeout(timerId.current)
    timerId.current = setTimeout( () => {      
      let width: any = window.innerWidth // let width: any = document.body.offsetWidth
      let condition : any = width<700
      console.log(condition)
    }, 500)
  }

  useEffect(() => {
  
    window.addEventListener("resize", fnResize)
    fnResize()  // on 1st time load also i want to cll ds fnResize not only when event gets trigger, vout triggering d evnt as in refreshing pg event ll not trigger so we use calling d fn instead of using throttling conpt 
              // in throttling whn 1st evnt triggered nd evnt 2 evnt gap is more thn only fnResize ll work whn u refresh d page evnt Resize ll not tgr and ll not cll fnResize for 1st time.

    return () =>{ // using removeEventListener so that if im in another page then resize event should not call because i don't need this resize event 
      window.removeEventListener("resize", fnResize);//to each page so to remove event listener we do removeListerner not to listen for other pages of my appln
    }

  }, [] )

  const handleMenuClick = (eve: any) => {
    setLeft(-150)
    if (eve.target.id === 'logout') {
      eve.preventDefault(); // it'll prevent to go anyother pg like 404 not found instead i want whereever in page either adminMenu or vendorMenu it just show the popup at the same page without going another page
      setIsShowModal(true)
      setActiveMenu(eve.target.id)
    }
    else {
      // alert(eve.target.id);
      setActiveMenu(eve.target.id)
    }
  }

  const modalActions = (action: string) => {
    if (action === 'C') {      
      setIsShowModal(false) //show modal
    }
    else {
      setIsShowModal(false) //hide modal and go to Login page as fresh start and clear all cookies 
      AppCookie.clear();
      router.push('/')
    }
  }

  const handleMobileBtnMenu = () => {
    setLeft(left === 0 ? -150 : 0)

  }
  
  return (<>
    {
    isMobileView && <button className={`btn btn-dark ${styles.mobileMenuBtn}`} onClick={handleMobileBtnMenu}>
      Menu
      <span className='bi bi-three-dots-vertical'></span>
    </button>
    }
    <div style={{left}} className={ `${isMobileView? styles.mobileMenu : styles.menu}` }>
      {
        config?.map(({ text, path, id }, ind, arr) => {
          return <Link onClick={handleMenuClick} className={activeMenu === id ? "active-menu" : ""} key={`menu_${id}`} id={id} href={`/admin/${path}`}>{text} </Link>
        })
      }
    </div>
    {isShowModal && <Modal modalActions={modalActions} />}
  </>
  )
}

export default AdminMenu
