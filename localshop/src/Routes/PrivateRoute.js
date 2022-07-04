import React from "react";
//import { Component } from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute=({component:Component,...rest})=>{
    return(
        <Route {...rest}
        render={props=>{
            if(localStorage.getItem("token")){
                console.log("Loading Private Route",localStorage.getItem("token"));
                return <Component {...props}/>
            }
            else{
                console.log("redirecting")
                return <Redirect to ="/login"/>
            }
        }}
        />
    
    )
};


export default PrivateRoute;