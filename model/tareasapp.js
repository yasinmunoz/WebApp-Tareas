const Tarea = require('../model/tarea');

class TareasApp {

    constructor() {}

    async tareas () {
        return await Tarea.find();
    }

    async agregarTarea(titulo, descripcion) {
        console.log('entrada agrega');
        let tarea = new Tarea({ titulo, descripcion });
        console.log(tarea);
        return await tarea.save();
    }

    async borrarTarea(id) {
        let result = await Tarea.findByIdAndRemove(id)
        if (result == null) throw new Error('Tarea no encontrada');
        else return;
    }

    async borrarTodas() {
        return await Tarea.deleteMany({});
    }
    
    async modificarTarea(id, titulo, descripcion) {
        let resultado = await Tarea.findByIdAndUpdate(id, { titulo, descripcion })
        if (resultado == null) throw new Error(`Tarea no encontrada ${id}`)
        else return await this.verTarea(id);       
    }

    async verTarea(id) {
        let resultado = Tarea.findById(id)
        if (resultado == null) throw new Error(`Tarea no encontrada ${id}`)
        else return resultado;
    }
}

module.exports = new TareasApp();