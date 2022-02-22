class VerTareaPresenter {
    
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
            this.refresh(tareaJSON);
        } else {
            document.getElementById('main').innerHTML = '<h1> ERROR! </h1>'
        }

    }

    async refresh(tarea) {

        document.getElementById('tareaId').innerHTML = `Tarea ${tarea._id}`;
        document.getElementById('titulo').innerHTML = `${tarea.titulo}`
        document.getElementById('descripcion').innerHTML = `${tarea.descripcion}`

    }

    async modificarClick(event) {

        event.preventDefault();

        let params = new URLSearchParams(this.view.location.search);
        let tareaId = params.get('id');                
        
        document.location.href = `/modificar-tarea.html?id=${tareaId}`;

    }
}