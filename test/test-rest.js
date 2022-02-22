var assert = require("chai").assert;
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

const url = 'http://localhost:3000/api';

describe("TareasApp Test Rest", function () {


    beforeEach((done) =>{
        chai.request(url).delete('/tareas').send().end(function (err, res){
            done();
        });
    });
    
    it("Agregar tarea", function (done) {
        //Creamos un pedido
        chai.request(url)
            //Al request hacemos un post, post llamará al modelo agregar
            .post('/tareas')
            .send({ titulo: 'Tarea', descripcion: 'Descripcion' })//le pasamos como cuerpo al post un json, el send envia
            //La funcion end se llama cuando el servidor devolvió la respuesta, es una función de callback que toma 2 parámetros. Si hay error no hay resultado por ello hay que hacer una condición de if para saber si hubo error:
            .end(function (err, res) {
                if (err) done(err); //si hay un error le digo que termino
                else {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.titulo, 'Tarea');
                    assert.equal(res.body.descripcion, 'Descripcion');
                    assert.isDefined(res.body._id);
                    done()//llamamos la done pero sin parametro para indicarle que termino bien. SIEMPRE hay que llamar a DONE
                }
            })
    });

    

    it("Borrar TODOS", function (done) {
        //Creamos un pedido
        chai.request(url)
            //Al request hacemos un post, post llamará al modelo agregar
            .delete('/tareas')
            .send()//le pasamos como cuerpo al post un json, el send envia
            //La funcion end se llama cuando el servidor devolvió la respuesta, es una función de callback que toma 2 parámetros. Si hay error no hay resultado por ello hay que hacer una condición de if para saber si hubo error:
            .end(function (err, res) {
                if (err) done(err); //si hay un error le digo que termino
                else {
                    assert.equal(res.status, 200);
                    done()//llamamos la done pero sin parametro para indicarle que termino bien. SIEMPRE hay que llamar a DONE
                }
            })
    });


    /* PASOS PARA BORRAR tarea
    1. .deleteAll
    2. Agregramos un tarea .post
    3. Nos traemos un tarea con GET
    4. Hacemos .delete(id)
    */ 

    it("Borrar tarea", function (done) {
        //Creamos un pedido
        chai.request(url)
            //Al request hacemos un post, post llamará al modelo agregar
            .post('/tareas')
            .send({ titulo: 'Tarea', descripcion: 'Descripcion' })
            .end( function (err, res){
                if (err) done(err); //si hay un error le digo que termino
                else {
                    assert.equal(res.status, 200);
                    chai.request(url)
                    .delete(`/tareas/id/${res.body._id}`)
                    .send()
                    .end(function (err, res) {
                        if (err) done(err); //si hay un error le digo que termino
                        else {
                            assert.equal(res.status, 200);
                            done()//llamamos la done pero sin parametro para indicarle que termino bien. SIEMPRE hay que llamar a DONE
                        }
                    })
                }
                
                
            })
            
            
            
    });


    /*PASOS PARA MODIFICAR:
    1. Agregamos un tarea
    2. Nos traemos el tarea
    3. Hacemos PUT porque es la función que llama a modificartarea
    4. Comprobamos que lo que devuelve es el tarea modificado*/

    it("Modificar tarea", function (done) {
        //Creamos un pedido
        chai.request(url)
            //Al request hacemos un post, post llamará al modelo agregar
            .post('/tareas')
            .send({ titulo: 'Tarea', descripcion: 'Descripcion' })
            .end( function (err, res){
                if (err) done(err); //si hay un error le digo que termino
                else {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.titulo, 'Tarea');
                    assert.equal(res.body.descripcion, 'Descripcion');
                    assert.isDefined(res.body._id);
                    
                    chai.request(url)
                    .get(`/tareas/id/${res.body._id}`)
                    .send()
                    .end(function (err, res) {
                        if (err) done(err); //si hay un error le digo que termino
                        else {
                            assert.equal(res.status, 200);
                            assert.equal(res.body.titulo, 'Tarea');
                            assert.equal(res.body.descripcion, 'Descripcion');
                            assert.isDefined(res.body._id);

                            chai.request(url)
                            .put(`/tareas/id/${res.body._id}`)
                            .send({ _id: '`${res.body.id}`', titulo: 'Nueva Tarea', descripcion: 'Nueva Descripcion' })
                            .end(function (err, res){
                                if(err) done(err);
                                else {
                                    assert.equal(res.status, 200);
                                    assert.equal(res.body.titulo, 'Nueva Tarea');
                                    assert.equal(res.body.descripcion, 'Nueva Descripcion');
                                    assert.isDefined(res.body._id);
                                    done();
                                }
                            })

                        }
                    })
                }
                                
            })
    });


    it("Ver tarea", function (done) {
        //Creamos un pedido
        chai.request(url)
            //Al request hacemos un post, post llamará al modelo agregar
            .post('/tareas')
            .send({ titulo: 'Tarea', descripcion: 'Descripcion' })//le pasamos como cuerpo al post un json, el send envia
            //La funcion end se llama cuando el servidor devolvió la respuesta, es una función de callback que toma 2 parámetros. Si hay error no hay resultado por ello hay que hacer una condición de if para saber si hubo error:
            .end(function (err, res) {
                assert.equal(res.status, 200);
                    chai.request(url)
                    .get(`/tareas/id/${res.body._id}`)
                    .send()
                    .end(function (err, res) {
                        if (err) done(err); //si hay un error le digo que termino
                        else {
                            assert.equal(res.status, 200);
                            assert.equal(res.body.titulo, 'Tarea');
                            assert.equal(res.body.descripcion, 'Descripcion');
                            assert.isDefined(res.body._id);
                            done()//llamamos la done pero sin parametro para indicarle que termino bien. SIEMPRE hay que llamar a DONE
                        }
                    })
            })
    });

});