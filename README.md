# documentacion de reserva vuelos frontend

## feature/4-reservation-ui

En esta rama se hizo la fase 11: reservar y comprar.

Flujo de uso:

vuelo → reserva → pago → confirmación

### Qué se hizo

- Pantalla de reserva
- Formulario de pasajeros (de 1 a 5)
- Asiento opcional por pasajero
- Pantalla de pago
- Pantalla final de confirmación
- Colores ajustados para que en modo oscuro todo se vea bien

### Rutas de esta fase

| Ruta | Qué hace |
|------|----------|
| /reservation | Crear la reserva |
| /purchase | Completar el pago |
| /purchase/confirmation | Mostrar ticket y confirmación |

### Archivos que se tocaron

- src/app/reservation/page.tsx
- src/app/purchase/page.tsx
- src/app/purchase/confirmation/page.tsx
- src/components/FlightCard.tsx
- src/services/reservations.ts
- src/services/purchase.ts

### Resultado

- Ya funciona el paso completo de reserva y compra en frontend.
- Ya queda visible el resumen final después del pago.
