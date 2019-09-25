import React from 'react';

const Classification = React.lazy(() => import('./views/MachineLearning/Classification'));
const Extraction = React.lazy(() => import('./views/MachineLearning/Extraction'));
const RestApi = React.lazy(() => import('./views/Documentation/RestApi'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/machine-learning/classification', name: 'Classify', component: Classification },
  { path: '/machine-learning/extraction', name: 'TextExtraction', component: Extraction },
  { path: '/docs/rest-api', name: 'RestApi', component: RestApi },
];

export default routes;
