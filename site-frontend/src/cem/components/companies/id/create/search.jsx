import React, { Component } from 'react';

import { companyStates } from 'cem/constants/dadata/dictionaries';

import Dadata from 'cem/components/dadata';
import FormField from 'cem/helpers/formField';

import UI from 'cem/components/ui';
const {
  Grid: { Row, Col },
} = UI;

class Search extends Component {
  onCompanySelect(query, { data }) {
    const { fields } = this.props;
    const address = data.address.value;
    const registeredAt = new Date(data.state.registration_date);
    const changeSet = {
      'name': data.name.short_with_opf,
      'ogrn': data.ogrn,
      'inn': data.inn,
      'address': [address],
      'state': companyStates[data.state.status],
      'kpp': data.kpp || `Нет`,
      'opf': (data.opf && data.opf.code) || `Нет`,
      'registeredAt': registeredAt.toISOString().split(`T`)[0],
      'ceoName': data.management && data.management.name,
      'ceoPosition': data.management && data.management.post,
    };

    Object.keys(changeSet).map(key => fields[key].onChange(changeSet[key]));
  }

  render() {
    return (
      <Row>
        <Col xs="20">
          <FormField label="Поиск по компаниям">
            <Dadata.Companies onChange={::this.onCompanySelect} />
          </FormField>
        </Col>
      </Row>
    );
  }
}

export default Search;
