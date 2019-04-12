import React from 'react';
import styled from 'styled-components';
import { FormattedNumber } from 'react-intl';
import { Grid } from 'react-flexbox-grid';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { updateFilter, resetFilter, removeFilter } from '../../filter/actions';
import { resetPagination } from '../../pagination/actions';

import loadList from '../actions/loadList';
import { resourceName } from '../constants/defaults';
import Card from '../Card';
import Filter from './Filter';
import Pagination from './Pagination';

import {
  Layout, Title, Input, HollowButton as OrigButton,
} from '../../UI';

const Header = styled.header`
  display: flex;
  margin: 24px 0;
`;

const Button = styled(OrigButton)`
  margin-left: 10px;
`;

const group = 'all';
const resource = `${resourceName}.${group}`;

const mapStateToProps = ({ countryProperties, filter, pagination }) => ({
  countryProperties,
  filter: filter[resource],
  pagination: pagination[resource],
});

function List(props) {
  const {
    dispatch, countryProperties, filter, pagination = {},
  } = props;

  const { ids = [], isFetching } = countryProperties[group] || {};

  function load() {
    return dispatch(loadList({ filter, pagination }, group));
  }

  function update(key, value) {
    dispatch(resetPagination(resource));
    dispatch(updateFilter(resource, { [key]: value }));
  }

  function remove(key, value) {
    dispatch(removeFilter(resource, key, value));
  }

  function reset() {
    dispatch(resetFilter(resource));
  }

  function loadMore(newPage, withAppend) {
    dispatch(
      loadList(
        { filter, pagination: { ...pagination, offset: (newPage - 1) * 24 } },
        group,
        {
          append: withAppend,
        },
      ),
    );
  }

  React.useEffect(
    () => {
      load({ filter, pagination, dispatch });
    },
    [filter],
  );

  return (
    <Grid>
      <Helmet title="Загородные объекты" />

      <Layout>
        <Title>
          Загородные объекты
          {' '}
          {pagination.total && (
            <>
              (<FormattedNumber value={pagination.total} />)
            </>
          )}
        </Title>

        <Header>
          <Input
            type="text"
            placeholder="Поиск по ID"
            onChange={e =>
              update('id', e.target.value.replace(/ /g, '').split(','))
            }
          />
          <Button>Найти</Button>
        </Header>

        <section>
          <div className="row">
            <div className="col-sm-3">
              <Filter
                resource={resource}
                state={filter}
                update={update}
                remove={remove}
                reset={reset}
              />
            </div>
            <div className="col-sm-9">
              {isFetching && ids.length === 0 ? (
                'Загружается...'
              ) : (
                <div className="row">
                  {ids.map(id => (
                    <div className="col-sm-4" key={id}>
                      <Card id={id} key={id} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {(!isFetching || ids.length === 0) && (
          <div className="col-sm-offset-3 col-sm-9">
            <Pagination
              loadMore={loadMore}
              total={pagination.total}
              offset={pagination.offset}
              limit={pagination.limit}
              isScrollToTop
            />
          </div>
        )}
      </Layout>
    </Grid>
  );
}

export default connect(mapStateToProps)(List);
