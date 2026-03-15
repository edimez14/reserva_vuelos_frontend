# documentacion de reserva vuelos frontend

## feature/1-frontend-setup

En esta rama se creó la estructura base del frontend con Next.js, TypeScript y Tailwind CSS. Se instaló Axios para las peticiones HTTP y se definieron las rutas principales de la aplicación.

### Tecnologías instaladas

- Next.js 14+ con App Router
- TypeScript
- Tailwind CSS
- Axios

### Rutas creadas

| Ruta         | Descripción                          |
|--------------|--------------------------------------|
| /login       | Página de inicio de sesión           |
| /register    | Página de registro de usuario        |
| /dashboard   | Panel principal después del login    |
| /flights     | Búsqueda y listado de vuelos         |
| /reservation | Formulario de reserva                |
| /purchase    | Confirmación y pago                  |
| /profile     | Visualización y edición de perfil    |

### Estructura de carpetas

```
frontend/
├── app/
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── flights/
│   │   └── page.tsx
│   ├── reservation/
│   │   └── page.tsx
│   ├── purchase/
│   │   └── page.tsx
│   ├── profile/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── Navbar.tsx
├── services/
│   └── api.ts
├── package.json
└── tailwind.config.js
```

### Archivos clave

- **app/layout.tsx**: Layout principal con Navbar incluido.
- **components/navbar.tsx**: Barra de navegación básica con enlaces a las rutas principales.
- **services/api.ts**: Configuración de Axios con la URL base del backend (desde variable de entorno `NEXT_PUBLIC_API_URL`).

## feature/2-auth-pages

En esta rama se implementó la fase 9 de autenticación en frontend con flujo completo de acceso de usuario.

### Funcionalidades implementadas

- Inicio de sesión con validación de errores
- Registro de usuario
- Recuperación de contraseña (forgot password)
- Restablecimiento de contraseña por enlace con `uid` y `token`
- Cierre de sesión
- Protección de páginas con guard de autenticación en cliente
- Manejo de sesión con `localStorage`

### Rutas de autenticación

| Ruta                         | Descripción                                   |
|-----------------------------|-----------------------------------------------|
| /login                      | Formulario de inicio de sesión                |
| /register                   | Formulario de registro                        |
| /forgot-password            | Solicitud de recuperación de contraseña       |
| /reset-password/[uid]/[token] | Formulario para nueva contraseña            |

### Archivos agregados/actualizados

- **src/app/login/page.tsx**
- **src/app/register/page.tsx**
- **src/app/forgot-password/page.tsx**
- **src/app/reset-password/[uid]/[token]/page.tsx**
- **src/hooks/useAuth.ts**
- **src/services/auth.ts**
- **src/components/AuthGuard.tsx**

### Resultado de la fase

- Usuario puede registrarse, iniciar sesión, cerrar sesión y recuperar contraseña.
- El frontend ya tiene el módulo de autenticación listo para integrarse con las pantallas privadas.