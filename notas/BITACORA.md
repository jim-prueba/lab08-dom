# Bitacora de JavaScript interactivo

Laboratorio 08: JavaScript Interactivo DOM, Eventos y Objetos.
Navegador usado: Google Chrome (o el que uses)

## Ejercicio 2: Seleccionar y modificar el DOM

| Instruccion                  | Que cambio en la pantalla                     | Se mantiene al recargar (Si/No) |
| ---------------------------- | --------------------------------------------- | ------------------------------- |
| textContent desde la consola | El título cambió a "Hola desde la consola"    | No                              |
| textContent desde app.js     | El título cambió a "Hola TECSUP"              | Sí                              |
| style.color                  | El título se puso de color azul               | Sí                              |
| classList.add                | El párrafo tomó un fondo amarillo tenue       | Sí                              |
| createElement + appendChild  | Se agregó el elemento "JavaScript" a la lista | Sí                              |

## Ejercicio 3: Evento click

| Tipo de evento | Que accion lo dispara                | Cuanto suma por accion             |
| -------------- | ------------------------------------ | ---------------------------------- |
| click          | Un clic sobre el botón               | Suma 1                             |
| dblclick       | Doble clic rápido sobre el botón     | Suma 1 (por cada doble clic)       |
| mouseover      | Solo pasar el puntero sobre el botón | Suma 1 cada vez que entra el mouse |

- `evento.type` mostro el nombre de la acción ejecutada.
- `evento.target` mostro el elemento HTML exacto que recibio la acción (el elemento `<button id="btnSumar">`).

## Ejercicio 4: Eventos input y submit

| Prueba                                  | Que paso en la pantalla                                           | Se recargo la pagina (Si/No) |
| --------------------------------------- | ----------------------------------------------------------------- | ---------------------------- |
| Escribir en el campo nombre             | El saludo se actualizaba en tiempo real                           | No                           |
| Enviar sin preventDefault               | El mensaje apareció un momento y la pagina se limpió por completo | Sí                           |
| Enviar con preventDefault, correo sin @ | Se mostró un texto en rojo diciendo "Correo no valido: falta @"   | No                           |
| Enviar con preventDefault, correo con @ | Se mostró el texto en negro "Enviado: correo@ejemplo.com"         | No                           |

## Ejercicio 5: Clases y objetos

| Objeto  | nombre  | precio | descripcion()       | conDescuento(0.25) |
| ------- | ------- | ------ | ------------------- | ------------------ |
| laptop  | Laptop  | 2500   | Laptop - S/ 2500.00 | 1875.00            |
| mouse   | Mouse   | 45     | Mouse - S/ 45.00    | 33.75              |
| teclado | Teclado | 120    | Teclado - S/ 120.00 | 90.00              |
| monitor | Monitor | 680    | Monitor - S/ 680.00 | 510.00             |

**Ventaja de usar clases:** Centraliza la estructura y las acciones de los datos. Si se necesita modificar el formato del precio o agregar un método, solo se hace una vez en la clase en lugar de cambiar cada fila de HTML a mano.

## Ejercicio 6: DOM, eventos y objetos juntos

| Prueba          | Total que muestra la pagina                  | Correcto (Si/No) |
| --------------- | -------------------------------------------- | ---------------- |
| Cuaderno 12.50  | 12.50                                        | Sí               |
| + Lapicero 3.20 | 15.70                                        | Sí               |
| + Mochila 89.90 | 105.60                                       | Sí               |
| Sin Number()    | No se muestra el producto / Error en consola | No               |

| Pieza  | Linea de tu codigo donde aparece               | Para que sirve                                               |
| ------ | ---------------------------------------------- | ------------------------------------------------------------ |
| DOM    | `document.createElement("li")`                 | Crea un nuevo nodo de lista de forma dinámica en la memoria. |
| Evento | `formProducto.addEventListener("submit", ...)` | Escucha el envío del formulario para procesar los datos.     |
| Objeto | `new Producto(...)`                            | Instancia un nuevo objeto con los valores del formulario.    |
