import api from '@api';
import { navigate } from '@utils';

export const searchById = propertyId => {
    api.properties.getOne(propertyId).then(
        ({ id, kind, saleOffer, rentOffer }) => {
            if (!rentOffer && !saleOffer) throw new Error('no-offer');

            navigate.to('item', { dealType: saleOffer ? 'sale' : 'rent', id, kind }, true);
        },
        err => {
            if (err.response.status === 404) {
                // eslint-disable-next-line no-alert
                alert('Объект с данным ID не найден');
            }

            if (err.message === 'no-offer') {
                // eslint-disable-next-line no-alert
                alert('Объект пуст');
            }
        }
    );
};

export default {
    search: {
        property: {
            byId: searchById,
        },
    },
};
