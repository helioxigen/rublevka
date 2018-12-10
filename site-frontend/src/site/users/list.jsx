import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import loadUsers from 'core/users/actions/list/load';

// constants
import { resourceName } from 'core/users/constants/defaults';

// components
import cn from 'classnames';
import UI from 'site/ui';

import s from 'site/styles/about/list.css';
import sUtils from 'site/styles/utils.css';

import Card from './card';

const { Loading, Grid: { Container, Row, Col } } = UI;

class Department extends Component {
  constructor(props) {
    super(props);

    this.group = props.group;
    this.resource = `${resourceName}.${this.group}`;
  }

  componentWillMount() {
    this.load(this.props);
  }

  load({ state, actions }) {
    const options = {
      pagination: state.pagination[this.resource],
      filter: state.filters[this.resource],
      orderBy: state.order[this.resource],
    };

    actions.loadUsers(options, this.group);
  }

  render() {
    const { state, title } = this.props;
    const { ids = [], isFetching } = state.users[this.group] || {};
    const { showExperience, showDescription } = this.props;

    return (
      <div className={cn(s.dividerTop, s.staffContainer)}>
        <h1 className={cn(s.titleXMd, s.bold, sUtils.textCenter)}>
          {title}
        </h1>

        <Container className={sUtils.pushedTopXs2_6Md4}>
          <Row xs="center">
            {ids.map(id =>
              (<Card
                key={id}
                id={id}
                showExperience={showExperience}
                showDescription={showDescription}
              />),
            )}
          </Row>
        </Container>

        {isFetching &&
          <Row>
            <Col xs="12" className={cn(s.padding5_0_8)}>
              <Loading />
            </Col>
          </Row>}
      </div>
    );
  }
}

const mapState = ({ users, pagination, filters, order }) => ({
  state: { users, pagination, filters, order },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators({ loadUsers }, dispatch),
});

export default connect(mapState, mapDispatch)(Department);
