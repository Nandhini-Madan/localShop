//add product to cart 
// view product from 
const express = require('express');
const router = express.Router();
const db = require("../models/all_model")


router.get("/products", (req, res) => {
    // let userId = req.jwt.userId;
    let user = db.getProducts()
        .then((products) => {
            console.log("product listshj", products[0])
            if (products) {
                res.status(200).json({ data: products, message: "product list" })
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Error while retrieving data", err })
        })
})