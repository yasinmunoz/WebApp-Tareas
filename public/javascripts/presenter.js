class TareasAppPresenter {

    constructor(proxy, view) {
        this.proxy = proxy;
        this.view = view;
        this.tarea = null;
        this.status = 'Inicio';
    }

    async login(event) {

        event.preventDefault();

        let username = this.view.getElementById('username').value;
        let password = this.view.getElementById('password').value;

        let res = await this.proxy.signin(username, password);
        let status;
        
        if (res.ok) {
            await res.json();
            status = 'INFO: Log in ok';
        } else {
            console.error(`(${res.status}) ${res.statusText}`)
            try {
                let json = await res.json();
                status = json.message;
            } catch (e) {
                status = await res.text();
            }
            status = `ERROR: ${status}`;
        }

        this.view.getElementById('status').innerHTML = `${status}`;

    }

    async signup(event) {

        event.preventDefault();

        let username = this.view.getElementById('username').value;
        let password = this.view.getElementById('password').value;

        let res = await this.proxy.signup(username, password);

        let status;

        if (res.ok) {
            let r = await res.json();
            console.log(r);
            status = 'INFO: Usuario registrado';
        }
        else {
            console.error(`(${res.status}) ${res.statusText}`)
            status = await res.text();
            try {
                let status = JSON.parse(status);
                status = status.message
            } catch (e) {
                // status = 'Error parsing json';
            }
            status = `ERROR: ${status}`;
        }

        this.view.getElementById('status').innerHTML = status;
    }

    async logout(event) {

        event.preventDefault();

        let res = await this.proxy.signout();
        let status;

        if (res.ok) status = 'INFO: Ha salido';        
        else {
            console.error(`(${res.status}) ${res.statusText}`)
            status = await res.text();
            try {
                status = JSON.parse(status).message;
            } catch (e) {
                // status = 'Error parsing json';
            }
            status = `ERROR: ${status}`;
        }

        this.view.getElementById('status').innerHTML = status;

    }

    selectTarea(tarea) {
        this.tarea = tarea;
        if (tarea) {
            document.getElementById('titulo').value = this.tarea.titulo;
            document.getElementById('descripcion').value = this.tarea.descripcion;
        } else {
            document.getElementById('titulo').value = '';
            document.getElementById('descripcion').value = '';
        }
    }

    // Botón de las basuritas
    async borrarClick() {
        // si hay una tarea seleccionada
        if (this.tarea) {
            // guarda la respuesta en response
            // 
            let response = await this.proxy.borrarTarea(this.tarea._id);
            // deselecciono 
            this.selectTarea(null);

            // si la respuesta no el satisfactoria -> error al borrar
            if (!response.ok) this.status = `ERROR: Error al borrar`;
            this.refresh();

        } else this.status = `ERROR: No hay tarea seleccionada`;

        // redirigir a borrar-tarea.html
    }


    async refresh() {

        // PROXY
        let tareas = await this.proxy.tareas();
        let tareasJSON = await tareas.json();

        console.log(tareasJSON)

        for (let tarea of tareasJSON) {
            /*let li = this.view.createElement('li');
            <tr>
                <td><a href="ver-tarea.html">Título Tarea 1</td>
                <td><a href="borrar-tarea.html">X</a></td>
            </tr>*/

            // mostramos las filas, los datos y los links de la tabla
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            let a = document.createElement('a');

            // Añadimos el título de la tarea como text del link
            a.innerHTML = tarea.titulo;

            //Añadimos el id de la tarea como parámetro en la dirección del enlace
            a.href = `ver-tarea.html?id=${tarea._id}`

            td.appendChild(a);
            tr.appendChild(td);

            let tbody = document.getElementById('tareas');
            tbody.appendChild(tr);

            let td2 = document.createElement('td');
            let a2 = document.createElement('a');

            a2.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
            //a2.innerHTML = 'X';  
            a2.href = `borrar-tarea.html?id=${tarea._id}`;

            td2.appendChild(a2);
            tr.appendChild(td2);
        }

    }

}

