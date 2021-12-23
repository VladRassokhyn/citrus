import React, { useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { DayRange } from '../../../Components/DayRange';
import { getCalcFns } from '../../../lib/common';
import { useTypedSelector } from '../../../lib/hooks';
import { planesSelectors } from '../../../lib/slices/planes';
import { Planes } from '../../../lib/slices/planes/planes.type';
import { Sales, SalesIndexes, salesSelectors } from '../../../lib/slices/sales';
import { salesmanSelectors } from '../../../lib/slices/salesman';
import { DiffDiagram } from './DiffDiagram';
import { PerToPerTable } from './PerToPerTable';
import { Result } from './Results';
import Selector from 'react-select';
import { FixLater } from '../../../lib/globalTypes';

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
  font-size: 12pt;
  color: var(--color-stroke);
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
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
  const [service, setService] = useState(SalesIndexes.CM);
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

  const calcFns = getCalcFns(month, year);
  let calcValues;
  if (params.salesmanId) {
    calcValues = getValues(salesmanSales1, salesmanSales2, planes, calcFns, service);
  } else {
    calcValues = getValues(firstSales, secondSales, planes, calcFns, service);
  }

  const serviceTitle =
    service === SalesIndexes.CM ? 'ЦМ' : service === SalesIndexes.CZ ? 'ЦЗ' : 'ЦА';

  const serviceSelectorOptions = [
    { label: 'ЦМ', value: SalesIndexes.CM },
    { label: 'ЦЗ', value: SalesIndexes.CZ },
    { label: 'ЦА', value: SalesIndexes.CA },
  ];

  const onChengeService = (e: FixLater) => {
    setService(e.value);
  };

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
              cm={+calcValues.firstSalesSumm.ttSales[service]}
              serviceTitle={serviceTitle}
              cmRatio={calcValues.firstRatio}
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
          <Selector
            options={serviceSelectorOptions}
            defaultValue={{ label: 'ЦМ', value: SalesIndexes.CM }}
            onChange={onChengeService}
            styles={{
              control: (styles) => ({ ...styles, width: '170px' }),
            }}
          />
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
              +calcValues.secondSalesSumm.ttSales[service] -
              +calcValues.firstSalesSumm.ttSales[service]
            }
            serviceTitle={serviceTitle}
            cmRatio={calcValues.secondRatio - calcValues.firstRatio}
            arrowDeg={calcValues.secondArrowDegre - calcValues.firstArrowDegre}
          />
        </Side>
        <Side>
          <HeaderContainer>
            <Result
              to={+calcValues.secondSalesSumm.ttSales[SalesIndexes.TO]}
              devices={+calcValues.secondSalesSumm.ttSales[SalesIndexes.DEVICES]}
              cm={+calcValues.secondSalesSumm.ttSales[service]}
              cmRatio={calcValues.secondRatio}
              serviceTitle={serviceTitle}
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
          <H2>Сумма {serviceTitle}</H2>
          <DiffDiagram values={calcValues.firstCM} />
        </Side>
        <Side>
          <H2>Доля</H2>
          <DiffDiagram values={calcValues.secondRatios} />
          <H2>Сумма {serviceTitle}</H2>
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

const parseRatioToOptions = (service: number) => (sale: Sales) => {
  const value = +((+sale.ttSales[service] / +sale.ttSales[SalesIndexes.DEVICES]) * 100).toFixed(2);
  return {
    label: `${sale.day.split('.')[0]}.${sale.day.split('.')[1]}`,
    value: isNaN(value) ? 0 : value,
  };
};
const parseSummToOtions = (service: number) => (sale: Sales) => ({
  label: `${sale.day.split('.')[0]}.${sale.day.split('.')[1]}`,
  value: +sale.ttSales[service],
});

const getValues = (
  firstSales: Sales[],
  secondSales: Sales[],
  planes: Planes,
  calcFns: any,
  service: number,
) => {
  const firstSalesSumm = calcFns.monthSalesNew(firstSales);
  const secondSalesSumm = calcFns.monthSalesNew(secondSales);

  const firstRatio = calcFns.ratio(
    firstSalesSumm.ttSales[service],
    firstSalesSumm.ttSales[SalesIndexes.DEVICES],
  );

  const secondRatio = calcFns.ratio(
    secondSalesSumm.ttSales[service],
    secondSalesSumm.ttSales[SalesIndexes.DEVICES],
  );

  const firstArrowDegre =
    service === SalesIndexes.CM
      ? firstRatio / planes.to_cm > 1
        ? 180
        : 180 * (firstRatio / planes.to_cm)
      : firstRatio / planes.to_cz > 1
      ? 180
      : 180 * (firstRatio / planes.to_cz);

  const secondArrowDegre =
    service === SalesIndexes.CM
      ? secondRatio / planes.to_cm > 1
        ? 180
        : 180 * (secondRatio / planes.to_cm)
      : secondRatio / planes.to_cz > 1
      ? 180
      : 180 * (secondRatio / planes.to_cz);

  const secondRatios = secondSales.map(parseRatioToOptions(service));
  const firstRatios = firstSales.map(parseRatioToOptions(service));
  const firstCM = firstSales.map(parseSummToOtions(service));
  const secondCM = secondSales.map(parseSummToOtions(service));

  return {
    firstSalesSumm,
    secondSalesSumm,
    firstRatio,
    secondRatio,
    firstArrowDegre,
    secondArrowDegre,
    secondRatios,
    firstRatios,
    firstCM,
    secondCM,
  };
};
