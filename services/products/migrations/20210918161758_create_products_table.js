exports.up = (knex) => (
  knex.schema.createTable('products', (table) => {
    table.increments('id')
    table.string('title').notNullable().unique()
    table.string('description')
    table.decimal('price')
    table.string('image_url').notNullable().unique()
    table.timestamp('created_at').notNullable()
    table.timestamp('updated_at').notNullable()
  })
)

exports.down = (knex) => (
  knex.schema.dropTable('products')
)
