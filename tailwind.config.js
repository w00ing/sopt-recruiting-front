const customColors = {
  'primary-default': '#FA79B0',
  'primary-dark': '#F658A6',
  'secondary-default': '#FAB24C',
  surface: '#141414',
  'surface-light': '#3F3F3F',
  'on-surface': '#FFFFFF',
  'on-surface-dark': '#999999',
  label: '#9CA3AF',
};

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: customColors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
