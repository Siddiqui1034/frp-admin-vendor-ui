import {AppCookie} from '../services/cookies'

export const init ={
    // isLoggedIn : AppCookie.getCookie("token")? true : false // 64
    isLoggedIn: false,
    role:'',
    uid:'',
    
    isShowLoader: false,

    isShowToaster: false,
    toasterMessage: '',
    toasterBG: '   '


}