exports.up = function(knex, Promise) {
    return knex.schema.createTable('total_request', table=>{
        table.increments('id').primary()
        table.integer('user_id').notNull()
        table.float('total').notNull()
        table.float('discount').notNull()
        table.string('customer_code').notNull()
        table.string('request_code').notNull()
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.timestamp('deletedAt').defaultTo(null)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('total_request')
  };
  