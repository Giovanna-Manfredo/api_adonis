import Route from '@ioc:Adonis/Core/Route' 

Route.post('/post', 'Post/Main.store').middleware('auth')

Route.get('/post/:type_list', 'Post/Main.index').middleware('auth')

Route.get('/post/:id/show', 'Post/Main.show').middleware('auth')
Route.delete('/post/:id/delete', 'Post/Main.destroy').middleware('auth')

Route.post('/post/:id/media', 'Post/Medias.store').middleware('auth')

Route.post('/post/:id/saved/:bool', 'Saved/Main.store').middleware('auth')
Route.post('/post/:id/liked/:bool', 'Liked/Main.store').middleware('auth')
Route.post('/post/:id/report/:bool', 'Report/Main.store').middleware('auth')

Route.post('/post/:id/report', 'Report/Main.store').middleware('auth')
Route.post('/post/:id/comment', 'Comment/Main.store').middleware('auth')