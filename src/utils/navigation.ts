export const startNavigation = () => {
  // Avisamos a la app que empezó un cambio de página para mostrar la capa de "cargando".
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('app:navigate:start'));
  }
};
