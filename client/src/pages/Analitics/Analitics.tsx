import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Preloader } from '../../Components/Preloader';
import { FixLater, LoadingStatuses, TTselectorOptions, UserRoles } from '../../lib/globalTypes';
import { useTypedSelector } from '../../lib/hooks';
import { planesActions, planesSelectors } from '../../lib/slices/planes';
import { Navigation } from './Navigation';
import { PlanesPanel } from './PlanesPanel';
import Selector from 'react-select';
import { RouterController } from '../../lib/routing/RouterController';
import { RouteItem } from '../../lib/routing/routes';
import { User } from '../../lib/slices/users';
import { salesActions, salesSelectors } from '../../lib/slices/sales';
import { Shop, shopSelectors } from '../../lib/slices/shop';

type Props = {
  routes: RouteItem[];
  authUser: User;
  currentShop: Shop;
  setCurrentShop: (shop: Shop) => void;
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

  const salesStatus = useTypedSelector(salesSelectors.selectSalesStatuses);
  const shops = useTypedSelector(shopSelectors.allShops);
  const planesStatus = useTypedSelector(planesSelectors.selectStatus);

  const { month, year } = useTypedSelector(salesSelectors.selectMonth);
  const dispatch = useDispatch();

  const isSalesLoading = salesStatus.getStatus === LoadingStatuses.LOADING;
  const isPlanesLoading = planesStatus === LoadingStatuses.LOADING;

  useEffect(() => {
    dispatch(salesActions.getSales({ tt: props.currentShop.name, month, year }));
    dispatch(planesActions.getPlanes({ tt: props.currentShop.name, month, year }));
  }, [props.currentShop, month, year]);

  if (isSalesLoading || isPlanesLoading || !shops) {
    return <Preloader />;
  }

  const handleChangeTT = (e: FixLater) => {
    const newShop = shops.find((shop) => shop.name === e.value) as Shop;
    props.setCurrentShop(newShop);
  };

  const selectorOptions = shops.map((shop) => ({
    label: shop.name_1c,
    value: shop.name,
  }));

  return (
    <>
      {props.authUser.role === UserRoles.ADMIN && (
        <Filter>
          <Selector
            options={selectorOptions}
            value={{ label: props.currentShop.name_1c, value: props.currentShop.name_1c }}
            onChange={handleChangeTT}
          />
        </Filter>
      )}
      <PlanesPanel planes={planes} currentShop={props.currentShop}/>
      <Container>
        <Navigation authUser={props.authUser} />
        <RouterController routes={props.routes} />
      </Container>
    </>
  );
};
