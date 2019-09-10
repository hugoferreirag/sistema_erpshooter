exports.up = function(knex, Promise) {
    return knex.schema.createTable('ammunition_inventory', table=>{
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('caliber').notNull()
        table.float('unity_value').notNull()
        table.integer('quantity').notNull()
        table.string('bar_code').notNull()
        table.string('provider').notNull()
        table.string('nf').notNull()
        table.timestamp('date').notNull()
        table.boolean('status').defaultTo(true)
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.timestamp('deletedAt').defaultTo(null)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('ammunition_inventory')
  };
  