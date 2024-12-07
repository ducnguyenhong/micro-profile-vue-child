import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './index.css';
import ProjectView from './pages/project';
import ProjectDetailView from './pages/project-detail';

const routes = [
  { path: '/', component: ProjectView },
  { path: '/:id', component: ProjectDetailView }
];

export const mountApp = (el: string, basePath: string = '/') => {
  const router = createRouter({
    history: createWebHistory(basePath),
    routes
  });

  const app = createApp(App);
  app.use(createPinia());
  app.use(router);
  app.mount(el);
};

export const unmountApp = (el: string) => {
  const container = document.querySelector(el);
  if (container) {
    container.innerHTML = '';
  }
};

mountApp('#vue-child-root');
