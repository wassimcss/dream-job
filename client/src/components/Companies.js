import React, { useEffect, useState } from "react";
import { load_companies } from "../actions/companiesActions";
import { Footer } from "./Footer";
import { NavbarPage } from "./NavbarPage";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import { Spinner } from "react-bootstrap";

export const Companies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load_companies());
  }, [dispatch]);
  const companies = useSelector((state) => state.companyReducer.companies);
  const [currentPage, setCurrentPage] = useState(1);
  const [companyPerPage] = useState(3);
  //Get current employees
  const indexOfLastJob = currentPage * companyPerPage;
  const indexOfFirstJob = indexOfLastJob - companyPerPage;
  const curr_companies = companies.slice(indexOfFirstJob, indexOfLastJob);
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const loading = useSelector((state) => state.companyReducer.loading);
  return (
    <div>
      <NavbarPage />
      {loading ? (
        <Spinner
          style={{marginLeft:"25rem",marginTop:"2rem"}}
          animation="border"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <>
          <div>
            {curr_companies.map((company) => {
              return (
                <div key={company._id}>
                  <div className="container mt-5">
                    <div className="profile">
                      <div className="col-md-4 leftpart">
                        <div className="left-det">
                          <img
                            className="profileImg"
                            src="https://image.shutterstock.com/image-photo/small-modern-office-building-260nw-460660771.jpg"
                            alt=""
                          />
                          <h4>
                            <br />
                            {company.name}{" "}
                          </h4>
                        </div>
                      </div>
                      <div>
                        <h6>Information</h6>
                        <div className="info">
                          <div className="col-lg-9">
                            <b>Email : </b>
                            <br />
                            {company.email}
                          </div>
                          <div className="col-lg-6">
                            <b>field : </b>
                            <br />
                            {company.field}
                          </div>
                        </div>
                        <h6>Contact</h6>
                        <div className="info">
                          <div className="col-md-9">
                            <b>Phone : </b>
                            <br />
                            {company.phone}
                          </div>
                          <div className="col-md-9">
                            <b>Address : </b> <br />
                            {company.address}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination
            paginate={paginate}
            itemPerPage={companyPerPage}
            totalitems={companies.length}
            currentPage={currentPage}
          />
        </>
      )}

      <Footer />
    </div>
  );
};
