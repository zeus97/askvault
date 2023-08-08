import React from 'react'
import "@/styles/Pagination.scss"

interface Props{
    paginationLength:number,
    currentPage:number,
    nextPage: () => void,
    previousPage: () => void,
    setPage: (page:number) => void
}

function Pagination({paginationLength,currentPage,nextPage,previousPage,setPage}:Props) {

    const arrayLength = [...Array(paginationLength)]
    
    if (paginationLength <= 1){
        return null
    };
    

  return (
    <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
            <li className="page-item"
            onClick={previousPage}
            style={{cursor:"pointer"}}>
                <a className="page-link"  aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            {arrayLength.map((e,i)=>{
                const page = i+1;
                return (
                    <li className="page-item"
                    style={{cursor:"pointer"}}
                     key={i}
                     onClick={()=>{setPage(page)}}>
                        <a className={currentPage === page ? "page-link active" : "page-link"}>
                            {page}
                        </a>
                    </li>

                )
            })

            }
            <li className="page-item"
            onClick={nextPage}
            style={{cursor:"pointer"}}>
                <a className="page-link"  aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
  )
}

export default Pagination