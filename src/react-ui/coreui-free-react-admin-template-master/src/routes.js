import React from 'react';

const Classification = React.lazy(() => import('./views/MachineLearning/Images/Classification/Classification'));
const Extraction = React.lazy(() => import('./views/MachineLearning/Images/Extraction/Extraction'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/machine-learning/classification', name: 'Classify', component: Classification },
  { path: '/machine-learning/extraction', name: 'TextExtraction', component: Extraction },
];

export default routes;
