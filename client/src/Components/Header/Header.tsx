import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 90%;
  height: 40px;
  padding: 5px 5%;
  background-color: #3f4e5d;
`;

export const Header = (): JSX.Element => {
  const auth = false;
  return <Wrapper>{auth ? 'user' : <Link to={'/login'}>Login</Link>}</Wrapper>;
};
