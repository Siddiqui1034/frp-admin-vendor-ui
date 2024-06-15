"use client"

import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { useEffect, useId, useReducer } from "react";
import { appReducer } from '../statemanagement/appReducer'
import { init } from '../statemanagement/init'
import { AppContextProvider } from '../statemanagement/appContext'
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { AppCookie } from "@/services/cookies";
import {ApolloClient,InMemoryCache, ApolloProvider}from '@apollo/client'
import AdminMenu from "@/routes/private/admin/AdminMenu/AdminMenu";
import VendorMenu from "@/routes/private/vendor/VendorMenu/VendorMenu";
import { useRouter } from "next/navigation";
import Loader from "@/reusableComponents/Loader";
import { Toaster } from "@/reusableComponents/Toaster";

const client = new ApolloClient({
  uri: 'http://localhost:5000/',
  cache: new InMemoryCache(),
});

type State = {
  isLoggedIn: boolean,
  role: String,
  uid: String
  isShowLoader: boolean,
  isShowToaster: boolean

}
type loginAction = {
  type: 'LOGIN';
  payload: any
}
type Action = loginAction;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>)
 {
  // adding useReducer hook
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(appReducer, init)


  const router = useRouter()
  //updating isLoggedIn value in the store so dispatch data to the reducer and that reducer will update isLoggedIn value in Store
  useEffect( () => {

    ( async () => {
      const isLoggedIn = await AppCookie.hasToken();
      const role = await AppCookie.getCookie('role');
      const uid= await AppCookie.getCookie('uid');


      if(!isLoggedIn)
        router.push("/")

        dispatch({
          type: "LOGIN",
          payload: {
            isLoggedIn, 
            role,
            uid
          }
        })
    })()

  }, [])

  const obj: { state: any, dispatch: any } = {
    state,
    dispatch
  }

  return (
    <html lang="en">
      <head>
        <title>Admin-Vendor App</title>
      </head>
      <body >
{/* <AppContextProvider myData={{ state, dispatch }}> {/*by making state and dispatch in one object we can write like below instead of passing state and dispatch separatly*/} 
        <AppContextProvider myData={obj}>
  
          <ApolloProvider client={client}>
            <Header />
           {state?.isLoggedIn && state?.role==="admin" && <AdminMenu />}
           {state?.isLoggedIn && state?.role==="vendor" && <VendorMenu />}
            
            {children}
            <Footer />

           {state?.isShowLoader && <Loader />} 
           {state?.isShowToaster && <Toaster />} 


          </ApolloProvider>,
         
        </AppContextProvider>


      </body>
    </html>
  );
} 
