import React,  { ChangeEvent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { InputField } from '../../../Components/InputField';
import { salesmanActions } from '../../../lib/slices/salesman';
import { Shop } from '../../../lib/slices/shop';

type Props = {
  currentShop: Shop;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Button = styled.button`
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

export const NewSalesman = (props: Props): JSX.Element => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSave = useCallback(() => {
    dispatch(
      salesmanActions.postSalesman({
        name: value,
        tt: props.currentShop.name,
      }),
    );
  }, [value]);

  return (
    <Wrapper>
      <InputField value={value} onChange={handleChange} label={'ФИО'} />

      <Button onClick={handleSave}>Сохранить</Button>
    </Wrapper>
  );
};
