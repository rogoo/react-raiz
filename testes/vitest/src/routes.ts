import type { RouteObject } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import UserList from './components/UserList/UserList';
import UserForm from './components/UserForm/UserForm';
import EmailForm from './components/EmailForm/EmailForm';
import NotFound from './components/NotFound/NotFound';
import RouteErrorBoundary from './components/ErrorBoundary/RouteErrorBoundary';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    ErrorBoundary: RouteErrorBoundary,
    children: [
      { index: true, Component: Home },
      { path: 'users', Component: UserList },
      { path: 'users/new', Component: UserForm },
      { path: 'users/:id/edit', Component: UserForm },
      { path: 'email', Component: EmailForm },
      { path: '*', Component: NotFound },
    ],
  },
];

export default routes;
