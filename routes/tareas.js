// vamos a traer el express
var express = require('express');

//traemos el router
var router = express.Router();

//cargar modelo
let model = require('../model/tareasapp.js');

// Traemos todas las tareas
router.get('/', async function (req, res, next) {

    return res.json(await model.tareas());
    //res.status(200).json([{ titulo: 't', autores: 'a' }]);
});

// Traemos una tarea
router.get('/id/:id', async function (req, res, next) {
    try {
        // para obtener ese parámetro
        let tarea = await model.verTarea(req.params.id);
        return res.json(tarea);
    } catch (e) {
        res.statusMessage = e.message;
        return res.status(404).send();
    }
});

// Borramos una tarea
router.delete('/id/:id', async function (req, res, next) {
    try {
        await model.borrarTarea(req.params.id);
        return res.status(200).send();
    } catch (e) {
        res.statusMessage = e.message;
        return res.status(404).send();
    }
});

// Borramos todas las tareas
router.delete('/', async function (req, res, next){
    await model.borrarTodas();
    return res.status(200).send();
});

// Agregar una tarea
router.post('/', async function (req, res, next) {
    console.log ('hola');
    let tarea = await model.agregarTarea(req.body.titulo, req.body.descripcion);
    console.log (tarea);
    return res.json(tarea);
});

// Modificar una tarea
router.put('/id/:id', async function (req, res, next) {
    try {
        let tarea = await model.modificarTarea(req.params.id, req.body.titulo, req.body.descripcion);
        return res.status(200).send(tarea);
    } catch (e) {
        res.statusMessage = e.message;
        return res.status(404).send();
    }
});

// exportar el modulo del router
// añade el routeador al app.js
module.exports = router;