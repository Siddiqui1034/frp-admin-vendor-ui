"use client"
import { useAppContext } from '@/statemanagement/appContext'
import { useQuery, useLazyQuery } from '@apollo/client'
import React, { useEffect, useRef, useState } from 'react'
import AppTable from '@/reusableComponents/AppTable/AppTable'
import { PRODUCTS_LIST_GQL } from '@/services/graphql/productlistsGQ'
import Button from '@/reusableComponents/inputControls/Button'
import Popup from '@/reusableComponents/Popup'
import config from './configuration.json'
import Input from '@/reusableComponents/inputControls/Input/Input'
import { clearValuesFromForm, fieldValidation, formValidation, setValuesToForm } from '@/services/validations'
import Modal from '@/reusableComponents/Modal'
import { useMutation } from '@apollo/client'
import { SAVE_PRODUCT } from '@/services/graphql/saveProductsGQ'
import { AppCookie } from '@/services/cookies'
import { DELETE_PRODUCT_GQL } from '@/services/graphql/deleteProductsGQ'
import { UPDATE_PRODUCT_GQ } from '@/services/graphql/updateProductsGQ'

const Products = () => {

    const [isShowModal, setIsShowModal] = useState(false)
    const [formControls, setFormControls] = useState(config)
    const [fnGetUsers, { loading, error, data, refetch }] = useLazyQuery(PRODUCTS_LIST_GQL)
    const [saveProduct, { loading: saveProductLoading, error: saveProductError, data: saveProductData }] = useMutation(SAVE_PRODUCT)
    const [deleteProduct] = useMutation(DELETE_PRODUCT_GQL)
    const [updateProduct] = useMutation(UPDATE_PRODUCT_GQ)
    const [isShowPopup, setIsShowPopup] = useState(false)
    const { state, dispatch }: any = useAppContext()

    const deleteIdRef: any = useRef()
    const [isEdit, setIsEdit] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const modifiedRowRef = React.useRef();
    const isSaveRef = React.useRef(true);

    useEffect(() => {
        (async () => {
            const id = await AppCookie.getCookie("id")
            fnGetUsers({
                variables: {
                    "getProductsId": id
                }
            })
        })()
    }, [])

    useEffect(() => {
        // console.log(data?.getProducts);
        dispatch({
            type: "LOADER",
            payload: loading
        })
    }, [loading])

    const handleEdit = (row: any) => {
        // console.log(row)
        // setIsEdit(true)
        isSaveRef.current = false;
        setValuesToForm(formControls, setFormControls, row)
        modifiedRowRef.current = JSON.parse(JSON.stringify(row))
        setIsShowPopup(true)
    }

    const handleDelete = (row: any) => {
        console.log(row)
        // const deleteIdRef.current = row?._id
        setIsShowModal(true)
        modifiedRowRef.current = JSON.parse(JSON.stringify(row))
    }

    /**
     * Handle modal OK and Cancel button clicks 
     * @param opt 
     */

    const modalActions = async (opt: String) => {

        try {
            setIsShowModal(false);
            if (opt === 'O') {
                dispatch({
                    type: "LOADER",
                    payload: true
                })
                const res = await deleteProduct({
                    variables: {
                        "deleteProductId": modifiedRowRef?.current?.['_id'],
                        "path": modifiedRowRef.current?.['path']
                    }
                })

                const { acknowledged, deletedCount } = res?.data?.deleteProduct;
                let isSuccess = acknowledged && deletedCount;
                if (isSuccess) {
                    refetch();
                }
                dispatch({
                    type: "TOASTER",
                    payload: {
                        isShowToaster: true,
                        toasterMessage: isSuccess ? "Successfully deleted" : "Not deleted",
                        toasterBG: isSuccess ? 'green' : 'red'
                    }
                })
            }
        } catch (ex) {
            return ex;
        }
        finally {
            dispatch({
                type: "LOADER",
                payload: false
            })
        }
    }

    const fnAddProduct = () => {
        isSaveRef.current = true;
        clearValuesFromForm(formControls, setFormControls)
        setIsShowPopup(true)
    }

    const closePopup = () => {
        setIsShowPopup(false)
    }

    const handleSaveProduct = async (dataObj: any, id: any) => {
        const res = await saveProduct({
            variables: {
                "file": dataObj.file,
                "product": {
                    "cost": Number(dataObj.cost),
                    "name": dataObj.name,
                    "path": "",
                    "uid": id
                }
            }
        })
        console.log(res);
        const { acknowledged, insertedId } = res?.data?.saveProduct
        return acknowledged && insertedId; 
    }

    const handleUpdateProduct = async ({ file, cost, name }: any) => {
        const res = await updateProduct({
            variables: {
                "file": typeof (file) === 'string' ? null : file,
                "data": {
                    "cost": Number(cost),
                    "name": name,
                    "path": modifiedRowRef.current?.['path'],
                },
                "updateProductId": modifiedRowRef.current?.['_id']
            }
        })
        const { acknowledged, modifiedCount } = res?.data?.updateProduct;
        return acknowledged && modifiedCount;
    }

    const handleSubmit = async () => {
        try {
            const [isFormValid, dataObj] = formValidation(formControls, setFormControls)
            if (!isFormValid) return;
            // console.log(dataObj);
            setIsShowPopup(false) //whenever form valid then close the popup

            dispatch({
                type: "LOADER",
                payload: true
            })

            const uid = await AppCookie.getCookie("id")
            let isSuccess;
            if (isSaveRef.current) {
                isSuccess = await handleSaveProduct(dataObj, uid)
            } else {
                isSuccess = await handleUpdateProduct(dataObj)
            }
            if (isSuccess) {
                refetch();
            }

            dispatch({
                type: "TOASTER",
                payload: {
                    isShowToaster: true,
                    toasterMessage: isSuccess ? "Successfully Inserted" : "Not Inserted",
                    toasterBG: isSuccess ? "green" : "red"
                }
            })
            // }else{     // I don't need another else by isSuccess true or false i can manage message of Toaster one time save successfully not saved successfully
            //     // show a toaster with not saved product message
            // }
        } catch (ex) {
            dispatch({
                type: "TOASTER",
                payload: {
                    isShowToaster: true,
                    toasterMessage: "Oops! Something went wrong",
                    toasterBG: "red"
                }
            })
        } finally {
            dispatch({
                type: "LOADER",
                payload: false
            })
        }
    }

    const handleChange = (eve: any) => {
        fieldValidation(eve, formControls, setFormControls)
    }

    return (
        <div className='container-fluid mt-3'>
            <h3 className='text-center'>Products</h3>

            <Button text="ADD PRODUCT" align="text-end" handleClick={fnAddProduct} bgColor="black" color="white" />

            {data && <AppTable
                headings={["Name", "Cost"]}
                data={[...data?.getProducts]}
                columns={["name", "cost"]}
                isShowDelete={true}
                isShowEdit={true}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                hasImage={true}
                imageHeader={["Photo"]}
                imageColumn={['path']}
            />}

            {
                isShowPopup &&
                <Popup closePopup={closePopup} handleFormSubmit={handleSubmit}>
                    <div className={`mt-5`}>
                        {
                            formControls.map((obj, ind) => {
                                return <Input key={`Input_${ind}`} {...obj} handleChange={handleChange} />
                            })
                        }
                    </div>
                </Popup>
            }
            {isShowModal && <Modal modalActions={modalActions} />}

        </div>
    )
}

export default Products
