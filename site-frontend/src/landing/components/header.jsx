import React, { Component } from 'react';
import Scroll from 'react-scroll';

import Body from 'site/components/body';

import global from 'window-or-global';

import StaticMask from 'core/components/ui/staticMask';

import RequestModal from 'landing/request/selectionModal';
import UI from 'site/ui';
const {
  Grid, Navbar, Icon,
  Visibility, Button,
  Navbar: { Menu, Brand },
} = UI;

import cn from 'classnames';
import s from 'landing/styles/components/header';
import sUtils from 'site/styles/utils';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleClickOutside = ::this.handleClickOutside;
    this.handleScroll = ::this.handleScroll;

    this.state = {
      active: false,
      isOpenRequest: false,
      isScrolled: false,
    };
  }

  // We have to define willUpdate and didUpdate in order to manage event listeners properly.
  // There's an issue when route is changed, and the component should be remounted,
  // but events are not managed properly, and so the navbar doesn't open after route change.
  // Rebinding events  in willUpdate and didUpdate fixes this.
  componentWillUpdate() {
    document.removeEventListener(`click`, this.handleClickOutside);
    document.removeEventListener(`scroll`, this.handleScroll);
  }

  componentDidUpdate() {
    document.addEventListener(`click`, this.handleClickOutside);
    document.addEventListener(`scroll`, this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener(`click`, this.handleClickOutside);
    document.removeEventListener(`scroll`, this.handleScroll);
  }

  handleClickOutside(event) {
    // 'this.refs.overlay' check is needed for old browsers
    if (this.refs.overlay && this.refs.overlay.contains(event.target)) {
      if (this.state.active) {
        this.closeMenu();
      }
    }
  }

  handleScroll() {
    const isScrolled = window.scrollY > 100;
    this.setState({ isScrolled: isScrolled });
  }

  openMenu() {
    this.setState({ active: true });
  }

  closeMenu() {
    this.setState({ active: false });
  }

  render() {
    const { isScrolled } = this.state;

    return (
      <Body className={this.state.active ? sUtils.scrollNot : sUtils.scroll} ref="body">
        <header className={cn(s.header, this.props.className, isScrolled && s.scrolled)}>
          <Visibility lg="hidden">
            <Brand to="/" className={s.logoContainer}>
              <Icon className={cn(s.iconLogo, isScrolled && s.scrolled)} icon="jqestate-logo" />
            </Brand>

            <a className={cn(s.linkXs, isScrolled && s.scrolled)} href={`tel:+${global.config.phones.country}`} id="comagicDTPhoneNumber">
              <StaticMask pattern="+1 (111) 111-11-11">{global.config.phones.country}</StaticMask>
            </a>

            <Button className={s.btnHamburger} size="xs" onClick={::this.openMenu}>
              <Icon className={cn(s.iconHamburger, isScrolled && s.scrolled)} icon="hamburger-landing" />
            </Button>
          </Visibility>

          <Grid.Container fluid>
            <div ref="overlay" className={cn(s.overlay, { [s.overlayActive]: this.state.active })} />
            <Navbar.Container className={cn(s.menu, { [s.menuActive]: this.state.active })}>
              <Menu left>
                <ul className={cn(s.list, s.nav)}>
                  <Visibility xs="hidden" sm="hidden" md="hidden">
                    <li className={cn(s.item, isScrolled && s.scrolled)}>
                      <Icon className={cn(s.iconLogo, isScrolled && s.scrolled)} icon="jqestate-logo" />
                    </li>
                  </Visibility>
                  <li className={cn(s.item, isScrolled && s.scrolled)}>
                    <Scroll.Link activeClass={s.active} to="properties" spy smooth offset={-50} duration={800} onClick={::this.closeMenu}>
                      Предложения
                    </Scroll.Link>
                  </li>
                  <li className={cn(s.item, isScrolled && s.scrolled)}>
                    <Scroll.Link activeClass={s.active} to="description" spy smooth offset={-40} duration={800} onClick={::this.closeMenu}>
                      О посёлке
                    </Scroll.Link>
                  </li>
                  <li className={cn(s.item, isScrolled && s.scrolled)}>
                    <Scroll.Link activeClass={s.active} to="map" spy smooth duration={1000} onClick={::this.closeMenu}>
                      Расположение
                    </Scroll.Link>
                  </li>

                  <Visibility md="hidden" lg="hidden">
                    <li className={cn(s.item, s.resetIndentTop)}>
                      <RequestModal propertyCategory="country">
                        <Button className={s.btn} kind="success" size="md">Обратный звонок</Button>
                      </RequestModal>
                    </li>
                  </Visibility>

                  <Visibility xs="hidden" sm="hidden" lg="hidden">
                    <ul className={cn(s.list, s.contactXs)}>
                      <li className={s.item}>
                        <a className={cn(s.linkLg, isScrolled && s.scrolled)} href={`tel:+${global.config.phones.country}`} id="comagicDTPhoneNumber">
                          <StaticMask pattern="+1 (111) 111-11-11">{global.config.phones.country}</StaticMask>
                        </a>
                      </li>

                      <li className={cn(s.item, s.resetIndentTop)}>
                        <RequestModal propertyCategory="country">
                          <Button className={s.btn} kind="success" size="md">Обратный звонок</Button>
                        </RequestModal>
                      </li>
                    </ul>
                  </Visibility>
                </ul>
              </Menu>

              <Visibility xs="hidden" sm="hidden" md="hidden">
                <Menu right>
                  <ul className={s.list}>
                    <li className={s.item}>
                      <a className={cn(s.linkLg, isScrolled && s.scrolled)} href={`tel:+${global.config.phones.country}`} id="comagicDTPhoneNumber">
                        <StaticMask pattern="+1 (111) 111-11-11">{global.config.phones.country}</StaticMask>
                      </a>
                    </li>

                    <li className={cn(s.item, s.resetIndentTop)}>
                      <RequestModal propertyCategory="country">
                        <Button className={s.btn} kind="success" size="md">Обратный звонок</Button>
                      </RequestModal>
                    </li>
                  </ul>
                </Menu>
              </Visibility>

              <Visibility lg="hidden">
                <Button className={s.btnClose} onClick={::this.closeMenu}>
                  <Icon className={s.iconClose} icon="times" />
                </Button>
              </Visibility>
            </Navbar.Container>
          </Grid.Container>

          <Visibility md="hidden" lg="hidden">
            <a href={`tel:+${global.config.phones.country}`} id="comagicDTPhoneNumber">
              <Button className={cn(s.btnXs, sUtils.borderRadius10)} size="lg" kind="success">
                <Icon className={s.iconModal} icon="phone" />
              </Button>
            </a>
          </Visibility>
        </header>
      </Body>
    );
  }
}

export default Header;
