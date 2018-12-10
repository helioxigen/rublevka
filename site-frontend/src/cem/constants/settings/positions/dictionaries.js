export const permissionCategoryTitle = {
  city_property: 'Городские объекты',
  country_property: 'Загородные объекты',

  client_lead: 'Лиды',
  deal: 'Сделки',
  task: 'Задачи',
  contact: 'Контакты',
  company: 'Компании',

  staff_user: 'Сотрудники',
  daily_duty: 'Дежурства',

  department: 'Департаменты',
  division: 'Отделы',
  role: 'Должности',
  application: 'Приложения',

  images_order_city: 'Заявки на фотографии и планировки городских объектов',
  images_order_country: 'Заявки на фотографии и планировки загородных объектов',
  property_removal_order: 'Заявки на удаление объектов',
  property_search_order: 'Заявки на поиск объектов',
  hub: 'Хаб',

  country: 'Страны',
  region: 'Регионы',
  district: 'Округи',
  locality: 'Населенные пункты',
  sub_locality: 'Районы',
  route: 'Шоссе',
  settlement: 'Посёлки',
  complex: 'Жилые комплексы',
  complex_building: 'Корпусы ЖК',
  subway: 'Метро',

  selection: 'Подборки',
  newsletter: 'E-mail рассылки',

  dictionary_item: 'Словари',
  client_lead_source: 'Источники лидов',
  csi_question: 'CSI-вопросы',
  export: 'XML-выгрузки',
  event: 'События',
  other: 'Другое',
};

export const permissionType = {
  show: 'Просмотр',
  show_draft: 'Просмотр черновиков',
  create: 'Создание',
  update: 'Обновление',
  destroy: 'Удаление',
  photo_upload: 'Загрузка и изменение фотографий',
  contact_links: 'Просмотр и редактирование связанных контактов',
  links: 'Просмотр и редактирование связанных контактов',
  documents: 'Просмотр и загрузка документов',
  comments: 'Комментирование',
  change_logs: 'Просмотр истории изменений',
  image_upload: 'Загрузка и изменение фотографий',
  sensitive_data: 'Доступ к конфиденциальным данным',
  close: 'Закрытие задач без подтверждения',
  answers: 'Просмотр ответов на вопросы',
  supervisor_city: 'Управление городской недвижимостью',
  chief_city: 'Шеф-управление городской недвижимостью',
  supervisor_country: 'Управление загородной недвижимостью',
  chief_country: 'Шеф-управление загородной недвижимостью',
  initial_update: 'Обновление первички',
  property_export_without_logo: 'Экспорт презентаций без логотипа',
  sign_as_user: 'Вход под пользователем',
  archive: 'Архивирование',
  transfer: 'Передача другому пользователю',
  show_archive: 'Просмотр отклонённых',
  show_unsuccessful: 'Просмотр незаключённых',
  comagic: 'Comagic',
};

export const scopeTitle = {
  none: 'Не применяется',
  all: 'Все',
  own: 'Только свои',
  group: 'В рамках группы',
};

export const permissionsPerCategory = {
  city_property: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'show',
      messageType: 'show_draft',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'update',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'destroy',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'change_logs',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'contact_links',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'image_upload',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'documents',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'sensitive_data',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'initial_update',
      availableScopeIds: ['all', 'own', 'group'],
    },
  ],
  country_property: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'show',
      messageType: 'show_draft',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'update',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'destroy',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'change_logs',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'contact_links',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'image_upload',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'documents',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'sensitive_data',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'initial_update',
      availableScopeIds: ['all', 'own', 'group'],
    },
  ],

  client_lead: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'show',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'update',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'destroy',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'sensitive_data',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'show_archive',
      availableScopeIds: ['none'],
    },
  ],
  deal: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'show',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'update',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'destroy',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'sensitive_data',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'show_archive',
      messageType: 'show_unsuccessful',
      availableScopeIds: ['none'],
    },
  ],
  task: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'show',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'update',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'destroy',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'documents',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'comments',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'close',
      availableScopeIds: ['none'],
    },
    {
      type: 'transfer',
      availableScopeIds: ['all', 'own', 'group'],
    },
  ],
  contact: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'show',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'update',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'destroy',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'sensitive_data',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'photo_upload',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'links',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'documents',
      availableScopeIds: ['all', 'own', 'group'],
    },
  ],
  company: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'update',
      availableScopeIds: ['all', 'own', 'group'],
    },
  ],

  staff_user: [
    {
      type: 'show',
      availableScopeIds: ['none'],
    },
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'update',
      availableScopeIds: ['none'],
    },
    {
      type: 'destroy',
      availableScopeIds: ['none'],
    },
    {
      type: 'documents',
      availableScopeIds: ['none'],
    },
    {
      type: 'photo_upload',
      availableScopeIds: ['none'],
    },
  ],
  daily_duty: [
    {
      type: 'show',
      availableScopeIds: ['none'],
    },
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'update',
      availableScopeIds: ['none'],
    },
    {
      type: 'destroy',
      availableScopeIds: ['none'],
    },
  ],

  department: [
    {
      type: 'show',
      availableScopeIds: ['none'],
    },
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'update',
      availableScopeIds: ['none'],
    },
    {
      type: 'destroy',
      availableScopeIds: ['none'],
    },
  ],
  division: [
    {
      type: 'show',
      availableScopeIds: ['none'],
    },
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'update',
      availableScopeIds: ['none'],
    },
    {
      type: 'destroy',
      availableScopeIds: ['none'],
    },
  ],
  role: [
    {
      type: 'show',
      availableScopeIds: ['none'],
    },
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'update',
      availableScopeIds: ['none'],
    },
    {
      type: 'destroy',
      availableScopeIds: ['none'],
    },
  ],
  application: [
    {
      type: 'show',
      availableScopeIds: ['none'],
    },
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'update',
      availableScopeIds: ['none'],
    },
    {
      type: 'destroy',
      availableScopeIds: ['none'],
    },
  ],

  images_order_city: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'show',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'update',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'image_upload',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'comments',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'answers',
      availableScopeIds: ['all', 'own'],
    },
  ],
  images_order_country: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'show',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'update',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'image_upload',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'comments',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'answers',
      availableScopeIds: ['all', 'own'],
    },
  ],
  property_removal_order: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'show',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'update',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'comments',
      availableScopeIds: ['all', 'own'],
    },
  ],
  property_search_order: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'show',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'update',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'comments',
      availableScopeIds: ['all', 'own'],
    },
  ],
  hub: [
    {
      type: 'supervisor_city',
      availableScopeIds: ['all'],
    },
    {
      type: 'supervisor_country',
      availableScopeIds: ['all'],
    },
    {
      type: 'chief_city',
      availableScopeIds: ['all'],
    },
    {
      type: 'chief_country',
      availableScopeIds: ['all'],
    },
    {
      type: 'property_export_without_logo',
      useTypeAsPermissionId: true,
      availableScopeIds: ['all'],
    },
  ],

  country: [
    {
      type: 'create',
      availableScopeIds: ['all'],
    },
    {
      type: 'update',
      availableScopeIds: ['all'],
    },
  ],
  region: [
    {
      type: 'create',
      availableScopeIds: ['all'],
    },
    {
      type: 'update',
      availableScopeIds: ['all'],
    },
  ],
  district: [
    {
      type: 'create',
      availableScopeIds: ['all'],
    },
    {
      type: 'update',
      availableScopeIds: ['all'],
    },
  ],
  locality: [
    {
      type: 'create',
      availableScopeIds: ['all'],
    },
    {
      type: 'update',
      availableScopeIds: ['all'],
    },
  ],
  sub_locality: [
    {
      type: 'create',
      availableScopeIds: ['all'],
    },
    {
      type: 'update',
      availableScopeIds: ['all'],
    },
  ],
  route: [
    {
      type: 'create',
      availableScopeIds: ['all'],
    },
    {
      type: 'update',
      availableScopeIds: ['all'],
    },
  ],
  settlement: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'update',
      availableScopeIds: ['none'],
    },
    {
      type: 'destroy',
      availableScopeIds: ['none'],
    },
    {
      type: 'change_logs',
      availableScopeIds: ['none'],
    },
    {
      type: 'image_upload',
      availableScopeIds: ['none'],
    },
    {
      type: 'documents',
      availableScopeIds: ['none'],
    },
    {
      type: 'sensitive_data',
      availableScopeIds: ['none'],
    },
  ],
  complex: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'update',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'destroy',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'change_logs',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'image_upload',
      availableScopeIds: ['all', 'own'],
    },
  ],
  complex_building: [
    {
      type: 'create',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'update',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'destroy',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'change_logs',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'image_upload',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'documents',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'sensitive_data',
      availableScopeIds: ['all', 'own'],
    },
  ],
  subway: [
    {
      type: 'create',
      availableScopeIds: ['all'],
    },
    {
      type: 'update',
      availableScopeIds: ['all'],
    },
  ],

  selection: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'show',
      availableScopeIds: ['all', 'own'],
    },
    {
      type: 'update',
      availableScopeIds: ['all', 'own'],
    },
  ],

  newsletter: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'show',
      availableScopeIds: ['none'],
    },
    {
      type: 'update',
      availableScopeIds: ['none'],
    },
  ],

  dictionary_item: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'update',
      availableScopeIds: ['none'],
    },
  ],
  client_lead_source: [
    {
      type: 'show',
      availableScopeIds: ['none'],
    },
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'update',
      availableScopeIds: ['none'],
    },
    {
      type: 'destroy',
      availableScopeIds: ['none'],
    },
  ],
  csi_question: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'update',
      availableScopeIds: ['none'],
    },
  ],
  export: [
    {
      type: 'create',
      availableScopeIds: ['none'],
    },
    {
      type: 'update',
      availableScopeIds: ['all', 'own', 'group'],
    },
    {
      type: 'destroy',
      availableScopeIds: ['all', 'own', 'group'],
    },
  ],
  event: [
    {
      type: 'show',
      availableScopeIds: ['none'],
    },
  ],
  other: [
    {
      type: 'sign_as_user',
      useTypeAsPermissionId: true,
      availableScopeIds: ['none'],
    },
    {
      type: 'comagic',
      useTypeAsPermissionId: true,
      availableScopeIds: ['none'],
    },
  ],
};

export const permissionScopes = {
  city_property_show: ['all', 'own', 'group'],
  city_property_create: ['none'],
  city_property_update: ['all', 'own', 'group'],
  city_property_destroy: ['all', 'own', 'group'],
  city_property_change_logs: ['all', 'own', 'group'],
  city_property_contact_links: ['all', 'own', 'group'],
  city_property_image_upload: ['all', 'own', 'group'],
  city_property_documents: ['all', 'own', 'group'],
  city_property_sensitive_data: ['all', 'own', 'group'],
  city_property_initial_update: ['all', 'own', 'group'],

  country_property_show: ['all', 'own', 'group'],
  country_property_create: ['none'],
  country_property_update: ['all', 'own', 'group'],
  country_property_destroy: ['all', 'own', 'group'],
  country_property_change_logs: ['all', 'own', 'group'],
  country_property_contact_links: ['all', 'own', 'group'],
  country_property_image_upload: ['all', 'own', 'group'],
  country_property_documents: ['all', 'own', 'group'],
  country_property_sensitive_data: ['all', 'own', 'group'],
  country_property_initial_update: ['all', 'own', 'group'],

  complex_create: ['none'],
  complex_update: ['all', 'own'],
  complex_destroy: ['all', 'own'],
  complex_change_logs: ['all', 'own'],
  complex_image_upload: ['all', 'own'],

  complex_building_create: ['all', 'own'],
  complex_building_update: ['all', 'own'],
  complex_building_destroy: ['all', 'own'],
  complex_building_change_logs: ['all', 'own'],
  complex_building_image_upload: ['all', 'own'],
  complex_building_documents: ['all', 'own'],
  complex_building_sensitive_data: ['all', 'own'],

  settlement_create: ['none'],
  settlement_update: ['none'],
  settlement_destroy: ['none'],
  settlement_change_logs: ['none'],
  settlement_image_upload: ['none'],
  settlement_documents: ['none'],
  settlement_sensitive_data: ['none'],

  country_create: ['all'],
  country_update: ['all'],

  region_create: ['all'],
  region_update: ['all'],

  district_create: ['all'],
  district_update: ['all'],

  locality_create: ['all'],
  locality_update: ['all'],

  sub_locality_create: ['all'],
  sub_locality_update: ['all'],

  route_create: ['all'],
  route_update: ['all'],

  subway_create: ['all'],
  subway_update: ['all'],

  client_lead_create: ['none'],
  client_lead_show: ['all', 'own', 'group'],
  client_lead_update: ['all', 'own', 'group'],
  client_lead_destroy: ['all', 'own', 'group'],
  client_lead_sensitive_data: ['all', 'own', 'group'],
  client_lead_show_archive: ['none'],

  client_lead_source_create: ['none'],
  client_lead_source_show: ['none'],
  client_lead_source_update: ['none'],
  client_lead_source_destroy: ['none'],

  deal_create: ['none'],
  deal_show: ['all', 'own', 'group'],
  deal_update: ['all', 'own', 'group'],
  deal_destroy: ['all', 'own', 'group'],
  deal_sensitive_data: ['all', 'own', 'group'],
  deal_show_archive: ['none'],

  contact_create: ['none'],
  contact_show: ['all', 'own', 'group'],
  contact_update: ['all', 'own', 'group'],
  contact_destroy: ['all', 'own', 'group'],
  contact_sensitive_data: ['all', 'own', 'group'],
  contact_photo_upload: ['all', 'own', 'group'],
  contact_links: ['all', 'own', 'group'],
  contact_documents: ['all', 'own', 'group'],

  company_create: ['none'],
  company_update: ['all', 'own', 'group'],

  dictionary_item_create: ['none'],
  dictionary_item_update: ['none'],
  dictionary_item_destroy: ['none'],

  task_create: ['none'],
  task_show: ['all', 'own', 'group'],
  task_update: ['all', 'own', 'group'],
  task_destroy: ['all', 'own', 'group'],
  task_documents: ['all', 'own', 'group'],
  task_comments: ['all', 'own', 'group'],
  task_close: ['none'],
  task_transfer: ['all', 'own', 'group'],

  department_create: ['none'],
  department_show: ['none'],
  department_update: ['none'],
  department_destroy: ['none'],

  division_create: ['none'],
  division_show: ['none'],
  division_update: ['none'],
  division_destroy: ['none'],

  role_create: ['none'],
  role_show: ['none'],
  role_update: ['none'],
  role_destroy: ['none'],

  application_create: ['none'],
  application_show: ['none'],
  application_update: ['none'],
  application_destroy: ['none'],

  staff_user_create: ['none'],
  staff_user_show: ['none'],
  staff_user_update: ['none'],
  staff_user_destroy: ['none'],
  staff_user_documents: ['none'],
  staff_user_photo_upload: ['none'],

  daily_duty_create: ['none'],
  daily_duty_show: ['none'],
  daily_duty_update: ['none'],
  daily_duty_destroy: ['none'],

  event_show: ['none'],

  images_order_country_answers: ['all', 'own'],
  images_order_country_comments: ['all', 'own'],
  images_order_country_create: ['none'],
  images_order_country_image_upload: ['all', 'own'],
  images_order_country_show: ['all', 'own'],
  images_order_country_update: ['all', 'own'],

  images_order_city_answers: ['all', 'own'],
  images_order_city_comments: ['all', 'own'],
  images_order_city_create: ['none'],
  images_order_city_image_upload: ['all', 'own'],
  images_order_city_show: ['all', 'own'],
  images_order_city_update: ['all', 'own'],

  csi_question_create: ['none'],
  csi_question_update: ['none'],

  property_removal_order_show: ['all', 'own'],
  property_removal_order_comments: ['all', 'own'],
  property_removal_order_create: ['none'],
  property_removal_order_update: ['all', 'own'],

  property_search_order_create: ['none'],
  property_search_order_show: ['all', 'own'],
  property_search_order_update: ['all', 'own'],
  property_search_order_comments: ['all', 'own'],

  hub_supervisor_city: ['all'],
  hub_supervisor_country: ['all'],
  hub_chief_city: ['all'],
  hub_chief_country: ['all'],
  property_export_without_logo: ['all'],

  sign_as_user: ['none'],
  comagic: ['none'],

  export_create: ['none'],
  export_update: ['all', 'own', 'group'],
  export_destroy: ['all', 'own', 'group'],

  selection_create: ['none'],
  selection_update: ['all', 'own'],

  newsletter_create: ['none'],
  newsletter_show: ['none'],
  newsletter_update: ['none'],
};
