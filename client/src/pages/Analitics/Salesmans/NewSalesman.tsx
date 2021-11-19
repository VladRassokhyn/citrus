import { ChangeEvent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { InputField } from '../../../Components/InputField';
import { salesmanActions } from '../../../lib/slices/salesman';

type Props = {
  tt: { label: string; value: string };
};

type StyleProps = {
  isOpen: boolean;
};

const openAnimation = keyframes`
    from {width: 0; opacity: 0}
    to {width: 300px; opacity: 1}
`;

const closeAnimation = keyframes`
    from {width: 300px; opacity: 1}
    to {width: 0; opacity: 0}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Input = styled.div<StyleProps>`
  width: 0;
  animation: ${(props) => (props.isOpen ? openAnimation : closeAnimation)} 0.3s forwards;
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
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSave = useCallback(() => {
    dispatch(
      salesmanActions.postSalesman({
        name: value,
        tt: props.tt.value,
      }),
    );
  }, [value]);

  return (
    <Wrapper>
      <Input isOpen={isOpen}>
        <InputField value={value} onChange={handleChange} label={'ФИО'} />
      </Input>
      {isOpen ? (
        <>
          <Button onClick={handleSave}>Сохранить</Button>
          <Button onClick={handleOpen}>Отмена</Button>
        </>
      ) : (
        <Button onClick={handleOpen}>Добавить продавца</Button>
      )}
    </Wrapper>
  );
};
