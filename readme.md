# Documento de Requerimientos: Proyecto de Calculadora en JavaScript

## 1. Descripción del Proyecto

El proyecto consiste en desarrollar una calculadora web utilizando HTML, CSS y JavaScript. La calculadora será un clon de la calculadora de iOS, replicando tanto su diseño como su funcionalidad básica. Se han realizado optimizaciones para mejorar el rendimiento y la usabilidad de la calculadora, como la gestión de errores y la limitación de caracteres en el display.

## 2. Objetivos del Proyecto

- Crear una calculadora funcional que realice operaciones aritméticas básicas: suma, resta, multiplicación y división.
- Replicar el diseño visual de la calculadora de iOS.
- Implementar la calculadora utilizando HTML, CSS y JavaScript puro.
- Mejorar la eficiencia del código mediante optimizaciones en la lógica de operaciones y la gestión del display.

## 3. Funcionalidades Requeridas

### 1. Interfaz de Usuario (UI)

- Pantalla de visualización de resultados.
- Botones numéricos del 0 al 9.
- Botones de operaciones aritméticas: suma (+), resta (−), multiplicación (×), y división (÷).
- Botón de porcentaje (%).
- Botón de cambio de signo (±).
- Botón de punto decimal (,).
- Botón de igual (=) para calcular el resultado.
- Botón de borrado (AC) para resetear la calculadora.
- Manejo de errores en las operaciones, mostrando "Error" en el display cuando sea necesario.

### 2. Interacción del Usuario

- Permitir a los usuarios introducir números y operaciones aritméticas a través de los botones.
- Mostrar los resultados de las operaciones en tiempo real en la pantalla de visualización.
- Manejar correctamente la secuencia de operaciones, respetando la precedencia aritmética básica.
- Limitar la cantidad de caracteres visibles en el display a un máximo de 13 para evitar el desbordamiento.
- Iniciar una nueva operación automáticamente si se ingresa un número después de un error.

## 4. Diseño de la Interfaz de Usuario

El diseño de la calculadora debe imitar el de la calculadora de iOS, con los siguientes elementos visuales:

### Pantalla de Visualización

- Color de fondo negro.
- Texto blanco y tamaño de fuente grande para los números y resultados.
- Gestión del display para limitar la cantidad de caracteres mostrados y asegurar que el contenido sea legible.

### Botones

- Botones numéricos y de operación en colores y disposición similares a los de iOS.
- Botones de acción (AC, ±, %, ÷, ×, −, +, =) en colores destacados (naranja para las operaciones, gris para funciones especiales, negro para números).

## 5. Tecnologías Utilizadas

- **HTML:** Estructura básica de la calculadora.
- **CSS:** Estilos para replicar el diseño visual de la calculadora de iOS.
- **JavaScript:** Lógica para el funcionamiento de la calculadora, optimizada para mejorar la experiencia del usuario y la eficiencia del código.

## 6. Pasos de Desarrollo

### 1. Configuración del Proyecto

- Crear los archivos básicos: `index.html`, `styles.css` y `script.js`.

### 2. Estructura HTML

- Definir la estructura básica del HTML para los botones y la pantalla de visualización.

### 3. Estilos CSS

- Aplicar estilos para replicar el diseño de la calculadora de iOS.

### 4. Lógica JavaScript

- Implementar la lógica para las operaciones aritméticas.
- Manejar la interacción del usuario con los botones.
- Actualizar la pantalla de visualización en tiempo real.
- Implementar la optimización del código, incluyendo:
  - Uso de un diccionario para la gestión de operaciones.
  - Limitar la longitud del texto en el display a un máximo de 13 caracteres.
  - Gestión de errores para evitar desbordamiento o resultados incorrectos.

## 7. Validación y Pruebas

- Verificar que todas las operaciones aritméticas se realizan correctamente.
- Asegurarse de que la interfaz de usuario sea intuitiva y responda adecuadamente a la interacción del usuario.
- Probar la calculadora con números grandes, decimales y divisiones por cero para asegurar la correcta gestión del display y de los errores.
- Probar el proyecto en diferentes navegadores para asegurar la compatibilidad.

## 8. Documentación

- Documentar el código para facilitar su comprensión y mantenimiento.
- Incluir comentarios explicativos en el código JavaScript, especialmente en las áreas optimizadas.

## 9. Entrega del Proyecto

- Entregar el proyecto completo con los archivos HTML, CSS y JavaScript.
- Incluir un archivo `README.md` con instrucciones sobre cómo ejecutar y probar la calculadora, así como las optimizaciones realizadas.
