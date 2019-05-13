import React from 'react';
import styled from 'styled-components';
import { Grid, Row } from 'react-flexbox-grid';
import Helmet from 'react-helmet';
import { Main, Logo, Title } from './UI';

const Screen = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  padding-top: 21px;
`;

const AuthSection = styled.section`
  padding-top: 198px;
  padding-bottom: 54px;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default () => (
  <Screen>
    <Header>
      <Helmet>
        <title>Загрузка</title>
      </Helmet>
      <Grid>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
      </Grid>
    </Header>
    <Main>
      <AuthSection>
        <Grid>
          <Row center="md">
            <Title>Загрузка</Title>
          </Row>
        </Grid>
      </AuthSection>
    </Main>
  </Screen>
);
