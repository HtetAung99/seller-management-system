import Layout from 'layout';
import DashboardPage from 'pages/dashboard';
import BlockPage from 'pages/block';
import Forbidden from 'pages/forbidden';
import LoginPage from 'pages/login';
import withGuard from 'services/auth/withGuard';
import { Role } from 'services/enums';
import VendorsPage from 'pages/vendors';
import ProductsPage from 'pages/products';
import UsersPage from 'pages/users';
import ReportsPage from 'pages/reports';
import NoMatch from 'pages/no-match';

/** @type {import('react-router-dom').RouteObject[]} */
const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: withGuard(<DashboardPage />, [Role.admin, Role.management]),
      },
      {
        path: 'products',
        element: withGuard(<ProductsPage />, [Role.admin, Role.management]),
      },
      {
        path: 'vendors',
        element: withGuard(<VendorsPage />, [Role.admin, Role.management]),
      },
      {
        path: 'users',
        element: withGuard(<UsersPage />, [Role.management]),
      },
      {
        path: 'reports',
        element: withGuard(<ReportsPage />, [Role.admin, Role.management]),
      },
      {
        path: '403',
        element: <Forbidden />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/block',
    element: <BlockPage />,
  },
  {
    path: '*',
    element: <NoMatch />,
  },
];

export default routes;
