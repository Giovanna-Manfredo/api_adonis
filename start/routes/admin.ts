import Route from '@ioc:Adonis/Core/Route' 

Route.post('/forum', 'Forum/Main.store')
Route.get('/forum/list', 'Forum/Main.index')

Route.post('/tag', 'Tag/Main.store')
Route.get('/tag_post/list/:id_forum', 'Tag/Main.index')

