# documentacion de reserva vuelos frontend

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
- Navbar se actualiza al iniciar/cerrar sesión sin refrescar

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
