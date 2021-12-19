import styled from 'styled-components';
import { Todo } from '../../../lib/slices/todo/todo.type';
import { User } from '../../../lib/slices/users';
import { CommentItem } from './CommentItem';
import { NewComment } from './NewComment';

type Props = {
  todo: Todo;
  authUser: User;
};

const Wrapper = styled.div`
  background-color: white;
  border-radius: 5px;
  margin-top: 10px;
  width: 100%;
  max-height: 300px;
  position: relative;
  overflow: scroll;
`;

export const Comments = (props: Props): JSX.Element => {
  const comments = props.todo.comments.map((comment) => (
    <CommentItem
      key={comment.id}
      comment={comment}
      isAuthOwner={props.authUser?.id === comment.creatorId}
    />
  ));
  return (
    <Wrapper>
      {comments}
      <NewComment todo={props.todo} authUser={props.authUser} />
    </Wrapper>
  );
};
