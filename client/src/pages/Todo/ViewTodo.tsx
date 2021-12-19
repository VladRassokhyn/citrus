import React, { useEffect, useState } from 'react';
import { slideInRight, slideOutRight } from 'react-animations';
import { useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { Confirm } from '../../Components/Confirm';
import { Modal } from '../../Components/Modal';
import { UserRoles } from '../../lib/globalTypes';
import { useTypedSelector } from '../../lib/hooks';
import { authSelectors } from '../../lib/slices/auth';
import { Todo, todoActions } from '../../lib/slices/todo';
import { TodoPayload } from '../../lib/slices/todo/todo.type';
import { userSelectors } from '../../lib/slices/users';
import closeX from '../../static/closeX.svg';
import { Comments } from './Comments/Comments';
import { NewComment } from './Comments/NewComment';

const openAnimation = keyframes`${slideInRight}`;
const closeAnimation = keyframes`${slideOutRight}`;

type Props = {
  todo: Todo;
  isClosing: boolean;
  onClose: () => void;
  action: (payload: TodoPayload) => void;
};

type StyleProps = {
  isClosing: boolean;
};

const Wrapper = styled.div<StyleProps>`
  width: 440px;
  padding: 15px 30px;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px gray;
  height: 100%;
  position: fixed;
  right: 0;
  top: 50px;
  animation: ${(props) => (props.isClosing ? closeAnimation : openAnimation)} 0.3s forwards;
  @media (max-width: 560px) {
    width: 90%;
    padding: 10px 5%;
  }
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 95% 5%;
  justify-items: center;
`;

const Description = styled.div`
  background-color: white;
  width: 90%;
  padding: 5px 5%;
  margin: 15px 0;
  min-height: 30px;
  border-radius: 5px;
`;

const Img = styled.img`
  width: 15px;
  height: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const Span = styled.div`
  display: flex;
  margin: 5px 0;
`;

const H1 = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 16pt;
  margin-top: 15px;
  color: var(--color-button);
`;

const H2 = styled.h1`
  font-size: 12px;
`;

const H3 = styled.h1`
  display: flex;
  flex-direction: row;
  gap: 5px;
  min-width: 150px;
  font-size: 12pt;
  color: var(--color-stroke);
`;

const Dot = styled.div<{ color: string }>`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

const Buttons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 35% 35%;
  gap: 30%;
  justify-content: space-around;
`;

const Button = styled.button<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? 'lightgray' : 'var(--color-button)')};
  color: white;
  width: 150px;
  height: 30px;
  border: 0;
  margin-top: 20px;
  border-radius: 5px;
  transition: linear 0.3s;
  &:hover {
    cursor: pointer;
    ${(props) => !props.disabled && 'background-color: #0780ff'};
  }
`;

export const ViewTodo = (props: Props): JSX.Element => {
  const { todo, onClose, isClosing } = props;
  const dispatch = useDispatch();
  const creator = useTypedSelector(userSelectors.userById(todo.creatorId));
  const executor = useTypedSelector(userSelectors.userById(todo.executorId));
  const authUser = useTypedSelector(authSelectors.authUser);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const execute = () => {
    if (executor?.id === todo.executorId) {
      dispatch(todoActions.updateTodo({ ...todo, finished: true }));
    } else {
      setErrorMessage('Только исполнитель может завершить заявку');
    }
  };

  const deleteTodo = () => {
    if (authUser?.role == UserRoles.ADMIN || authUser?.id === creator?.id) {
      dispatch(todoActions.deleteTodo(todo.id));
    } else {
      setErrorMessage('Только создатель, или администратор может удалить заявку');
    }
  };

  useEffect(() => {
    return () => onClose();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!!errorMessage) {
        setErrorMessage(null);
      }
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage]);

  return (
    <Wrapper isClosing={isClosing}>
      {!!errorMessage && (
        <Modal onClose={() => setErrorMessage(null)}>
          <H1>{errorMessage}</H1>
        </Modal>
      )}
      <Header>
        <H1>{todo.title}</H1>
        <Img src={closeX} onClick={onClose} />
      </Header>
      <Description>
        <H2>{todo.description}</H2>
      </Description>
      <Span>
        <H3>Дата создания:</H3> <H3>{todo.createdAt}</H3>
      </Span>
      <Span>
        <H3>Исполнитель:</H3>
        <H3>
          {executor?.lastName} {executor?.name[0]}.
        </H3>
      </Span>
      <Span>
        <H3>Создатель:</H3>
        <H3>
          {creator?.lastName} {creator?.name[0]}.
        </H3>
      </Span>
      <Span>
        <H3>Важность:</H3>{' '}
        <H3>
          {todo.importance === 'Важно' && <Dot color={'red'} />}
          {todo.importance === 'Средне' && <Dot color={'orange'} />}
          {todo.importance === 'Не важно' && <Dot color={'green'} />}
          {todo.importance}
        </H3>
      </Span>
      <Span>
        <H3>Тема:</H3> <H3>{todo.category}</H3>
      </Span>

      <Buttons>
        <Confirm title={'Завершить заявку ?'} confirmFn={execute}>
          <Button disabled={todo.finished}>{todo.finished ? 'Завершена' : 'Завершить'}</Button>
        </Confirm>
        <Confirm title={'Удалить заявку ?'} confirmFn={deleteTodo}>
          <Button>Удалить</Button>
        </Confirm>
      </Buttons>

      <H1>Комментарии</H1>
      <Comments authUser={authUser!} todo={todo} />
      <NewComment authUser={authUser!} todo={props.todo} />
    </Wrapper>
  );
};
