const db = require("../config/dbconfig");

async function add(user) {
    try {
        const [id] = await db("users").insert(user, "id")
        return getByUserId(id);
    }
    catch (err) {
        console.log("add user", err)
        throw err;
    }
}

async function getByUserId(id) {
    try {
        return db("users")
            .join('roles','users.roleId','roles.id')
            .where({ id })
            .first()
            .select("users.id",
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



module.exports = {
    add,
    getByUserId
}