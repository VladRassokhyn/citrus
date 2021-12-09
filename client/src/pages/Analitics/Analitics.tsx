import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Preloader } from '../../Components/Preloader';
import { FixLater, LoadingStatuses, UserRoles } from '../../lib/globalTypes';
import { useTypedSelector } from '../../lib/hooks';
import { planesActions, planesSelectors } from '../../lib/slices/planes';
import { Navigation } from './Navigation';
import { PlanesPanel } from './PlanesPanel';
import Selector from 'react-select';
import { RouterController } from '../../lib/routing/RouterController';
import { RouteItem } from '../../lib/routing/routes';
import { User } from '../../lib/slices/users';
import { salesActions, salesSelectors } from '../../lib/slices/sales';
import { Shop, shopActions, shopSelectors } from '../../lib/slices/shop';

type Props = {
  routes: RouteItem[];
  authUser: User;
  currentShop: Shop;
};

const Container = styled.div`
  @media (min-width: 560px) {
    padding: 15px 30px 15px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Filter = styled.div`
  position: absolute;
  top: 5px;
  left: 15%;
  z-index: 1000;
  width: 200px;
`;

export const Analitic = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  //debugger;
  console.log('render');
  const { month, year } = useTypedSelector(salesSelectors.monthAndYear);
  const planes = useTypedSelector(planesSelectors.planes);
  const shops = useTypedSelector(shopSelectors.allShops);

  const salesStatus = useTypedSelector(salesSelectors.status);
  const planesStatus = useTypedSelector(planesSelectors.status);

  const isSalesLoading = salesStatus === LoadingStatuses.LOADING;
  const isPlanesLoading = planesStatus === LoadingStatuses.LOADING;

  useEffect(() => {
    dispatch(salesActions.getSales({ tt: props.currentShop.name, month, year }));
    dispatch(planesActions.getPlanes({ tt: props.currentShop.name, month, year }));
  }, [props.currentShop, month, year]);

  const handleChangeTT = (e: FixLater) => {
    const newShop = shops?.find((shop) => shop.name === e.value);
    newShop && dispatch(shopActions.setCurrentShop(newShop));
  };

  const selectorOptions = shops?.map((shop) => ({
    label: shop.shortName,
    value: shop.name,
  }));

  if (isSalesLoading || isPlanesLoading) {
    return <Preloader />;
  }

  return (
    <>
      {props.authUser.role === UserRoles.ADMIN && (
        <Filter>
          <Selector
            options={selectorOptions}
            value={{ label: props.currentShop.shortName, value: props.currentShop.name_1c }}
            onChange={handleChangeTT}
          />
        </Filter>
      )}
      <PlanesPanel planes={planes} currentShop={props.currentShop} />
      <Container>
        <Navigation authUser={props.authUser} />
        <RouterController routes={props.routes} />
      </Container>
    </>
  );
};
