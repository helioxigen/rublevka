const privatePropertiesCount = Math.floor(Math.random() * (30 - 11 + 1)) + 11;

export default {
  common: {
    title: {
      step1: 'Надоело искать?',
      step2: 'Спасибо!',
      step3: ', спасибо!',
    },
    description: {
      step1: 'Оставьте заявку — наш агент подберет все подходящие предложения и вышлет вам самые интересные',
      step2: 'Ваша заявка уже оформлена, но мы хотели бы с вами познакомиться. Как мы можем к вам обращаться?',
      step3: 'Скоро мы вам перезвоним',
    },
    button: {
      step1: 'Отправить',
      step2: 'Отправить',
    },
    eventName: {
      step1: 'resultSearchRequest2',
      step2: 'number_form',
    },
  },

  private: {
    title: {
      step1: 'Закрытые предложения',
      step2: 'Как с вами связаться?',
      step3: ', спасибо!',
    },
    description: {
      step1: `Мы нашли ${privatePropertiesCount} закрытых предложения по вашему запросу — отправим их на почту`,
      step2: 'На случай, если письмо не придет',
      step3: 'Письмо придет в течение 10 минут',
    },
    button: {
      step1: 'Отправить',
      step2: 'Получить предложения',
    },
    eventName: {
      step1: 'resultPrivateOffer',
      step2: 'hidden_objects_form',
    },
  },

  help: {
    title: {
      step1: 'Поможем выбрать дом',
      step2: 'Заявка оформлена',
      step3: ', спасибо!',
    },
    description: {
      step1: 'Оставьте номер телефона — наш агент позвонит и уточнит детали',
      step2: 'Скажите, как к вам обращаться?',
      step3: 'Скоро мы вам перезвоним',
    },
    button: {
      step1: 'Отправить',
      step2: 'Отправить',
    },
    eventName: {
      step1: 'resultSearchRequest1',
      step2: 'number_form',
    },
  },
};
