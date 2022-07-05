exports.seed=async function(knex){
    await knex('products').insert([
        {
           productName:"handsoap",productDescription:"home made product",price:10.00 
        },
       {productName:"oil",productDescription:"home made product oil",price:5.00},
       {productName:"diffuser oil",productDescription:"home made product from rose",price:10.00}
    ])
}