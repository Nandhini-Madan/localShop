exports.seed=async function(knex){
    await knex('billAddr').insert([
        {
            billsId:1,Address:"dhfg",city:"seattle",country:"USA",phoneNumber:"4254172040"
        }
    ])
}