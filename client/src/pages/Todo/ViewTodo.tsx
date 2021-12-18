import React from 'react';
import { slideInRight, slideOutRight } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { useTypedSelector } from '../../lib/hooks';
import { Todo } from '../../lib/slices/todo';
import { TodoPayload } from '../../lib/slices/todo/todo.type';
import { userSelectors } from '../../lib/slices/users';
import closeX from '../../static/closeX.svg';
import { Comments } from './Comments/Comments';

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
  height: 100%;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px gray;
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

export const ViewTodo = (props: Props): JSX.Element => {
  const { todo, onClose, isClosing } = props;
  const creator = useTypedSelector(userSelectors.userById(todo.creatorId));
  const executor = useTypedSelector(userSelectors.userById(todo.executorId));

  return (
    <Wrapper isClosing={isClosing}>
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

      <H1>Комментарии</H1>
      <Comments comments={todo.comments} todo={todo} />
    </Wrapper>
  );
};
