import { RouteRecordRaw } from 'vue-router';
import { MenuCategory, MenuItem } from 'src/types/menuCategory';

import guidesRoutes from 'src/posts/guides/index.js';
import docsRoutes from 'src/posts/docs/index.js';

const buildPostsRoutes = (postsRoot: string, postsCategories: Array<MenuCategory>) => {
  const posts = postsCategories.map((cat) => cat.items).flat();
  const routes = [
    { path: '', name: postsRoot, component: () => import(`src/posts/${postsRoot}/index.vue`) },
    ...posts.map((post: MenuItem) => ({
      path: post.slug,
      name: `${postsRoot}-${post.slug}`,
      component: () => import(
        /* webpackMode: "lazy" */
        `src/posts/${postsRoot}/${post.slug}.vue`
      ),
    })),
  ];
  return routes;
};

const routes: RouteRecordRaw[] = [
  // Home
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'home', component: () => import('pages/Index.vue') }],
  },
  // Features
  {
    path: '/features',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Features.vue') }],
  },
  // Pricing
  {
    path: '/pricing',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Pricing.vue') }],
  },

  // Guides
  {
    path: '/guides',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Guides.vue'),
        children: buildPostsRoutes('guides', guidesRoutes),
      },
    ],
  },

  // Docs
  {
    path: '/docs',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Docs.vue'),
        children: buildPostsRoutes('docs', docsRoutes),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
