import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import styled from 'styled-components';
import { EveningReport } from '.';
import { Preloader } from '../../Components/Preloader';
import { LoadingStatuses } from '../../lib/globalTypes';
import { useTypedSelector } from '../../lib/hooks';
import { authSelectors } from '../../lib/slices/auth';
import { daySalesActions, daySalesSelectors } from '../../lib/slices/daySales';
import { planesActions, planesSelectors } from '../../lib/slices/planes';
import { MainAnalitics } from './MainAnalitics';
import { Navigation } from './Navigation';
import { PlanesPanel } from './PlanesPanel';

const Wrapper = styled.div``;

const Container = styled.div`
  @media (min-width: 560px) {
    padding: 15px 30px 15px 23%;
  }
`;

const Content = styled.div``;

export const Analitic = (): JSX.Element => {
  const planes = useTypedSelector(planesSelectors.selectPlanes);
  const status = useTypedSelector(planesSelectors.selectStatus);
  const authUser = useTypedSelector(authSelectors.selectAuthUser);
  const daySales = useTypedSelector(daySalesSelectors.selectAllDaySales);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      dispatch(daySalesActions.getDaySales(authUser.tt));
      dispatch(planesActions.getPlanes(authUser.tt));
    }
  }, []);

  if (status === LoadingStatuses.LOADING) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      <PlanesPanel planes={planes} />
      <Container>
        <Navigation />
        <Content>
          <Route path={'/analytics/evening-report'} render={() => <EveningReport />} />
          <Route path={'/analytics/main'} render={() => <MainAnalitics sales={daySales} />} />
        </Content>
      </Container>
    </Wrapper>
  );
};
