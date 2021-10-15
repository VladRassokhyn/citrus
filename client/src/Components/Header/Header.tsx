import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  authUser: {
    id: number;
    username: string;
    role: string;
  } | null;
};

const Wrapper = styled.div`
  width: 90%;
  height: 40px;
  padding: 5px 5%;
  background-color: #3f4e5d;
`;

const H1 = styled.h1`
  font-size: 14pt;
  color: white;
`;

export const Header = (props: Props): JSX.Element => {
  const { authUser } = props;
  return (
    <Wrapper>
      {authUser ? (
        <H1>{authUser.username}</H1>
      ) : (
        <Link to={'/login'}>Login</Link>
      )}
    </Wrapper>
  );
};
