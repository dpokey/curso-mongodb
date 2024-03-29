
mongo
Ejecutable de la shell

mongod
Ejecutable del motor de mongodb

mongo --nodb
Para validar la instalacion de mongodb

mongo "mongodb://cluster0-shard-00-00-jxeqq.mongodb.net:27017,cluster0-shard-00-01-jxeqq.mongodb.net:27017,cluster0-shard-00-02-jxeqq.mongodb.net:27017/test?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl --username m001-student --password m001-mongodb-basics
Conexion a mongodb cluster atlas mon university

En un cluster, solo se puede escribir en un servidor primario
En un cluster, solo existe un servidor primario

use video
Para cambiar de bd

show collections
Para ver las colecciones de una bd

db.collection.find().pretty()
Para ver todos los documentos de la coleccion movies de la bd video

mongo "mongodb+srv://cluster0-lpbtc.mongodb.net/test" --username m001-student --password m001-mongodb-basics
Conexion a mongodb cluster atlas sandbox

show dbs
Para listar las bd

quit()
Para salir de la instancia

Cargar Archivo de bd
------------------------------
Nos ubicamos en el directorio donde se encuentra nuestro archivo a Cargar

Si lanzo aqui la cadena de conexion, ese sera mi nuevo directorio de trabajo

Nos conectamos a nuestra instancia de sandbox

load('loadMovieDetailsDataset.js')
Para cargar el archivo js

Operaciones CRUD
-----------------

Filtrado de documentos (Y)
------------------------------

Compass
{rated: "PG-13"}
{rated: "PG-13", year: 2009}
{wind.type: "C"}
{"wind.direction.angle": 290}

Mongoshell
use video
Se requieren comillas cuando se usa la motacion del punto

pretty() muestra los resultados de una forma mas legible
count() muestra la cantidad de los resultados

db.movieDetails.find({"rated": "PG-13"}).pretty()
db.movieDetails.find({"awards.wins": 2, "awards.nominations": 2}).count()
db.movieDetails.find({"rated": "PG", "awards.nominations": 10}).count()

Filtrado de documentos Array
------------------------------
Los elementos filtrados son respetando exactamente los consultados en el orden indicado
db.movieDetails.find({"actors": ["Jeff Bridges", "Terrence Howard"]}).pretty()
db.movieDetails.find({"writers": ["Ethan Coen", "Joel Coen"]}).count()


Los elementos filtrados son los que contengan a Jeff Bridges en su array
db.movieDetails.find({"actors": "Jeff Bridges"}).count()

Los elementos filtrados son los que contengan a Jeff Bridges y Terrence Howard en su array
Usamos el operador $all para obtener una matriz que contenga los elementos sin tener en cuenta el orden o que existan otros elementos en la matriz.
db.movieDetails.find({"actors": { $all: ["Jeff Bridges" , "Terrence Howard"]}}, {"title": 1})
db.movieDetails.find({"genres": "Family"}).count()

Por ejemplo, la siguiente operación consulta todos los documentos donde la matriz dim_cm contiene al menos un elemento cuyo valor es mayor que 25.
db.inventory.find( { dim_cm: { $gt: 25 } } )

El siguiente ejemplo consulta para documentos donde la matriz dim_cm contiene elementos que en alguna combinación satisfacen las condiciones de consulta; por ejemplo, un elemento puede satisfacer la condición superior a 15 y otro elemento puede satisfacer la condición inferior a 20, o un solo elemento puede satisfacer ambas:
db.inventory.find( { dim_cm: { $gt: 15, $lt: 20 } } )

El siguiente ejemplo consulta para documentos donde la matriz dim_cm contiene al menos un elemento que es mayor que ($ gt) 22 y menor que ($ lt) 30. es decir usamos el operador $elemMatch para indicar que se deben satisfacer ambas.
db.inventory.find( { dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } } )

Los elementos filtrados son los que contienen a Jeff Bridges en la pocision 0 en su matriz
db.movieDetails.find({"actors.0": "Jeff Bridges"}).pretty()
db.movieDetails.find({"genres.1": "Western"}).count()

El siguiente ejemplo consulta todos los documentos donde el segundo elemento en la matriz dim_cm es mayor que 25
db.inventory.find( { "dim_cm.1": { $gt: 25 } } )

Use el operador $ size para consultar matrices por número de elementos. Por ejemplo, lo siguiente selecciona documentos donde las etiquetas de matriz tienen 3 elementos
db.inventory.find( { "tags": { $size: 3 } } )


use 100YWeatherSmall
db.collectionName.find({"wind.direction.angle": 290}).pretty()

Metodo find
-----------------------

El metodo find devuelve un cursor
Un corusor es esencialmente un puntero a la ubicacion actual
Por lote el cursor en mogoshell devuelve los primeros 20 resultados
En caso hubiera mas, mongo shell habilita una funcion getMore() para obtener el siguiente lote de 20 iteraciones

Para ver los siguientes resultados en shell colocar it que es el acronimo de iterar
it

Proyecciones
-------------------------
Las Proyecciones reducen la sobrecarga y el procesamiento de la red limitando los campos que son devueltos
Por defecto mongodb devuelve todos los documentos coincidentes con consultas 
Se puede definir una proyeccion como el segundo argumento del metodo find

Si deseo limitar mis documentos para que los resultados solo contengan el campo titulo puedo hacerlo agregando un segundo argumento al metodo find:
Usamos el operador $all para obtener una matriz que contenga los elementos sin tener en cuenta el orden u otros elementos en la matriz.
Aqui incluimos explicitamente el campo title cuando le pasamos 1, para excluirlo le pasamos 0


db.movieDetails.find({"genres": { $all: ["Comedy" , "Western"]}}, {"title": 1})
db.movieDetails.find({"genres": { $all: ["Comedy" , "Western"]}}, {"title": 1, "_id": 0})

 

Insert
-----------------
use video
show collections
db.moviesScratch.insertOne({title: 'Star Trek 2: The Wrath of Khan', year: 1982, imdb: 'tt0084726'})
db.moviesScratch.insertMany(
    [
        {
  	    "_id" : "tt0084726",
  	    "title" : "Star Trek II: The Wrath of Khan",
  	    "year" : 1982,
  	    "type" : "movie"
          },
          {
  	    "_id" : "tt0796366",
  	    "title" : "Star Trek",
  	    "year" : 2009,
  	    "type" : "movie"
          },
          {
  	    "_id" : "tt0084726",
  	    "title" : "Star Trek II: The Wrath of Khan",
  	    "year" : 1982,
  	    "type" : "movie"
          },
          {
  	    "_id" : "tt1408101",
  	    "title" : "Star Trek Into Darkness",
  	    "year" : 2013,
  	    "type" : "movie"
          },
          {
  	    "_id" : "tt0117731",
  	    "title" : "Star Trek: First Contact",
  	    "year" : 1996,
  	    "type" : "movie"
        }
    ]
);

ordered: true indica que apenas encuentra un error en la insercion de los documentos, dejara de insertar
Su valor por defecto es true
ordered: false nos permite cambiar el comportamiento por defecto

db.moviesScratch.insertMany(
    [
        {
	    "_id" : "tt0084726",
	    "title" : "Star Trek II: The Wrath of Khan",
	    "year" : 1982,
	    "type" : "movie"
        },
        {
	    "_id" : "tt0796366",
	    "title" : "Star Trek",
	    "year" : 2009,
	    "type" : "movie"
        },
        {
	    "_id" : "tt0084726",
	    "title" : "Star Trek II: The Wrath of Khan",
	    "year" : 1982,
	    "type" : "movie"
        },
        {
	    "_id" : "tt1408101",
	    "title" : "Star Trek Into Darkness",
	    "year" : 2013,
	    "type" : "movie"
        },
        {
	    "_id" : "tt0117731",
	    "title" : "Star Trek: First Contact",
	    "year" : 1996,
	    "type" : "movie"
        }
    ],
    {
        "ordered": false 
    }
);


UPDATE
---------------------------

updateOne
Actualiza el primer documento que encuentra que conincida con el filtro
La respuesta de updateOne nos indica la cantidad de documentos actualizados, para updateOne siempre sera 1
1er parametro: {filter}
2do parametro: {<$opcion> : {"key": "value"}}

$set Toma un documento como argumento y actualiza el documento que coincide con el filtro. si el campo no existe lo crea, si existe lo actualiza
db.movieDetails.updateOne({"title": "The Martian"}, {$set: {"poster": "https://www.imdb.com/title/tt3659388/mediaviewer/rm1391324160"}})

$unset
borra completamente el campo que le pasamos de un documento

$min $max
Nos permiten actualizar un campo basados en una comparacion	tomado como el minimo o el maximo de lso dos valores

$inc
incrementa el valor almacenado
db.movieDetails.updateOne({"title": "The Martian"}, {$inc: {"tomato.reviews": 3, "tomato.userReviews": 25}})

$addToSet
Actualizara una matriz con nuevos valores solo si el valor no esta contenido en la matriz

$pop 
Puedo sacar el primero o el ultimo elemento de una matriz

$pullAll
Puedo eliminar todos los valores que coinciden con algunos criterios

$push
Impulsar nuevos valores al array
Push crea una matriz si aun no existe
db.movieDetails.updateOne({
	title: "The Martian"
}, {
	$push: ({
		reviews: {
			rating: 4.5,
			date: ISODate("2016-01-12T09:00:00Z"),
			reviewer: "Spencer H.",
			text: "reviewText1"
		}
	})
})

El modificador $each para $push 
Permite que $push agregue cada uno de estos documentos como elementos individuales
Si no usamos $each haria que toda la matriz sea agregada como un unico elemento en esa matriz
Aunque en algunas circunstancias eso podria ser lo que queremos
db.movieDetails.updateOne({
	title: "The Martian"
}, {
	$push: ({
		reviews: {
			$each: [{
				rating: 0.5,
				date: ISODate("2016-01-12T09:00:00Z"),
				reviewer: "Spencer H.",
				text: "reviewText2"
			}, {
				rating: 5,
				date: ISODate("2016-01-12T09:00:00Z"),
				reviewer: "Spencer H.",
				text: "reviewText3"
			}, {
				rating: 3.5,
				date: ISODate("2016-01-12T09:00:00Z"),
				reviewer: "Spencer H.",
				text: "reviewText4"
			}]
		}
	})
})

updateMany
Hara la actualizacion a todos los documentos qu coincidan con el filtro
Aqui estamos usando el operador $unset eliminara todos los campos enumerados ahi
db.movieDetails.updateMany({
	rated: null
}, {
	$unset :{
		rated: ""
	}
})


Upserts
Situaciones en las que los operadores de seleccion poueden en realidad crear nuevos documentos
En la siguiente consulta, busco si el imdb.id existe, y si existe lo actualizo 
Usando updateOne con la opcion upsert significa que no necesitaba consultar primero la coleccion para ver si el documento ya existio
y luego hacer una segunda consulta para insertar. dejo que mongoDB haga todo el trabajo por mi
Esto significa que si el filtro no funciona, el documento que se establece en set, se inserta a la coleccion.
Es decir, el siguiente ejemplo, actualiza los documentos que coinciden con el filtro. y si no hay ninguno, inserte los documentos de actualizacion como un nuevo documento en la coleccion

db.movieDetails.updateOne({
	"imdb.id": detail.imdb.id
}, {
	$set: detail
}, { 
	upsert: true
})


replaceOne
Actualiza un documento que conincide con el filtro especificado
No puede contener operadores de actualizacion
Aplica los cambion solo en un documento, el primero que encuentra que haga matched con el filtro

updateOne vs replaceOne
updateOne esta diseñado para actualizar un conjunto especifico de valores en un documento, Solo se actualizaran los campos especificados de acuerdo al uso de los operadores de actualizacion
replaceOne reemplazara completamente los documentos. Todos los cambios iran de ida y vuelta desde su aplicacion  
Por un lado ambos hacen exacamente lo mismo
execto por el hecho que en replaceOne estamos pasando por completo la carga util de nuestro nuevo documento

let filter = {title: "House, M.D., Season Four: New Beginning"}
let doc = db.movieDetails.findOne(filter)
doc.poster
doc.poster = "https://www.imdb.com/title/tt1329164/mediaviewer/rm2619416576"
doc.genres
doc.genres.push("TV Series")
db.movieDetails.replaceOne(filter, doc)


DELETE
---------------------
1er argumento: filtro
db.reviews.deleteOne({_id: ObjectId("5d51d3fe99cfbb4a21d8dca1")})
db.reviews.deleteMany({reviewer_id: 759723314})

