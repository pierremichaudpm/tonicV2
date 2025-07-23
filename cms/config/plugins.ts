export default () => ({
  'i18n': {
    enabled: true,
    config: {
      defaultLocale: 'fr',
      locales: ['fr', 'en'],
    },
  },
  'upload': {
    enabled: true,
    config: {
      sizeLimit: 10 * 1024 * 1024, // 10MB
    },
  },
});
