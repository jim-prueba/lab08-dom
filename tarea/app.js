// Clase Tarea que modela los datos de cada actividad
class Actividad {
  constructor(id, descripcion) {
    this.id = id;
    this.descripcion = descripcion;
    this.completada = false;
  }
  marcarAlternar() {
    this.completada = !this.completada;
  }
  obtenerTexto() {
    return (
      this.descripcion + (this.completada ? " (Completada)" : " (Pendiente)")
    );
  }
}

const arregloTareas = [];

const formTarea = document.querySelector("#formTarea");
const txtTarea = document.querySelector("#txtTarea");
const listaTareas = document.querySelector("#listaTareas");
const msgError = document.querySelector("#msgError");

// Evento 1: Submit (Envío del formulario)
formTarea.addEventListener("submit", (e) => {
  e.preventDefault();
  const valor = txtTarea.value.trim();

  // Validación del dato de entrada
  if (valor.length < 3) {
    msgError.textContent = "Error: La tarea debe tener al menos 3 caracteres.";
    msgError.className = "error";
    return;
  }
  msgError.textContent = "";

  const nuevaActividad = new Actividad(Date.now(), valor);
  arregloTareas.push(nuevaActividad);

  renderizarLista();
  formTarea.reset();
});

// Evento 2: Input (Cambio dinámico mientras el usuario escribe)
txtTarea.addEventListener("input", () => {
  if (txtTarea.value.length > 0 && txtTarea.value.length < 3) {
    msgError.textContent = "Escribiendo... es muy corto.";
    msgError.className = "error";
  } else {
    msgError.textContent = "";
  }
});

function renderizarLista() {
  listaTareas.innerHTML = "";

  arregloTareas.forEach((t) => {
    const li = document.createElement("li"); // Creación de elementos del DOM
    li.textContent = t.obtenerTexto();
    if (t.completada) li.className = "completada";

    // Evento 3: Click en botón para alternar estado
    const btnCompletar = document.createElement("button");
    btnCompletar.textContent = "✓";
    btnCompletar.addEventListener("click", () => {
      t.marcarAlternar();
      renderizarLista();
    });

    // Modificación/Eliminación: Botón para eliminar la tarea
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.addEventListener("click", () => {
      const indice = arregloTareas.indexOf(t);
      if (indice > -1) {
        arregloTareas.splice(indice, 1);
      }
      renderizarLista();
    });

    li.appendChild(btnCompletar);
    li.appendChild(btnEliminar);
    listaTareas.appendChild(li);
  });
}
