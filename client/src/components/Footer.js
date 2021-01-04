import React from 'react'

export const Footer = () => {
    return (
        <div style={{backgroundColor:"#343A40",textAlign:"center",fontSize:"20px",paddingTop:"15px" , height:"60px",color:"wheat"}}>
            <p>Copyright &copy; {new Date().getFullYear()}  Dreamjob.com</p>
        </div>
    )
}
