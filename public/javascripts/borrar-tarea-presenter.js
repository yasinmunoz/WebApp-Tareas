class BorrarTareaPresenter {
    
    constructor(proxy, view) {
        this.proxy = proxy;
        this.view = view;
        this.tarea = null;
        this.status = 'Inicio';
    }

    async loaded() {
        let params = new URLSearchParams(this.view.location.search);
        let tareaId = params.get('id');

        let tarea = await this.proxy.verTarea(tareaId);
        let tareaJSON = await tarea.json();

        console.log(tareaJSON);

        if (tareaJSON) {
            await this.proxy.borrarTarea(tareaId);
            this.refresh(tareaJSON);
        } else {
            document.getElementById('main').innerHTML = '<h1> ERROR! </h1>';
        }

    }

    async refresh(tareaJSON) {

        document.getElementById('tareaId').innerHTML = `Tarea ID: ${tareaJSON._id}`;
        document.getElementById('tareaMensaje').innerHTML = `La tarea ${tareaJSON.titulo} con descripcion ${tareaJSON.descripcion} ha sido borrada.`

    }
}