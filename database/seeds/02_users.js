exports.seed=async function(knex){
    await knex('users').insert([
        {
            name:"nan",email:"ab@bc.com",password:"$2a$08$hA8cz/6.NQv48l0OyiL6S.4Igl6Bzo63qwyWHYY01UFMxQ3jGzstO",roleId:1
        },
        {name:"nq",email:"asd@fm.fg",password:"$2a$08$hA8cz/6.NQv48l0OyiL6S.4Igl6Bzo63qwyWHYY01UFMxQ3jGzstO",roleId:2},
        {
            name:"rtew",email:"We@dsfd.com",password:"$2a$08$hA8cz/6.NQv48l0OyiL6S.4Igl6Bzo63qwyWHYY01UFMxQ3jGzstO",roleId:2
        }
    ]
    )
}