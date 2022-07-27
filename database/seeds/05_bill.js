exports.seed=async function(knex){
    await knex('bill').insert([
        {
            saleId: 2,customerId:3,productName:"diffuser oil",price:10.2
        }
    ])
}