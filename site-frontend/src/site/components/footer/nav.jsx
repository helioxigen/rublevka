import React, { Component } from "react";
import { Link } from "react-router";

import global from "window-or-global";
const isJQ = global.config.domain === "jq.estate";

import UI from "site/ui";
const {
  Visibility,
  Button,
  Grid: { Container, Row, Col }
} = UI;

import List from "site/components/footer/list";

import sUtils from "site/styles/utils";
import s from "site/styles/components/footer";

export default class extends Component {
  renderColumns = category => (
    <Row xs="start">
      <Col xs="12" sm="6">
        <Link to={`/${category}/prodaja`} className={s.navSubTitle}>
          Купить
        </Link>

        <div>
          <Link className={s.link} to={`/${category}/prodaja/dom`}>
            Дома
          </Link>
        </div>
        <div>
          <Link className={s.link} to={`/${category}/prodaja/taunhaus`}>
            Таунхаусы
          </Link>
        </div>
        <div>
          <Link className={s.link} to={`/${category}/prodaja/kvartira`}>
            Квартиры
          </Link>
        </div>
        <div>
          <Link className={s.link} to={`/${category}/prodaja/uchastok`}>
            Земельные участки
          </Link>
        </div>
      </Col>

      <Col xs="12" sm="6">
        <Link to={`/${category}/arenda`} className={s.navSubTitle}>
          Снять
        </Link>

        <div>
          <Link className={s.link} to={`/${category}/arenda/dom`}>
            Дома
          </Link>
        </div>
        <div>
          <Link className={s.link} to={`/${category}/arenda/taunhaus`}>
            Таунхаусы
          </Link>
        </div>
        <div>
          <Link className={s.link} to={`/${category}/arenda/kvartira`}>
            Квартиры
          </Link>
        </div>
      </Col>
    </Row>
  );

  render() {
    return (
      <section>
        <Container>
          <Row>
            <Col sm="6" lg="3" className={s.navColumn}>
              <p className={s.navTitle}>{isJQ ? "JQ ESTATE" : "Компания"}</p>
              <hr className={s.divider} />
              <nav>
                {isJQ && (
                  <div className={sUtils.alignLeft}>
                    <div>
                      <Link className={s.link} to="/agents">
                        Агенты
                      </Link>
                    </div>
                    <div>
                      <Link className={s.link} to="/about">
                        О компании
                      </Link>
                    </div>
                  </div>
                )}
                <div className={sUtils.alignLeft}>
                  <Link className={s.link} to="/contacts">
                    Контакты
                  </Link>
                </div>
              </nav>
            </Col>
            <Col sm="6" lg="6" className={s.navColumn}>
              <p className={s.navTitle}>Загородная недвижимость</p>
              <hr className={s.divider} />

              {this.renderColumns("zagorodnaya")}
            </Col>
          </Row>
          <Row>
            <Col sm="6" md="4" lg="3">
              <List group="rublevka" title="Рублёво-Успенское" />
            </Col>

            <Col sm="6" md="4" lg="3">
              <List group="riga" title="Новорижское" />
            </Col>

            <Col sm="6" md="4" lg="3">
              <List group="kievka" title="Киевское" />
            </Col>

            <Col sm="6" md="4" lg="3">
              <List group="minka" title="Минское" />
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}
