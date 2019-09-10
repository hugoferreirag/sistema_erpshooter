exports.up = function(knex, Promise) {
    return knex.schema.createTable('request', table=>{
        table.increments('id').primary()
        table.string('activity').notNull()
        table.timestamp('entry').notNull()
        table.timestamp('exit').defaultTo(null)
        table.integer('stand').notNull()
        table.string('payment_method').notNull()
        table.string('request_code').notNull()
        table.string('customer_code').notNull()
        table.integer('user_id').notNull()
        table.boolean('status').defaultTo(false)
        table.timestamp('date').notNull()
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.timestamp('deletedAt').defaultTo(null)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('request')
  };
  