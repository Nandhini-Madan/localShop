exports.seed=async function(knex){
    await knex('roles').insert([
       {roleName:"Admin"},
       {roleName:"Customer"} 

    ])
}