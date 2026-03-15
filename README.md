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

## feature/3-flight-search

En esta rama se implementó la fase 10 de búsqueda de vuelos con listado optimizado y flujo de reserva.

### Funcionalidades implementadas

- Buscador de vuelos por origen, destino y fecha
- Carga inicial de vuelos en la página principal para usuarios autenticados
- Grid de resultados de 3 columnas
- Paginación incremental con botón "Mostrar más" (9 vuelos por bloque)
- Mantiene resultados anteriores al cargar más vuelos
- Tarjeta de vuelo rediseñada para lectura clara
- Flujo: buscar → ver resultados → reservar

### Rutas y flujo

| Ruta         | Descripción                                  |
|--------------|----------------------------------------------|
| /            | Home con vuelos (si hay sesión)              |
| /flights     | Explorador completo de búsqueda de vuelos    |
| /reservation | Pantalla con detalles del vuelo seleccionado |

### Archivos agregados/actualizados

- **src/components/FlightsExplorer.tsx**
- **src/components/FlightCard.tsx**
- **src/services/flights.ts**
- **src/app/page.tsx**
- **src/app/flights/page.tsx**
- **src/app/reservation/page.tsx**
- **src/components/Navbar.tsx**
- **src/hooks/useAuth.ts**
- **src/services/auth.ts**

### Resultado de la fase

- Usuario autenticado entra directo al listado de vuelos.
- Usuario no autenticado va a login.
- UI de búsqueda queda funcional, clara y lista para conectar compra completa.

## feature/4-reservation-ui

En esta rama se hizo la fase 11: reservar y comprar. El flujo ya está completo y se puede usar así:

**vuelo → reserva → pago → confirmación**

### Qué se agregó

- Pantalla de **reserva** con datos del vuelo
- Formulario para **1 a 5 pasajeros**
- Campo de asiento opcional por pasajero
- Cálculo de total estimado
- Pantalla de **pago** con formulario simple de tarjeta (simulado)
- Pantalla de **confirmación** con ticket y resumen final

### Rutas usadas en esta fase

| Ruta | Para qué sirve |
|------|----------------|
| /reservation | Completar la reserva del vuelo |
| /purchase | Hacer el pago de la reserva |
| /purchase/confirmation | Ver la confirmación y ticket |

### Archivos de esta fase

- src/app/reservation/page.tsx
- src/app/purchase/page.tsx
- src/app/purchase/confirmation/page.tsx
- src/components/FlightCard.tsx
- src/services/reservations.ts
- src/services/purchase.ts

### Resultado final

- Ya se puede crear una reserva desde frontend.
- Ya se puede completar compra simulada.
- Ya se muestra pantalla final de confirmación.
- Se mejoraron colores para que en modo oscuro sí se lea bien.

## feature/5-profile-ui

En esta rama se implementó la fase 12: perfil de usuario.

### Funcionalidades implementadas

- Ver perfil del usuario autenticado
- Editar nombre y teléfono
- Cambiar contraseña desde la pantalla de perfil
- Mensajes de éxito y error en acciones de perfil
- Protección de ruta con autenticación

### Ruta usada

| Ruta | Para qué sirve |
|------|----------------|
| /profile | Ver, editar perfil y cambiar contraseña |

### Archivos de esta fase

- src/app/profile/page.tsx
- src/services/profile.ts

### Resultado final

- El módulo de perfil quedó funcional en frontend.
- El usuario puede gestionar sus datos desde una sola pantalla.

## feature/remove-dashboard-smooth-nav

En esta rama se hizo limpieza del frontend para quitar dashboard y mejorar la experiencia al navegar.

### Cambios aplicados

- Se eliminó la página `/dashboard` del proyecto.
- Login y registro ahora redirigen a `/` al completar correctamente.
- Se agregó estado visual de carga en botones de login y registro.
- Se creó una transición global con overlay de carga al navegar entre páginas.
- Los links internos del frontend ahora usan un componente común para disparar la transición.

### Archivos creados

- src/components/AppLink.tsx
- src/components/PageTransition.tsx
- src/utils/navigation.ts

### Archivos actualizados

- src/hooks/useAuth.ts
- src/app/login/page.tsx
- src/app/register/page.tsx
- src/components/Navbar.tsx
- src/components/FlightCard.tsx
- src/app/purchase/confirmation/page.tsx
- src/app/forgot-password/page.tsx
- src/app/layout.tsx

### Archivos eliminados

- src/app/dashboard/page.tsx

### Validación

- Build de producción ejecutado con éxito (`npm run build`).
