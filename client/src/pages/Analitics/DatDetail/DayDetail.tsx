import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { Salesman } from '../../../lib/globalTypes';
import { useTypedSelector } from '../../../lib/hooks';
import { salesSelectors } from '../../../lib/slices/sales';
import { Sales } from '../../../lib/slices/sales/sales.type';
import { TableRow } from './TableRow';

type Props = {
  sales: any;
  tt: { label: string; value: string };
  salesmans: Salesman[] | null;
};

const Wrapper = styled.div``;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Name = styled.h1`
  font-size: 8pt;
  width: 150px;
`;

const Value = styled.div`
  font-size: 10pt;
  width: 50px;
  text-align: right;
`;

export const DayDetail = (props: Props) => {
  const salesmans = props.salesmans && [
    ...props.salesmans,
    { id: 0, name: props.tt.label, tt: props.tt.value },
  ];
  const [cells, setCells] = useState<(string | number)[]>([]);
  const salesmansNames = salesmans?.map((salesman) => salesman.name);
  const { salesDate } = useParams<{ salesDate: string }>();
  const sales = useTypedSelector(
    salesSelectors.selectSalesByDate(salesDate.replace(/[^0-9]/g, '.')),
  );

  return (
    <Wrapper>
      <h4>{salesDate.replace(/[^0-9]/g, '.')}</h4>
      {sales?.sales.map((daySales, i) => {
        if (salesmansNames?.includes(daySales[0])) {
          return (
            <TableRow
              cells={[
                `${daySales[0].split(' ')[0]} ${daySales[0].split(' ')[1]}`,
                parseInt(daySales[1].replace(/\s/g, '')),
                parseInt(daySales[8].replace(/\s/g, '')),
                parseInt(daySales[10].replace(/\s/g, '')),
                parseInt(daySales[12].replace(/\s/g, '')),
              ]}
            />
          );
        }
      })}
    </Wrapper>
  );
};
