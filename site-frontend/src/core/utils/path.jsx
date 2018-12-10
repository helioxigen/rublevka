// TODO: Remove this AS SOON as React-router 2.4.0 is out, replace it with router.isActive and withRouter HoF.
export const isActive = (url, exact) => {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  if (exact) return pathname === url;
  if (!exact) return pathname.startsWith(url);
};
