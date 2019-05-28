import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { helmet } from 'config/seo';
import global from 'window-or-global';
const isJQ = global.config.domain === 'jq.estate';

// import Request from 'about/request';
import UsersList from 'users/list';

import cn from 'classnames';
import UI from 'ui';
const {
  Grid: { Container, Row, Col },
} = UI;

import s from 'styles/about/list';
import sUtils from 'styles/utils';
import { ogMeta } from '../helpers';

class Agents extends Component {
  componentWillMount() {
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }

  render() {
    if (isJQ) {
      return (
        <section className={sUtils.bgWhite}>
          <Helmet
            title={helmet.pages.agents.title}
            meta={[
              { name: 'description', content: helmet.pages.agents.description },
              ...ogMeta({
                title: helmet.pages.agents.title,
                description: helmet.pages.agents.description,
              }),
            ]}
          />

          <Container>
            <Row xs="center">
              <Col xs="12" className={s.agentContainer}>
                <h1 className={cn(s.titleLg, s.bold)}>Агенты</h1>

                <div
                  className={cn(sUtils.pushedTopXs3_5Sm4_5Md2_8, s.padding0_3)}
                >
                  <p className={cn(s.textGreyXs, s.lineHeight3_9)}>
                    Агенты помогают покупателю найти и купить дом мечты, а
                    собственнику — продать быстро и по объективной цене.{' '}
                    <br className={sUtils.hideXsSmMd} />В JQ Estate работают
                    агенты городской и загородной недвижимости. Они разбираются
                    в рынке, ориентируются в законах и умеют вести переговоры.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>

          <UsersList
            group="countryDepartment"
            title="Загородный департамент"
            showExperience
          />
          <UsersList
            group="cityDepartment"
            title="Городской департамент"
            showExperience
          />

          <div className={s.requestContainer}>
            {/* <Request {...this.props} /> */}
          </div>
        </section>
      );
    }
  }
}

export default Agents;
