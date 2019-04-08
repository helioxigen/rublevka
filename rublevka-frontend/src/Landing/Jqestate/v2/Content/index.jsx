import React from 'react';

// components
import ExtendedMenu from './ExtendedMenu';
import SellPropertyForm from './SellPropertyForm';
import RoutesDesktop from './RoutesDesktop';
import Routes from './Routes';
import Settlements from './Settlements';
import Special from './Special';

import UI from 'ui';

import { HideXsSmMd, ShowXsSmMd } from 'styles/mediaUtils';

import { Wrapper, HideXsCol } from './styled';

const {
  Grid,
  Grid: { Row },
} = UI;

export default () => (
  <Wrapper>
    <Grid.Container>
      <Row>
        <ExtendedMenu />
        <SellPropertyForm />
        <HideXsSmMd>
          <HideXsCol xs="12" sm="6">
            <RoutesDesktop />
          </HideXsCol>
        </HideXsSmMd>
        <Settlements />
        <ShowXsSmMd>
          <Routes />
        </ShowXsSmMd>
        <Special />
      </Row>
    </Grid.Container>
  </Wrapper>
);
