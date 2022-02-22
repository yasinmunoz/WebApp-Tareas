// cagro la libreria de mongo
var mongoose = require('mongoose');

//necesito el assert
var assert = require("chai").assert;

// y el modelo
var model = require('../model/tareasapp');


describe("TareasApp Test Model", function () {

    before('Before', async function () {

        var uri = 'mongodb://localhost/tareasapp';
        mongoose.Promise = global.Promise;

        var db = mongoose.connection;

        db.on('connecting', function () {
            console.log('Connecting to ', uri);
        });

        db.on('connected', function () {
            console.log('Connected to ', uri);
        });

        db.on('disconnecting', function () {
            console.log('Disconnecting from ', uri);
        });

        db.on('disconnected', function () {
            console.log('Disconnected from ', uri);
        });

        db.on('error', function (err) {
            console.error('Error ', err.message);
        });

        return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    })

    beforeEach(async function () {
        await model.borrarTodas();
    })

    after('Fin', function () {
        mongoose.disconnect();
    })

    it("TareasApp.agregarTarea", async function () {
        var tareas;
        let tarea = await model.agregarTarea('Titulo', 'Descripcion');
        tareas = await model.tareas();
        assert.equal(tareas.length, 1);
        assert.equal(tarea.titulo, 'Titulo');
        assert.equal(tarea.descripcion, 'Descripcion');
        assert.isDefined(tarea._id);
    })

    it("TareasApp.tareas", async function () {
        var tareas = await model.tareas();
        assert.equal(tareas.length, 0);
        await model.agregarTarea('Titulo', 'Descripcion');
        tareas = await model.tareas();
        assert.equal(tareas.length, 1);
        await model.agregarTarea('Titulo', 'Descripcion');
        tareas = await model.tareas();
        assert.equal(tareas.length, 2);
    })

    it("TareasApp.verTarea", async function () {
        var tarea = await model.agregarTarea('Titulo', 'Descripcion');
        tarea = await model.verTarea(tarea._id.toString());
        assert.equal(tarea.titulo, 'Titulo');
        assert.equal(tarea.descripcion, 'Descripcion');
        assert.isDefined(tarea._id);
    })

    it("TareasApp.verTarea", async function () {
        var tarea = await model.agregarTarea('Titulo', 'Descripcion');
        tarea = await model.verTarea(tarea._id.toString());
        assert.equal(tarea.titulo, 'Titulo');
        assert.equal(tarea.descripcion, 'Descripcion');
        assert.isDefined(tarea._id);
    })

    it("TareasApp.verTarea", async function () {
        var tarea = await model.agregarTarea('Titulo', 'Descripcion');
        tarea = await model.verTarea(tarea._id.toString());
        assert.equal(tarea.titulo, 'Titulo');
        assert.equal(tarea.descripcion, 'Descripcion');
        assert.isDefined(tarea._id);
    })

});