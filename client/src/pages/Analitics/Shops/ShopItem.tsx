import styled from 'styled-components';
import { Confirm } from '../../../Components/Confirm';
import { Shop } from '../../../lib/slices/shop';
import trash from '../../../static/trash.svg';
import edit from '../../../static/edit.svg';
import { useState } from 'react';
import { NewShopForm } from './NewShopForm';
import { Modal } from '../../../Components/Modal';

type Props = {
  shop: Shop;
  index: number;
};

const ImgContainer = styled.div`
  display: flex;
  opacity: 0;
  align-items: center;
  justify-content: center;
  transition: linear 0.3s;
  height: 30px;
  width: 30px;
  &:hover {
    background-color: #dfdfdf;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  flex-directiom: row;
`;

const SalesmanContainer = styled.div`
  display: grid;
  border-radius: 5px;
  height: 30px;
  min-width: 350px;
  grid-template-columns: 1fr 100px;
  grid-gap: 1px 0;
  align-items: center;
  transition: linear 0.3s;
  &:hover {
    box-shadow: 0 0 5px #dfdfdf;
    cursor: pointer;
  }
  &:hover ${ImgContainer} {
    opacity: 1;
  }
`;

const H1 = styled.h1`
  font-size: 12pt;
  padding: 5px 10px;
  color: var(--color-stroke);
`;

const Img = styled.img`
  width: 15px;
`;

export const ShopItem = (props: Props): JSX.Element => {
  const { shop, index } = props;
  const [editMode, setEditMode] = useState(false);
  const handleDelete = (shop: Shop) => {
    console.log('try delete, ', shop);
  };
  return (
    <SalesmanContainer key={shop.id}>
      <H1>
        {index + 1}. {shop.shortName}
      </H1>
      <Buttons>
        <ImgContainer onClick={() => setEditMode(true)}>
          <Img src={edit} />
        </ImgContainer>
        <Confirm title={'Удалить магазин ?'} confirmFn={() => handleDelete(shop)}>
          <ImgContainer>
            <Img src={trash} />
          </ImgContainer>
        </Confirm>
      </Buttons>
      {editMode && (
        <Modal onClose={() => setEditMode(false)}>
          <NewShopForm shop={shop} />
        </Modal>
      )}
    </SalesmanContainer>
  );
};
