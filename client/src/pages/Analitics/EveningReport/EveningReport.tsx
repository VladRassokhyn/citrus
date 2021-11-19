import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../../lib/hooks';
import { planesSelectors } from '../../../lib/slices/planes';
import { SalesInput } from '../SalesInput';
import { EveningReportTable } from './EveningReportTable';
import { Sales } from '../../../lib/slices/daySales';

type Props = {
  sales: Sales[] | null;
};

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

export const EveningReport = (props: Props): JSX.Element => {
  const { sales } = props;
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

  if (sales && sales.length > 1) {
    return (
      <EveningReportTable
        planes={planes}
        daySales={sales[sales.length - 1]}
        mounthSales={calcMounthSales(sales)}
      />
    );
  }

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

export function calcMounthSales(sales: Sales[]) {
  if (sales.length === 0) {
    return {
      cm: 0,
      cz: 0,
      ca: 0,
      to: 0,
      tt: { value: 'no tt', label: 'no tt' },
      id: 0,
      day: '',
    };
  }
  const mounthSales: Sales = {
    cm: 0,
    cz: 0,
    ca: 0,
    to: 0,
    tt: sales[0].tt,
    id: sales[0].id,
    day: '',
  };
  sales.forEach((sale) => {
    mounthSales.cm += sale.cm;
    mounthSales.cz += sale.cz;
    mounthSales.to += sale.to;
    mounthSales.ca += sale.ca;
  });

  return mounthSales;
}
