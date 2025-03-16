# Frontend

## Descripción del Proyecto

Es la interfaz de usuario para gestionar notas personales de forma sencilla e intuitiva. Esta aplicación web permite a los usuarios registrarse, autenticarse y administrar sus notas mediante una experiencia visual atractiva. Este proyecto contiene únicamente el código del frontend y se conecta a una API RESTful.

## 🛠️ Stack

- React.js
- Tailwind CSS
- React Hook Form
- Fetch API (para consumir la API REST)
- React Router

## Ejecución

1. **Instalar las dependencias**

    ```bash
    npm install
    ```

2. **Correr la aplicación**

    ```bash
    npm run dev
    ```

3. Accede a la aplicación en `http://localhost:5173`.  
   Asegúrate de que la API REST (Backend) esté corriendo y accesible (por ejemplo, en `http://localhost:4000`), ya que el frontend consume sus endpoints.

## Notas Adicionales

- Verifica que las URLs de la API definidas en el archivo `services/api.js` estén correctamente configuradas.
- La autenticación se realiza mediante JWT, el cual se almacena en el `localStorage` para proteger las rutas.
