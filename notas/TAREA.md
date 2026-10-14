# Tarea: Mi componente interactivo

## Componente elegido

He elegido un **Gestor de Tareas Interactivo (To-Do List)** que permite al usuario agregar actividades, clasificarlas, marcarlas como completadas y eliminarlas de la interfaz en tiempo real.

## Version 1: solo DOM

En esta versión inicial se crea la estructura HTML base y se inserta una tarea estática de prueba usando JavaScript para verificar la manipulación básica del DOM.

```js
// tarea/app.js - Versión 1
const listaTareas = document.querySelector("#listaTareas");
const liPrueba = document.createElement("li");
liPrueba.textContent = "Tarea de prueba (Solo DOM)";
listaTareas.appendChild(liPrueba);
```

## Version 2: con eventos

En esta segunda versión se añade interactividad mediante formularios y eventos de escucha para que el usuario pueda escribir y añadir sus propias tareas a la lista sin recargar la página.

```js
// tarea/app.js - Versión 2
const formTarea = document.querySelector("#formTarea");
const txtTarea = document.querySelector("#txtTarea");
const listaTareas = document.querySelector("#listaTareas");
const msgError = document.querySelector("#msgError");

formTarea.addEventListener("submit", (e) => {
  e.preventDefault();
  const valor = txtTarea.value.trim();

  if (valor.length < 3) {
    msgError.textContent = "Error: Mínimo 3 letras.";
    return;
  }
  msgError.textContent = "";

  const li = document.createElement("li");
  li.textContent = valor;
  listaTareas.appendChild(li);
  formTarea.reset();
});
```

## Version 3: con clases y objetos

Versión final totalmente integrada. Se modela cada tarea como un objeto de la clase `Actividad`, organizando los datos de manera limpia, orientada a objetos, y permitiendo marcar o eliminar elementos individuales.

```js
// tarea/app.js - Versión 3 (Código Completo)
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

formTarea.addEventListener("submit", (e) => {
  e.preventDefault();
  const valor = txtTarea.value.trim();

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
    const li = document.createElement("li");
    li.textContent = t.obtenerTexto();
    if (t.completada) li.className = "completada";

    const btnCompletar = document.createElement("button");
    btnCompletar.textContent = "✓";
    btnCompletar.addEventListener("click", () => {
      t.marcarAlternar();
      renderizarLista();
    });

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.addEventListener("click", () => {
      const indice = arregloTareas.indexOf(t);
      if (indice > -1) arregloTareas.splice(indice, 1);
      renderizarLista();
    });

    li.appendChild(btnCompletar);
    li.appendChild(btnEliminar);
    listaTareas.appendChild(li);
  });
}
```

## Donde uso DOM, eventos y objetos

A continuación, se detalla qué parte del código final cumple con cada uno de los conceptos estudiados:

| Concepto   | Línea / Fragmento de Código                 | Para qué sirve en este proyecto                                                  |
| ---------- | ------------------------------------------- | -------------------------------------------------------------------------------- |
| **DOM**    | `document.createElement("li")`              | Crea dinámicamente un nodo de lista HTML en memoria para mostrar la tarea.       |
| **Evento** | `formTarea.addEventListener("submit", ...)` | Captura la acción de envío del formulario para procesar los datos ingresados.    |
| **Objeto** | `new Actividad(Date.now(), valor)`          | Instancia un objeto concreto a partir de la plantilla de clase con datos únicos. |

## Pruebas realizadas

Se realizaron los siguientes escenarios de prueba en la interfaz del componente para asegurar su correcto comportamiento:

| Caso / Acción                     | Resultado Esperado                                | Resultado Obtenido                                       | Cumple (Si/No) |
| --------------------------------- | ------------------------------------------------- | -------------------------------------------------------- | -------------- |
| Escribir "A" en el campo de texto | Aparece un mensaje dinámico de advertencia        | El texto "Escribiendo... es muy corto" apareció en rojo  | Sí             |
| Enviar un campo vacío             | Bloquear el registro e informar en la página      | No se agregó nada y mostró error de mínimo 3 caracteres  | Sí             |
| Agregar "Estudiar JS"             | Crear la tarea como pendiente en la lista         | La tarea apareció con el texto "Estudiar JS (Pendiente)" | Sí             |
| Presionar el botón "✓"            | Cambiar el estado visual y el texto de la tarea   | La tarea se tachó y el texto cambió a "(Completada)"     | Sí             |
| Presionar el botón "X"            | Eliminar completamente el elemento de la pantalla | El nodo fue removido de la interfaz de inmediato         | Sí             |

## Por que disene asi mi clase

Diseñé la clase `Actividad` con los atributos `id`, `descripcion` y `completada` porque permiten mantener un control preciso e independiente del estado de cada tarea. El método `marcarAlternar()` simplifica el cambio de estado lógico (`true`/`false`), mientras que `obtenerTexto()` encapsula la lógica de presentación, evitando llenar las funciones de renderizado del DOM con condicionales innecesarios.
