# 🚀 Task Manager API – NestJS + PostgreSQL

API REST construida con **NestJS** siguiendo el **patrón de arquitectura hexagonal**.  
La aplicación crea **usuarios** y gestiona **tareas**, incluye validaciones robustas con `class-validator`, documentación con **Swagger**, y está completamente **dockerizada** para levantarse sin dependencias locales.

---

## 🛠️ Tecnologías utilizadas

- **[NestJS](https://nestjs.com/)** – Framework para Node.js modular y escalable.
- **[TypeORM](https://typeorm.io/)** – ORM para PostgreSQL.
- **PostgreSQL** – Base de datos relacional.
- **Docker & Docker Compose** – Contenedores para la API y la base de datos.
- **Swagger** – Documentación interactiva de la API.
- **Jest** – Testing unitario.
- **class-validator & class-transformer** – Validaciones automáticas en DTOs.

---

## ✅ Validaciones

- Los **DTOs** aplican validaciones con `class-validator`.
- Ejemplo:
  - El título de una tarea debe tener al menos 10 caracteres.
  - La fecha de vencimiento debe ser **posterior a hoy**.
  - El estado de la tarea (`status`) solo puede ser: `PENDING`, `IN_PROGRESS`, `DONE`.
- Errores devuelven respuestas claras (`400 Bad Request`, `409 Conflict`, `404 Not Found`).

---

## 📥 Instrucciones de instalación y ejecución

1. **Requisitos previos**
   - Tener instalado [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/).
   - Clonar este repositorio:
     ```bash
     git clone https://github.com/Yosipmikecolin/prueba-nest-hexagonal.git
     cd prueba-cun
     ```

2. **Configurar variables de entorno**
   - Crear un archivo `.env` en la raíz con:
     ```env
     DB_HOST=localhost
     DB_PORT=5432
     DB_USER=yosip
     DB_PASS=postgres
     DB_NAME=nest_db
     PORT=3000
     ```

3. **Levantar los servicios**
   - Ejecutar:
     ```bash
     npm run docker
     ```
   - Este comando construirá y levantará:
     - **API NestJS** en `http://localhost:3000`
     - **Base de datos PostgreSQL** en el puerto `5432`

4. **Verificar que los contenedores están corriendo**
   ```bash
   docker ps
   ```

## 📄 Documentación

La documentación de la API se encuentra en la siguiente ruta `http://localhost:3000/api/docs`
<br>
<br/>

## 🛞 Ejemplos de requests/responses

### 📌 Crear un usuario

**Request**

```http
POST /users
Content-Type: application/json

{
  "email":"colinparrado@gmail.com",
  "name":"Mike"
}
```

**Response**

```http
{
  "email": "colinparrado@gmail.com",
  "name": "Mike",
  "createdAt": "2025-09-12T16:39:10.178Z"
}
```

### 📌 Crear una tarea

**Request**

```http
POST /tasks
Content-Type: application/json

{
  "title":"Sacar al perro",
  "description":"LLevar bolsas",
  "dueDate":"2025-09-15",
  "userId":"06634b8e-2f21-4eeb-97f6-c88be12c2532"
}
```

**Response**

```http
{
  "title": "Sacar al perro",
  "description": "LLevar bolsas",
  "status": "PENDING",
  "dueDate": "2025-09-15",
  "userId": "06634b8e-2f21-4eeb-97f6-c88be12c2532",
  "isDeleted": false
}
```
