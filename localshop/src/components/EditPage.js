import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import {Form,Button} from "react-bootstrap";
import InputForm from "./InputForm";
const EditPage = (props) => {
    console.log("Edit page")
    const location = useLocation();
    const navigate=useNavigate();
    console.log("edit page",location)
    console.log(location.state.productId,"naviga")
    const productId=location.state.productId;
    console.log("prId",productId)
    const defaultState = {
        productName: "",
        productDescription: "",
        price: ""
    }
    const [formState, setFormState] = useState([defaultState])
    const [error] = useState({ ...defaultState })

    useEffect(() => {
        axiosWithAuth().get(`http://localhost:5000/admin/product/${productId}`)
            .then(res => {
                console.log(res.data.data, "axios, edit, get")
                setFormState(res.data.data)
            })
            .catch(err => {
                console.log("Error while retireving id", err)
            })
    },[productId])
  

const inputchange = event => {
    if(event.target.name==="price"){
        setFormState({
            ...formState, [event.target.name]: parseFloat(event.target.value)
    })
    }
    else{
        setFormState({
            ...formState, [event.target.name]: event.target.value
    }) 
    }
    
}
const backToProduct=()=>{
    navigate("/adminPage")
}
const submitForm = () => {
    //  event.preventDefault();
    console.log("update", formState,"id",productId)
    axiosWithAuth().put(`http://localhost:5000/admin/product/${productId}`, formState)
        .then(res => {
            console.log("Result update", res.data.data)
            navigate('/adminPage');
        })
        .catch(err => {
            console.log("error", err)
        })
}
return (
    <>
        <h2>Edit Product Details </h2>
        <Form onSubmit={submitForm}>
            <InputForm type="text" placeholder={formState.productName} onChange={inputchange} value={formState.productName} name="productName" label="productName" errors={error} />
            <InputForm type="text" placeholder={formState.productDescription} onChange={inputchange} value={formState.productDescription} name="productDescription" label="productDescription" errors={error} />
            <InputForm type="text" placeholder={formState.price} onChange={inputchange} value={formState.price} name="price" label="price" errors={error} />
            <Button onClick={submitForm}  >Update</Button>
            <Button onClick={backToProduct} >product</Button>

        </Form>
    </>

)

}
export default EditPage;