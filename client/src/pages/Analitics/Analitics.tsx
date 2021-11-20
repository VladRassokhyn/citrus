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
import { Salesmans } from './Salesmans';
import { salesActions, salesSelectors } from '../../lib/slices/sales';
import { DayDetail } from './DatDetail';
import { salesmanActions, salesmanSelectors } from '../../lib/slices/salesman';

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
  @media (min-width: 560px) {
    width: 400px;
  }
`;

export const Analitic = (): JSX.Element => {
  const planes = useTypedSelector(planesSelectors.selectPlanes);
  const authUser = useTypedSelector(authSelectors.selectAuthUser);
  const daySales = useTypedSelector(daySalesSelectors.selectAllDaySales);
  const sales = useTypedSelector(salesSelectors.selectAllSales);
  const salesmans = useTypedSelector(salesmanSelectors.selectAllSalesmans);

  const salesmansStatus = useTypedSelector(salesmanSelectors.selectSalesmanStatuses);
  const planesStatus = useTypedSelector(planesSelectors.selectStatus);
  const daySalesStatus = useTypedSelector(daySalesSelectors.selectDaySalesStatuses);
  const salesStatus = useTypedSelector(salesSelectors.selectSalesStatuses);

  const [selectedTT, setSelectedTT] = useState(authUser!.tt);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      dispatch(daySalesActions.getDaySales(selectedTT.value));
      dispatch(planesActions.getPlanes(selectedTT.value));
      dispatch(salesActions.getSales(selectedTT.value));
      dispatch(salesmanActions.getSalesmans(selectedTT.value));
    }
  }, [selectedTT]);

  if (
    planesStatus === LoadingStatuses.LOADING ||
    daySalesStatus.getStatus === LoadingStatuses.LOADING ||
    salesStatus.getStatus === LoadingStatuses.LOADING ||
    salesmansStatus.getStatus === LoadingStatuses.LOADING
  ) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      {authUser!.role === 'ADMIN' && (
        <Filter>
          <Selector
            options={TTselectorOptions}
            value={selectedTT}
            onChange={(e: any) => setSelectedTT(e)}
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
            exact
            render={() => (
              <Calendar newSales={sales} planes={planes} authUser={authUser!} sales={daySales} />
            )}
          />
          <Route
            path={'/analytics/salesmans'}
            render={() => <Salesmans authUser={authUser!} salesmans={salesmans} />}
          />
          <Route
            path={'/analytics/main/:salesDate'}
            render={() => <DayDetail allSales={daySales} tt={authUser!.tt} salesmans={salesmans} />}
          />
        </Content>
      </Container>
    </Wrapper>
  );
};
