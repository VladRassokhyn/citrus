import React, { useState } from 'react';
import styled from 'styled-components';
import { DayRange } from '../../../Components/DayRange';
import { getCalcFns } from '../../../lib/common';
import { useTypedSelector } from '../../../lib/hooks';
import { planesSelectors } from '../../../lib/slices/planes';
import { salesSelectors } from '../../../lib/slices/sales';
import { getColumns } from '../DayDetail';
import { DetailTable } from '../DayDetail/DetailTable';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const SalesByPeriod = (): JSX.Element => {
  const salesLength = useTypedSelector(salesSelectors.salesLength);
  const planes = useTypedSelector(planesSelectors.planes);
  const [from, setDayFrom] = useState(1);
  const [to, setDayTo] = useState(salesLength);
  const sales = useTypedSelector(salesSelectors.salsesByRange(from, to));
  const { monthSalesNew } = getCalcFns();
  const salesSumm = monthSalesNew(sales);

  console.log(sales);

  console.log('render');
  return (
    <Wrapper>
      <DayRange size={'small'} from={from} to={to} changeFrom={setDayFrom} changeTo={setDayTo} />
      <DetailTable sales={salesSumm} planes={planes} columns={getColumns(planes)} />
    </Wrapper>
  );
};
