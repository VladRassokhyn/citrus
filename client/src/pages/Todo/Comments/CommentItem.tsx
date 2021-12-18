import styled from 'styled-components';
import { useTypedSelector } from '../../../lib/hooks';
import { TodoComment } from '../../../lib/slices/todo/todo.type';
import { User, userSelectors } from '../../../lib/slices/users';

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
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.isAuthOwner ? 'flex-start' : 'flex-end')};
`;

const Content = styled.div`
  width: 70%;
  heifht: 100%;
  min-height: 30px;
  background-color: #def0fc;
  border-radius: 10px;
  padding: 5px 20px;
`;

const Name = styled.h1`
  font-size: 9pt;
  color: var(--color-stroke);
`;

const Text = styled.h1`
  margin-top: 5px;
  margin-left: 15px;
  padding-left: 5px;
  font-size: 9pt;
  font-weight: 300;
  border-left: 1px solid var(--color-stroke);
`;

const CommentDate = styled.h1`
  margin-top: 15px;
  width: 100%;
  text-align: right;
  font-size: 8pt;
  font-weight: 300;
`;

export const CommentItem = (props: Props): JSX.Element => {
  const { comment, isAuthOwner } = props;
  const creator = useTypedSelector(userSelectors.userById(comment.creatorId));
  return (
    <Wrapper isAuthOwner={isAuthOwner}>
      <Content>
        <Name>
          {creator?.lastName} {creator?.name}
        </Name>
        <Text>{comment.comment}</Text>
        <CommentDate>{comment.createdAt}</CommentDate>
      </Content>
    </Wrapper>
  );
};
