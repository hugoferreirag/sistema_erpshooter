exports.up = function(knex, Promise) {
    return knex.schema.createTable('weapons_nf', table=>{
        table.increments('id').primary()
        table.string('nf').notNull()
        table.string('caliber').notNull()
        table.timestamp('date').defaultTo(knex.fn.now())
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.timestamp('deletedAt').defaultTo(null)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('weapons_nf')
  };
  