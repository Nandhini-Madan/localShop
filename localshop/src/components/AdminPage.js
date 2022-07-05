import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Row, Col, Card, Button } from "react-bootstrap";
import fitness from "../Assests/coming soon.jpg";
import axios from "axios";
const AdminPage = () => {
    let navigate = useNavigate();
    const [products, setProducts] = useState([])
    const getProducts = () => {
        console.log("getProducts admin page");
        axiosWithAuth().get("http://localhost:5000/admin/products")
            .then(res => {
                console.log(res,"getProduct");
                setProducts(res.data.products)
            })
            .catch(err => {
                console.log("Error displaying", err.message);
            })

    }
    const deleteProduct = (id) => {
        const productId = id;
        axiosWithAuth().delete('http://localhost:5000/admin/product/:id', productId)
            .then(res => {
                if (res.status == 200) {
                getProducts();
                }
                else{
                    console.log("product not deleted");
                }
            })
            .catch((err)=>{
                console.log("Error")
            })
    }
    const editProduct=(id)=>{
        const productId=id;
        navigate('/editPage',{state:{productId:productId}})

    }
    useEffect(() => {
        getProducts();
    }, [])
    return (
        <>

            <Row xs={1} md={2} className="g-4">
                {products.map(((products) => (
                    <Col key={products.productId} >
                        <Card>
                            <Card.Img variant="top" src={fitness} />
                            <Card.Body>
                                <Card.Title>Name:{products.name}</Card.Title>
                                <Card.Text>Type:{products.description}</Card.Text>
                                <Card.Text>Intensity:{products.price}</Card.Text>


                                <Button variant="primary" className="danger" onClick={deleteProduct.bind(this, products.productId)}> Delete</Button>
                                <Button variant="primary" className="primary" onClick={editProduct.bind(this, products.productId)}> Edit</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )))}
            </Row>

        </>
    )

}
export default AdminPage;

