
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table =>{
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('pass').notNull()
        table.integer('cargo_id').references('id')
            .inTable('cargos').notNull()
        table.string('pcture', 1000)
        table.boolean('status').defaultTo(true)
        table.boolean('admin').defaultTo(false)
        table.timestamp('deletedAt').defaultTo(null)
        table.timestamp('createdAt').notNull().defaultTo(knex.fn.now())

    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
