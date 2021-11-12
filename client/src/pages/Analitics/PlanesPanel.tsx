import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FixLater, LoadingStatuses } from '../../lib/globalTypes';
import { useTypedSelector } from '../../lib/hooks';
import { planesActions, planesSelectors } from '../../lib/slices/planes';
import { Planes } from '../../lib/slices/planes/planes.type';
import edit from '../../static/edit.svg';

type Props = {
  planes: Planes;
};

const Wrapper = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 15px 5vw;
  background-color: #f1f1f1;
  border-radius: 5px;
  transition: linear 0.1s;
  box-shadow: 0 0 5px gray;
  @media (min-width: 560px) {
    &:hover {
      padding: 30px 2vw;
      gap: 20px;
    }
    padding: 15px 2vw;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 25px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
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
  width: 15px;
  height: 15px;
`;

const Input = styled.input`
  max-width: 70px;
  font-size: 12pt;
  height: 30px;
  padding-left: 10px;
  box-shadow: 0 0 5px gray;
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
`;

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
    dispatch(planesActions.updatePlanes(e));
  };

  return (
    <Wrapper>
      <Title onClick={toggleEditMode}>
        <h3>Планы</h3>
        <Img src={edit} />
      </Title>
      {!isEditMode ? (
        <Container>
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
            <Button disabled={isDisabled} onClick={() => reset(planes)}>
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
