# WhatDidYouMean
What Did You Mean?

Programa que interpreta instrucciones de una lista de comandos:

- vi
- dd
- grep
- cron
- df
- chmod
- ping
- ls
- gzip
- nslookup
- traceroute
- wget

Si el usuario se equivoca al ingresar un comando, se debe sugerir el uso correcto del mismo, tolerando un margen de error de dos letras de distancia en el teclado QWERTY.
El sistema recuerda y resugiere las opciones que ha aprendido.

## Requisitos
* Node 8 up

## Como utilizar
Correr `node index.js` y luego ingresar el comando seleccionado de la lista junto a sus atributos.
Por ejemplo: `ls -A`


