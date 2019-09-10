exports.up = function(knex, Promise) {
    return knex.schema.createTable('temporary_weapon', table=>{
        table.increments('id').primary()
        table.integer('user_id').notNull()
        table.string('weapon').notNull()
        table.string('caliber').notNull()
        table.string('weapon_code').notNull()
        table.boolean('club').notNull()
        table.string('provider').notNull()
        table.string('model').notNull()
        table.string('numeration').notNull()
        table.string('request_code').notNull()
        table.string('customer_code').notNull()
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.timestamp('deletedAt').defaultTo(null)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('temporary_weapon')
  };
  