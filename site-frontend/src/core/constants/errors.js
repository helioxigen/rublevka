const defaultLocale = 'ru';

const errors = {
  ru: {
    already_archived: 'Уже в архиве',
    call_not_in_progress: 'Статус звонка не в \"В процессе\"',
    cannot_apply_state: ({ from, to }) => from && to ? `Нельзя переместить в статус \"${to}\" из текущего статуса \"${from}\"` : 'Нельзя переместить в новый статус',
    cannot_delete_archived: 'Нельзя удалять из архива',
    cannot_update_state: 'Статус нельзя обновлять вручную',
    cannot_update_final_state: 'Cтатус нельзя обновлять после завершения',
    cannot_update_state_to_approved: 'Cтатус нельзя обновлять, заявка не новая',
    division_not_in_department: 'Отдел в другом департаменте',
    division_has_manager: 'Отдел уже имеет менеджера',
    invalid_email: 'Неверный email',
    invalid_password: 'Неверный пароль',
    nothing_to_approve: 'Уже подтверждено или отменено',
    nothing_to_disapprove: 'Уже подтверждено или отменено',
    not_enough_permissions: 'Недостаточно прав',
    not_a_responsible_user: 'Пользователь не ответственный',
    not_a_creator_user: 'Пользователь не создатель',
    waiting_to_approve: 'Уже ожидает подтверждения',
    value_cannot_be_edited: 'Значение не редактируемо',
    value_empty: 'Значение не должно быть пустым',
    value_invalid_email: 'Неверный формат email',
    value_invalid_uuid: 'Неверный ID',
    value_length_out_of_range: ({ from, to }) => `Значение вне допустимого диапазона (от ${from} до ${to})`,
    value_length_too_long: ({ to }) => `Значение больше ${to}`,
    value_length_too_short: ({ to }) => `Значение меньше ${to}`,
    value_less_than: 'Начало должно быть раньше конца',
    value_more_than: 'Конец должен быть позже начала',
    value_non_empty: 'Значение должно быть пустым',
    value_not_unique: 'Значение не уникально',
    resource_not_found: 'Ресурс не найден, обратитесь к разработчикам',
    tasks_in_to_do: 'Закройте все задачи',
  },
};

export const validationErrorCodes = [
  'value_cannot_be_edited',
  'value_empty',
  'value_invalid_email',
  'value_invalid_uuid',
  'value_length_out_of_range',
  'value_length_too_long',
  'value_length_too_short',
  'value_less_than',
  'value_more_than',
  'value_non_empty',
  'value_not_unique',
];

export default errors[defaultLocale];
