# feature/remove-dashboard-smooth-nav

Documentación de cambios aplicados en esta rama.

## Objetivo

- Quitar todo lo de dashboard del frontend.
- Mejorar experiencia de navegación con carga y transición limpia.
- Mostrar carga clara al entrar por login/register.

## Cambios aplicados

- Se eliminó la ruta y archivo de dashboard: `/dashboard`.
- Login y registro ahora redirigen a inicio (`/`) cuando son exitosos.
- Se agregó estado de carga en botones de login y register.
- Se agregó overlay de carga para transición visual entre páginas.
- Se creó un link interno reutilizable para disparar transición al hacer click.

## Archivos creados

- `src/components/AppLink.tsx`
- `src/components/PageTransition.tsx`
- `src/utils/navigation.ts`

## Archivos modificados

- `src/hooks/useAuth.ts`
- `src/app/login/page.tsx`
- `src/app/register/page.tsx`
- `src/components/Navbar.tsx`
- `src/components/FlightCard.tsx`
- `src/app/purchase/confirmation/page.tsx`
- `src/app/forgot-password/page.tsx`
- `src/app/layout.tsx`

## Archivo eliminado

- `src/app/dashboard/page.tsx`

## Validación

- Build de producción correcto con `npm run build`.
