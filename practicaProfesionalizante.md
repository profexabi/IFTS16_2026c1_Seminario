# Proyecto practica profesionalizante para el IFTS 14

## Consigna
La propuesta es desarrollar (**individual o grupalmente**) una primera versino de un sistema de validacion de certificados para las capacitaciones y charlas que realiza el instituto

Para esta etapa, la idea es realizar una aplicacion lo mas simple posible. La idea es que todos los certificados emitidos lleven el mismo codigo QR.
Este QR dirige a una pagina web de validacion y ahi la persona que qquiera verificar un certificado ingreesara: numero y DNI

El sistema buscara esta info en una BBDD generada a partir de una planilla Excel que cargara el instituto.
Si los datos coinciden, mostrar que el certificado es valido y podra exhibir informacion como
- nombre del participante
- nombre de la capacitacion
- fecha de emision

Si no encuentra coincidencias, indicar que el certificado no es valido o no existe registro

La idea de esta practica es que trabajen con funcionalidades concretas y alcanzables en un mes:
- carga de excel
- almacenamiento de datos
- formulario de validacion
- consulta publica

Mas adelante, en futuras versiones, el proyecto podra tener una finalidad real y no quedar solamente como un ejercicio academico.
La idea es que finalizada esta primer version, el instituo pueda comenzar a utilizarlo para validar certificados de capacitaciones y charlas.

La idea es aprobechar para hacer este desarrollo dentro de los tiempos de la materia, dejando una base solida para poder escalar esta aplicacion mas adelante

---

## Resumen a desarrollar

1. **Codigo QR**: Debe dirigir a una pagina web de validacion

2. **Pagina web de validacion**: Web que contenga un pequeño formulario donde ingresen:
    - num de certificado
    - DNI

3. **Pagina de confirmacion** (con pdf opcional): Esto hara que chequee el excel el num de certificado y el dni y si los datos son correctos responda -> *Certificado valido entregado a X alumno*