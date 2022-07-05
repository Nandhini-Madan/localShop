// create 
// Read 
//up
// delete
const express = require('express');
const router = express.Router();
const db = require("../models/all_model")

router.post("/product", (req, res) => {
    const productDetails = req.body;
    let userId = req.jwt.userId;
    db.addProduct(productDetails)
        .then(product => {
            console.log("return data", product)
            res.status(201).json({ data: product, message: "Product added", product });
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: "Error will adding product", error });
        });
});

router.put("/product/:id", (req, res) => {
    let { id } = req.params;
    let userId = req.jwt.userId;
    let changes = req.body;
    db.getByProductId(id)
        .then((res => {
            if (res) {
                db.updateproductDetails(id, changes)
                    .then((count) => {
                        if (count == 1) {
                            db.getByProductId(id)
                                .then((updated) => {
                                    res.status(200).json({ data: updated, message: "updated product details", updated })
                                })
                                .catch((err) => {
                                    res.status(404).json({ message: "Id not found", err })
                                })
                        }

                    })
                    .catch((err) => {
                        res.status(400).json({ message: "Could not update product details" })
                    })
            }
            else {
                res.status(404).json({ message: "product ID not found" })
            }
        }))
        .catch((err) => {
            res.status(500).json({ message: "Server Error" })
        });
})
//get product details
router.get("/product/:id", (req, res) => {
    let { id } = req.params;
    let userId = req.jwt.userId;
    db.getByProductId(id)
        .then((res) => {
            console.log("Product Details", res);
            res.status(200).json({ data: res, message: "product detail" })
        })
        .catch((err) => {
            res.status(500).json({ message: "Error will retireving product details", err })
        })
})

router.get("/products", (req, res) => {
   
   // let userId = req.jwt.userId;
  let user= db.getProducts()
   .then((res)=>{
    console.log("product listshj",res[0])
    if(user){
        res.status(200).json({data:user,message:"product list"})
    }
    
   })
   .catch((err)=>{
    res.status(500).json({message:"Error while retrieving data",err})
   })
})

//delete
router.delete("/product/:id", (req, res) => {
    let { id } = req.params;
    let userId = req.jwt.userId;
    db.getByProductId(id)
        .then((product) => {
            if (product) {
                db.removeProductById(id)
                    .then((count) => {
                        if (count > 0){
                            res.status(200).json({message:"successfully deleted"})
                        }
                     })
                    .catch((err)=>{
                        res.status(400).json({message:"Error while deleting the product"})
                    })
            }
            else {
                res.status(404).json({ message: "Product Id not found", product ,id})
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error",err})

        })
})

module.exports = router;
