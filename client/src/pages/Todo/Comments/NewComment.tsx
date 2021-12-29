import { format } from 'date-fns';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Todo, todoActions } from '@lib/slices/todo';
import { User } from '@lib/slices/users';

type Props = {
  authUser: User;
  todo: Todo;
};

const Wrapper = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  height: 40px;
  width: 100%;
`;

const Input = styled.textarea`
  width: 100%;
  border: 1px solid var(--color-button);
  height: 32px;
  border-radius: 0 0 0 5px;
  resize: none;
  padding: 3px 10px;
`;

const Button = styled.button`
  background-color: var(--color-button);
  color: white;
  width: 150px;
  height: 40px;
  border: 0;
  border-radius: 0 5px 5px 0;
  transition: linear 0.3s;
  &:hover {
    cursor: pointer;
    background-color: #0780ff;
  }
`;

export const NewComment = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { authUser, todo } = props;
  const [inputValue, setInputValue] = useState('');

  const send = () => {
    const newComment = {
      title: '',
      comment: inputValue,
      creatorId: authUser.id,
      createdAt: format(new Date(), 'HH:MM, dd.MM.yyyy'),
      todo,
    };
    dispatch(todoActions.postComment(newComment));
  };
  return (
    <Wrapper>
      <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <Button onClick={send}>Добавить</Button>
    </Wrapper>
  );
};
