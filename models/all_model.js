const db = require("../config/dbconfig");

async function add(user) {
    console.log(user, "user db")
    try {
        const [userId] = await db("users").insert(user, "userId")
        return getByUserId(userId);
    }
    catch (err) {
        console.log("add user", err)
        throw err;
    }
}
async function addProduct(productDetails) {
    console.log(productDetails, "user db")
    try {
        const [productId] = await db("products").insert(productDetails, "productId")
        return getByProductId(productId);
    }
    catch (err) {
        console.log("add product", err)
        throw err;
    }
}

async function getByUserId(userId) {
    console.log("getByuserid", userId)
   // const id = parseInt(userId)
    try {
        return db("users")
            .join('roles', 'users.roleId', 'roles.id')
            .where(userId)
            .first()
            .select("users.userId",
                "users.name",
                "users.email",
                "users.password",
                "roles.id as roleId",
                "roles.roleName")
    }
    catch (err) {
        console.log("getByUserId", err)
        throw err;
    }
}
async function getByProductId(productId) {
    console.log("getByProductId hj", productId)
    const id = parseInt(productId)
    try {
        return db('products')
           // .join('roles', 'users.roleId', 'roles.id')
            .select('products.productName',
            'products.productDescription',
            'products.price')
            .where(productId)
            .first()
        
    }
    catch (err) {
        console.log("getByProductId", err.message)
        throw err;
    }
}
//getByEmail
async function getByEmail(email) {
    try{
        const userId=await db('users')
        .select("users.userId")
        .where({email})
        .first()
        console.log(userId)
        return getByUserId(userId)
       
    }
    catch (err){        
        console.log("getByUserId", err)
        throw err;
    }
    
}
async function removeProductById(productId){
    try{
        return db('products')
        .where('productId', productId)
        .del();
    }
    catch(err){
        console.log("removeproductById", err)
        throw err;
    }
}
async function updateproductDetails(productId,changes){
    try{
        return db('products')
        .where('productId',productId)
        .update(changes)
    }
  catch(err){
    console.log("update product err", err.message)
    throw err;
  }
}
async function getProducts(){
    try{
        console.log("getProduct try");
    const products= db('products')
                    .select('products.productId',
                    'products.productName',
                    'products.productDescription',
                    'products.price')
    return products
       
    }
    catch{(err)=>{
        console.log('getProduct err',err)
        throw err;
    }}
}


module.exports = {
    add,
    addProduct,
    getByUserId,
    getByEmail,
    getProducts,
    getByProductId,
    removeProductById,
   updateproductDetails
}