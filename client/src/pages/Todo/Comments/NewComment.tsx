import { format } from 'date-fns';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Todo, todoActions } from '../../../lib/slices/todo';
import { User } from '../../../lib/slices/users';

type Props = {
  authUser: User;
  todo: Todo;
};

const Wrapper = styled.div``;

const Input = styled.input``;

export const NewComment = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { authUser, todo } = props;
  const [inputValue, setInputValue] = useState('');

  const send = () => {
    const newComment = {
      title: '',
      comment: inputValue,
      creatorId: authUser.id,
      createdAt: format(new Date(), 'dd.MM.yyyy'),
      todo,
    };
    dispatch(todoActions.postComment(newComment));
  };
  return (
    <Wrapper>
      <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={send}>save</button>
    </Wrapper>
  );
};
