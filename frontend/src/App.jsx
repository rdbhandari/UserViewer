import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "./userSlice";
import Spinner from "./components/Spinner";
import Pagination from "./components/Pagination";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [query, setQuery] = useState("")
  const [sortBy, setSortBy] = useState('id')
  const [orderBy, setOrderBy] = useState('asc')

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserData({ currentPage, limit, query, sortBy, orderBy}));
  }, [dispatch, currentPage]);
  const data = useSelector((state) => state.user.userdata);
  const loading = useSelector((state) => state.user.isLoading);
  const totalCount = useSelector((state) => state.user.totalCount);

  if (loading) return <Spinner />;
  else
    return (
      <div className="container">
        <div
          className="accordion accordion-flush m-5 border p-3 bg-light"
          id="user-accordion"
        >
          <form
            class="d-flex flex-sm-row flex-column"
            role="search"
            onSubmit={handleSearch}
          >
            <input
              class="form-control me-2 my-2"
              type="search"
              placeholder="Search Anything"
              aria-label="Search"
              name="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-success mx-sm-2 my-2">
              Search
            </button>
            <button
              className="btn btn-danger mx-sm-2 my-2"
              onClick={handleReset}
            >
              Reset
            </button>
          </form>
          <div className="d-flex justify-content-end align-items-center flex-sm-row flex-column ">
            <span>Sort By</span>
            <select class="form-select form-select-sm my-2 mx-sm-2 w-auto" value={sortBy} onChange={handleSortBy}>
              <option value="id">ID</option>
              <option value="name">Name</option>
              <option value="username">Username</option>
            </select> 
            <span>Order By</span>
            <select class="form-select form-select-sm my-2 mx-sm-2 w-auto" value={orderBy} onChange={handleOrderBy}>
              <option value="asc">Ascending </option>
              <option value="desc">Descending </option>
            </select>
          </div>
          <div>
            {totalCount === 0 ? (
              <h2 className="text-center my-3">NO DATA FOUND</h2>
            ) : (
              data.map((val) => (
                <div className="accordion-item my-2 rounded-3" key={val.id}>
                  <div className="accordion-header">
                    <div className="d-flex flex-md-row flex-column  justify-content-between align-items-center p-3 bg-white mb-2">
                      <div className="">{val.username}</div>
                      <div className="text-center">
                        <p className="fw-bold">CONTACT</p>
                        {val.name}
                      </div>
                      <div className="text-center">
                        <p className="fw-bold">CITY</p>
                        {val.address.city}
                      </div>
                      <div className="text-center">
                        <p className="fw-bold">STREET</p>
                        {val.address.street}
                      </div>
                      <div className="">
                        <button
                          type="button"
                          className="btn btn-sm btn-danger rounded-pill"
                          typeof="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#accordion-body-${val.id}`}
                          aria-expanded="false"
                          aria-controls={`accordion-body-${val.id}`}
                          onClick={(e) => {
                            e.target.innerHTML = e.target.classList.contains(
                              "collapsed"
                            )
                              ? "View Details"
                              : "Hide Details";
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    id={`accordion-body-${val.id}`}
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body border rounded-3 m-5 p-5">
                      <p className="fw-bold">Description</p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quisquam id facilis illum dicta qui! Provident dolores
                      vitae quis vero, facere mollitia? Explicabo libero non
                      praesentium qui quaerat ex ipsam similique!
                      <div className="d-flex justify-content-start flex-md-row flex-column mt-3">
                        <div className="me-5">
                          <p className="fw-bold">Contact Person</p>
                          {val.name}
                          <p className="fw-bold">Email</p>
                          {val.email}
                          <p className="fw-bold">Designation</p>
                          {val.company.bs}
                          <p className="fw-bold">Phones</p>
                          {val.phone}
                        </div>
                        <div>
                          <p className="fw-bold">Street</p>
                          {val.address.street}
                          <p className="fw-bold">City</p>
                          {val.address.city}
                          <p className="fw-bold">Suite</p>
                          {val.address.suite}
                          <p className="fw-bold">Zipcode</p>
                          {val.address.zipcode}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            <Pagination
              totalCount={totalCount}
              limit={limit}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    );
  
  function handleSortBy(e){
    setSortBy(e.target.value)
    setCurrentPage(1);
    dispatch(fetchUserData({ currentPage: 1, limit, query, sortBy:e.target.value, orderBy }));
  }
  function handleOrderBy(e){
    setOrderBy(e.target.value)
    setCurrentPage(1);
    dispatch(fetchUserData({ currentPage: 1, limit, query, sortBy, orderBy:e.target.value}));
  }
  function handleSearch(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(fetchUserData({ currentPage: 1, limit, query, sortBy, orderBy }));
  }
  function handleReset(e) {
    e.preventDefault();
    setCurrentPage(1);
    setQuery("");
    setOrderBy('asc')
    setSortBy('id')

    dispatch(fetchUserData({ currentPage: 1, limit, query: "", sortBy:"id", orderBy:"asc" }));
  }
}
