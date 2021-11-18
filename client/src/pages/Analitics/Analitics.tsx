import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import styled from 'styled-components';
import { EveningReport } from '.';
import { Preloader } from '../../Components/Preloader';
import { LoadingStatuses, TTselectorOptions } from '../../lib/globalTypes';
import { useTypedSelector } from '../../lib/hooks';
import { authSelectors } from '../../lib/slices/auth';
import { daySalesActions, daySalesSelectors } from '../../lib/slices/daySales';
import { planesActions, planesSelectors } from '../../lib/slices/planes';
import { Calendar } from './Calendar';
import { Navigation } from './Navigation';
import { PlanesPanel } from './PlanesPanel';
import Selector from 'react-select';

const Wrapper = styled.div``;

const Container = styled.div`
  @media (min-width: 560px) {
    padding: 15px 30px 15px 23%;
  }
`;

const Content = styled.div``;

const Filter = styled.div`
  position: absolute;
  top: 5px;
  left: 15%;
  z-index: 1000;
  width: 200px;
`;

export const Analitic = (): JSX.Element => {
  const planes = useTypedSelector(planesSelectors.selectPlanes);
  const status = useTypedSelector(planesSelectors.selectStatus);
  const authUser = useTypedSelector(authSelectors.selectAuthUser);
  const daySales = useTypedSelector(daySalesSelectors.selectAllDaySales);
  const [selectedTT, setSelectedTT] = useState(authUser!.tt);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      dispatch(daySalesActions.getDaySales(selectedTT));
      dispatch(planesActions.getPlanes(selectedTT));
    }
  }, [selectedTT]);

  if (status === LoadingStatuses.LOADING) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      {authUser!.role === 'ADMIN' && (
        <Filter>
          <Selector
            options={TTselectorOptions}
            value={{ value: selectedTT, label: selectedTT }}
            onChange={(e: any) => setSelectedTT(e.value)}
          />
        </Filter>
      )}
      <PlanesPanel planes={planes} />
      <Container>
        <Navigation />
        <Content>
          <Route
            path={'/analytics/evening-report'}
            render={() => <EveningReport sales={daySales!} />}
          />
          <Route
            path={'/analytics/main'}
            render={() => <Calendar planes={planes} authUser={authUser!} sales={daySales} />}
          />
        </Content>
      </Container>
    </Wrapper>
  );
};
