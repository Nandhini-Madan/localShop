const { table } = require("console");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    try {
        await knex.schema.createTable('roles', tbl => {
            tbl.increments('id');
            tbl.string('roleName')
        })
        console.log("Successfully created the 'roles' table")
    }
    catch (err) {
        consol.log("Failed to create 'roles' table", err)
    }
    finally {
        if (knex) {
            knex.destroy()
        }
    }
    try {
        await knex.schema.createTable('users', tbl => {
            tbl.increments('userId');
            tbl.string('name', 255)
                .notNullable();
            tbl.string('password', 255)
                .notNullable();
            tbl.string('email', 255)
                .notNullable();
            //  .unique()
            //  .index('email');
            tbl.timestamp('created_at').defaultTo(knex.fn.now())
        })
        console.log("Sucessfully created 'user table")
    }
    catch (err) {
        console.log("Failed to create user table")
    }
    finally {
        if (knex) {
            knex.destroy()
        }
    }
    try {
        await knex.schema.createTable('products', tbl => {
            tbl.increments('productId')
                .notNullable();
            tbl.string('productName', 255)
                .notNullable();
            tbl.string('productDescription');
            tbl.decimal('price', 8, 2)
                .notNullable();
            tbl.timestamp('created_at').defaultTo(knex.fn.now())
        })
        console.log("Sucessfully created 'product table")
    }
    catch (err) {
        console.log("Failed to create 'product' table")
    }
    finally {
        if (knex) {
            knex.destroy()
        }
    }
    try {
        await knex.schema.createTable('myCart', tbl => {
            tbl.increments("cartId");
            tbl.integer('customerId')
                .notNullable()
                .references('users.id')
                .inTable('users')
                .onDelete("RESTRICT")
                .onUpdate('CASCADE');
            tbl.integer('ProductId')
                .notNullable()
                .references('products.productId')
                .inTable('products')
                .onDelete("RESTRICT")
                .onUpdate('CASCADE')
            tbl.timestamp('created_at').defaultTo(knex.fn.now())
        })
        console.log("Sucessfully created 'mycart table")
    }
    catch (err) {

        console.log("Failed to create 'mycart' table")
    }
    finally {

        if (knex) {
            knex.destroy()
        }

    }

    try {
        await knex.schema.createTable('bill', tbl => {
            tbl.increments('billId');
            tbl.integer('saleId')
                .notNullable()
                .references('products.productId')
                .inTable('products')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');
                tbl.integer('customerId')
                .notNullable()
                .references('users.userId')
                .inTable('users')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');
            tbl.string('productName')
            tbl.decimal('price', 8, 2)
                .notNullable()
            tbl.timestamp('created_at').defaultTo(knex.fn.now())

        })
        console.log("Sucessfully created 'bill' table")
    }
    catch {
        console.log("Failed to create 'bill' table")
    }
    finally {
        if (knex) {
            knex.destroy()
        }

    }
    try {
        await knex.schema.createTable('billAddress',tbl=>{
            tbl.increments('billAddId');
            tbl.integer('billsId')
            .notNullable()
            .references('bill.billId')
            .inTable('bill')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
            tbl.string('Address')
            .notNullable()
            tbl.string('city')
            .notNullable()
            tbl.string('country')
            .notNullable()
            tbl.string('phoneNumber')
            .notNullable()
            tbl.timestamp('created_at').defaultTo(knex.fn.now())
        })
        console.log("Sucessfully created 'billaddress' table")
    }
    catch {
        console.log("Failed to create 'billaddres' table")
    }
    finally {
        if (knex) {
            knex.destroy()
        }
    }

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('billAddress')
    await knex.schema.dropTableIfExists('bill')
    await knex.schema.dropTableIfExists('products')
    await knex.schema.dropSchemaIfExists('users')
    await knex.schema.dropSchemaIfExists('roles')

};
