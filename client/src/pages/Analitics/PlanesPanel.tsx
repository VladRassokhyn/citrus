import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { FixLater, LoadingStatuses, TTselectorOptions } from '../../lib/globalTypes';
import { useTypedSelector } from '../../lib/hooks';
import { planesActions, planesSelectors } from '../../lib/slices/planes';
import { Planes } from '../../lib/slices/planes/planes.type';
import edit from '../../static/edit.svg';
import { slideInDown } from 'react-animations';

type Props = {
  planes: Planes;
};

const animationIn = keyframes`${slideInDown}`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
  transition: linear 0.1s;
  box-shadow: 0 0 5px gray;
  min-height: 40px;
  animation: ${animationIn} 0.3s forwards;
  @media (min-width: 560px) {
    &:hover {
      gap: 20px;
    }
  }
  @media (max-width: 559px) {
    flex-direction: column;
    padding: 10px 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 25px;
  &:hover {
    cursor: pointer;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  @media (max-width: 559px) {
    flex-direction: column;
  }
`;

const Btns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const H1 = styled.h1`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12pt;
  color: var(--color-stroke);
`;

const H2 = styled.b`
  font-size: 12pt;
  color: black;
`;

const H3 = styled.h1`
  font-size: 12pt;
  color: var(--color-secondary);
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  width: 10px;
  height: 10px;
`;

const Input = styled.input`
  max-width: 70px;
  font-size: 12pt;
  height: 20px;
  padding: 3px 10px;
  box-shadow: 0 0 5px #dfdfdf;
  border: 0;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: var(--color-button);
  color: white;
  min-width: 100px;
  height: 30px;
  border: 0;
  border-radius: 5px;
  box-shadow: 0 0 5px gray;
  &:hover {
    cursor: pointer;
  }
`;

const Filter = styled.div``;

export const PlanesPanel = (props: Props): JSX.Element => {
  const { planes } = props;
  const updateStatus = useTypedSelector(planesSelectors.selectUpdateStatus);
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();

  const { handleSubmit, register, reset } = useForm({
    defaultValues: planes,
  });

  const isDisabled = updateStatus === LoadingStatuses.LOADING;

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
  }, []);

  const onSubmit = (e: FixLater) => {
    const newPlanes: Planes = {
      ...e,
      cm: parseInt(String(e.cm).replace(/\s/g, '')),
      ca: parseInt(String(e.ca).replace(/\s/g, '')),
      cz: parseInt(String(e.cz).replace(/\s/g, '')),
    };
    dispatch(planesActions.updatePlanes(newPlanes));
  };

  return (
    <Wrapper>
      <Title onClick={toggleEditMode}>
        <H3>Планы</H3>
        <Img src={edit} />
      </Title>
      {!isEditMode ? (
        <Container onClick={toggleEditMode}>
          <H1>
            ЦМ: <H2>{planes.cm}</H2>
          </H1>
          <H1>
            ЦЗ: <H2>{planes.cz}</H2>
          </H1>
          <H1>
            ЦА: <H2>{planes.ca}</H2>
          </H1>
          <H1>
            % ЦМ: <H2>{planes.to_cm}%</H2>
          </H1>
          <H1>
            % ЦЗ: <H2>{planes.to_cz}%</H2>
          </H1>
        </Container>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <H1>
              ЦМ: <Input disabled={isDisabled} {...register('cm')} />
            </H1>
            <H1>
              ЦЗ: <Input disabled={isDisabled} {...register('cz')} />
            </H1>
            <H1>
              ЦА: <Input disabled={isDisabled} {...register('ca')} />
            </H1>
            <H1>
              % ЦМ: <Input disabled={isDisabled} {...register('to_cm')} />
            </H1>
            <H1>
              % ЦЗ: <Input disabled={isDisabled} {...register('to_cz')} />
            </H1>
          </Container>
          <Btns>
            <Button disabled={isDisabled} type={'button'} onClick={() => reset(planes)}>
              Сброс
            </Button>
            <Button disabled={isDisabled} type={'submit'}>
              Сохранить
            </Button>
          </Btns>
        </Form>
      )}
    </Wrapper>
  );
};
