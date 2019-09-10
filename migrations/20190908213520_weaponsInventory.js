exports.up = function(knex, Promise) {
    return knex.schema.createTable('weapons_inventory', table=>{
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('caliber').notNull()
        table.string('model').notNull()
        table.string('bar_code').notNull()
        table.string('provider').notNull()
        table.string('numeration').notNull()
        table.boolean('utilization').notNull().defaultTo(false)
        table.boolean('launch').notNull().defaultTo(false)
        table.string('nf').notNull()
        table.timestamp('date').notNull().defaultTo(knex.fn.now())
        table.boolean('status').defaultTo(true)
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.timestamp('deletedAt').defaultTo(null)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('weapons_inventory')
  };
  