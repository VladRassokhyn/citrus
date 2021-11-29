import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Preloader } from '../../Components/Preloader';
import { FixLater, LoadingStatuses, TTselectorOptions, UserRoles } from '../../lib/globalTypes';
import { useTypedSelector } from '../../lib/hooks';
import { daySalesActions, daySalesSelectors } from '../../lib/slices/daySales';
import { planesActions, planesSelectors } from '../../lib/slices/planes';
import { Navigation } from './Navigation';
import { PlanesPanel } from './PlanesPanel';
import Selector from 'react-select';
import { RouterController } from '../../lib/routing/RouterController';
import { RouteItem } from '../../lib/routing/routes';
import { User } from '../../lib/slices/users';
import { salesSelectors } from '../../lib/slices/sales';

type Props = {
  routes: RouteItem[];
  authUser: User;
};

const Container = styled.div`
  @media (min-width: 560px) {
    padding: 15px 30px 15px 23%;
  }
`;

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

export const Analitic = (props: Props): JSX.Element => {
  const planes = useTypedSelector(planesSelectors.selectPlanes);
  const daySalesStatus = useTypedSelector(daySalesSelectors.selectDaySalesStatuses);

  const { mounth, year } = useTypedSelector(salesSelectors.selectMounth);
  const [selectedTT, setSelectedTT] = useState(props.authUser.tt);
  const dispatch = useDispatch();

  const handleChangeTT = (e: FixLater) => setSelectedTT(e);

  useEffect(() => {
    dispatch(daySalesActions.getDaySales(selectedTT.value));
  }, [selectedTT]);

  if (daySalesStatus.getStatus === LoadingStatuses.LOADING) {
    return <Preloader />;
  }

  return (
    <>
      {props.authUser.role === UserRoles.ADMIN && (
        <Filter>
          <Selector options={TTselectorOptions} value={selectedTT} onChange={handleChangeTT} />
        </Filter>
      )}
      <PlanesPanel planes={planes} />
      <Container>
        <Navigation />
        <RouterController routes={props.routes} />
      </Container>
    </>
  );
};
