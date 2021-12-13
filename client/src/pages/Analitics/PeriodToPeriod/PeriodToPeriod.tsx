import React, { useState } from 'react';
import styled from 'styled-components';
import { DayRange } from '../../../Components/DayRange';
import { getCalcFns } from '../../../lib/common';
import { useTypedSelector } from '../../../lib/hooks';
import { planesSelectors } from '../../../lib/slices/planes';
import { SalesIndexes, salesSelectors } from '../../../lib/slices/sales';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 150px;
  padding: 0 15px;
  box-shadow: 0 0 5px #dfdfdf;
  border-radius: 10px;
`;

const Side = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
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

export const PeriodToPeriod = (): JSX.Element => {
  const [firstDayFrom, setFirstDayFrom] = useState(1);
  const [firstDayTo, setFirstDayTo] = useState(1);
  const [secondDayFrom, setSecondDayFrom] = useState(1);
  const [secondDayTo, setSecondDayTo] = useState(1);
  const firstSales = useTypedSelector(salesSelectors.salsesByRange(firstDayFrom, firstDayTo));
  const secondSales = useTypedSelector(salesSelectors.salsesByRange(secondDayFrom, secondDayTo));
  const planes = useTypedSelector(planesSelectors.planes);
  const { month, year } = useTypedSelector(salesSelectors.monthAndYear);

  if (!firstSales || !secondSales || firstSales.length < 1 || secondSales.length < 1) {
    return <h1>no sales in range</h1>;
  }

  const calcFns = getCalcFns(month, year);

  const firstSalesSumm = calcFns.monthSalesNew(firstSales);
  const secondSalesSumm = calcFns.monthSalesNew(secondSales);

  const firstCmRatio = calcFns.ratio(
    firstSalesSumm.ttSales[SalesIndexes.CM],
    firstSalesSumm.ttSales[SalesIndexes.DEVICES],
  );

  return (
    <Wrapper>
      <Side>
        <DayRange
          from={firstDayFrom}
          to={firstDayTo}
          changeFrom={setFirstDayFrom}
          changeTo={setFirstDayTo}
        />
        <Content>
          <Title>ТО</Title>
          <Value>{firstSalesSumm.ttSales[SalesIndexes.TO].toLocaleString('ru')}</Value>
          <Title>Устройства</Title>
          <Value>{firstSalesSumm.ttSales[SalesIndexes.DEVICES].toLocaleString('ru')}</Value>
          <Title>ЦМ</Title>
          <Value>{firstSalesSumm.ttSales[SalesIndexes.CM].toLocaleString('ru')}</Value>
          <HalfCircle>
            <HR deg={firstCmRatio / planes.to_cm > 1 ? 180 : 180 * (firstCmRatio / planes.to_cm)}>
              <HRLeft />
            </HR>
            <InnerHalf>
              <Value>{firstCmRatio}</Value>
            </InnerHalf>
          </HalfCircle>
        </Content>
      </Side>
      <Side>
        <Content>
          <h5>to</h5>
          <h5>ЦМ: {secondSalesSumm.ttSales[SalesIndexes.CM].toLocaleString('ru')}</h5>
          <h5>Устройства: {secondSalesSumm.ttSales[SalesIndexes.DEVICES].toLocaleString('ru')}</h5>
          <h5>ТО: {secondSalesSumm.ttSales[SalesIndexes.TO].toLocaleString('ru')}</h5>
        </Content>
        <DayRange
          from={secondDayFrom}
          to={secondDayTo}
          changeFrom={setSecondDayFrom}
          changeTo={setSecondDayTo}
        />
      </Side>
    </Wrapper>
  );
};
