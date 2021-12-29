import styled, { keyframes } from 'styled-components';
import { slideInLeft } from 'react-animations';
import { NavItem } from './NavItem';
import { RouteItem } from '@lib/routing';
import { User } from '@lib/slices/users';
import React, { useCallback, useState } from 'react';

type Props = {
  authUser: User;
  routes: RouteItem[];
};

const animationIn = keyframes`${slideInLeft}`;

const Wrapper = styled.div`
  width: 100px;
  height: 40px;
  position: absolute;
  left: 15px;
  top: 50px;
  @media (max-width: 559px) {
    width: 100vw;
    top: 45px;
    left: 0;
  }
`;

const Container = styled.div`
  z-index: 900;
  width: 200px;
  background-color: white;
  box-shadow: 0 0 5px #dfdfdf;
  min-height: 421px;
  position: absolute;
  border-radius: 0 0 5px 5px;
  top: 55px;
  animation: ${animationIn} 0.3s forwards;
  @media (max-width: 559px) {
    width: 100vw;
  }
`;

const H1 = styled.h1`
  color: var(--color-stroke);
  font-size: 12pt;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  border-bottom: 1px solid #dfdfdf;
  transition: linear 0.3s;
  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

export const Navigation = (props: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  const navItems = props.routes.map((route) => (
    <NavItem key={route.path} route={route} authUser={props.authUser} handleOpen={handleOpen}>
      <H1>{route.label}</H1>
    </NavItem>
  ));

  return (
    <Wrapper>
      <Menu onClick={handleOpen}>
        <H1>Меню</H1>
      </Menu>
      {isOpen && <Container>{navItems}</Container>}
    </Wrapper>
  );
};
