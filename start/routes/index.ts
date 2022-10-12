import Route from '@ioc:Adonis/Core/Route'
import './auth'
import './user'
import './uploads'
import './posts'
import './admin'

Route.get('/', async () => {
  return { hello: 'world' }
})
