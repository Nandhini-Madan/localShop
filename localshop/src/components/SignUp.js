import React, { useEffect, useState } from "react";
import * as yup from "yup"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import InputForm from "./InputForm";

const SignUp = () => {
    const navigate=useNavigate();
    const defaultState = {
        name: "",
        email: "",
        password: "",
        roleId:2      
    }
    const formSchema=yup.object().shape({
        name:yup.string().required("Please enter your name").min(2, "This is not your name"),
        password:yup.string().required("Enter your password").min(4,"password must contain atleast 4 characters"),
        email:yup.string().email().required("Enter your email")
      //  terms:yup.boolean().oneOf([true],'Please accept our terms')

    })
    const [formState, setFormState] = useState(defaultState);
    const [error, setError] = useState({ ...defaultState });
    const [disableButton, setDisableButton] = useState(true)

    useEffect(()=>{
        formSchema.isValid(formState)
        .then(valid=>setDisableButton(!valid)   
        )
       
    },[formState,formSchema])

    console.log("Signup Page")
    const inputchange = event => {
        
        
            console.log("input value")
            setFormState(
                {
                    ...formState,[event.target.name]:event.target.value
                }                
            )
            console.log(formState,"prev");
           
        
  
    yup.reach(formSchema,event.target.name)
    .validate(event.target.value)
    .then(
        valid=>{
            setError({...error,[event.target.name]:""})
        }
        
    )
    .catch(
        err=>{
            setError({...error,[event.target.name]:err.errors[0]})
        }
    )
    }
    
    const submitForm=(event)=>{
        console.log("clicked")
        event.preventDefault();
        console.table(formState.roleId)
        axios.post("https://localshop24.herokuapp.com/user/register",formState)
            .then(res=>{
                console.log(res.data.data.roleId);
                if(res.status===201 && res.data.data.roleId===2){
                    console.log("Successfully registered")
                    navigate("/products")
                }
                else{
                    navigate("/AdminPage");
                }

            })
            .catch(err=>{
                console.log("invalid register",err)
            })

    }
    return (
        <div className="container">
            <div className="mt-3">Welcome to Signup page</div>
            <Form onSubmit={submitForm}>
                <InputForm type="text" placeholder="Name" onChange={inputchange} value={formState.name} name="name" label="Name:*" errors={error} />
                <InputForm type="password" placeholder="password" onChange={inputchange} value={formState.password} name="password" label="Password:*" errors={error} />
                <InputForm type="email" placeholder="Email" onChange={inputchange} value={formState.email} name="email" label="Email:*" errors={error} />
                
                <Button disabled={disableButton} variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>
        </div>
    )
}
export default SignUp;