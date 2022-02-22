class TareasAppProxy {

    async signin(username, password) {
        return await fetch("http://localhost:3000/api/signin",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'charset': 'utf 8' },
                body: (JSON.stringify({ username, password }))
            });
    }

    async signup(username, password) {
        return await fetch("http://localhost:3000/api/signup",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'charset': 'utf 8' },
                body: (JSON.stringify({ username, password }))
            });
    }
    
    async signout() {
        return await fetch("http://localhost:3000/api/logout", { method: 'POST' });
    }
    
    async agregarTarea(titulo, descripcion) {

        //creamos un objeto tarea con la descripcion 
        let tarea = { titulo, descripcion };

        // devolvemos una promesa 
        console.log(JSON.stringify(tarea));
        return await fetch(`/api/tareas`, {
            method: 'POST', body: JSON.stringify(tarea), headers: {
                "Content-Type":
                    "application/json"
            }
        });
    }

    async borrarTodas () {
        return await fetch(`/api/tareas`, { method: 'DELETE' });
    }
    
    async borrarTarea(id) {
        return await fetch(`/api/tareas/id/${id}`, { method: 'DELETE' });
    }

    async modificarTarea(id, titulo, descripcion) {
        let tarea = { titulo, descripcion };
        return await fetch(`/api/tareas/id/${id}`, {
            method: 'PUT', body: JSON.stringify(tarea), headers: {
                "Content-Type":
                    "application/json"
            }
        });
    }

    async verTarea(id) {
        return await fetch(`/api/tareas/id/${id}`);
    }
    
    async tareas() {        
        return await fetch('/api/tareas');
    }
}
