import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CallbackModal from 'site/request/CallbackModal';

import LogoSatellites from './LogoSatellites';
import Hamburger from './Hamburger';

import loadStatistics from 'core/stats/actions/load';

import StaticMask from 'core/components/ui/staticMask';

import UI from 'site/ui';

import {
  HeaderBody,
  Wrapper,
  Nav,
  NavPanel,
  StMenu,
  MenuItem,
  MenuItemBottom,
  StyledLinkSat,
  Phone,
  CallbackBtn,
  CallBtn,
  HideSm,
  MenuBtn,
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
    const Link = props => <StyledLinkSat {...props} onClick={this.closeMenu} />;

    return (
      <HeaderBody active={this.state.active}>
        <Wrapper>
          <Visibility md="hidden" lg="hidden">
            <NavPanel>
              <LogoSatellites />
              <MenuBtn onClick={this.toggleMenu}>
                <Hamburger active={this.state.active} />
              </MenuBtn>
            </NavPanel>
          </Visibility>

          <Grid.Container>
            <Nav active={this.state.active}>
              <Menu left>
                <Visibility xs="hidden" sm="hidden">
                  <MenuItem>
                    <LogoSatellites />
                  </MenuItem>
                </Visibility>

                <MenuItem>
                  <Link activeClassName="active" to="/zagorodnaya/prodaja">
                    Продажа
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link activeClassName="active" to="/zagorodnaya/arenda">
                    Аренда
                  </Link>
                </MenuItem>

                <HideSm>
                  <MenuItem>
                    <Link
                      activeClassName="active"
                      to="/zagorodnaya/kottedzhnye-poselki"
                    >
                      Посёлки
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link activeClassName="active" to="/contacts">
                      Контакты
                    </Link>
                  </MenuItem>
                </HideSm>
              </Menu>

              <StMenu right>
                <Visibility xs="hidden" sm="hidden">
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
