exports.up = function(knex, Promise) {
    return knex.schema.createTable('box_stats', table=>{
        table.increments('id').primary()
        table.boolean('status').defaultTo(false)
        table.string('manager')
        table.timestamp('date').defaultTo(knex.fn.now())
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.timestamp('deletedAt').defaultTo(null)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('box_stats')
  };
  