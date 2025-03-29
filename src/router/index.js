import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "Home",
      component: Home
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import("../views/Signup.vue"),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import("../views/Login.vue"),
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import("../views/Dashboard.vue")
    },
    {
      path: '/topic',
      name: 'Topic',
      component: () => import("../views/Topic.vue")
    },
    {
      path: '/progress',
      name: 'Progress',
      component: () => import("../views/Progress.vue")
    },
    {
      path: '/lesson/:lesson_id',
      name: 'Lesson',
      props: true,
      component: () => import("../views/LessonV2.vue")
    },
    {
      path: '/settings',
      name: 'Settings',
      props: true,
      component: () => import("../views/Setting.vue")
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import("../views/admin/Index.vue"),
      children: [
        {
          path: "dashboard",
          name: "DashboardAdmin",
          component: () => import("../views/admin/Dashboard.vue"),
        },
        {
          path: "login",
          name: "LoginAdmin",
          component: () => import("../views/admin/Login.vue"),
        },
        {
          path: "user",
          name: "UserAdmin",
          component: () => import("../views/admin/UserManager/Index.vue"),
        },
        {
          path: "topic",
          name: "TopicAdmin",
          component: () => import("../views/admin/TopicManager/Index.vue"),
        },
        {
          path: "progress",
          name: "ProgressAdmin",
          component: () => import("../views/admin/ProgressManager/Index.vue"),
        },
        {
          path: "lesson",
          name: "LessonAdmin",
          component: () => import("../views/admin/LessonManager/Index.vue"),
        },
        {
          path: "vocabulary",
          name: "VocabularyAdmin",
          component: () => import("../views/admin/VocabularyManager/Index.vue"),
        }
      ],
    }
  ],
});

export default router;
