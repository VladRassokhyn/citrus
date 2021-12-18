import styled from 'styled-components';
import { TodoComment } from '../../../lib/slices/todo/todo.type';
import { User } from '../../../lib/slices/users';

type Props = {
  comment: TodoComment;
  isAuthOwner: boolean;
};

type StyleProps = {
  isAuthOwner: boolean;
};

const Wrapper = styled.div<StyleProps>`
  width: 96%;
  padding: 2%;
  display: fles;
  flex-direction: row;
  justify-content: ${(props) => (props.isAuthOwner ? 'flex-start' : 'flex-end')};
`;

const Content = styled.div`
  width: 70%;
  heifht: 100%;
  min-height: 30px;
  background-color: gray;
  padding: 10px;
  border-radius: 10px;
`;

export const CommentItem = (props: Props): JSX.Element => {
  const { comment, isAuthOwner } = props;
  return (
    <Wrapper isAuthOwner={isAuthOwner}>
      <Content>comment</Content>
    </Wrapper>
  );
};
