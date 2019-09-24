const navigation = {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'Machine Learning',
      icon: 'icon-cloud',
      children: [
        {
          name: 'Classification',
          url: '/machine-learning/classification',
          icon: 'icon-calculator',
        },
        ]
    },
     {
      name: 'Statistics',
      url: '/statistic',
      icon: 'icon-chart',
    },
    {
      name: 'Documentation',
      title: true,
    },
    {
      name: 'Services',
      url: '/docs/rest-api',
      icon: 'icon-layers',
    },
  ],
};

export default navigation;
