import React from "react";
import { Form } from "react-bootstrap";

const Input = (props) => {
    console.log(props,"pr")

    const errorMessage = props.errors[props.name]
    console.log(errorMessage, "err")

    return (
        <>
            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                <Form.Label>{props.label}</Form.Label>
                <Form.Control type={props.type} placeholder={props.message} defaultValue={props.value} onChange={props.onChange} name={props.name} />
                {
                   <Form.Text className="danger" variant="danger">{errorMessage} </Form.Text>
                }
            </Form.Group>
        </>
    )
}

export default Input;