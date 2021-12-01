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

const Wrapper = styled.div``;

export const EveningReport = (props: Props): JSX.Element => {
  const salesLength = useTypedSelector(salesSelectors.selectSalesLength);
  const [dayFrom, setDayFrom] = useState(1);
  const [dayTo, setDayTo] = useState(salesLength);

  const handleChangeFrom = (day: number) => {
    setDayFrom(day);
  };

  const handleChangeTo = (day: number) => {
    setDayTo(day);
  };
  return (
    <Wrapper>
      <DayRange from={dayFrom} to={dayTo} changeFrom={handleChangeFrom} changeTo={handleChangeTo} />
      <EveningReportTable authUser={props.authUser} />
    </Wrapper>
  );
};
