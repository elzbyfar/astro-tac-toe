module.exports = {
  plugins: ["prettier-plugin-tailwindcss", require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};

module.exports = {
  tailwindAttributes: ["myClassList"],
};

module.exports = {
  tailwindConfig: "./tailwind.config.js",
};
