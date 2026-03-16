export const startNavigation = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('app:navigate:start'));
  }
};
