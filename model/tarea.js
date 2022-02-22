const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
});

// El objeto que nos va a permitir crear las instancias
// Así yo le pongo el nombre del modelo como un string
// el modelo es el factory de los documentos
module.exports = mongoose.model('Tarea', schema);