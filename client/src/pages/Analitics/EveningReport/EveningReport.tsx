import React, { useState } from 'react';
import styled from 'styled-components';
import { DayRange } from '@components/DayRange';
import { useTypedSelector } from '@lib/hooks';
import { salesSelectors } from '@lib/slices/sales';
import { Shop } from '@lib/slices/shop';
import { User } from '@lib/slices/users';
import { EveningReportTable } from './EveningReportTable';

type Props = {
  authUser: User;
  currentShop: Shop;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
`;

export const EveningReport = (props: Props): JSX.Element => {
  const salesLength = useTypedSelector(salesSelectors.salesLength);
  const [dayFrom, setDayFrom] = useState(1);
  const [dayTo, setDayTo] = useState(salesLength);
  const sales = useTypedSelector(salesSelectors.salsesByRange(dayFrom, dayTo));

  const handleChangeFrom = (day: number) => {
    setDayFrom(day);
  };

  const handleChangeTo = (day: number) => {
    setDayTo(day);
  };

  return (
    <Wrapper>
      <DayRange from={dayFrom} to={dayTo} changeFrom={handleChangeFrom} changeTo={handleChangeTo} />
      {sales && sales.length !== 0 ? (
        <EveningReportTable
          sales={sales}
          currentShop={props.currentShop}
          day={dayTo}
          month={parseInt(sales[0].day.split('.')[1]) - 1}
        />
      ) : (
        <h1>no sales for this range</h1>
      )}
    </Wrapper>
  );
};
