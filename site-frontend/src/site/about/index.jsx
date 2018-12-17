import React, { Component } from "react";

// seo
import Helmet from "react-helmet";
import { helmet } from "site/config/seo";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// actions
import loadUsers from "core/users/actions/list/load";
import * as PaginationActions from "core/actions/pagination";

// components
import UsersList from "site/users/list";
import Principles from "./principles";
// import Request from './request';

import cn from "classnames";
import UI from "site/ui";

import s from "site/styles/about/list";
import sUtils from "site/styles/utils";

import global from "window-or-global";

const {
  Grid: { Container, Row, Col }
} = UI;

const isJQ = global.config.domain === "jq.estate";

class About extends Component {
  componentWillMount() {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }

  render() {
    if (isJQ) {
      return (
        <section className={sUtils.bgWhite}>
          <Helmet
            title={helmet.pages.about.title}
            meta={[
              { name: "description", content: helmet.pages.about.description },
              { name: "keywords", content: helmet.pages.about.keywords }
            ]}
          />

          <div>
            <Container>
              <Row xs="center">
                <Col xs="12" className={s.infoContainer}>
                  <div className={sUtils.hideFromSm}>
                    <h1 className={cn(s.titleMd, s.bold)}>JQ Estate</h1>
                    <h2 className={cn(s.titleMd, sUtils.pushedTop1_5)}>
                      Агентство элитной
                      <br className={sUtils.hideFromSm} /> недвижимости
                    </h2>
                  </div>

                  <div className={sUtils.hideXs}>
                    <h1 className={cn(s.titleMd, s.bold)}>
                      JQ Estate — агентство элитной недвижимости
                    </h1>
                  </div>

                  <p
                    className={cn(
                      s.textGrey,
                      s.textMd,
                      sUtils.pushedTopXs3_5Sm4_5Md2_8
                    )}
                  >
                    Работаем с 2006 года. <br className={sUtils.hideFromMd} />{" "}
                    Помогаем с покупкой и арендой домов, квартир и участков.
                  </p>
                </Col>
              </Row>
            </Container>
          </div>

          <div
            className={cn(s.dividerTop, s.hideDividerFromSm, s.stepsContainer)}
          >
            <Container>
              <Row>
                <Col xs="12">
                  <ul className={s.list}>
                    <li className={s.listItem}>
                      <span className={cn(s.step, s.top)}>1</span>
                      <span className={s.displayBlock}>Консультируем</span>
                    </li>
                    <li className={s.listItem}>
                      <span className={cn(s.step, s.left)}>2</span>
                      <span className={s.displayBlock}>Подбираем</span>
                    </li>
                    <li className={s.listItem}>
                      <span className={cn(s.step, s.bottom)}>3</span>
                      <span className={s.displayBlock}>Показываем</span>
                    </li>
                    <li className={s.listItem}>
                      <span className={cn(s.step, s.right)}>4</span>
                      <span className={s.displayBlock}>Оформляем</span>
                    </li>
                  </ul>
                  <p className={s.textFrame}>
                    Наши клиенты покупают быстро и без головной боли, потому что
                    мы о них заботимся.
                  </p>
                </Col>
              </Row>
            </Container>
          </div>

          <Principles />
          {/* <UsersList group="tops" title="Команда" /> */}
          <UsersList
            group="countryDepartment"
            title="Загородный департамент"
            showExperience
          />
          {/* <UsersList group="cityDepartment" title="Городской департамент" showExperience /> */}

          <div className={s.requestContainer}>
            {/* <Request {...this.props} /> */}
          </div>
        </section>
      );
    }
  }
}

const mapState = ({ users, pagination }) => ({
  state: { users, pagination }
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators({ loadUsers, ...PaginationActions }, dispatch)
});

export default connect(
  mapState,
  mapDispatch
)(About);
