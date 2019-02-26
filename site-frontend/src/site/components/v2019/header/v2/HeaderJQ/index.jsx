import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CallbackModal from 'site/request/CallbackModal';

import InnerMenu from './InnerMenu';
import LogoJQ from './LogoJQ';
import Hamburger from '../Hamburger';

import loadStatistics from 'core/stats/actions/load';

import StaticMask from 'core/components/ui/staticMask';

import { ShowXsSmMd } from 'site/styles/mediaUtils';

import UI from 'site/ui';

import {
  Wrapper,
  Nav,
  MenuWrapper,
  StMenu,
  MenuItem,
  MenuItemBottom,
  StyledLink,
  Phone,
  PhoneDesktop,
  CallBtn,
  CallbackBtn,
  HeaderBody,
  MenuBtn,
  MenuIcon,
  NavPanel,
  Overlay,
} from './styled';

const {
  Grid,
  Visibility,
  Navbar: { Menu },
} = UI;

class Header extends Component {
  constructor(props) {
    super(props);

    this.closeMenu = this.closeMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);

    this.state = {
      active: false,
      isOpenRequest: false,
    };
  }

  componentWillMount() {
    this.props.actions.loadStatistics();
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
    const Link = props => <StyledLink {...props} onClick={this.closeMenu} />;

    const { stats = {} } = this.props.state;
    const { country = {}, city = {} } = stats;

    const countrySale = country.sale || {};
    const countryRent = country.rent || {};

    const citySale = city.sale || {};
    const cityRent = city.rent || {};

    return (
      <HeaderBody active={this.state.active}>
        <Wrapper>
          <Visibility lg="hidden">
            <NavPanel>
              <LogoJQ closeMenu={this.closeMenu} />
              <MenuBtn onClick={this.toggleMenu}>
                <Hamburger active={this.state.active} />
              </MenuBtn>
              <PhoneDesktop
                href={`tel:+${global.config.phones.country}`}
                id="comagicDTPhoneNumber"
              >
                <StaticMask pattern="+1 (111) 111-11-11">
                  {global.config.phones.country}
                </StaticMask>
              </PhoneDesktop>
            </NavPanel>
          </Visibility>

          <Grid.Container>
            <Overlay active={this.state.active} onClick={this.closeMenu} />
            <Nav active={this.state.active}>
              <Menu left>
                <Visibility xs="hidden" sm="hidden" md="hidden">
                  <MenuItem>
                    <LogoJQ />
                  </MenuItem>
                </Visibility>

                <MenuWrapper>
                  <MenuItem>
                    <Link activeClassName="active" to="/zagorodnaya/prodaja">
                      Продажа
                    </Link>
                    <InnerMenu
                      linkComponent={Link}
                      country={countrySale}
                      city={citySale}
                      dealType="prodaja"
                    />
                  </MenuItem>
                  <MenuItem>
                    <Link activeClassName="active" to="/zagorodnaya/arenda">
                      Аренда
                    </Link>
                    <InnerMenu
                      linkComponent={Link}
                      country={countryRent}
                      city={cityRent}
                      dealType="arenda"
                    />
                  </MenuItem>
                  <MenuItem>
                    <Link
                      activeClassName="active"
                      to="/zagorodnaya/kottedzhnye-poselki"
                    >
                      Посёлки
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link activeClassName="active" to="/about">
                      О компании
                    </Link>
                  </MenuItem>
                  <ShowXsSmMd>
                    <CallbackModal
                      propertyCategory={
                        this.props.params && this.props.params.category
                      }
                    >
                      <CallbackBtn kind="success" size="sm">
                        Обратный звонок
                      </CallbackBtn>
                    </CallbackModal>
                  </ShowXsSmMd>
                </MenuWrapper>
              </Menu>

              <StMenu right>
                <Visibility xs="hidden" sm="hidden" md="hidden">
                  <MenuItem>
                    <Phone
                      href={`tel:+${global.config.phones.country}`}
                      id="comagicDTPhoneNumber"
                    >
                      <StaticMask pattern="+1 (111) 111-11-11">
                        {global.config.phones.country}
                      </StaticMask>
                    </Phone>
                  </MenuItem>
                  <MenuItem>
                    <CallbackModal
                      propertyCategory={
                        this.props.params && this.props.params.category
                      }
                    >
                      <CallbackBtn kind="success" size="sm">
                        Обратный звонок
                      </CallbackBtn>
                    </CallbackModal>
                  </MenuItem>
                </Visibility>

                <MenuItemBottom>
                  <Visibility md="hidden" lg="hidden" xlg="hidden">
                    <CallBtn kind="success" size="sm">
                      Позвонить
                      <Phone
                        href={`tel:+${global.config.phones.country}`}
                        id="comagicDTPhoneNumber"
                      />
                    </CallBtn>
                  </Visibility>
                </MenuItemBottom>

                <Visibility xs="hidden" sm="hidden" md="hidden">
                  <MenuItem>
                    <MenuBtn size="xs" onClick={this.toggleMenu}>
                      <MenuIcon icon="hamburger_v2" />
                    </MenuBtn>
                  </MenuItem>
                </Visibility>
              </StMenu>
            </Nav>
          </Grid.Container>
        </Wrapper>
      </HeaderBody>
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
