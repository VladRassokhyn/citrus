import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Preloader } from '@components/Preloader';
import { LoadingStatuses, UserRoles } from '@lib/globalTypes';
import { useTypedSelector } from '@lib/hooks';
import { todoActions, todoSelectors, TodoPayload, Todo as TodoType } from '@lib/slices/todo';
import { User, userActions, userSelectors } from '@lib/slices/users';
import { NewTodoForm } from './NewTodoForm';
import { TodoItem } from './TodoItem';
import { ViewTodo } from './ViewTodo';
import { TodoFilters } from './TodoFilters';

type Props = {
  authUser: User;
};

type StyleProps = {
  active?: boolean;
};

const Wrapper = styled.div`
  padding: 0 15px;
`;

const Todos = styled.div``;

const TodosHeader = styled.div`
  margin: 15px 0;
  display: grid;
  grid-template-columns: 5% 10% 15% 35% 10% 10% 10% 5%;
  height: 30px;
  gap: 1px;
`;

const HeaderItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-button);
`;

const H1 = styled.h1`
  font-size: 10pt;
  color: white;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.button<StyleProps>`
  background-color: ${(props) => (props.active ? 'var(--color-button)' : '#f1f1f1')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  width: 200px;
  height: 30px;
  border: 0;
  margin-top: 20px;
  border-radius: 5px;
  transition: linear 0.3s;
  &:hover {
    cursor: pointer;
    background-color: #0780ff;
  }
`;

export const Todo = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const todos = useTypedSelector(todoSelectors.todos);
  const todoStatus = useTypedSelector(todoSelectors.status);
  const usersStatus = useTypedSelector(userSelectors.status);
  const admins = useTypedSelector(userSelectors.usersByRole(UserRoles.ADMIN));
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<TodoType | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const isTodoLoading = todoStatus === LoadingStatuses.LOADING;
  const isUsersLoading = usersStatus === LoadingStatuses.LOADING;

  const openSide = useCallback(() => setIsCreateMode(true), []);
  const closeSide = useCallback(() => setIsClosing(true), []);

  const postTodo = (payload: TodoPayload) => {
    dispatch(todoActions.postTodo(payload));
  };

  useEffect(() => {
    dispatch(todoActions.getTodos());
    dispatch(userActions.getUsers(1));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCreateMode(false);
      setIsClosing(false);
      setCurrentTodo(null);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [isClosing]);

  if (isTodoLoading || isUsersLoading) {
    return <Preloader />;
  }

  const showFiltersToggle = () => setShowFilters((prev) => !prev);

  const todosToRender = todos?.map((todo, i) => (
    <TodoItem even={i % 2 !== 0} key={todo.id} todo={todo} setCurrentTodo={setCurrentTodo} />
  ));

  return (
    <Wrapper>
      <Buttons>
        <Button onClick={showFiltersToggle} active={!showFilters}>
          {!showFilters ? 'Показать фильтры' : 'Скрыть фильтры'}
        </Button>
        <Button onClick={openSide} active>
          Добавить заявку
        </Button>
      </Buttons>
      <TodoFilters isOpen={showFilters} />
      <Todos>
        <TodosHeader>
          <HeaderItem>
            <H1>Важно</H1>
          </HeaderItem>
          <HeaderItem>
            <H1>Категория</H1>
          </HeaderItem>
          <HeaderItem>
            <H1>Имя заявки</H1>
          </HeaderItem>
          <HeaderItem>
            <H1>Описание</H1>
          </HeaderItem>
          <HeaderItem>
            <H1>Создатель</H1>
          </HeaderItem>
          <HeaderItem>
            <H1>Исполнитель</H1>
          </HeaderItem>
          <HeaderItem>
            <H1>Дата создания</H1>
          </HeaderItem>
          <HeaderItem />
        </TodosHeader>
        {todosToRender}
      </Todos>

      {isCreateMode && (
        <NewTodoForm
          onClose={closeSide}
          isClosing={isClosing}
          authUser={props.authUser}
          executors={admins}
          action={postTodo}
        />
      )}

      {currentTodo && (
        <ViewTodo todo={currentTodo} onClose={closeSide} isClosing={isClosing} action={postTodo} />
      )}
    </Wrapper>
  );
};
