import cmImage from '../../static/cmImage.webp';
import analitic from '../../static/analytic.png';
import styled, { keyframes } from 'styled-components';
import { bounceIn, bounceOutDown } from 'react-animations';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

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
      <MenuItem isClosing={isClosing} onClick={() => handleClose('cm')}>
        <Img src={cmImage} alt="cm image" />
        <H1>Наполнение</H1>
      </MenuItem>
      <MenuItem isClosing={isClosing} onClick={() => handleClose('analytics')}>
        <Img src={analitic} alt="cm image" />
        <H1>Аналитика</H1>
      </MenuItem>
    </Wrapper>
  );
};
