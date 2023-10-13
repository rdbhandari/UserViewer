import React from 'react'

export default function Pagination(props) {
  return (
    <nav>
            <ul className="pagination justify-content-end">
              {[...Array(Math.ceil(props.totalCount / props.limit)).keys()].map((val) => (
                <li
                  className={`page-item ${
                    props.currentPage === val + 1 ? "active" : ""
                  }`} key={val + 1}
                >
                  <a
                    className="page-link"
                    onClick={() => {
                        props.setCurrentPage(val + 1);
                    }}
                  >
                    {val + 1}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
  )
}
