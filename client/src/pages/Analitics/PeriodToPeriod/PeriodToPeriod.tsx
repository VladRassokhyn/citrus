import React, { useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { DayRange } from '../../../Components/DayRange';
import { getCalcFns } from '../../../lib/common';
import { useTypedSelector } from '../../../lib/hooks';
import { planesSelectors } from '../../../lib/slices/planes';
import { Planes } from '../../../lib/slices/planes/planes.type';
import { Sales, SalesIndexes, salesSelectors } from '../../../lib/slices/sales';
import { salesmanActions, salesmanSelectors } from '../../../lib/slices/salesman';
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
  const params = useParams<{ salesmanId: string }>();
  const [firstDayFrom, setFirstDayFrom] = useState(1);
  const [firstDayTo, setFirstDayTo] = useState(1);
  const [secondDayFrom, setSecondDayFrom] = useState(1);
  const [secondDayTo, setSecondDayTo] = useState(1);
  const firstSales = useTypedSelector(salesSelectors.salsesByRange(firstDayFrom, firstDayTo));
  const secondSales = useTypedSelector(salesSelectors.salsesByRange(secondDayFrom, secondDayTo));
  const salesLength = useTypedSelector(salesSelectors.salesLength);
  const planes = useTypedSelector(planesSelectors.planes);
  const { month, year } = useTypedSelector(salesSelectors.monthAndYear);
  const salesman = useTypedSelector(salesmanSelectors.salesmanById(params.salesmanId));
  const salesmanSales1 = useTypedSelector(
    salesmanSelectors.salesmanSales(params.salesmanId, { from: firstDayFrom, to: firstDayTo }),
  );
  const salesmanSales2 = useTypedSelector(
    salesmanSelectors.salesmanSales(params.salesmanId, { from: secondDayFrom, to: secondDayTo }),
  );

  if (!firstSales || !secondSales || firstSales.length < 1 || secondSales.length < 1) {
    return <h1>no sales in range</h1>;
  }
  console.log(params.salesmanId, salesmanSales1);
  const calcFns = getCalcFns(month, year);
  let calcValues;
  if (params.salesmanId) {
    calcValues = getValues(salesmanSales1, salesmanSales2, planes, calcFns);
  } else {
    calcValues = getValues(firstSales, secondSales, planes, calcFns);
  }

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
              to={+calcValues.firstSalesSumm.ttSales[SalesIndexes.TO]}
              devices={+calcValues.firstSalesSumm.ttSales[SalesIndexes.DEVICES]}
              cm={+calcValues.firstSalesSumm.ttSales[SalesIndexes.CM]}
              cmRatio={calcValues.firstCmRatio}
              arrowDeg={calcValues.firstArrowDegre}
            />
          </HeaderContainer>
        </Side>
        <Side>
          {params.salesmanId && (
            <H2>
              {salesman.name.split(' ')[0]} {salesman.name.split(' ')[1][0]}.
            </H2>
          )}
          <Result
            isDifference
            to={
              +calcValues.secondSalesSumm.ttSales[SalesIndexes.TO] -
              +calcValues.firstSalesSumm.ttSales[SalesIndexes.TO]
            }
            devices={
              +calcValues.secondSalesSumm.ttSales[SalesIndexes.DEVICES] -
              +calcValues.firstSalesSumm.ttSales[SalesIndexes.DEVICES]
            }
            cm={
              +calcValues.secondSalesSumm.ttSales[SalesIndexes.CM] -
              +calcValues.firstSalesSumm.ttSales[SalesIndexes.CM]
            }
            cmRatio={calcValues.secondCmRatio - calcValues.firstCmRatio}
            arrowDeg={calcValues.secondArrowDegre - calcValues.firstArrowDegre}
          />
        </Side>
        <Side>
          <HeaderContainer>
            <Result
              to={+calcValues.secondSalesSumm.ttSales[SalesIndexes.TO]}
              devices={+calcValues.secondSalesSumm.ttSales[SalesIndexes.DEVICES]}
              cm={+calcValues.secondSalesSumm.ttSales[SalesIndexes.CM]}
              cmRatio={calcValues.secondCmRatio}
              arrowDeg={calcValues.secondArrowDegre}
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
          <DiffDiagram values={calcValues.firstRatios} />
          <H2>Сумма ЦМ</H2>
          <DiffDiagram values={calcValues.firstCM} />
        </Side>
        <Side>
          <H2>Доля</H2>
          <DiffDiagram values={calcValues.secondRatios} />
          <H2>Сумма ЦМ</H2>
          <DiffDiagram values={calcValues.secondCM} />
        </Side>
      </Charts>
      {!params.salesmanId && (
        <PerToPerTable
          sales1={calcValues.firstSalesSumm}
          sales2={calcValues.secondSalesSumm}
          per1={`${firstDayFrom}-${firstDayTo}`}
          per2={`${secondDayFrom}-${secondDayTo}`}
        />
      )}
    </Wrapper>
  );
};

const parseRatioToOptions = (sale: Sales) => {
  const value = +(
    (+sale.ttSales[SalesIndexes.CM] / +sale.ttSales[SalesIndexes.DEVICES]) *
    100
  ).toFixed(2);
  return {
    label: `${sale.day.split('.')[0]}.${sale.day.split('.')[1]}`,
    value: isNaN(value) ? 0 : value,
  };
};
const parseCMToOtions = (sale: Sales) => ({
  label: `${sale.day.split('.')[0]}.${sale.day.split('.')[1]}`,
  value: +sale.ttSales[SalesIndexes.CM],
});

const getValues = (firstSales: Sales[], secondSales: Sales[], planes: Planes, calcFns: any) => {
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

  const secondRatios = secondSales.map(parseRatioToOptions);
  const firstRatios = firstSales.map(parseRatioToOptions);
  const firstCM = firstSales.map(parseCMToOtions);
  const secondCM = secondSales.map(parseCMToOtions);

  return {
    firstSalesSumm,
    secondSalesSumm,
    firstCmRatio,
    secondCmRatio,
    firstArrowDegre,
    secondArrowDegre,
    secondRatios,
    firstRatios,
    firstCM,
    secondCM,
  };
};
