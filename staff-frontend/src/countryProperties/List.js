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
// const resource = `countryProperties.${group}`;

const mapStateToProps = ({ countryProperties }) => ({ countryProperties });

export default connect(mapStateToProps)(({ dispatch, countryProperties }) => {
  React.useEffect(() => {
    dispatch(loadList({}, group));
  }, []);

  const { ids = [] } = countryProperties[group] || {};

  return (
    <Layout>
      <div className="container-fluid">
        <Title>Загородные объекты</Title>

        <Header>
          <Input type="text" placeholder="Поиск по ID" />
          <Button>Найти</Button>
        </Header>

        <section>
          <Title2>Все предложения</Title2>

          <div className="row">
            <div className="col-sm-9">
              {/* <pre>{JSON.stringify(props.countryProperties, null, 2)}</pre> */}
              <div className="row">
                {ids.map(id => (
                  <div className="col-sm-4" key={id}>
                    <Card id={id} />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-sm-3">
              <Title2>Фильтры</Title2>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
});
