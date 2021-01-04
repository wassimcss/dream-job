import React from 'react'

import { Footer } from '../components/Footer'
import { NavbarPage } from '../components/NavbarPage'

export const Home = () => {
    return (
        <div>
           <NavbarPage/>
            <div className="welcome">
                <h1>Find your dream job and your dream employee</h1>
                <p style={{ fontSize: "20px" }}>Easy,Simple and efficient</p>
            </div>
            <div className="container">
                <h1 style={{ textAlign: "center", marginTop: "60px", marginBottom: "40px" }}>Job category</h1>
                <div className="row">
                    <div className="col-sm-3 block ">
                        <img className="img" src="https://i.ibb.co/mFgWn9b/Administration.png" alt="commerce" />
                        <p className="exp">Commerce</p>
                    </div>
                    <div className="col-sm-3 block ">
                        <img  className="img" src="https://i.ibb.co/ZzB5DY4/Informatique.pnghttps://i.ibb.co/ZzB5DY4/Informatique.png" alt="informatique" />
                        <p className="exp">IT and technolgie</p>
                    </div>
                    <div className="col-sm-3 block ">
                        <img  className="img" src="https://i.ibb.co/0VRzvR1/Finance.png" alt="finance" />
                        <p className="exp">Finance</p>
                    </div>
                    <div className="col-sm-3 block  ">
                        <img className="img" src="https://i.ibb.co/xFQssWR/balance-sheet.png" alt="service and logistic" />
                        <p className="exp">Service and logistic</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3 block ">
                        <img className="img" src="https://i.ibb.co/rcXTrxd/Industrie.pnghttps://i.ibb.co/rcXTrxd/Industrie.png" alt="Industrie" />
                        <p className="exp">Industrie</p>
                    </div>
                    <div className="col-sm-3 block ">
                        <img className="img" src="https://i.ibb.co/tQ1mWS4/Sante.png" alt="enviorment" />
                        <p className="exp">Environment</p>
                    </div>
                    <div className="col-sm-3 block ">
                        <img className="img" src="https://i.ibb.co/pvWY5HR/Education.png" alt="education" />
                        <p className="exp">Education</p>
                    </div>
                    <div className="col-sm-3 block ">
                        <img className="img" src="https://i.ibb.co/6F9XbBk/Immobilier.png" alt="civil" />
                        <p className="exp">Civil</p>
                    </div>
                </div>
            </div>
            <div className="about">
                <h1 style={{ marginBottom: "50px" }} >About us</h1>
                <p>
                    Dream is the #1 job site in tunisia with over 2 million unique visitors2 every month. Dreajob strives to put job seekers first, giving them free access to search for jobs, post resumes, and research companies. Every day, we connect millions of people to new opportunities.
                </p>
            </div>
            <img src="https://www.indeed.com/about/imgs/header-image.jpg" style={{ width: "100%", height: "400px" }} alt="" />
            <div className="about">
                <h1 style={{ marginBottom: "50px" }}>Our people</h1>
                <p>
                    At Dreamjob, our mission is to help people get jobs. We have more than 10,000 global employees passionately pursuing this purpose and improving the recruitment journey through real stories and data. We foster a collaborative workplace that strives to create the best experience for job seekers.
                </p>
            </div>
            <img style={{ width: "100%", height: "300px" }} src="https://thumbs.dreamstime.com/b/find-your-dream-job-business-concept-find-your-dream-job-business-concept-155561993.jpg" alt=""/>
            <h1 style={{textAlign:'center', marginBottom: "50px",marginTop: "50px" }}>How it works</h1>
            <div style={{ display: "flex", justifyContent: "space-around",marginRight:"150px", width:"1100px",marginLeft:"100px" }}>
                
                <div style={{ display: "flex", justifyContent: "space-between", width:"500px" }}>
                    <img src="https://www.meteojob.com/sites/cms.meteojob.com/themes/meteojob/assets/images/_/picto-CV-upload.png" style={{ width: "80px", height: "80px" }} alt="" />
                    <div>
                        <h1 style={{fontSize:"20px"}}>Publish your CV on our CV-library</h1>
                        <p>Publish your CV ,Be visible to recruiters by posting your CV on our CV-library</p>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", width:"500px",marginBottom:"70px" }}>
                    <img src="https://www.meteojob.com/sites/cms.meteojob.com/themes/meteojob/assets/images/_/picto-CV-check.png" style={{ width: "80px", height: "80px" }} alt="" />
                    <div >
                        <h1 style={{fontSize:"20px"}}>Apply for your job</h1>
                        <p>Discover all information about companies and their needs</p>
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    )
}
