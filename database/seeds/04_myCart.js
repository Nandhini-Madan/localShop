exports.seed=async function(knex){
    await knex('myCart').insert([
        {
            customerId:2,ProductId:2
        }
    ])
}