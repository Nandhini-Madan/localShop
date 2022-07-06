import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Row, Col, Card, Button } from "react-bootstrap";
import fitness from "../Assests/coming soon.jpg";

const AdminPage = () => {
    let navigate = useNavigate();
    const [products, setProducts] = useState([])
    const getProducts = () => {
        console.log("getProducts admin page");
        axiosWithAuth().get("http://localhost:5000/admin/products")
            .then(res => {
                console.log(res,"getProduct");
                setProducts(res.data.data)
            })
            .catch(err => {
                console.log("Error displaying", err.message);
            })

    }
    const deleteProduct = (id) => {
        const productId = id;
        console.log(productId,"del1")
        axiosWithAuth().delete(`http://localhost:5000/admin/product/${productId}` )
            .then(res => {
                if (res.status ===200) {
                getProducts();
                }
                else{
                    console.log("product not deleted");
                }
            })
            .catch((err)=>{
                console.log("Error",err.message)
            })
    }
    const editProduct=(id)=>{
        const productId=id;
        console.log(productId,"editProduct")

        navigate('/editPage',{state:{productId:productId}})

    }
    const addProduct=()=>{
        navigate("/addProduct");

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
                            <Card.Img variant="top" src={fitness} alt={products.productName} />
                            <Card.Body>
                                <Card.Title>Name:{products.productName}</Card.Title>
                                <Card.Text>Description:{products.productDescription}</Card.Text>
                                <Card.Text>price:{products.price}</Card.Text>
                                <div className="d-grid gap-2 d-md-block">
                                <Button type="button" className=" btn g-col-4" variant="primary"  onClick={deleteProduct.bind(this, products.productId)}> Delete</Button>
                                <Button type="button" className="btn g-col-4" variant="primary" onClick={editProduct.bind(this, products.productId)}> Edit</Button>
                                </div>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                )))}
                
            </Row>
            <Button variant="primary" className="primary" onClick={addProduct}> Add</Button>
        </>
    )

}
export default React.memo(AdminPage);

