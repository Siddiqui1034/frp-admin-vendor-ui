import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination/Pagination'
import styles from './AppTable.module.css'
import { log } from 'console'

type TableProps = {
  headings: string[],
  data: any,
  columns: string[],
  isShowEdit?: boolean,
  isShowDelete?: boolean,
  handleEdit: (data: any) => void,
  handleDelete: (data: any) => void

}

const AppTable = (props: TableProps) => {

  const { headings, data, columns, isShowDelete, isShowEdit, handleDelete, handleEdit } = props
  const [pageNo, setPageNo] = useState(1)
  const [currentData, setCurrentData] = useState([])
  const perPage = 5

  useEffect(() => {
    // console.log(11, data); // my data not going to the server
    // console.log(11, data?.getVendors); // my data not going to the server
    
    const end = pageNo * perPage
    const start = end - perPage;
    setCurrentData(data?.slice(start, end) || [] )
  }, [pageNo])

  return (
    <div className={`table-responsive ${styles.appRootDiv}`}>

      <table className={styles.appTable}>
        <thead>
          <tr>
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
            currentData?.map((object:any, index) => {
              return <tr key={`tr_${index}`}>
                {
                  columns.map((key: any, ind) => {
                    return <td key={`td_${ind}`}> {object[key]} </td>
                  })
                }
                {isShowEdit && <td><i onClick={() => handleEdit(object)} className='bi bi-pencil-fill'></i></td>}
                {isShowDelete && <td><i onClick={() => handleDelete(object)} className='bi bi-trash-fill'></i></td>}
              </tr>
            })
          }
        </tbody>
      </table>
      {/* if data{}  [{}, {}, {}, {}, {}] is more than perpage then only pagination show if you have 14 data and perpage is 10 then u need pagination 1-10 and 11-14  */}
      { data?.length > perPage && <Pagination pageNo={pageNo} setPageNo={setPageNo} totalPages={Math.ceil(data.length / perPage)} />}

    </div>
  )
}

export default AppTable
