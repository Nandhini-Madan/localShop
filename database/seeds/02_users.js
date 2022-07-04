exports.seed=async function(knex){
    await knex('users').insert([
        {
            name:"nan",email:"fg@gmail.com",password:"1234",roleId:1
        },
        {name:"nq",email:"asd@fm.fg",password:"1234",roleId:2},
        {
            name:"rtew",email:"We@dsfd.com",password:"1234",roleId:2
        }
    ]
    )
}