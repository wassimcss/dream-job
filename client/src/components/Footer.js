import React from "react";

export const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#007BFF",
        textAlign: "center",
        fontSize: "20px",
        paddingTop: "15px",
        height: "60px",
        color: "wheat",
       position:"relative",
        bottom:"0",
        width:"100%",
        zIndex:"3"
        
        
      }}
    >
      <p>Copyright &copy; {new Date().getFullYear()} Dreamjob.com</p>
    </div>
  );
};
