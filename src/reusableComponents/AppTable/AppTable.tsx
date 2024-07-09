import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination/Pagination'
import styles from './AppTable.module.css'
import { log } from 'console'
import Image from 'next/image'

type TableProps = {
  headings: string[],
  data: any,
  columns: string[],
  isShowEdit?: boolean,
  isShowDelete?: boolean,
  handleEdit: (data: any) => void,
  handleDelete: (data: any) => void
  hasImage?:boolean,
  imageHeader?:any,
  imageColumn?: any

}

const AppTable = (props: TableProps) => {

  const {hasImage, imageHeader, imageColumn, headings, data, columns, isShowDelete, isShowEdit, handleDelete, handleEdit } = props
  const [pageNo, setPageNo] = useState(1)
  const [currentData, setCurrentData] = useState([])
  const perPage = 5

  useEffect(() => {
    // console.log(11, data); // my data not going to the server
    // console.log(11, data?.getVendors); // my data not going to the server
    
    const end = pageNo * perPage
    const start = end - perPage;
    setCurrentData(data?.slice(start, end) || [] )
  }, [pageNo, data])

  return (
    <div className={`table-responsive ${styles.appRootDiv}`}>

      <table className={styles.appTable}>
        <thead>
          <tr>
            {
              hasImage && imageHeader.map( (image:any, index:number) =>{
                return <th key={`th_${index}`}>{image}</th>
              })
            }
            {
              headings.map((value, index) => {
                return <th key={`th_${index}`}>{value}</th>
              })
            }
            {isShowEdit && <th>Edit</th>}
            {isShowDelete && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          { 
          currentData.length > 0 
            ?
            currentData?.map((obj:any, index) => {
              return <tr key={`tr_${index}`}>
                {
                  hasImage && imageColumn.map( (key:any, ind:any) =>{
                    return <td key={`td_${ind}`}><Image alt='image' width={100} height={100} src={`http://localhost:4000/${obj[key]}?${new Date().getTime()}`}/></td>
                  })
                }
                {
                  columns.map((key: any, ind) => {
                    return <td key={`td_${ind}`}> {obj[key]} </td>
                  })
                }
                {isShowEdit && <td><i onClick={() => handleEdit(obj)} className='bi bi-pencil-fill'></i></td>}
                {isShowDelete && <td><i onClick={() => handleDelete(obj)} className='bi bi-trash-fill'></i></td>}
              </tr>
            })
            :
            <tr><td colSpan={columns.length+2} className='text-center'> No Record Found </td></tr>
          }
        </tbody>
      </table>
      {/* if data{}  [{}, {}, {}, {}, {}] is more than perpage then only pagination show if you have 14 data and perpage is 10 then u need pagination 1-10 and 11-14  */}
      { data?.length > perPage && <Pagination pageNo={pageNo} setPageNo={setPageNo} totalPages={Math.ceil(data.length / perPage)} />}

    </div>
  )
}

export default AppTable
