import { useState } from 'react';
import styled from 'styled-components';
import { DayRange } from '../../../Components/DayRange';
import { useTypedSelector } from '../../../lib/hooks';
import { salesSelectors } from '../../../lib/slices/sales';
import { User } from '../../../lib/slices/users';
import { EveningReportTable } from './EveningReportTable';

type Props = {
  authUser: User;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
`;

export const EveningReport = (props: Props): JSX.Element => {
  const salesLength = useTypedSelector(salesSelectors.selectSalesLength);
  const [dayFrom, setDayFrom] = useState(1);
  const [dayTo, setDayTo] = useState(salesLength);
  const sales = useTypedSelector(salesSelectors.selectSalsesByRange(dayFrom, dayTo));

  const handleChangeFrom = (day: number) => {
    setDayFrom(day);
  };

  const handleChangeTo = (day: number) => {
    setDayTo(day);
  };

  console.log(dayFrom, dayTo)
  return (
    <Wrapper>
      <DayRange from={dayFrom} to={dayTo} changeFrom={handleChangeFrom} changeTo={handleChangeTo} />
      {sales && sales.length !== 0 ? (
        <EveningReportTable
          sales={sales}
          authUser={props.authUser}
          day={dayTo}
          month={parseInt(sales[0].day.split('.')[1])}
        />
      ) : (
        <h1>no sales for this range</h1>
      )}
    </Wrapper>
  );
};
