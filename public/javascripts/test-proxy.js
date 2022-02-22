describe("TareasApp Test Proxy", function () {


    //Lo ejecutaremos antes de cada it
    beforeEach(async function () {
        
        let app;
        
        // creamos la aplicacion
        app = new TareasAppProxy();

        let respuesta = await app.borrarTodas();        

        // respuesta correcta
        assert.equal(200, respuesta.status)
    })

    it("borrarTarea", async function () {

        let app;

        // creamos la aplicacion
        app = new TareasAppProxy();

        // haciamos agregar tarea
        let tarea = await app.agregarTarea('Tarea1', 'Descripcion1');

        // respuesta correcta
        assert.equal(200, tarea.status);

        // convertimos la tarea en un json
        let tareaJSON = await tarea.json();

        console.log(tareaJSON)

        // nos traemos las tareas
        let tareas = await app.tareas();
        assert.equal(200, tareas.status);
        let tareasJSON = await tareas.json();

        console.log(tareasJSON);

        assert.equal(1, tareasJSON.length);

        let respuesta = await app.borrarTarea(tareaJSON._id);
        assert.equal(200, respuesta.status);

        tareas = await app.tareas();
        tareasJSON = await tareas.json();

        console.log(tareasJSON)

        assert.equal(0, tareasJSON.length);


    });

    it("verTarea", async function () {

        let app;

        // creamos la aplicacion
        app = new TareasAppProxy();

        // haciamos agregar tarea
        let tarea = await app.agregarTarea('Tarea1', 'Descripcion1');

        // respuesta correcta
        assert.equal(200, tarea.status);

        // convertimos la tarea en un json
        let tareaJSON = await tarea.json();

        console.log(tareaJSON);

        // nos traemos las tareas
        let tareas = await app.tareas();
        assert.equal(200, tareas.status);
        let tareasJSON = await tareas.json();

        console.log(tareasJSON);

        // comprobamos que está agregada
        assert.equal(1, tareasJSON.length);

        tarea = await app.verTarea(tareaJSON._id);
        tareaJSON = await tarea.json();

        // El id de la tarea introducida es igual al id de la tarea devuelta
        assert.equal(tareasJSON[0]._id, tareaJSON._id);

    });

    it("agregarTarea", async function () {

        let app;

        // creamos la aplicacion
        app = new TareasAppProxy();

        // haciamos agregar tarea
        let tarea = await app.agregarTarea('Tarea1', 'Descripcion1');
        // respuesta correcta
        assert.equal(200, tarea.status);
        let tareaJSON = await tarea.json();

        // nos traemos las tareas
        let tareas = await app.tareas();
        assert.equal(200, tareas.status);
        let tareasJSON = await tareas.json();

        // comprobamos el id de la tarea agregada con el id de la tarea existente
        assert.equal(tareasJSON[0]._id, tareaJSON._id);        

    });

    it("modificarTarea", async function () {

        let app;

        // creamos la aplicacion
        app = new TareasAppProxy();

        // haciamos agregar tarea
        let tarea = await app.agregarTarea('Tarea1', 'Descripcion1');
        // respuesta correcta
        assert.equal(200, tarea.status);
        let tareaJSON = await tarea.json();

        // nos traemos las tareas
        let tareas = await app.tareas();
        assert.equal(200, tareas.status);
        let tareasJSON = await tareas.json();

        // comprobamos que está agregada
        assert.equal(1, tareasJSON.length);

        //modificamos la tarea
        tarea = await app.modificarTarea(tareaJSON._id, 'TareaModificada', 'DescripcionModificada');
        // respuesta correcta
        assert.equal(200, tarea.status);
        tareaJSON = await tarea.json();

        // nos las volvemos a traer 
        tareas = await app.tareas();
        assert.equal(200, tareas.status);
        tareasJSON = await tareas.json();

        //comprobamos id, titulo y descripcion
        assert.equal (tareaJSON._id, tareasJSON[0]._id);
        assert.equal (tareaJSON.titulo, tareasJSON[0].titulo);
        assert.equal (tareaJSON.descripcion, tareasJSON[0].descripcion);

    })


});