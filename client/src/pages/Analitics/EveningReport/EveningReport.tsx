import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../../lib/hooks';
import { planesSelectors } from '../../../lib/slices/planes';
import { SalesInput } from '../SalesInput';
import { EveningReportTable } from './EveningReportTable';
import { Sales } from '../../../lib/slices/daySales';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const H1 = styled.h1`
  font-size: 18pt;
  margin: 10px;
  color: var(--color-stroke);
  text-align: center;
`;

export const EveningReport = (): JSX.Element => {
  const [daySales, setDaySales] = useState<Sales | null>(null);
  const [mounthSales, setMounthSales] = useState<Sales | null>(null);
  const planes = useTypedSelector(planesSelectors.selectPlanes);

  const handleDaySales = (sales: Sales) => {
    setDaySales(sales);
  };

  const handleMounthSales = (sales: Sales) => {
    setMounthSales(sales);
  };

  useEffect(() => {
    if (daySales && mounthSales) {
      console.log(daySales, mounthSales);
    }
  }, [daySales, mounthSales]);

  return (
    <Wrapper>
      <>
        {!daySales && (
          <div>
            <H1>Продажи за день</H1>
            <SalesInput submitFn={handleDaySales} />
          </div>
        )}
        {!mounthSales && (
          <div>
            <H1>Продажи за месяц</H1>
            <SalesInput submitFn={handleMounthSales} />
          </div>
        )}
      </>
      {daySales && mounthSales && (
        <EveningReportTable planes={planes} daySales={daySales!} mounthSales={mounthSales!} />
      )}
    </Wrapper>
  );
};
