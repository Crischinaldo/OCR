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
  ],
};

export default navigation;
