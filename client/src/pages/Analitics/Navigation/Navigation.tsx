import styled, { keyframes } from 'styled-components';
import { slideInLeft } from 'react-animations';
import { NavItem } from './NavItem';
import { paths } from '../../../lib/routing';
import { User } from '../../../lib/slices/users';
import { UserRoles } from '../../../lib/globalTypes';

type Props = {
  authUser: User;
};

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

export const Navigation = (props: Props): JSX.Element => {
  return (
    <Wrapper>
      <NavItem path={paths.ANALYTICS.MAIN.BASE()}>
        <H1>Главная</H1>
      </NavItem>
      <NavItem path={paths.ANALYTICS.SALESMANS.BASE()}>
        <H1>Продавцы</H1>
      </NavItem>
      <NavItem path={paths.ANALYTICS.EVENING_REPORT.BASE()}>
        <H1>Вечерний отчет</H1>
      </NavItem>
      {props.authUser.role === UserRoles.ADMIN && (
        <>
          <NavItem path={paths.ANALYTICS.SHOPS.BASE()}>
            <H1>Магазины</H1>
          </NavItem>
        </>
      )}
    </Wrapper>
  );
};
