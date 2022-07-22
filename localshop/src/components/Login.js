import axios from "axios";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Form, Button } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import InputForm from "../components/InputForm";
import '../App.css';



const Login = (props) => {
    const navigate=useNavigate();
    const defaultState = {
        email: "",
        password: ""
    }
    const [error, setError] = useState({ ...defaultState });
    const [loginState, setLoginState] = useState(defaultState);
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const formSchema = yup.object().shape({
        email: yup.string().email().required('Email is required'),
        password: yup.string().required("password is required")
    })
    useEffect(() => {
        console.log("login");
        if (loginState.email && loginState.password) {
            setButtonDisabled(false)
        }
        else if (loginState.email || loginState.password) {
            setButtonDisabled(true)
        }

    }, [loginState, formSchema])
const loginSubmit=(e)=>{
    e.preventDefault();
    console.log("login",loginState);
    axios.post('https://localshop24.herokuapp.com/user/login',loginState)
    .then(res=>{
        console.log("login",res.data.token)
        localStorage.setItem('token',res.data.token);
      //  props.setLoggedIn(res.data.token);
      console.log("cust",res.data.role)
        if(res.data.role==="Admin"){
         //   navigate("/products")
         navigate("/adminPage")
        }
       
    })
    .catch(err=>{
        console.log("Login failed",err)    
    })
}
const inputchange=(e)=>{
    console.log("login")
    const value=e.target.value;
    yup.reach(formSchema,e.target.name)
        .validate(value)
        .then(valid=>{
            setError({...Error,[e.target.name]:""})
        })
        .catch(
            err=>{
                setError({
                    ...Error,[e.target.name]:err.errors[0]
                })
            }
        )
        setLoginState({
            ...loginState,
            [e.target.name]:e.target.value
        })

}
    return (
        <div className="container mt-3">
            <>Welcome to Login Page</>
            <Form onSubmit={loginSubmit}>
                <InputForm type="email" placeholder="Email" onChange={inputchange} value={loginState.email} name="email" label="Email:*" errors={error} />
                <InputForm type="password" placeholder="password" onChange={inputchange} value={loginState.password} name="password" label="Password:*" errors={error} />
                <Button variant="primary" type="submit" disabled={buttonDisabled}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}
export default Login;