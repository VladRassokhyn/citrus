import React from 'react';
import styled from 'styled-components';
import { Shop, shopSelectors } from '../../../lib/slices/shop';
import { User } from '../../../lib/slices/users';
import { useTypedSelector } from '../../../lib/hooks';
import { useDispatch } from 'react-redux';
import { Preloader } from '../../../Components/Preloader';
import { ShopItem } from './ShopItem';
import { NewShopForm } from './NewShopForm';

type Props = {
  authUser: User;
};

const Wrapper = styled.div`
  width: 100%;
`;

export const Shops = (props: Props): JSX.Element => {
  const shops = useTypedSelector(shopSelectors.allShops);

  if (!shops) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      <NewShopForm />
      {shops?.map((shop, i) => (
        <ShopItem key={shop.name} shop={shop} index={i} />
      ))}
    </Wrapper>
  );
};
