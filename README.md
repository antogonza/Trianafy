# Trianafy

### Para ejecutar este proyecto seguiremos los siguientes pasos

- Clonar el repositorio
- Ejecutar el comando npm install 
- Ejecutamos el comando mongoimport --db --file  databases lists.json
- Ejecutamos el comando mongoimport --db --file  databases users.json
- Ejecutamos el comando mongoimport --db --file  databases songs.json
- Ejecutamos el comando npm start
- Importamos el archivo Trianafy.postman_collection.json en el programa Postman
- Ejecutamos las distintas peticiones ya cargadas


Tenemos 4 endpoints: 
- /songs
- /list
- /list:id/
- /auth

Las diferentes rutas de la aplicación son: 
 * post /lists Añade una nueva lista
 * get /lists Obtiene todas las listas
 * get /lists/{id} Obtiene una lista en función de su id
 * put /lists/{id} Modifica una lista
 * delete /lists/{id} Elimina una lista
 
 * post /songs Añade una canción
 * get /songs Obtiene todas las canciones
 * get /songs{id} Obtiene una canción en función de su id
 * put /songs{id} Modifica una canción
 * delete /songs/{id} Elimina una canción
 
 * post /auth/register Registra un usuario
 * post /auth/login Inicia sesión
