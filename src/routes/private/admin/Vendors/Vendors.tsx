"use client"

import React, { useRef, useEffect, useState } from 'react'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { useAppContext } from '@/statemanagement/appContext'
import AppTable from '@/reusableComponents/AppTable/AppTable'
import Button from '@/reusableComponents/inputControls/Button'
import styles from './Vendors.module.css'
import config from './configuration.json'
import Input from '@/reusableComponents/inputControls/Input/Input'
import TextArea from '@/reusableComponents/inputControls/TextArea/TextArea'
import { clearValuesFromForm, fieldValidation, formValidation, setValuesToForm } from '@/services/validations'
import Modal from '@/reusableComponents/Modal'
import Popup from '@/reusableComponents/Popup'
import { VENDORS_LIST_GQ } from '@/services/graphql/vendorlistgql'
import { REGISTER_VENDOR_GQ } from '@/services/graphql/registergql'
import { UPDATE_VENDOR_GQ } from '@/services/graphql/updateVendorGQ'
import { DELETE_VENDOR_GQ } from '@/services/graphql/deleteVendorGQ'

export const Vendors = () => {

  /**  * Create State Variables  */
  const [formControls, setFormControls] = useState(config) //through formControl we update here configuration.json value so we pass it to one functionality inside validations.ts in services folder we will create setValueToForm and ClearValuesFromForm functionality inside Validations.ts
  const [isShowPopup, setShowPopup] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)
  const idRef = useRef()

  /**   * Define GQL Queries   */
  const { loading, error, data, refetch } = useQuery(VENDORS_LIST_GQ)
  // const [fnGetVendorsList, {loading, error, data}] = useLazyQuery(VENDORS_LIST_GQ)
  // console.log(11, data); // my data not going to the server
  // i want 1st time load and again when register successfully register then again it should load and display in table form so useLazyQuery is equal to mutation

  /**   * Define GQL Mutations   */
  const [regVendor] = useMutation(REGISTER_VENDOR_GQ)  // useMutation returns a function and an object with data you are updating or inserting, deleting
  const [updateVendor] = useMutation(UPDATE_VENDOR_GQ)
  const [deleteVendor] = useMutation(DELETE_VENDOR_GQ)

  /**   * Consuming Context Data   */
  const { dispatch }: any = useAppContext()

  /**
   * handle useEffect on loading property value change 
   * on loading you are sending data and receiving data if it having error then error 
   */
  useEffect(() => {
    dispatch({
      type: "LOADER",
      payload: loading
    })
  }, [loading])

  /**   * Show Popup on    */
  const handleClick = () => {
    setShowPopup(true)
  }

  /**   * Close Popup    */
  const closePopup = () => {
    clearValuesFromForm(formControls, setFormControls)
    setShowPopup(false)
    setIsEdit(false)
  }

  /**
   * Handle form input controls changes
   * @param eve 
   */
  const handleChange = (eve: any) => {
    fieldValidation(eve, formControls, setFormControls)
  }

  
  /**
   * Handle Update functionality 78-115
   */

  const fnUpdateVendor = async (dataObj: any) => {
    try {
      const result = await updateVendor({
        variables: {
          "data": dataObj,
          updateVendorId: idRef.current
        }
      })
      const { acknowledged, modifiedCount } = result?.data?.updateVendor;
      let toasterMessage = "Successfully updated"
      let toasterBG = "green";
      if (!acknowledged || !modifiedCount) {
        toasterMessage = "Not Updated"
        toasterBG = "red";
      } else {
        refetch();
      }
      dispatch({
        type: "TOASTER",
        payload: {
          isShowToaster: true,
          toasterMessage: toasterMessage,
          toasterBG: toasterBG
        }
      })
    } catch (ex) {

    } finally {
      dispatch({
        type: "LOADER",
        payload: false
      })
    }
  }

  /**
   * handleRegisterVendor functionality
   * whenever u want to register anything you need to give some data with that mutation with that it register with that data only, now how to pass data to the mutation we can pass data as an object

  * fnName({
   *  variables: {
   *    "data": {                          // i have data with me in variable dataObj so i write line 105-110 "data" : dataObj  * 
   *        "address": "MarianaTrench",
   *        "password": "123456",
   *        "phone": "1234567890", 
   *        "uid": "v1@gmail.com" 
   *        }  
   *  },
   * })
   */

  const fnRegVendor = async (dataObj: any) => {
    try {
      const result = await regVendor({  // apolloClient return data as a promise 
        variables: {
          "data": dataObj
        }
      })
      // console.log(11, result)
      // now when there is successfully register vendor then result is *****data: {registerVendor: {acknowledge: true, insertedId: "--------------"}}
      // now we show toaster to let the admin know that he successfully register vendor
      const { acknowledged, insertedId } = result?.data?.registerVendor;
      let toasterMessage = "Successfully registered"
      let toasterBG = "green"
      if (!acknowledged || !insertedId) {
        toasterMessage = "Not Registered"
        toasterBG = "red"
      }
      dispatch({
        type: "TOASTER",
        payload: {
          isShowToaster: true,
          toasterMessage: toasterMessage,
          toasterBG: toasterBG
        }
      })
      refetch();
    } catch (e) {

    } finally {
      dispatch({
        type: "LOADER",
        payload: false
      })
    }
  }



  /**
   * handle Form Submit
   * @returns 
   */

  const handleFormSubmit = async () => {

    try {
      const [isFormValid, dataObj] = formValidation(formControls, setFormControls)
      // console.log(dataObj); // when form submitted the data u passed ll be shown in log wht u wrote in form popup
      if (!isFormValid) return;
      setShowPopup(false)

      dispatch({
        type: "LOADER",
        payload: true
      })
      /** when form submitted you have to call Mutation //how to access Mutation which libr applol client useQuery useLazyQuery useMutation
       *  useMutation is a hook returns a function and an object equal to useQuery only. 
       *  console.log(dataObj);
       * alert("clicked on submit button of popup")
       */
    
      if (isEdit) {
        fnUpdateVendor(dataObj)
      } else {
        fnRegVendor(dataObj)
      }
    } catch (exeception) {

    }
    finally {
      dispatch({
        type: "LOADER",
        payload: false
      })
    }
  }

  
  /**
   * Handle edit button click inside the Vendors table 
   * @param data row object
   */
  const handleEdit = (data: any) => {
    
    // {__typename: 'Vendor', _id: '666678685bd495f83ae0ffda', uid: '1', password: '1', address: '1', …}
    // console.log(data); // this form data you need to maintain in configuration.json value keys in fromControls you need to update config "value" by setFormControls function in useState 
    
    idRef.current = data._id
    setIsEdit(true)
    setValuesToForm(formControls, setFormControls, data)
    setShowPopup(true)
  }

    /**
    * Handle Delete button click inside the Vendors table 
    * @param data row object
    */
  const handleDelete = (data: any) => {
    idRef.current = data._id
    setIsShowModal(true)
  }

  /**
   * Handle modal OK and Cancel button clicks 
   * @param opt modal action 
   */
  const modalActions = async (opt: string) => {
    setIsShowModal(false)
    if (opt === 'O') {
      // alert("OK")
      dispatch({
        type: "LOADER",
        payload: true
      })
      try {
        const result = await deleteVendor({
          variables: {
            deleteVendorId: idRef.current
          }
        })
        const { acknowledged, deleteCount } = result?.data?.deleteVendor;
        let toasterMessage = "Successfully Deleted"
        let toasterBG = "green";
        if (!acknowledged || !deleteCount) {
          toasterMessage = "Not Deleted"
          toasterBG = 'red';
        } else {
          refetch();
        }
        dispatch({
          type: "TOASTER",
          payload: {
            isShowToaster: true,
            toasterMessage: toasterMessage,
            toasterBG: toasterBG
          }
        })

      } catch (ex) {

      } finally {
        dispatch({
          type: "LOADER",
          payload: false
        })
      }
    }
  }

  return (
    <div>
      <h4 className={`my-4 text-center`}>Vendors</h4>

      <div className='text-end me-3 '>
        <Button align='text-end' text={"Add Vendor"} handleClick={handleClick} bgColor={"black"} color={"white"} />
      </div>

      { data && <AppTable handleEdit={handleEdit} handleDelete={handleDelete} isShowDelete={true} isShowEdit={true} headings={["id", "User Id", "Password", "Contact", "Address"]} data={data?.getVendors} columns={["_id", "uid", "password", "phone", "address"]} />}

      {isShowPopup && <Popup closePopup={closePopup} handleFormSubmit={handleFormSubmit} >

        <div className={`mt-5`}>
          {
            formControls.map((obj, index) => {
              switch (obj.tag) {
                case "input":
                  return <Input key={`input_${index}`} {...obj} handleChange={handleChange} />

                case "textarea":
                  return <TextArea key={`input_${index}`} {...obj} handleChange={handleChange} />

                case "default":
                  return <div></div>
              }
            })
          }
        </div>
      </Popup>
      }
      {isShowModal && <Modal modalActions={modalActions} />}
    </div>
  )
}


