const express = require('express');
const router = express.Router();
const db = require("../models/all_model")

router.post("/product", (req, res) => {
    const productDetails = req.body;
  //  let userId = req.jwt.userId;
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

router.put("/product/:productId", (req, res) => {
    let { productId } = req.params;
   // let userId = req.jwt.userId;
    let changes = req.body;
    console.log(req.body,"put","Id",productId);
    db.getByProductId(productId)
        .then((pID => {
            if (pID) {
                console.log("PID",pID)
                db.updateproductDetails(productId, changes)
                    .then((countProduct) => {
                        if (countProduct == 1) {
                            db.getByProductId(productId)
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
router.get("/product/:productId", (req, res) => {
    let { productId } = req.params;
   // let userId = req.jwt.userId;
   console.log("get pID",productId);
    db.getByProductId(productId)
        .then((productDe) => {
            console.log("Product Details", productDe[0]);
            res.status(200).json({ data: productDe[0], message: "product detail" })
        })
        .catch((err) => {
            res.status(500).json({ message: "Error will retireving product details", err })
        })
})

router.get("/products", (req, res) => {
    // let userId = req.jwt.userId;
   let user= db.getProducts()
    .then((products)=>{
     console.log("product listshj",products[0])
     if(products){
         res.status(200).json({data:products, message:"product list" })
     }
    })
    .catch((err)=>{
     res.status(500).json({message:"Error while retrieving data",err})
    })
 })
//delete
router.delete("/product/:id", (req, res) => {
    let { id } = req.params;
    console.log("del",id);
   // let userId = req.jwt.userId;
   let productId=parseInt(id)
   console.log(productId,"deletconverted")
    db.getByProductId(productId)
    
        .then((D) => {
           console.log("productID then ",D)
            if (D) {
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
