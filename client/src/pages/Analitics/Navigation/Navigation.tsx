import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { slideInLeft } from 'react-animations';
import { NavItem } from './NavItem';

const animationIn = keyframes`${slideInLeft}`;

const Wrapper = styled.div`
  width: 20%;
  box-shadow: 0 0 5px #dfdfdf;
  min-height: 500px;
  position: absolute;
  left: 15px;
  animation: ${animationIn} 0.3s forwards;
  @media (max-width: 559px) {
    display: none;
  }
`;

const H1 = styled.h1`
  color: var(--color-stroke);
  font-size: 12pt;
`;

export const Navigation = (): JSX.Element => {
  return (
    <Wrapper>
      <NavItem path={'/analytics/main'}>
        <H1>Главная</H1>
      </NavItem>
      <NavItem path={'/analytics/salesmans'}>
        <H1>Продавцы</H1>
      </NavItem>
      <NavItem path={'/analytics/evening-report'}>
        <H1>Вечерний отчет</H1>
      </NavItem>
    </Wrapper>
  );
};
