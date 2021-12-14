import React, { useState } from 'react';
import styled from 'styled-components';
import { DayRange } from '../../../Components/DayRange';
import { getCalcFns } from '../../../lib/common';
import { useTypedSelector } from '../../../lib/hooks';
import { planesSelectors } from '../../../lib/slices/planes';
import { Sales, SalesIndexes, salesSelectors } from '../../../lib/slices/sales';
import { sales } from '../../../lib/slices/sales/sales.selectors';
import { DiffDiagram } from './DiffDiagram';
import { PerToPerTable } from './PerToPerTable';
import { Result } from './Results';

const Wrapper = styled.div``;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
`;

const Charts = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
`;

const H2 = styled.h1`
  font-size: 14pt;
  color: var(--color-stroke);
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

export const PeriodToPeriod = (): JSX.Element => {
  const [firstDayFrom, setFirstDayFrom] = useState(1);
  const [firstDayTo, setFirstDayTo] = useState(1);
  const [secondDayFrom, setSecondDayFrom] = useState(1);
  const [secondDayTo, setSecondDayTo] = useState(1);
  const firstSales = useTypedSelector(salesSelectors.salsesByRange(firstDayFrom, firstDayTo));
  const secondSales = useTypedSelector(salesSelectors.salsesByRange(secondDayFrom, secondDayTo));
  const salesLength = useTypedSelector(salesSelectors.salesLength);
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

  const secondCmRatio = calcFns.ratio(
    secondSalesSumm.ttSales[SalesIndexes.CM],
    secondSalesSumm.ttSales[SalesIndexes.DEVICES],
  );

  const firstArrowDegre =
    firstCmRatio / planes.to_cm > 1 ? 180 : 180 * (firstCmRatio / planes.to_cm);

  const secondArrowDegre =
    secondCmRatio / planes.to_cm > 1 ? 180 : 180 * (secondCmRatio / planes.to_cm);

  const parseRatioToOptions = (sale: Sales) => ({
    label: `${sale.day.split('.')[0]}.${sale.day.split('.')[1]}`,
    value: +((+sale.ttSales[SalesIndexes.CM] / +sale.ttSales[SalesIndexes.DEVICES]) * 100).toFixed(
      2,
    ),
  });
  const parseCMToOtions = (sale: Sales) => ({
    label: `${sale.day.split('.')[0]}.${sale.day.split('.')[1]}`,
    value: +sale.ttSales[SalesIndexes.CM],
  });
  const secondRatios = secondSales.map(parseRatioToOptions);
  const firstRatios = firstSales.map(parseRatioToOptions);
  const firstCM = firstSales.map(parseCMToOtions);
  const secondCM = secondSales.map(parseCMToOtions);

  return (
    <Wrapper>
      <Header>
        <Side>
          <HeaderContainer>
            <DayRange
              activeDays={salesLength}
              from={firstDayFrom}
              to={firstDayTo}
              changeFrom={setFirstDayFrom}
              changeTo={setFirstDayTo}
            />
            <Result
              to={+firstSalesSumm.ttSales[SalesIndexes.TO]}
              devices={+firstSalesSumm.ttSales[SalesIndexes.DEVICES]}
              cm={+firstSalesSumm.ttSales[SalesIndexes.CM]}
              cmRatio={firstCmRatio}
              arrowDeg={firstArrowDegre}
            />
          </HeaderContainer>
        </Side>
        <Side>
          <Result
            isDifference
            to={
              +secondSalesSumm.ttSales[SalesIndexes.TO] - +firstSalesSumm.ttSales[SalesIndexes.TO]
            }
            devices={
              +secondSalesSumm.ttSales[SalesIndexes.DEVICES] -
              +firstSalesSumm.ttSales[SalesIndexes.DEVICES]
            }
            cm={
              +secondSalesSumm.ttSales[SalesIndexes.CM] - +firstSalesSumm.ttSales[SalesIndexes.CM]
            }
            cmRatio={secondCmRatio - firstCmRatio}
            arrowDeg={secondArrowDegre - firstArrowDegre}
          />
        </Side>
        <Side>
          <HeaderContainer>
            <Result
              to={+secondSalesSumm.ttSales[SalesIndexes.TO]}
              devices={+secondSalesSumm.ttSales[SalesIndexes.DEVICES]}
              cm={+secondSalesSumm.ttSales[SalesIndexes.CM]}
              cmRatio={secondCmRatio}
              arrowDeg={secondArrowDegre}
            />
            <DayRange
              activeDays={salesLength}
              from={secondDayFrom}
              to={secondDayTo}
              changeFrom={setSecondDayFrom}
              changeTo={setSecondDayTo}
            />
          </HeaderContainer>
        </Side>
      </Header>
      <Charts>
        <Side>
          <H2>Доля</H2>
          <DiffDiagram values={firstRatios} />
          <H2>Сумма ЦМ</H2>
          <DiffDiagram values={firstCM} />
        </Side>
        <Side>
          <H2>Доля</H2>
          <DiffDiagram values={secondRatios} />
          <H2>Сумма ЦМ</H2>
          <DiffDiagram values={secondCM} />
        </Side>
      </Charts>
      <PerToPerTable
        sales1={firstSalesSumm}
        sales2={secondSalesSumm}
        per1={`${firstDayFrom}-${firstDayTo}`}
        per2={`${secondDayFrom}-${secondDayTo}`}
      />
    </Wrapper>
  );
};
