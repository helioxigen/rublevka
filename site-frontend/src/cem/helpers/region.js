export default function (name) {
  const region = name || '';
  return (region.slice(-2) || '') === 'ая' ? `${name} область` : name;
}
