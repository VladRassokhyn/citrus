import React from 'react';
import styled from 'styled-components';
import { shopSelectors } from '@lib/slices/shop';
import { useTypedSelector } from '@lib/hooks';
import { Preloader } from '@components/Preloader';
import { ShopItem } from './ShopItem';
import { NewShopForm } from './NewShopForm';

const Wrapper = styled.div`
  width: 100%;
`;

export const Shops = (): JSX.Element => {
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
