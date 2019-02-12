import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import global from 'window-or-global';

import UI from 'site/ui';

import cn from 'classnames';
import s from 'site/styles/components/satellites/filter.css';
import sUtils from 'site/styles/utils';
import st from 'site/styles/themes';

const {
  Button,
  Grid: { Container, Row, Col },
} = UI;

const styles = {
  ...s,
  ...sUtils,
};

const cssOptions = {
  allowMultiple: true,
};

const key = 'routeIds';

class Route extends Component {
  onUpdate(id) {
    const { selected = {} } = this.props;
    const items = selected[key] || [];
    const index = items.indexOf(id);

    // TODO fix this (move to helpers?)
    if (index === -1) {
      this.props.updateFilter(key, [...items, id]);
    } else {
      this.props.updateFilter(key, items.filter((el, i) => i !== index));
    }
  }

  render() {
    const theme = st.filterSatellites;
    const { selected = {} } = this.props;
    const items = selected[key] || [];

    return (
      <div>
        <Container fluid styleName="contentContainer">
          <Row md="middle">
            <Col styleName="kindContainer">
              {global.config.routes.map(route => {
                const { id, name } = route;
                const index = items.indexOf(id);
                const isActive = index > -1;
                const className = cn(theme.hollowBtn, isActive && theme.active);
                return (
                  <Button
                    key={id}
                    className={className}
                    onClick={() => this.onUpdate(id)}
                  >
                    {name}
                  </Button>
                );
              })}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CSSModules(Route, styles, cssOptions);
