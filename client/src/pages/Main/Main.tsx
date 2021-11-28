import React from 'react';
import cmImage from '../../static/cmImage.webp';
import analitic from '../../static/analytic.png';
import employee from '../../static/employee.png';
import checklist from '../../static/checklist.png';
import styled, { keyframes } from 'styled-components';
import { bounceIn, bounceOutDown } from 'react-animations';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { paths } from '../../lib/routing';

type ClosingProps = {
  isClosing: boolean;
};

const bounceShow = keyframes`${bounceIn}`;
const bounceClose = keyframes`${bounceOutDown}`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-around;
`;

const MenuItem = styled.div<ClosingProps>`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: 1s ${(props) => (props.isClosing ? bounceClose : bounceShow)};
  gap: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
`;

const H1 = styled.h1`
  font-size: 12pt;
  color: var(--color-button);
`;

export const Main = (): JSX.Element => {
  const [isClosing, setIsClosing] = useState(false);
  const [destination, setDestination] = useState('');
  const history = useHistory();

  const handleClose = (dest: string) => {
    setIsClosing(true);
    setDestination(dest);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push(destination);
    }, 800);
    return () => clearTimeout(timer);
  }, [isClosing, destination]);

  return (
    <Wrapper>
      <MenuItem isClosing={isClosing} onClick={() => handleClose(paths.CM.BASE())}>
        <Img src={cmImage} alt="cm image" />
        <H1>Наполнение</H1>
      </MenuItem>
      <MenuItem isClosing={isClosing} onClick={() => handleClose(paths.ANALYTICS.MAIN.BASE())}>
        <Img src={analitic} alt="anslyics image" />
        <H1>Аналитика</H1>
      </MenuItem>
      <MenuItem isClosing={isClosing} onClick={() => handleClose(paths.USERS.BASE())}>
        <Img src={employee} alt="salesmans image" />
        <H1>Продавцы</H1>
      </MenuItem>
      <MenuItem isClosing={isClosing} onClick={() => handleClose(paths.CHECKLISTS.BASE())}>
        <Img src={checklist} alt="chacklist image" />
        <H1>Чеклист</H1>
      </MenuItem>
    </Wrapper>
  );
};
