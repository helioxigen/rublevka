import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Card from './Card';

import loadList from './actions/loadList';

import {
  Layout, Title, Title2, Input, Button,
} from '../UI';

const Header = styled.header`
  display: flex;
  margin: 24px 0 48px;
`;

const group = 'all';

function load({ dispatch, filter = {} } = {}) {
  return dispatch(loadList({ filter }, group));
}

const mapStateToProps = ({ countryProperties }) => ({ countryProperties });

export default connect(mapStateToProps)(({ dispatch, countryProperties }) => {
  const [filter, update] = React.useState({});

  React.useEffect(
    () => {
      load({ filter, dispatch });

      return () => {};
    },
    [filter],
  );

  const { ids = [] } = countryProperties[group] || {};

  function onChange(key, value) {
    return update({ ...filter, [key]: value });
  }

  return (
    <Layout>
      <div className="container-fluid">
        <Title>Загородные объекты</Title>

        <Header>
          <Input
            type="text"
            placeholder="Поиск по ID"
            onChange={e => onChange('id', e.target.value.replace(/ /g, '').split(','))
            }
          />
          <Button>Найти</Button>
        </Header>

        <section>
          <div className="row">
            <div className="col-sm-12">
              {/* <pre>{JSON.stringify(props.countryProperties, null, 2)}</pre> */}
              <div className="row">
                {ids.map(id => (
                  <div className="col-sm-4" key={id}>
                    <Card id={id} />
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="col-sm-3">
              <Title2>Фильтры</Title2>
            </div> */}
          </div>
        </section>
      </div>
    </Layout>
  );
});
