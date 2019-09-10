exports.up = function(knex, Promise) {
    return knex.schema.createTable('temporary_customer', table=>{
        table.increments('id').primary()
        table.integer('user_id').notNull()
        table.integer('customer_id').notNull()
        table.string('customer_name').notNull()
        table.string('customer_cr').notNull()
        table.string('customer_cnh').notNull()
        table.string('customer_cpf').notNull()
        table.string('customer_code').notNull()
        table.string('request_code').notNull()
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.timestamp('deletedAt').defaultTo(null)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('temporary_customer')
  };
  