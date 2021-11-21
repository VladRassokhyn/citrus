import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { salesActions } from '../../../lib/slices/sales';
import { Sales } from '../../../lib/slices/sales/sales.type';

type Props = {
  columns: { label: string; fn: (sales: any) => any }[];
  thisDay: Sales;
  ttSales: any;
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 250px repeat(8, 1fr);
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Head = styled.div`
  height: 40px;
  background-color: var(--color-button);
`;

const H1 = styled.h1`
  font-size: 14pt;
  color: white;
`;
const H2 = styled.h1`
  font-size: 12pt;
  color: var(--color-stroke);
`;
const H3 = styled.h1`
  font-size: 10pt;
  color: var(--color-stroke);
`;

const NameCell = styled.div`
  height: 30px;
  border-right: 1px solid #dfdfdf;
  padding-left: 10px;
`;

const Cell = styled.div`
  height: 30px;
`;

export const DetailTable = (props: Props) => {
  const { columns, thisDay, ttSales } = props;
  const dispatch = useDispatch();

  const sortByFn = (fn: any) => {
    if (thisDay) {
      const sortedSales = [...thisDay.sales].sort((a, b) => fn(b) - fn(a));
      dispatch(salesActions.sortSales({ id: thisDay.id, sales: sortedSales }));
    }
  };
  return (
    <Wrapper>
      {columns.map((column, i) => {
        return (
          <Column>
            <Head>
              <Cell>
                <H1 onClick={() => sortByFn(column.fn)}>{column.label}</H1>
              </Cell>
            </Head>
            {ttSales.map((ttSale: any) => (
              <Cell>
                <H2>{column.fn(ttSale)}</H2>
              </Cell>
            ))}
            {thisDay.sales.map((salesman) => {
              if (i === 0) {
                return (
                  <NameCell>
                    <H3>{`${column.fn(salesman).split(' ')[0]} ${
                      column.fn(salesman).split(' ')[1]
                    }`}</H3>
                  </NameCell>
                );
              } else {
                return (
                  <Cell>
                    <H3>{column.fn(salesman)}</H3>
                  </Cell>
                );
              }
            })}
          </Column>
        );
      })}
    </Wrapper>
  );
};
