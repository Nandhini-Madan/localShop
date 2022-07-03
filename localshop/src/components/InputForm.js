import React from "react";

const Input = (props) => {
    const errorMessage = props.errors[props.name]

    return (
        <>
            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                <Form.Label>{props.name}</Form.Label>
                <Form.Control type={props.type} placeholder={props.message} defaultValue={props.value} onChange={props.onChange} name={props.name}/>
                {
                    errorMessage.length != 0 && <Form.Text className="error" variant="danger">{errorMessage} </Form.Text>
                }
            </Form.Group>
        </>
    )
}

export default Input;