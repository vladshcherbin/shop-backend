exports.up = (knex) => (
  knex.schema.createTable('stocks', (table) => {
    table.increments('id')
    table.integer('product_id').notNullable()
    table.integer('count').unsigned()
    table.timestamp('created_at').notNullable()
    table.timestamp('updated_at').notNullable()

    table.foreign('product_id').references('products.id').onUpdate('CASCADE').onDelete('CASCADE')
  })
)

exports.down = (knex) => (
  knex.schema.dropTable('stocks')
)
