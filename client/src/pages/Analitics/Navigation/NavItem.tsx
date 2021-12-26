import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserRoles } from '../../../lib/globalTypes';
import { RouteItem } from '../../../lib/routing';
import { User } from '../../../lib/slices/users';

type Props = {
  children: JSX.Element | JSX.Element[];
  route: RouteItem;
  authUser: User;
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
  const { children, authUser, handleOpen, route } = props;
  const [active, setActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === route.path) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [location.pathname]);

  if ((route.private && authUser.role !== UserRoles.ADMIN) || !route.navigationVisible) {
    return <div />;
  }

  return (
    <Link to={route.path}>
      <Wrapper active={active} onClick={handleOpen}>
        {children}
      </Wrapper>
    </Link>
  );
};
