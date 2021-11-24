import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router';
import styled from 'styled-components';
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
import { DayDetail } from './DayDetail';
import { EveningReport } from './EveningReport';
import { calcFns } from '../../lib/common';

type SelectionOption = {
  label: string;
  value: string;
};

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

  const planesStatus = useTypedSelector(planesSelectors.selectStatus);
  const daySalesStatus = useTypedSelector(daySalesSelectors.selectDaySalesStatuses);
  const salesStatus = useTypedSelector(salesSelectors.selectSalesStatuses);

  const [selectedTT, setSelectedTT] = useState(authUser?.tt);
  const dispatch = useDispatch();

  const handleChangeTT = (e: SelectionOption | null) => {
    if (e) {
      setSelectedTT(e);
    }
  };

  useEffect(() => {
    if (authUser && selectedTT) {
      dispatch(daySalesActions.getDaySales(selectedTT.value));
      dispatch(planesActions.getPlanes(selectedTT.value));
      dispatch(salesActions.getSales(selectedTT.value));
    }
  }, [selectedTT]);

  if (
    planesStatus !== LoadingStatuses.SUCCESS ||
    daySalesStatus.getStatus !== LoadingStatuses.SUCCESS ||
    salesStatus.getStatus !== LoadingStatuses.SUCCESS
  ) {
    return <Preloader />;
  }

  if (!authUser) {
    return <Redirect to={'/login'} />;
  }

  return (
    <Wrapper>
      {authUser.role === 'ADMIN' && (
        <Filter>
          <Selector options={TTselectorOptions} value={selectedTT} onChange={handleChangeTT} />
        </Filter>
      )}
      <PlanesPanel planes={planes} />
      <Container>
        <Navigation />
        <Content>
          <Route
            path={'/analytics/evening-report'}
            render={() => (
              <>
                {daySales && (
                  <EveningReport
                    planes={planes}
                    daySales={daySales[daySales.length - 1]}
                    mounthSales={calcFns.mounthSales(daySales)}
                    authUser={authUser}
                  />
                )}
              </>
            )}
          />
          <Route
            path={'/analytics/main'}
            exact
            render={() => (
              <>
                {daySales && sales && (
                  <Calendar newSales={sales} planes={planes} authUser={authUser} sales={daySales} />
                )}
              </>
            )}
          />
          <Route path={'/analytics/salesmans'} render={() => <Salesmans authUser={authUser} />} />
          <Route
            path={'/analytics/main/:salesDate'}
            render={() => <DayDetail allSales={daySales} tt={authUser.tt} />}
          />
        </Content>
      </Container>
    </Wrapper>
  );
};
