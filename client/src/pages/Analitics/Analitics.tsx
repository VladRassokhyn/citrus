import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import styled from 'styled-components';
import { EveningReport } from '.';
import { Preloader } from '../../Components/Preloader';
import { LoadingStatuses } from '../../lib/globalTypes';
import { useTypedSelector } from '../../lib/hooks';
import { authSelectors } from '../../lib/slices/auth';
import { planesActions, planesSelectors } from '../../lib/slices/planes';
import { Navigation } from './Navigation';
import { PlanesPanel } from './PlanesPanel';
import { SalesInput } from './SalesInput';

const Wrapper = styled.div``;

const Container = styled.div`
  @media (min-width: 560px) {
    padding: 15px 15vw;
  }
`;

const Content = styled.div`
  margin-left: 12%;
`;

export const Analitic = (): JSX.Element => {
  const planes = useTypedSelector(planesSelectors.selectPlanes);
  const status = useTypedSelector(planesSelectors.selectStatus);
  const authUser = useTypedSelector(authSelectors.selectAuthUser);
  const dispatch = useDispatch();

  useEffect(() => {
    authUser && dispatch(planesActions.getPlanes(authUser.tt));
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
        </Content>
      </Container>
    </Wrapper>
  );
};
