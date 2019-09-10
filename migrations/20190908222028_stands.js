exports.up = function(knex, Promise) {
    return knex.schema.createTable('stands', table=>{
        table.increments('id').primary()
        table.boolean('status').defaultTo(false)
        table.string('activity').notNull()
        table.integer('customer_id').notNull()
        table.string('customer_name').notNull()
        table.timestamp('entry').defaultTo(knex.fn.now())
        table.string('request_code').notNull()
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.timestamp('deletedAt').defaultTo(null)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('stands')
  };
  