import about from './about';
import aboutCity from './about/city';
import aboutCountry from './about/country';

export default {
  about,
  city: {
    about: aboutCity,
  },
  country: {
    about: aboutCountry,
  },
};
