import styled from 'styled-components';
import { useTypedSelector } from '../../../lib/hooks';
import { authSelectors } from '../../../lib/slices/auth';
import { Todo, TodoComment } from '../../../lib/slices/todo/todo.type';
import { CommentItem } from './CommentItem';
import { NewComment } from './NewComment';

type Props = {
  comments: TodoComment[];
  todo: Todo;
};

const Wrapper = styled.div`
  background-color: white;
  border-radius: 5px;
  margin-top: 10px;
  width: 100%;
  height: 100%;
`;

const H1 = styled.h1`
  font-size: 16pt;
  color: var(--color-button);
`;

export const Comments = (props: Props): JSX.Element => {
  const authUser = useTypedSelector(authSelectors.authUser);
  return (
    <Wrapper>
      <CommentItem comment={props.comments[1]} isAuthOwner={authUser?.id === 1} />
      <NewComment authUser={authUser!} todo={props.todo} />
    </Wrapper>
  );
};
