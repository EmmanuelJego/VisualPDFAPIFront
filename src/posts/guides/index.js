import tools from 'src/resources/tools';

export default [
  {
    name: 'First steps',
    items: [
      { slug: 'authentication', name: 'Authentication' },
      { slug: 'api-workflow', name: 'API workflow' },
      { slug: 'pipelines', name: 'Pipelines' },
      { slug: 'credits-billing', name: 'Credits and billing' },
    ],
  },
  {
    name: 'Miscellaneous',
    items: [
      { slug: 'error-handling', name: 'Error handling' },
      { slug: 'page-instructions', name: 'Page instructions' },
      { slug: 'coordinates-sizes', name: 'Coordinates and sizes' },
      { slug: 'fonts', name: 'Fonts' },
    ],
  },
  {
    name: 'Tool guides',
    items: [
      ...tools.sort((a, b) => ((a.id && b.id && a.id > b.id) ? 1 : -1)).map((tool) => ({
        slug: tool.id,
        name: tool.name,
      })),
    ],
  },
];
