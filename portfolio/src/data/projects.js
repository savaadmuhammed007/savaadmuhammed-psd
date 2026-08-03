// Automatically imports images from public/images.
// Drop new image files into that folder and they will appear in the Work grid.

const publicModules = import.meta.glob('../../public/images/*.{jpg,jpeg,png,webp,gif,svg,JPG,JPEG,PNG,WEBP,GIF,SVG}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const colors = ['var(--blue)', 'var(--orange)', 'var(--ink)'];

const IGNORED_NAMES = ['portrait', 'potrait', 'profile', 'avatar', 'sd'];

export const projects = Object.entries(publicModules)
  .filter(([path]) => {
    const filename = path.split('/').pop().replace(/\.[^/.]+$/, '').toLowerCase();
    return !IGNORED_NAMES.some((ignored) => filename.includes(ignored));
  })
  .map(([path, url], index) => {
    const filename = path.split('/').pop().replace(/\.[^/.]+$/, '');
    return {
      id: index + 1,
      index: String(index + 1).padStart(2, '0'),
      title: filename,
      color: colors[index % colors.length],
      image: url,
    };
  });

