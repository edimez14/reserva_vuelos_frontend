# documentacion de reserva vuelos frontend

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