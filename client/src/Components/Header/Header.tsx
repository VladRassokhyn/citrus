import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useTypedSelector } from '../../lib/hooks';
import { logout, authSelectors } from '../../lib/slices/auth';
import { slideInRight } from 'react-animations';
import { useDispatch } from 'react-redux';
import home from '../../static/home.svg';

type H1Props = {
  goLeft?: boolean;
};

const bounceInAnimation = keyframes`${slideInRight}`;

const goLeftAnimation = keyframes`
  0% {margin-left: 70%}
  100% {margin-left: 20%}
`;

const goRightAnimation = keyframes`
  0% {margin-left: 20%}
  100% {margin-left: 70%}
`;

const Wrapper = styled.div`
  width: 90%;
  height: 40px;
  padding: 5px 5%;
  background-color: #3f4e5d;
`;

const H1 = styled.h1<H1Props>`
  margin-top: 10px;
  margin-left: 70%;
  font-size: 10pt;
  color: white;
  animation: ${(props) => (props.goLeft ? goLeftAnimation : goRightAnimation)}
    0.3s forwards;
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
  const authUser = useTypedSelector(authSelectors.selectAuthUser);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <Wrapper>
      <Link to={'/'}>
        <Img src={home} />
      </Link>
      {authUser ? (
        <>
          <H1 onClick={handleOpen} goLeft={isOpen}>
            {`${authUser.lastName} ${authUser.name[0]}.`}
          </H1>
          {isOpen && (
            <LoginMenu onClick={handleOpen}>
              <Link to={`/users/${authUser.id}`}>
                <H2>Профиль</H2>
              </Link>
              <H2 onClick={handleLogout}>Выйти</H2>
            </LoginMenu>
          )}
        </>
      ) : (
        <Link to={'/login'}>
          <H1>Login</H1>
        </Link>
      )}
    </Wrapper>
  );
};
