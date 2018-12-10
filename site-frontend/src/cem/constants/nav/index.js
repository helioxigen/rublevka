import * as showPolicies from './showPolicies';

export const menu = {
  dashboard: {
    text: 'Личный кабинет',
    url: '/',
  },

  reports: {
    text: 'Воронка продаж',
    url: '/reports/funnel',
  },

  contacts: {
    text: 'Контакты',
    url: '/contacts',
    children: [
      {
        text: 'Активные',
        url: '/contacts/lists/active',
        requiredPermissions: ['contact_destroy'],
      },
      {
        text: 'Архив',
        url: '/contacts/lists/archive',
        requiredPermissions: ['contact_show_archive'],
      },
    ],
  },

  client_leads: {
    text: 'Лиды',
    url: '/client_leads',
    children: [
      { text: 'Активные', url: '/client_leads/active' },
      { text: 'Обработанные', url: '/client_leads/processed' },
      {
        text: 'Отклонённые',
        url: '/client_leads/rejected',
        requiredPermissions: ['client_lead_show_archive'],
      },
      { text: 'Спам', url: '/client_leads/spam' },
    ],
    requiredPermissions: ['client_lead_show'],
  },

  deals: {
    url: '/deals',
    text: 'Сделки',
    children: [
      { text: 'Активные', url: '/deals' },
      { text: 'Состоявшиеся', url: '/deals/group/successful' },
      {
        text: 'Незаключённые',
        url: '/deals/group/unsuccessful',
        requiredPermissions: ['deal_show_archive'],
      },
    ],
    requiredPermissions: ['deal_show'],
  },

  tasks: {
    text: 'Задачи',
    url: '/tasks',
  },

  cityProperties: {
    url: '/properties/city',
    text: 'Городские объекты',
    children: [
      { text: 'Первичка', url: '/properties/city/initial' },
      { text: 'Вторичка', url: '/properties/city/resale' },
      { text: 'Удалённые', url: '/properties/city/removed' },
      { text: 'Все', url: '/properties/city/all' },
    ],
  },

  countryProperties: {
    url: '/properties/country',
    text: 'Загородные объекты',
    children: [
      { text: 'Первичка', url: '/properties/country/initial' },
      { text: 'Вторичка', url: '/properties/country/resale' },
      { text: 'Удалённые', url: '/properties/country/removed' },
      { text: 'Все', url: '/properties/country/all' },
    ],
  },

  orders: {
    url: '/requests',
    text: 'Заказы',
    children: [
      { text: 'Фото и планировки', url: '/requests/properties/images' },
      { text: 'Поиск объектов', url: '/requests/properties/search' },
      { text: 'Удаление объектов', url: '/requests/properties/to_remove' },
    ],
  },

  places: {
    text: 'Места',
    url: '/places',
    children: [
      { text: 'Страны', url: '/places/countries' },
      { text: 'Регионы', url: '/places/regions' },
      { text: 'Округа', url: '/places/districts' },
      { text: 'Шоссе', url: '/places/routes' },
      { text: 'Населенные пункты', url: '/places/localities' },
      { text: 'Районы', url: '/places/sub_localities' },
      { text: 'Метро', url: '/places/subways' },
      { text: 'Посёлки', url: '/places/settlements' },
      { text: 'Жилые комплексы', url: '/places/complexes' },
    ],
  },

  selections: {
    url: '/selections',
    text: 'Подборки',
  },

  newsLetters: {
    url: '/newsletters',
    text: 'Email-рассылки',
    // requiredPermissions: [`newsletter_show`],
  },

  staff: {
    url: '/staff',
    text: 'Сотрудники',
    children: [
      { text: 'Список', url: '/staff' },
      { text: 'График дежурств', url: '/staff/daily_duty' },
    ],
  },

  companies: {
    text: 'Компании',
    url: '/companies',
  },

  settings: {
    text: 'Настройки',
    url: '/settings',
    children: [
      {
        text: 'Департаменты',
        url: '/settings/departments',
        requiredPermissions: [
          'department_show',
          'department_create',
          'department_update',
          'department_destroy',
        ],
      },
      {
        text: 'Отделы',
        url: '/settings/divisions',
        requiredPermissions: [
          'division_show',
          'division_create',
          'division_update',
          'division_destroy',
        ],
      },
      {
        text: 'Должности',
        url: '/settings/positions',
        requiredPermissions: ['role_show', 'role_create', 'role_update', 'role_destroy'],
      },
      {
        text: 'Приложения',
        url: '/settings/applications',
        requiredPermissions: [
          'application_show',
          'application_create',
          'application_update',
          'application_destroy',
        ],
      },
      {
        text: 'Словари',
        url: '/settings/dictionaries',
        requiredPermissions: [
          'dictionary_item_create',
          'dictionary_item_update',
          'dictionary_item_destroy',
        ],
      },
      {
        text: 'Источники лидов',
        url: '/settings/lead_sources',
        requiredPermissions: [
          'client_lead_source_show',
          'client_lead_source_create',
          'client_lead_source_update',
          'client_lead_source_destroy',
        ],
      },
      {
        text: 'Пакеты выгрузок',
        url: '/settings/export_packages',
        requiredPermissions: ['export_create', 'export_update', 'export_destroy'],
      },
      {
        text: 'CSI-вопросы',
        url: '/settings/csi',
        requiredPermissions: ['csi_question_create', 'csi_question_update'],
      },
    ],
    showPolicy: showPolicies.HAS_ANY_CHILD_PERMISSION,
  },
};

export const menuOrder = [
  'dashboard',
  'reports',
  'contacts',
  'client_leads',
  'deals',
  'tasks',
  'cityProperties',
  'countryProperties',
  'orders',
  'places',
  'selections',
  'newsLetters',
  'staff',
  'companies',
  'settings',
];
