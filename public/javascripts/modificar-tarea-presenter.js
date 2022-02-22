class ModificarTareaPresenter {
    constructor(proxy, view) {
        this.proxy = proxy;
        this.view = view;
        this.tarea = null;
        this.status = 'Inicio';
    }

    async refresh() {

        let params = new URLSearchParams(this.view.location.search);
        let tareaId = params.get('id');
        
        let tarea = await this.proxy.verTarea(tareaId);
        let tareaJSON = await tarea.json();
        console.log(tareaJSON);

        document.getElementById('tareaId').innerHTML = `Modificar Tarea ${tareaJSON._id}`;
        document.getElementById('titulo').value = `${tareaJSON.titulo}`
        document.getElementById('descripcion').value = `${tareaJSON.descripcion}`

    }

    async editarClick (event) {
                
        event.preventDefault();

        //cojo el id
        let params = new URLSearchParams(this.view.location.search);
        let tareaId = params.get('id');        
        
        // me devuelve el DOM. quiero el valor
        //let titulo = document.getElementById('titulo').value;
        let titulo = this.view.getElementById('titulo').value;
        let descripcion = this.view.getElementById('descripcion').value;

        let tarea = await this.proxy.modificarTarea(tareaId, titulo, descripcion);
        let tareaJSON = await tarea.json();
        console.log(tareaJSON);


        document.location.href = `/ver-tarea.html?id=${tareaJSON._id}`;
    }
}