import React, { useState } from 'react';
import styled from 'styled-components';
import { DayRange } from '../../../Components/DayRange';
import { getCalcFns } from '../../../lib/common';
import { useTypedSelector } from '../../../lib/hooks';
import { SalesIndexes, salesSelectors } from '../../../lib/slices/sales';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Content = styled.div``;

const Side = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PeriodToPeriod = (): JSX.Element => {
  const [firstDayFrom, setFirstDayFrom] = useState(1);
  const [firstDayTo, setFirstDayTo] = useState(1);
  const [secondDayFrom, setSecondDayFrom] = useState(1);
  const [secondDayTo, setSecondDayTo] = useState(1);
  const firstSales = useTypedSelector(salesSelectors.salsesByRange(firstDayFrom, firstDayTo));
  const secondSales = useTypedSelector(salesSelectors.salsesByRange(secondDayFrom, secondDayTo));
  const { month, year } = useTypedSelector(salesSelectors.monthAndYear);

  if (!firstSales || !secondSales || firstSales.length < 1 || secondSales.length < 1) {
    return <h1>no sales in range</h1>;
  }

  const calcFns = getCalcFns(month, year);

  const firstSalesSumm = calcFns.monthSalesNew(firstSales);
  const secondSalesSumm = calcFns.monthSalesNew(secondSales);

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
          <h5>from</h5>
          <h5>ЦМ: {firstSalesSumm.ttSales[SalesIndexes.CM].toLocaleString('ru')}</h5>
          <h5>Устройства: {firstSalesSumm.ttSales[SalesIndexes.DEVICES].toLocaleString('ru')}</h5>
          <h5>ТО: {firstSalesSumm.ttSales[SalesIndexes.TO].toLocaleString('ru')}</h5>
        </Content>
      </Side>
      <Side>
        <DayRange
          from={secondDayFrom}
          to={secondDayTo}
          changeFrom={setSecondDayFrom}
          changeTo={setSecondDayTo}
        />

        <Content>
          <h5>to</h5>
          <h5>ЦМ: {secondSalesSumm.ttSales[SalesIndexes.CM].toLocaleString('ru')}</h5>
          <h5>Устройства: {secondSalesSumm.ttSales[SalesIndexes.DEVICES].toLocaleString('ru')}</h5>
          <h5>ТО: {secondSalesSumm.ttSales[SalesIndexes.TO].toLocaleString('ru')}</h5>
        </Content>
      </Side>
      <Content>
        <h5>Raznica</h5>
        <h5>
          ЦМ:{' '}
          {(
            +secondSalesSumm.ttSales[SalesIndexes.CM] - +firstSalesSumm.ttSales[SalesIndexes.CM]
          ).toLocaleString('ru')}
        </h5>
        <h5>
          ЦМ:{' '}
          {(
            +secondSalesSumm.ttSales[SalesIndexes.DEVICES] -
            +firstSalesSumm.ttSales[SalesIndexes.DEVICES]
          ).toLocaleString('ru')}
        </h5>
        <h5>
          ЦМ:{' '}
          {(+secondSalesSumm.ttSales[SalesIndexes.TO] - +firstSalesSumm.ttSales[14]).toLocaleString(
            'ru',
          )}
        </h5>
      </Content>
    </Wrapper>
  );
};
