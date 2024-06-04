const regularIcons = {
  externalLink: 'fa-arrow-up-right-from-square',
  badgeCheck: 'fa-badge-check',
  chart: 'fa-chart-simple',
  notification: 'fa-bell-on',
  gearCode: 'fa-gear-code',
  gear: 'fa-gear',
  wrench: 'fa-wrench',
  coin: 'fa-coin',
  clock: 'fa-clock',
  arrowRight: 'fa-arrow-right',
  home: 'fa-house',
  logout: 'fa-arrow-right-from-bracket',
  menu: 'fa-bars',
  cross: 'fa-xmark',
  feedback: 'fa-messages-question',
  export: 'fa-file-export',
  database: 'fa-database',
  shieldLock: 'fa-shield-keyhole',
  questionCircle: 'fa-circle-question',
  download: 'fa-download',
  mail: 'fa-envelope',
  messages: 'fa-messages',
};

Object.keys(regularIcons).forEach((key) => {
  regularIcons[key] = `far ${regularIcons[key]}`;
});

export default {
  ...regularIcons,
};
