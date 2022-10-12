import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('description', 'longtext')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table
      .integer('tag_id') // quem está seguindo
      .unsigned()
      .references('tags.id')
      .onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
