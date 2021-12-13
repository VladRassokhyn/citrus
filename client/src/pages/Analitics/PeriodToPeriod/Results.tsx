import React from 'react';
import styled from 'styled-components';

type Props = {
  isDifference?: boolean;
  cm: number;
  to: number;
  devices: number;
  cmRatio: number;
  arrowDeg: number;
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 170px;
  box-shadow: 0 0 5px #dfdfdf;
  border-radius: 10px;
`;

const Title = styled.h1`
  margin-top: 10px;
  font-size: 12pt;
  color: var(--color-button);
`;

const Value = styled.h1`
  letter-spacing: 1pt;
  font-size: 16pt;
  color: var(--color-stroke);
`;

const HalfCircle = styled.div`
  margin-top: 30px;
  width: 130px;
  height: 65px;
  border-radius: 65px 65px 0 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: linear-gradient(
    90deg,
    rgba(180, 58, 58, 0.7469362745098039) 0%,
    rgba(74, 252, 69, 0.6601015406162465) 100%
  );
`;

const HR = styled.div<{ deg: number }>`
  position: absolute;
  width: 140px;
  z-index: 200;
  transform: rotate(${(props) => props.deg}deg);
  transition: linear 0.3s;
`;

const HRLeft = styled.div`
  height: 3px;
  width: 30px;
  background-color: var(--color-stroke);
`;

const InnerHalf = styled.div`
  position: relative;
  z-index: 100;
  width: 90px;
  height: 45px;
  border-radius: 45px 45px 0 0;
  background-color: white;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const DiffHeader = styled.div`
  height: 40px;
  width: 100%;
  border-radius: 10px 10px 0 0;
  background-color: var(--color-button);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderTitele = styled.h1`
  font-size: 18pt;
  color: white;
`;

export const Result = (props: Props): JSX.Element => {
  const { isDifference, cm, devices, to, arrowDeg, cmRatio } = props;
  return (
    <Content>
      {isDifference && (
        <DiffHeader>
          <HeaderTitele>Разница</HeaderTitele>
        </DiffHeader>
      )}
      <Title>ТО</Title>
      <Value>{to.toLocaleString('ru')}</Value>
      <Title>Устройства</Title>
      <Value>{devices.toLocaleString('ru')}</Value>
      <Title>ЦМ</Title>
      <Value>{cm.toLocaleString('ru')}</Value>
      {isDifference && <Title>Доля</Title>}
      {isDifference && <Value>{cmRatio.toFixed(2)}</Value>}
      {!isDifference && (
        <HalfCircle>
          <HR deg={arrowDeg}>
            <HRLeft />
          </HR>
          <InnerHalf>
            <Value>{cmRatio}</Value>
          </InnerHalf>
        </HalfCircle>
      )}
    </Content>
  );
};
