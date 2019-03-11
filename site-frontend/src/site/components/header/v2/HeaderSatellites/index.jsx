import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CallbackModal from 'site/request/CallbackModal';

import loadStatistics from 'core/stats/actions/load';

import StaticMask from 'core/components/ui/staticMask';

import UI from 'site/ui/v2019';

import LogoSatellites from './LogoSatellites';

import {
  HeaderBody,
  Cover,
  Wrapper,
  Nav,
  HamburgerIcon,
  CloseButton,
  CloseIcon,
  NavPanel,
  Menu,
  StMenu,
  StyledLinkSat,
  Phone,
  CallbackBtn,
  MenuBtn,
  FavoriteIcon,
  FavoriteLink,
  FavoriteLinkDesktop,
  FavoriteCounter,
  MobileButtons,
} from './styled';

const {
  Grid: { Col, Container },
  Visibility,
} = UI;

class Header extends Component {
  constructor(props) {
    super(props);

    this.closeMenu = this.closeMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      active: false,
      isOpenRequest: false,
      navInverted: true,
    };
  }

  componentWillMount() {
    this.props.actions.loadStatistics();
    if (typeof window !== 'undefined') window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (window.scrollY < 80) {
      this.setState({ navInverted: true });
    } else {
      this.setState({ navInverted: false });
    }
  }

  toggleMenu() {
    this.setState(prevState => ({
      active: !prevState.active,
    }));
  }

  closeMenu() {
    this.setState({
      active: false,
    });
  }

  render() {
    const Link = props => <StyledLinkSat {...props} onClick={this.closeMenu} />;
    const {
      location: { pathname },
    } = this.props;
    const { navInverted } = this.state;
    const { favorites } = this.props.state;
    const isLanding = pathname === '/';
    // const isLanding = false;
    const inverted = isLanding && navInverted;


    return (
      <HeaderBody active={this.state.active}>
        <Wrapper isLanding={isLanding} inverted={inverted}>
          <Cover onClick={this.toggleMenu} active={this.state.active} />
          <Visibility lg="hidden">
            <Container>
              <NavPanel isLanding={isLanding}>
                <LogoSatellites isLanding={isLanding} inverted={inverted} />
                <MobileButtons>
                  <FavoriteLink to="/favorites">
                    <FavoriteIcon inverted={isLanding} icon="favorite" />
                    {(favorites && favorites.length > 0) && <FavoriteCounter> {favorites.length}</FavoriteCounter>}
                  </FavoriteLink>
                  <MenuBtn onClick={this.toggleMenu}>
                    <HamburgerIcon icon="hamburger-rublevka" isLanding={isLanding} />
                  </MenuBtn>
                </MobileButtons>
              </NavPanel>
            </Container>
          </Visibility>

          <Container>
            <Col xs="12">
              <Nav isVisible active={this.state.active} inverted={inverted}>
                <Menu left>
                  <Visibility xs="hidden" sm="hidden" md="hidden">
                    <LogoSatellites inverted={inverted} />
                  </Visibility>

                  <CloseButton onClick={this.toggleMenu}>
                    <CloseIcon icon="close" />
                  </CloseButton>
                  <Visibility lg="hidden">
                    <Link activeClassName="active" to="/" inverted={inverted}>
                      Главная
                    </Link>
                  </Visibility>
                  <Link activeClassName="active" to="/zagorodnaya/prodaja" inverted={inverted}>
                    Продажа
                  </Link>
                  <Link activeClassName="active" to="/zagorodnaya/arenda" inverted={inverted}>
                    Аренда
                  </Link>
                  <Link
                    activeClassName="active"
                    to="/zagorodnaya/kottedzhnye-poselki"
                    inverted={inverted}
                  >
                    Посёлки
                  </Link>
                  <Link activeClassName="active" to="/contacts" inverted={inverted}>
                    Контакты
                  </Link>
                </Menu>

                <StMenu right>
                  <Phone
                    inverted={inverted}
                    href={`tel:+${global.config.phones.country}`}
                    id="comagicDTPhoneNumber"
                  >
                    <StaticMask pattern="+1 (111) 111-11-11">
                      {global.config.phones.country}
                    </StaticMask>
                  </Phone>

                  <CallbackModal propertyCategory={this.props.params && this.props.params.category}>
                    <CallbackBtn kind="success" size="sm" inverted={inverted}>
                      Обратный звонок
                    </CallbackBtn>
                  </CallbackModal>
                  <FavoriteLinkDesktop to="/favorites">
                    <FavoriteIcon inverted={inverted} icon="favorite" />
                    {(favorites && favorites.length > 0) && <FavoriteCounter> {favorites.length}</FavoriteCounter>}
                  </FavoriteLinkDesktop>
                </StMenu>
              </Nav>
            </Col>
          </Container>
        </Wrapper>
      </HeaderBody>
    );
  }
}

// redux connectors
const pickState = (state) => {
  const { stats, favorites } = state;

  return {
    state: {
      stats,
      favorites,
    },
  };
};

const pickActions = (dispatch) => {
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
