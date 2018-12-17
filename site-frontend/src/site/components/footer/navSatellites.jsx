import React from 'react';
import { Link } from 'react-router';
import UI from 'site/ui';
import global from 'window-or-global';

const {
  Grid: { Container, Row, Col },
} = UI;
import styles from 'site/styles/components/footer';

export default () => (
  <Container>
    <Row>
      <Col sm="3">
        <h3 className={styles.navTitle}>Купить</h3>
        <hr className={styles.divider} />
        <nav className={styles.pushedBottom4}>
          <div>
            <div>
              <Link className={styles.link} to="/zagorodnaya/prodaja/dom">Дом</Link>
            </div>
            <div>
              <Link className={styles.link} to="/zagorodnaya/prodaja/taunhaus">Таунхаус</Link>
            </div>
            <div>
              <Link className={styles.link} to="/zagorodnaya/prodaja/kvartira">Квартира</Link>
            </div>
            <div>
              <Link className={styles.link} to="/zagorodnaya/prodaja/uchastok">Участок</Link>
            </div>
          </div>
        </nav>
      </Col>

      <Col sm="3">
        <h3 className={styles.navTitle}>Снять</h3>
        <hr className={styles.divider} />
        <nav className={styles.pushedBottom4}>
          <div>
            <div>
              <Link className={styles.link} to="/zagorodnaya/arenda/dom">Дом</Link>
            </div>
            <div>
              <Link className={styles.link} to="/zagorodnaya/arenda/taunhaus">Таунхаус</Link>
            </div>
            <div>
              <Link className={styles.link} to="/zagorodnaya/arenda/kvartira">Квартира</Link>
            </div>
          </div>
        </nav>
      </Col>

      <Col sm="3">
        <h3 className={styles.navTitle}>Прочее</h3>
        <hr className={styles.divider} />
        <nav className={styles.pushedBottom4}>
          <div>
            <Link className={styles.link} to="/zagorodnaya/kottedzhnye-poselki">Посёлки</Link>
          </div>
        </nav>
      </Col>

      <Col sm="3">
        <h3 className={styles.navTitle}>{global.config.domain === 'jqestate.ru' ? 'JQ ESTATE' : 'Компания'}</h3>
        <hr className={styles.divider} />
        <nav>
          <div>
            <Link className={styles.link} to="/contacts">Контакты</Link>
          </div>
        </nav>
      </Col>
    </Row>
  </Container>
);
