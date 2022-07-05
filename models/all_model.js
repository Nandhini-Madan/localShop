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
    getByUserId,
    getByEmail,
    getProducts
}