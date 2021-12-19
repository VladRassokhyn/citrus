import React from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../lib/hooks';
import { Todo } from '../../lib/slices/todo';
import { userSelectors } from '../../lib/slices/users';
import comment from '../../static/comment.svg';

type Props = {
  todo: Todo;
  even: boolean;
  setCurrentTodo: (todo: Todo) => void;
};

type CellStyle = {
  even: boolean;
  isFinished: boolean;
};

const Cell = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
`;

const Img = styled.img`
  width: 15px;
  height: 15px;
`;

const H1 = styled.h1`
  font-size: 10pt;
  color: var(--color-stroke);
`;

const Dot = styled.div<{ color: string }>`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

const Wrapper = styled.div<CellStyle>`
  display: grid;
  grid-template-columns: 5% 10% 15% 35% 10% 10% 10% 5%;
  min-height: 30px;
  background-color: ${(props) => (props.even ? 'white' : '#f0f0f0')};
  gap: 1px;
  transition: linear 0.3s;
  &:hover {
    background-color: #def0fc;
    cursor: pointer;
  }
  ${(props) =>
    props.isFinished &&
    `& ${H1} {
    color: lightgray !important;
  }`}
`;

export const TodoItem = (props: Props): JSX.Element => {
  const { todo, setCurrentTodo } = props;
  const creator = useTypedSelector(userSelectors.userById(todo.creatorId));
  const executor = useTypedSelector(userSelectors.userById(todo.executorId));
  return (
    <Wrapper even={props.even} isFinished={todo.finished} onClick={() => setCurrentTodo(todo)}>
      <Cell>
        {todo.importance === 'Важно' && <Dot color={'red'} />}
        {todo.importance === 'Средне' && <Dot color={'orange'} />}
        {todo.importance === 'Не важно' && <Dot color={'green'} />}
      </Cell>
      <Cell>
        <H1>{todo.category}</H1>
      </Cell>
      <Cell>
        <H1>{todo.title}</H1>
      </Cell>
      <Cell>
        <H1>{todo.description.substr(0, 50)}...</H1>
      </Cell>
      <Cell>
        <H1>
          {creator?.lastName} {creator?.name[0]}.
        </H1>
      </Cell>
      <Cell>
        <H1>
          {executor?.lastName} {executor?.name[0]}.
        </H1>
      </Cell>
      <Cell>
        <H1>{todo.createdAt}</H1>
      </Cell>
      <Cell>
        <Img src={comment} />
        <H1>{todo.comments.length}</H1>
      </Cell>
    </Wrapper>
  );
};
