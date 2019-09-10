exports.up = function(knex, Promise) {
    return knex.schema.createTable('temporary_munition', table=>{
        table.increments('id').primary()
        table.integer('user_id').notNull()
        table.string('munition_name').notNull()
        table.string('munition_code').notNull()
        table.string('provider').notNull()
        table.integer('quantity').notNull()
        table.float('unity_value').notNull()
        table.float('sub_total').notNull()
        table.string('caliber').notNull()
        table.boolean('club').notNull()
        table.string('request_code').notNull()
        table.string('customer_code').notNull()
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.timestamp('deletedAt').defaultTo(null)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('temporary_munition')
  };
  