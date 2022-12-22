Respuestas para la consigna 2:

1. Profiling con node process profiling:

Ponemos a andar el servidor con node --prof src/app.js

Le pegamos con artillery a la siguiente ruta: artillery quick --count 50 -n 20 "http://localhost:8080/info/console" desde una consola aparte.

Matamos el servidor que esta corriendo.

Renombramos el archivo 'isolate....log' a profilingConsole.log

Procesamos el profiling hecho y lo guardamos en un archivo de texto con el comando: node --prof-process profilingConsole.log > profilingConsole.txt

... y repetimos para la ruta http://localhost:8080/info/noconsole:

Echamos a andar el servidor con node --prof src/app.js

Le pegamos con artillery a la siguiente ruta: artillery quick --count 50 -n 20 "http://localhost:8080/info/noconsole" desde una consola aparte.

Matamos el servidor que esta corriendo.

Renombramos el archivo 'isolate....log' a profilingNoConsole.log

Procesamos el profiling hecho y lo guardamos en un archivo de texto con el comando: node --prof-process profilingNoConsole.log > profilingNoConsole.txt

Los resultados obtenidos son:

Con console.log:

[ SE ADJUNTA CAPTURA: profilingConsole.txt]

Sin console.log:

[ SE ADJUNTA CAPTURA: profiling-process-NoConsole.png]

2. Resultado con node inspect desde el navegador:

Ponemos al servidor node en escucha en modo inspect con: node --inspect src/app.js

Abrimos desde el navegador las 'dedicated dev tools for node'.

Damos click en 'Start' comenzar a grabar.

Desde una consola nueva echamos a andar artillery haciendo peticiones a la ruta con console.log con el comando: artillery quick --count 50 -n 20 "http://localhost:8080/info/console"

Acto seguido corremos el comando para llamar a la ruta sin console.log con el comando: artillery quick --count 50 -n 20 "http://localhost:8080/info/noconsole"

Volvemos al navegador y damos click en 'Stop' para detener la grabacion.

Los resultados son los siguientes:

[SE ADJUNTA CAPTURA: resultado-profiler-chrome.png]

Conslusion: El tiempo de ejecucion es claramente menor si no tiene los console.log
