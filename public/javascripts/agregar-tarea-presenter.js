class AgregarTareaPresenter {

    constructor(proxy, view) {
        this.proxy = proxy;
        this.view = view;
        this.tarea = null;
        this.status = 'Inicio';
    }

    async guardarClick(event) {
        
        event.preventDefault();

        // obtengo el titulo del formulario
        let titulo = document.getElementById('titulo').value;

        //luego los descripcion
        let descripcion = document.getElementById('descripcion').value;

        // llamo a agregar tarea
        let respuesta = await this.proxy.agregarTarea(titulo, descripcion);
        let tarea = await respuesta.json();
        console.log(tarea);

        this.status = 'Agregado';

        // respuesta
        let tareasRespuesta = await this.proxy.tareas();

        // convertir la respuesta en json
        let tareas = await tareasRespuesta.json();
        console.log(tareas);


        if (!respuesta.ok) this.status = 'ERROR: ' + this.status;
        //this.selectTarea(null);
        //this.refresh();

        document.location.href = `/ver-tarea.html?id=${tarea._id}`;
    }


}