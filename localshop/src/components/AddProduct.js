import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import InputForm from "./InputForm";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const AddProduct = () => {
    const navigate = useNavigate();
    const defaultState = {
        productName: "",
        productDescription: "",
        price: 0.0
    }
    // const formSchema = yup.object().shape({
    //     name: yup.string().required("Please enter Product Name").min(2, "This is not your product name"),
    //     description: yup.string().required("Please enter Product description").min(2, "This is not your product description"),
    //     price: yup.notrequired()
    //     //  terms:yup.boolean().oneOf([true],'Please accept our terms')

    // })
    const [formState, setFormState] = useState(defaultState);
    const [error, setError] = useState({ ...defaultState });
    //const [disableButton, setDisableButton] = useState(true)

    useEffect(() => {

        console.log("formstate")
    }, [formState])

    console.log("Signup Page")
    const inputchange = event => {


        console.log("input value")
        setFormState(
            {
                ...formState, [event.target.name]: event.target.value
            }
        )
        console.log(formState, "prev");

        {/**  yup.reach(formSchema,event.target.name)
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
    )*/}
    }

    const submitForm = (event) => {
        console.log("clicked")
        event.preventDefault();
        console.table(formState)
        axiosWithAuth().post("http://localhost:5000/admin/product", formState)
            .then(res => {
                if (res.status == 201) {
                    navigate("/AdminPage");
                }
            })
            .catch(err => {
                console.log("invalid register", err)
            })

    }
    return (
        <div className="container">
            <div className="mt-3">Welcome to Add product page</div>
            <Form onSubmit={submitForm}>
                <InputForm type="text" placeholder={formState.productName} onChange={inputchange} value={formState.name} name="productName" label="productName" errors={error} />
                <InputForm type="text" placeholder={formState.description} onChange={inputchange} value={formState.description} name="productDescription" label="productDescription" errors={error} />
                <InputForm type="text" placeholder={formState.price} onChange={inputchange} value={parseFloat(formState.price)} name="price" label="price" errors={error} />

                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>
        </div>
    )
}
export default AddProduct;