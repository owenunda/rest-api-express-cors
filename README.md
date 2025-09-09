# API REST con Express, CORS y Validaciones

Este es un proyecto de estudio para crear una API REST utilizando Express. El objetivo principal es aprender y practicar conceptos como:

- Creación de endpoints (GET, POST, PATCH, DELETE).
- Middlewares en Express.
- Gestión de CORS (Cross-Origin Resource Sharing) para permitir peticiones desde diferentes orígenes.
- Validación de datos de entrada utilizando la librería `zod`.
- Creación de un esquema de validación para los datos.

## Instalación

1. Clona este repositorio.
2. Instala las dependencias utilizando pnpm:

```bash
pnpm install
```

## Uso

Para iniciar el servidor en modo de desarrollo (con recarga automática), ejecuta:

```bash
pnpm run dev
```

El servidor se iniciará en `http://localhost:3000`.

## Endpoints

La API gestiona una colección de películas.

- `GET /movies`: Obtiene todas las películas. Permite filtrar por género a través de un query param `genre`.
- `GET /movies/:id`: Obtiene una película por su ID.
- `POST /movies`: Crea una nueva película. Los datos de la película deben enviarse en el body de la petición y son validados con `zod`.
- `PATCH /movies/:id`: Actualiza parcialmente una película por su ID. Los datos a actualizar se envían en el body y son validados.
- `DELETE /movies/:id`: Elimina una película por su ID.

## CORS

La configuración de CORS se encuentra en `app.js` y está implementada para permitir peticiones solo desde orígenes específicos. Esto se hace para controlar qué dominios pueden acceder a los recursos de la API.

Se utiliza el paquete `cors` de Express para gestionar las políticas de CORS. En el código se pueden encontrar ejemplos de cómo permitir:

- Cualquier origen (no recomendado para producción).
- Un único origen.
- Múltiples orígenes.
- Una validación personalizada de orígenes.

## Validaciones

Las validaciones de los datos de entrada para los endpoints `POST` y `PATCH` se realizan con `zod`. Los esquemas de validación se encuentran en el directorio `schemas/`. Esto asegura que los datos que llegan a la API tienen el formato y tipo correctos antes de ser procesados.