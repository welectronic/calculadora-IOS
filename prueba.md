# Prueba Técnica para Desarrolladores Junior en HTML, CSS y JavaScript

## Sección 1: HTML

### 1.1 Parte Práctica

1. **Estructura Básica:**
   - Crea una página HTML básica que tenga los siguientes elementos:
     - Un encabezado principal (`<h1>`) con el título "Bienvenido a [Nombre de la Empresa]".
     - Una lista no ordenada con tres beneficios de trabajar en la empresa.
     - Un formulario con los campos de **Nombre**, **Correo electrónico** y **Mensaje**, y un botón para enviar el formulario.

2. **Enlaces e Imágenes:**
   - Agrega un enlace a la página de contacto de la empresa.
   - Inserta una imagen (puede ser un logo de ejemplo) y haz que al hacer clic sobre ella se redirija a la página principal de la empresa.

### 1.2 Parte Teórica

1. ¿Cuál es la diferencia entre las etiquetas `<div>` y `<span>`?
2. ¿Para qué sirve la etiqueta `<meta>` y cómo afecta a una página web?
3. ¿Qué es la accesibilidad web y por qué es importante en HTML? Da ejemplos de cómo mejorarla en un formulario.
4. Explica qué es y para qué se usa el atributo `alt` en la etiqueta `<img>`.

---

## Sección 2: CSS

### 2.1 Parte Práctica

1. **Estilización Básica:**
   - Aplica un estilo general para que todos los elementos `<h1>` tengan un color de texto azul (`#1a73e8`) y estén centrados en la página.
   - Estiliza los elementos de la lista no ordenada para que tengan círculos en lugar de puntos y un margen de 20px entre ellos.

2. **Diseño Responsivo:**
   - Usa CSS media queries para que, cuando el ancho de la pantalla sea menor a 600px, el formulario se muestre en una columna, ocupando el 100% del ancho.
   - Para pantallas mayores a 600px, haz que los campos de texto tengan un ancho del 50% y estén alineados en el centro.

### 2.2 Parte Teórica

1. Explica la diferencia entre `margin` y `padding` en CSS.
2. ¿Qué es el modelo de caja (box model) y por qué es importante en CSS?
3. ¿Cuáles son las diferencias entre las propiedades de `position`: `relative`, `absolute`, `fixed` y `sticky`? Da ejemplos de cuándo usar cada una.
4. ¿Qué es un `flexbox` y cómo se diferencia de `grid`? ¿En qué situaciones utilizarías uno sobre el otro?

---

## Sección 3: JavaScript

### 3.1 Parte Práctica

1. **Validación de Formulario:**
   - Agrega una validación para que, al hacer clic en el botón de enviar, el formulario verifique que los campos **Nombre** y **Correo electrónico** no estén vacíos.
   - Si alguno de estos campos está vacío, muestra un mensaje de error debajo del campo correspondiente.

2. **Interactividad con el DOM:**
   - Crea un botón en la página que diga "Mostrar Beneficios".
   - Al hacer clic en el botón, los elementos de la lista de beneficios deben aparecer con un efecto de deslizamiento hacia abajo. Si se hace clic nuevamente, deben ocultarse.

### 3.2 Parte Teórica

1. **Hoisting:**
   - ¿Qué es el `hoisting` en JavaScript? Explica cómo funciona para variables y funciones.
   - ¿Qué valor imprimirá el siguiente código y por qué?

     ```javascript
     console.log(x);
     var x = 5;
     ```

2. **Scope (Alcance):**
   - ¿Cuál es la diferencia entre el scope global, local y de bloque en JavaScript?
   - Dado el siguiente código, ¿qué valor tendrá `x` y por qué?

     ```javascript
     let x = 1;
     if (x === 1) {
       let x = 2;
       console.log(x);
     }
     console.log(x);
     ```

3. **`this`:**
   - ¿Qué es `this` en JavaScript? Explica cómo cambia el contexto en una función regular y en una función de flecha (`arrow function`).
   - ¿Qué imprimirá el siguiente código y por qué?

     ```javascript
     const obj = {
       value: 10,
       logValue: function() {
         console.log(this.value);
       }
     };
     obj.logValue();
     const log = obj.logValue;
     log();
     ```

4. **`bind`, `call` y `apply`:**
   - ¿Para qué se usan los métodos `bind`, `call` y `apply`? Da un ejemplo de cuándo usarías cada uno.
   - Dado el siguiente código, ¿qué imprimirá y por qué?

     ```javascript
     const person = {
       name: "Carlos",
       greet: function(greeting) {
         console.log(`${greeting}, mi nombre es ${this.name}`);
       }
     };
     const otherPerson = { name: "Ana" };
     person.greet.call(otherPerson, "Hola");
     ```

5. **Avanzado:**
   - **Closures:** Explica qué es un closure en JavaScript y para qué puede ser útil.
   - **Funciones de Primera Clase y Orden Superior:** ¿Qué significa que JavaScript tenga funciones de primera clase? ¿Qué es una función de orden superior?
   - **Currying:** ¿Qué es el currying en JavaScript? Da un ejemplo práctico.
   - **Inmutabilidad y Mutabilidad:** Explica la diferencia entre mutabilidad e inmutabilidad en JavaScript. ¿Cómo afecta esto al uso de objetos y arrays?
   - **Prototipos y Herencia Prototípica:** ¿Qué es un prototipo en JavaScript y cómo funciona la herencia prototípica? Da un ejemplo de cómo crear un objeto que herede de otro.

---

## Sección 4: Problemas Combinados de HTML, CSS y JavaScript

### 4.1 Parte Práctica

1. **Mini Proyecto Completo:**
   - Crea una página web donde los usuarios puedan agregar elementos a una lista de tareas.
   - La página debe incluir:
     - Un formulario donde el usuario pueda escribir una tarea y un botón para agregarla a la lista.
     - Una lista donde se muestran todas las tareas agregadas. Cada tarea debe tener un botón de eliminar.
     - Estilos básicos para que la lista de tareas esté centrada y tenga un fondo colorido.
     - Un comportamiento que resalte las tareas completadas cuando se les haga clic.

### 4.2 Parte Teórica

1. Describe cómo utilizarías `localStorage` o `sessionStorage` para almacenar la lista de tareas para que persista incluso después de recargar la página.
2. Explica cómo el rendimiento de una página puede verse afectado por el uso excesivo de JavaScript y cómo optimizar el uso de scripts.
