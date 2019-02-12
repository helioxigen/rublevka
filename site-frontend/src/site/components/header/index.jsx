import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Body from 'site/components/body';

import global from 'window-or-global';
const isJQ = global.config.domain === `jq.estateu`;
const isRublevka = global.config.domain === `rublevka.ru`;
const isRiga = global.config.domain === `riga.ru`;

import loadStatistics from 'core/stats/actions/load';

import StaticMask from 'core/components/ui/staticMask';

import RequestModal from 'site/request/selectionModal';
import UI from 'site/ui';
const {
  Grid,
  Navbar,
  Icon,
  Visibility,
  Button,
  Grid: { Row, Col },
  Navbar: { Menu, Brand },
} = UI;

import cn from 'classnames';
import s from 'site/styles/components/header';
import sFilter from 'site/styles/landing/jqestate/list';
import sUtils from 'site/styles/utils';
import st from 'site/styles/themes';

const InnerMenu = props => (
  <nav className={s.innerMenu}>
    <Visibility lg="hidden" className={sUtils.fullWidth}>
      <Grid.Container className={s.innerContainer}>
        <div className={s.innerTitle}>Недвижимость</div>

        <Row>
          <Col sm="3" md="2" className={sUtils.pushedTopSm2_5}>
            <ul className={s.innerList}>
              <li className={s.innerItem}>
                <props.linkComponent
                  className={s.innerLink}
                  activeClassName={s.active}
                  to={`/zagorodnaya/${props.dealType}`}
                >
                  Загородная
                </props.linkComponent>
              </li>
              <li className={s.innerItem}>
                <props.linkComponent
                  className={s.innerLink}
                  activeClassName={s.active}
                  to={`/gorodskaya/${props.dealType}`}
                >
                  Городская
                </props.linkComponent>
              </li>
            </ul>
          </Col>

          <Col sm="4" className={sUtils.pushedTopSm2_5}>
            <ul className={cn(s.innerList, s.resetBorder)}>
              <li className={s.innerItem}>
                <props.linkComponent
                  className={s.innerLink}
                  activeClassName={s.active}
                  to="/zagorodnaya/kottedzhnye-poselki"
                >
                  Посёлки
                </props.linkComponent>
              </li>

              {props.dealType === `prodaja` && (
                <li className={s.innerItem}>
                  <props.linkComponent
                    className={s.innerLink}
                    activeClassName={s.active}
                    to="/gorodskaya/zhilye-kompleksy"
                  >
                    Жилые комплексы
                  </props.linkComponent>
                </li>
              )}
            </ul>
          </Col>
        </Row>
      </Grid.Container>
    </Visibility>

    <Visibility
      xs="hidden"
      sm="hidden"
      md="hidden"
      className={sUtils.fullWidth}
    >
      <Grid.Container className={s.innerContainer}>
        <Row>
          <Col xs="12">
            <Grid.Container fluid className={s.innerListContainer}>
              <Row>
                <Col md="6" className={sUtils.pushedTopSm2_5}>
                  <ul className={s.innerList}>
                    <li className={s.innerItem}>
                      <props.linkComponent
                        className={s.titleLink}
                        to={`/zagorodnaya/${props.dealType}`}
                      >
                        Загородная
                      </props.linkComponent>
                    </li>
                    <li className={s.innerItem}>
                      <props.linkComponent
                        className={s.innerLink}
                        to={`/zagorodnaya/${props.dealType}/dom`}
                      >
                        Дома{' '}
                        <span className={sFilter.filterNumber}>
                          {props.country.house}
                        </span>
                      </props.linkComponent>
                    </li>
                    <li className={s.innerItem}>
                      <props.linkComponent
                        className={s.innerLink}
                        to={`/zagorodnaya/${props.dealType}/taunhaus`}
                      >
                        Таунхаусы{' '}
                        <span className={sFilter.filterNumber}>
                          {props.country.townhouse}
                        </span>
                      </props.linkComponent>
                    </li>
                    <li className={s.innerItem}>
                      <props.linkComponent
                        className={s.innerLink}
                        to={`/zagorodnaya/${props.dealType}/kvartira`}
                      >
                        Квартиры{' '}
                        <span className={sFilter.filterNumber}>
                          {props.country.flat}
                        </span>
                      </props.linkComponent>
                    </li>
                    {props.dealType === `prodaja` && (
                      <li className={s.innerItem}>
                        <props.linkComponent
                          className={s.innerLink}
                          to={`/zagorodnaya/${props.dealType}/uchastok`}
                        >
                          Участки{' '}
                          <span className={sFilter.filterNumber}>
                            {props.country.land}
                          </span>
                        </props.linkComponent>
                      </li>
                    )}
                  </ul>
                </Col>

                <Col md="6" className={sUtils.pushedTopSm2_5}>
                  <ul className={cn(s.innerList, s.resetBorder)}>
                    <li className={s.innerItem}>
                      <props.linkComponent
                        className={s.titleLink}
                        to={`/gorodskaya/${props.dealType}`}
                      >
                        Городская
                      </props.linkComponent>
                    </li>
                    <li className={s.innerItem}>
                      <props.linkComponent
                        className={s.innerLink}
                        to={`/gorodskaya/${props.dealType}/kvartira`}
                      >
                        Квартиры{' '}
                        <span className={sFilter.filterNumber}>
                          {props.city.flat}
                        </span>
                      </props.linkComponent>
                    </li>

                    {props.dealType === `prodaja` && (
                      <li className={s.innerItem}>
                        <props.linkComponent
                          className={s.innerLink}
                          to={`/gorodskaya/${props.dealType}/penthaus`}
                        >
                          Пентхаусы{' '}
                          <span className={sFilter.filterNumber}>
                            {props.city.penthouse}
                          </span>
                        </props.linkComponent>
                      </li>
                    )}
                    <li className={s.innerItem}>
                      <props.linkComponent
                        className={s.innerLink}
                        to={`/gorodskaya/${props.dealType}/apartamenty`}
                      >
                        Апартаменты{' '}
                        <span className={sFilter.filterNumber}>
                          {props.city.apartment}
                        </span>
                      </props.linkComponent>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Grid.Container>
          </Col>
        </Row>
      </Grid.Container>
    </Visibility>
  </nav>
);

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleClickOutside = ::this.handleClickOutside;

    this.state = {
      active: false,
      isOpenRequest: false,
    };
  }

  componentWillMount() {
    this.props.actions.loadStatistics();
  }

  // We have to define willUpdate and didUpdate in order to manage event listeners properly.
  // There's an issue when route is changed, and the component should be remounted,
  // but events are not managed properly, and so the navbar doesn't open after route change.
  // Rebinding events  in willUpdate and didUpdate fixes this.
  componentWillUpdate() {
    document.removeEventListener(`click`, this.handleClickOutside);
  }

  componentDidUpdate() {
    document.addEventListener(`click`, this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener(`click`, this.handleClickOutside);
  }

  handleClickOutside(event) {
    // 'this.refs.overlay' check is needed for old browsers
    if (this.refs.overlay && this.refs.overlay.contains(event.target)) {
      if (this.state.active) {
        this.closeMenu();
      }
    }
  }

  openMenu() {
    this.setState({ active: true });
  }

  closeMenu() {
    this.setState({ active: false });
  }

  render() {
    const Link = props => <Navbar.Link {...props} onClick={::this.closeMenu} />;

    const { pathname = `` } = this.props.location || {};

    const isCitySection = pathname.split(`/`)[1] === `city`;

    const { stats = {} } = this.props.state;
    const { country = {}, city = {} } = stats;

    const countrySale = country.sale || {};
    const countryRent = country.rent || {};

    const citySale = city.sale || {};
    const cityRent = city.rent || {};

    return (
      <Body className={this.state.active ? sUtils.scrollNot : sUtils.scroll}>
        <header
          className={cn(
            s.header,
            this.props.className,
            st.header.landingHeader,
            st.header.header,
          )}
        >
          <Visibility md="hidden" lg="hidden">
            {isJQ && (
              <Brand to="/" className={st.header.logo}>
                <Icon
                  className={st.header.iconLogo}
                  icon={global.config.brand}
                />
              </Brand>
            )}

            {(isRublevka || isRiga) && (
              <Brand to="/" className={st.header.logoRublevka}>
                <Icon
                  className={st.header.iconLogo}
                  icon={global.config.brand}
                />
              </Brand>
            )}

            {!isJQ && !isRublevka && !isRiga && (
              <Brand to="/" className={st.header.logo}>
                {global.config.banner.logo}
              </Brand>
            )}

            <Button
              className={s.btnHamburger}
              size="xs"
              onClick={::this.openMenu}
            >
              <Icon className={s.iconHamburger} icon="hamburger" />
            </Button>
          </Visibility>

          <Grid.Container>
            <div
              ref="overlay"
              className={cn(s.overlay, {
                [s.overlayActive]: this.state.active,
              })}
            />
            <Navbar.Container
              className={cn(s.menu, { [s.menuActive]: this.state.active })}
            >
              <Menu left>
                <ul className={s.list}>
                  <Visibility xs="hidden" sm="hidden">
                    <li className={s.item}>
                      {isJQ && (
                        <Brand to="/" className={st.header.logo}>
                          <Icon
                            className={st.header.iconLogo}
                            icon={global.config.brand}
                          />
                        </Brand>
                      )}

                      {isRublevka && (
                        <Brand
                          to="/"
                          className={cn(st.header.logo, sUtils.pushedRight3)}
                        >
                          <Icon
                            className={cn(st.header.iconLogo)}
                            icon={global.config.brand}
                          />
                        </Brand>
                      )}

                      {isRiga && (
                        <Brand
                          to="/"
                          className={cn(st.header.logo, sUtils.pushedRight2)}
                        >
                          <Icon
                            className={cn(st.header.iconLogo)}
                            icon={global.config.brand}
                          />
                        </Brand>
                      )}

                      {!isJQ && !isRublevka && !isRiga && (
                        <Brand to="/" className={st.header.logo}>
                          {global.config.banner.logo}
                        </Brand>
                      )}
                    </li>
                  </Visibility>

                  <li className={s.item}>
                    <Link
                      className={st.header.link}
                      activeClassName={st.header.active}
                      to="/zagorodnaya/prodaja"
                    >
                      Продажа
                    </Link>
                    {isJQ && (
                      <InnerMenu
                        linkComponent={Link}
                        country={countrySale}
                        city={citySale}
                        dealType="prodaja"
                      />
                    )}
                  </li>
                  <li className={s.item}>
                    <Link
                      className={st.header.link}
                      activeClassName={st.header.active}
                      to="/zagorodnaya/arenda"
                    >
                      Аренда
                    </Link>
                    {isJQ && (
                      <InnerMenu
                        linkComponent={Link}
                        country={countryRent}
                        city={cityRent}
                        dealType="arenda"
                      />
                    )}
                  </li>

                  {!isJQ && (
                    <div className={sUtils.hideSm}>
                      <li className={s.item}>
                        <Link
                          className={cn(s.textBlack, st.header.link)}
                          activeClassName={st.header.active}
                          to="/zagorodnaya/kottedzhnye-poselki"
                        >
                          Посёлки
                        </Link>
                      </li>
                      <li className={s.item}>
                        <Link
                          className={cn(s.textBlack, st.header.link)}
                          activeClassName={st.header.active}
                          to="/contacts"
                        >
                          Контакты
                        </Link>
                      </li>
                    </div>
                  )}

                  {isJQ && (
                    <Visibility xs="hidden" sm="hidden" md="hidden">
                      <li className={s.item}>
                        <Link
                          className={cn(s.textBlack, sUtils.hideSm)}
                          activeClassName={st.header.active}
                          to="/zagorodnaya/kottedzhnye-poselki"
                        >
                          Посёлки
                        </Link>
                      </li>
                    </Visibility>
                  )}

                  {isJQ && (
                    <li className={s.item}>
                      <Link
                        className={cn(s.textBlack, sUtils.hideSmMd)}
                        activeClassName={st.header.active}
                        to="/contacts"
                      >
                        Контакты
                      </Link>
                    </li>
                  )}
                </ul>
              </Menu>

              <Menu right>
                <ul className={cn(s.list, s.resetIndentLeft)}>
                  <li className={s.item}>
                    {isCitySection && (
                      <a
                        className={s.linkLg}
                        href={`tel:+${global.config.phones.city}`}
                      >
                        <StaticMask pattern="+1 (111) 111-11-11">
                          {global.config.phones.city}
                        </StaticMask>
                      </a>
                    )}

                    {!isCitySection && (
                      <a
                        className={s.linkLg}
                        href={`tel:+${global.config.phones.country}`}
                        id="comagicDTPhoneNumber"
                      >
                        <StaticMask pattern="+1 (111) 111-11-11">
                          {global.config.phones.country}
                        </StaticMask>
                      </a>
                    )}
                  </li>

                  <li className={cn(s.item, s.resetIndentTop)}>
                    <RequestModal
                      propertyCategory={
                        this.props.params && this.props.params.category
                      }
                    >
                      <Button className={s.btn} kind="success" size="sm">
                        Подобрать объекты
                      </Button>
                    </RequestModal>
                  </li>
                </ul>
              </Menu>

              <Visibility md="hidden" lg="hidden">
                <Button className={s.btnClose} onClick={::this.closeMenu}>
                  <Icon className={st.header.iconClose} icon="times" />
                </Button>
              </Visibility>
            </Navbar.Container>
          </Grid.Container>
        </header>
      </Body>
    );
  }
}

// redux connectors
const pickState = state => {
  const { stats } = state;

  return {
    state: {
      stats,
    },
  };
};

const pickActions = dispatch => {
  const actions = {
    loadStatistics,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(Header);
