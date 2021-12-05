import styled, { keyframes } from 'styled-components';
import { slideInLeft } from 'react-animations';
import { NavItem } from './NavItem';
import { paths } from '../../../lib/routing';
import { User } from '../../../lib/slices/users';
import { UserRoles } from '../../../lib/globalTypes';
import { useCallback, useState } from 'react';

type Props = {
  authUser: User;
};

const animationIn = keyframes`${slideInLeft}`;

const Wrapper = styled.div`
  width: 300px;
  height: 40px;
  position: absolute;
  left: 15px;
  top: 50px;
`;

const Container = styled.div`
  z-index: 900;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 5px #dfdfdf;
  min-height: 421px;
  position: absolute;
  border-radius: 0 0 5px 5px;
  top: 55px;
  animation: ${animationIn} 0.3s forwards;
  @media (max-width: 559px) {
    display: none;
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
  width: 300px;
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

  return (
    <Wrapper>
      <Menu onClick={handleOpen}>
        <H1>Меню</H1>
      </Menu>
      {isOpen && (
        <Container>
          <NavItem path={paths.ANALYTICS.MAIN.BASE()} handleOpen={handleOpen}>
            <H1>Главная</H1>
          </NavItem>
          <NavItem path={paths.ANALYTICS.SALESMANS.BASE()} handleOpen={handleOpen}>
            <H1>Продавцы</H1>
          </NavItem>
          <NavItem path={paths.ANALYTICS.EVENING_REPORT.BASE()} handleOpen={handleOpen}>
            <H1>Вечерний отчет</H1>
          </NavItem>
          {props.authUser.role === UserRoles.ADMIN && (
            <>
              <NavItem path={paths.ANALYTICS.SHOPS.BASE()} handleOpen={handleOpen}>
                <H1>Магазины</H1>
              </NavItem>
            </>
          )}
        </Container>
      )}
    </Wrapper>
  );
};
