import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations';
import { Sales } from '../../../lib/slices/daySales';
import { useCallback, useState } from 'react';

type Props = {
  isEmpty?: boolean;
  title: string;
  delay: number;
  daySales?: Sales;
};

type StyleProps = {
  delay?: number;
  withData?: boolean;
  disabled?: boolean;
  isEmpty?: boolean;
};

const animationIn = keyframes`${zoomIn}`;
const opacityAnimation = keyframes`0% {opacity: 0;} 100% {opacity: 1;}`;

const Button = styled.button<StyleProps>`
  background-color: ${(props) => (props.disabled ? '#aaa' : 'var(--color-button)')};
  color: white;
  width: 100%;
  height: 0;
  border: 0;
  border-radius: 0 0 10px 10px;
  transition: linear 0.1s;
  ${(props) =>
    !props.disabled &&
    `&:hover {
      cursor: pointer;
      background-color: #1890ff;
    }`}
`;

const Title = styled.h1`
  width: 100%;
  padding: 5px 0;
  border-radius: 10px 10px 0 0;
  font-size: 14pt;
  color: white;
  background-color: var(--color-button);
  text-align: center;
`;

const Content = styled.div`
  padding: 5% 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: space-between;
  height: 70%;
  transition: linear 0.1s;
`;

const H1 = styled.h1`
  font-size: 10pt;
  color: ${(props) => props.color};
`;

const Wrapper = styled.div<StyleProps>`
  background-color: ${(props) =>
    props.isEmpty ? '#dfdfdf' : props.withData ? '#ebffeb' : '#fff0f0'};
  box-shadow: 0 0 5px #dfdfdf;
  border-radius: 10px;
  opacity: 0;
  min-width: 100px;
  animation: ${opacityAnimation} 0.1s forwards, ${animationIn} 0.3s forwards;
  animation-delay: ${(props) => props.delay && props.delay * 50}ms;
  &:hover {
    cursor: pointer;
  }
  &:hover ${Button} {
    height: 30px;
  }
  &:hover ${Content} {
    height: 50%;
  }
`;

export const CalendarDay = (props: Props): JSX.Element => {
  const { isEmpty, title, delay, daySales } = props;

  if (isEmpty) return <Wrapper isEmpty delay={delay} />;

  return (
    <Wrapper delay={delay} withData={!!daySales}>
      <Title>{title}</Title>
      <Content>
        <H1 color={'gray'}>ТО: {daySales ? daySales.to : 'no data'}</H1>
        <H1 color={'green'}>ЦМ: {daySales ? daySales.cm : 'no data'}</H1>
        <H1 color={'red'}>ЦЗ: {daySales ? daySales.cz : 'no data'}</H1>
        <H1 color={'#9018ad'}>ЦА: {daySales ? daySales.ca : 'no data'}</H1>
      </Content>
      <Button>{!!daySales ? 'Обновить' : 'Заполнить'}</Button>
    </Wrapper>
  );
};
