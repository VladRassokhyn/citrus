import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 20%;
  box-shadow: 0 0 5px #dfdfdf;
  min-height: 500px;
  position: absolute;
  left: 15px;
  @media (max-width: 559px) {
    display: none;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #dfdfdf;
  transition: linear 0.3s;
  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const H1 = styled.h1`
  color: var(--color-stroke);
  font-size: 12pt;
`;

export const Navigation = (): JSX.Element => {
  return (
    <Wrapper>
      <Link to={'/analytics/evening-report'}>
        <NavItem>
          <H1>Вечерний отчет</H1>
        </NavItem>
      </Link>
    </Wrapper>
  );
};
