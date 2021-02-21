import React from "react";

export const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#343A40",
        textAlign: "center",
        fontSize: "20px",
        paddingTop: "15px",
        height: "60px",
        color: "wheat",
       position:"fixed",
        bottom:"0",
        width:"100%",
        zIndex:"3"
        
        
      }}
    >
      <p>Copyright &copy; {new Date().getFullYear()} Dreamjob.com</p>
    </div>
  );
};
