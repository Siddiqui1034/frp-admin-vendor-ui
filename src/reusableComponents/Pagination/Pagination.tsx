import React, { useRef } from 'react'

const Pagination = ({ setPageNo, pageNo, totalPages }: any) => {

  const gotoInputRef: any = useRef()

  const handlePagination = (action: String) => {

    if (gotoInputRef.current.value > totalPages) return;

    switch (action) {
      case 'GO':
        if (gotoInputRef.current.value > totalPages) return;
        setPageNo(Number(gotoInputRef.current.value));
        break;
      case 'Prev':
        setPageNo(pageNo - 1);
        break;
      case 'Next':
        setPageNo(pageNo + 1);
        break;
    }
  }

  return (
    // with container fluid scroll will not appear
    <div className='row container-fluid my-3'>

      <div className='col-4 col-sm-4'>
        <input ref={gotoInputRef} /><button onClick={() => handlePagination("GO")}>Go</button>
      </div>

      <div className='col-4 col-sm-4 text-center'>
        <button disabled={pageNo == 1} onClick={() => handlePagination("Prev")}>Prev</button>
        {pageNo}
        <button disabled={pageNo == totalPages} onClick={() => handlePagination("Next")}>Next</button>
      </div>

      <div className='col-4 col-sm-4 text-end'>
        Total Page:{totalPages}
      </div>



    </div>
  )
}

export default Pagination
