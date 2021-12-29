import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { InputField } from '@components/InputField';
import { Shop, shopActions } from '@lib/slices/shop';

type Props = {
  shop?: Shop;
};

const NewShopTitle = styled.h1`
  font-size: 14pt;
  color: var(--color-button);
`;

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 50%;
  min-width: 560px;
  gap: 15px;
  padding: 15px;
  @media (max-width: 560px) {
    width: 100%;
  }
`;

const Btns = styled.div`
  width: 100%;
  padding: 0 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const NewFormBtn = styled.button`
  background-color: var(--color-button);
  color: white;
  min-width: 100px;
  height: 35px;
  border: 0;
  border-radius: 5px;
  transition: linear 0.3s;
  &:hover {
    cursor: pointer;
    background-color: #1890ff;
  }
`;

export const NewShopForm = (props: Props): JSX.Element => {
  const { shop } = props;
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: shop?.name || '',
      shortName: shop?.shortName || '',
      name_1c: shop?.name_1c || '',
      region: shop?.region || '',
    },
  });

  const handleSave = (e: { name: string; shortName: string; name_1c: string; region: string }) => {
    if (shop) {
      dispatch(shopActions.updateShop({ ...e, id: shop.id }));
    } else {
      dispatch(shopActions.postShop(e));
    }
  };
  return (
    <Wrapper onSubmit={handleSubmit(handleSave)}>
      <NewShopTitle>{shop ? 'Изменить магазин' : 'Добавить магазин'}</NewShopTitle>
      <InputField label={'Кодовое имя'} register={{ ...register('name') }} />
      <InputField label={'Короткое имя'} register={{ ...register('shortName') }} />
      <InputField label={'Имя как в 1С'} register={{ ...register('name_1c') }} />
      <InputField label={'Регион'} register={{ ...register('region') }} />
      <Btns>
        <NewFormBtn type="reset">Сброс</NewFormBtn>
        <NewFormBtn type="submit">Сохранить</NewFormBtn>
      </Btns>
    </Wrapper>
  );
};
