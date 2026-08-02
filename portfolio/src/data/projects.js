// Automatically imports ALL images inside src/assets/images/
// Simply drop any image (.jpg, .jpeg, .png, .webp, .gif, .svg) into src/assets/images/
// and it will instantly appear in the website's grid section!

const globModules = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp,gif,svg,JPG,JPEG,PNG,WEBP,GIF,SVG}', {
  eager: true,
  import: 'default',
});

const colors = ['var(--blue)', 'var(--orange)', 'var(--ink)'];

export const projects = Object.entries(globModules).map(([path, url], index) => {
  const filename = path.split('/').pop().replace(/\.[^/.]+$/, '');
  return {
    id: index + 1,
    index: String(index + 1).padStart(2, '0'),
    title: filename,
    color: colors[index % colors.length],
    image: url,
  };
});
