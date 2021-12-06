import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useTypedSelector } from '../../lib/hooks';
import { authActions, authSelectors } from '../../lib/slices/auth';
import { slideInRight } from 'react-animations';
import { useDispatch } from 'react-redux';
import home from '../../static/home.svg';
import { paths } from '../../lib/routing';

type H1Props = {
  goLeft?: boolean;
};

const bounceInAnimation = keyframes`${slideInRight}`;

const goLeftAnimationMobile = keyframes`
  0% {margin-left: 70%}
  100% {margin-left: 20%}
`;

const goRightAnimationMobile = keyframes`
  0% {margin-left: 20%}
  100% {margin-left: 70%}
`;

const goLeftAnimationPC = keyframes`
  0% {margin-left: 70%}
  100% {margin-left: 50%}
`;

const goRightAnimationPC = keyframes`
  0% {margin-left: 50%}
  100% {margin-left: 70%}
`;

const Wrapper = styled.div`
  width: 90%;
  height: 40px;
  padding: 5px 5%;
  background-color: #3f4e5d;
  position: relative;
  z-index: 1000;
`;

const H1 = styled.h1<H1Props>`
  margin-top: 10px;
  margin-left: 70%;
  font-size: 10pt;
  color: white;
  animation: ${(props) => (props.goLeft ? goLeftAnimationPC : goRightAnimationPC)} 0.3s forwards;
  @media (max-width: 559px) {
    animation: ${(props) => (props.goLeft ? goLeftAnimationMobile : goRightAnimationMobile)} 0.3s
      forwards;
  }
  &:hover {
    cursor: pointer;
  }
`;

const H2 = styled.h1`
  font-size: 12pt;
  color: white;
`;

const LoginMenu = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  animation: ${bounceInAnimation} 0.3s forwards;
`;

const Img = styled.img`
  margin-top: 5px;
  height: 70%;
  float: left;
`;

export const Header = (): JSX.Element => {
  const authUser = useTypedSelector(authSelectors.authUser);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const openToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(authActions.logout());
    history.push(paths.BASE());
  }, []);

  return (
    <Wrapper>
      <Link to={paths.BASE()}>
        <Img src={home} />
      </Link>
      {authUser ? (
        <>
          <H1 onClick={openToggle} goLeft={isOpen}>
            {`${authUser.lastName} ${authUser.name[0]}.`}
          </H1>
          {isOpen && (
            <LoginMenu onClick={openToggle}>
              <Link to={paths.USERS.BY_ID({ userId: authUser.id })}>
                <H2>Профиль</H2>
              </Link>
              <H2 onClick={handleLogout}>Выйти</H2>
            </LoginMenu>
          )}
        </>
      ) : (
        <Link to={paths.LOGIN.BASE()}>
          <H1>Login</H1>
        </Link>
      )}
    </Wrapper>
  );
};
