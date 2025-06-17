# Gaming Server

_An Easy Boot2Root box for beginners_

Esta máquina es un _capture the flag_ clásico, sin ayudas ni guías de como tienes que ir haciendolo.

## Análisis

Empezamos el análisis con un escaneo de puertos, y encontramos la siguiente información:

![alt text](img/image.png)

Tenemos el puerto 22 y el 80, investiguemos el `Apache` primero:

![alt text](img/image-1.png)

Tenemos mucho donde investigar, primero miraré el código fuente en busca de información.

![alt text](img/image-2.png)
> Posible usuario.

![alt text](img/image-3.png)

![alt text](img/image-4.png)

![alt text](img/image-5.png)

Un manifiesto hacker, un diccionario y una foto. Entiendo que el diccionario es para hacer hydra con john, pero el resto voy a analizarlo debidamente.

Parece que la foto tiene algo escondido, voy ha hacerle un `stegcracker` mientras continuamos.

Le hacemos un `gobuster` a la página principal:

![alt text](img/image-6.png)

![alt text](img/image-7.png)
> :)

![alt text](img/image-8.png)
![alt text](img/image-9.png)

Parece una clave RSA, podríamos usarla para iniciar sesión con john, pero antes tenemos que `crakearla`:

![alt text](img/image-10.png)

El diccionario era para esto al final.

Le cambiamos los permisos al archivo e iniciamos sesión con esa contraseña:

![alt text](img/image-11.png)

Genial, ya estamos dentro del sistema y solo queda escalar privilegios.

![alt text](img/image-12.png)

Al no tener la contraseña del usuario se nos dificulta mucho la escalada, pero vemos que pertenece al grupo _lxd_. Encontramos este [exploit](https://www.exploit-db.com/exploits/46978):

![alt text](img/image-13.png)

Nos lo descargamos, lo pasamos a la máquina con `python3 -m http.server` y lo ejecutamos:

![alt text](img/image-14.png)
> ...

Vale, tenemos que seguir los pasos que indica el exploit:

![alt text](img/image-15.png)

1. Descargar la build de apline

![alt text](img/image-16.png)

2. _Construir_ alpine

![alt text](img/image-17.png)

3. Iniciar el script en la máquina victima

Sigue sin funcionar.