import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  children: JSX.Element | JSX.Element[];
  path: string;
  handleOpen: () => void;
};

type StyleProps = {
  active: boolean;
};

const Wrapper = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.active && '#f0f0f0'};
  border-bottom: 1px solid #dfdfdf;
  transition: linear 0.3s;
  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

export const NavItem = (props: Props): JSX.Element => {
  const { children, path, handleOpen } = props;
  const [active, setActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === path) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [location.pathname]);

  return (
    <Link to={path}>
      <Wrapper active={active} onClick={handleOpen}>
        {children}
      </Wrapper>
    </Link>
  );
};
