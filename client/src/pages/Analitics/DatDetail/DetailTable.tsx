import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Planes } from '../../../lib/slices/planes/planes.type';
import { salesActions } from '../../../lib/slices/sales';
import { Sales } from '../../../lib/slices/sales/sales.type';

type Props = {
  columns: { label: string; fn: (sales: any) => any }[];
  thisDay: Sales;
  ttSales: any;
  planes: Planes;
};

type CellProps = {
  width?: number;
  color?: string;
};

const FilledCell = styled.div<CellProps>`
  width: ${(props) => (props.width && props.width > 100 ? 100 : props.width)}%;
  background-color: ${(props) => props.color};
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 250px repeat(8, 1fr);
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  height: 30px;
  border-right: 1px solid #dfdfdf;
  transition: linear 0.3s;
`;

const CellWithFill = styled.div`
  height: 30px;
  border-right: 1px solid #dfdfdf;
  transition: linear 0.3s;
`;

const Head = styled.div`
  height: 30px;
  background-color: var(--color-button);
  border-bottom: 1px solid #dfdfdf;
  box-shadow: 0 0 5px #dfdfdf;
  & ${Cell} {
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  & ${Cell}:hover {
    cursor: pointer;
    background-color: #1890ff;
  }
`;

const TTHead = styled.div`
  height: 30px;
  background-color: #f1f1f1;
  box-shadow: 0 0 5px #dfdfdf;
  & ${Cell} {
    justify-content: center;
  }
`;

const H1 = styled.h1`
  font-size: 10pt;
  color: white;
`;
const H2 = styled.h1`
  font-size: 12pt;
  color: var(--color-stroke);
`;
const H3 = styled.h1`
  font-size: 10pt;
  color: var(--color-stroke);
  width: 90%;
  text-align: right;
  position: relative;
  padding: 7px 0;
  z-index: 600;
  top: -30px;
`;

const H4 = styled.h1`
  font-size: 10pt;
  color: var(--color-stroke);
`;

const NameCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 30px;
  border-right: 1px solid #dfdfdf;
  padding-left: 10px;
`;

export const DetailTable = (props: Props) => {
  const { columns, thisDay, ttSales, planes } = props;
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

            <TTHead>
              {ttSales.map((ttSale: any, i: number) => (
                <Cell>
                  <H2>{column.fn(ttSale)}</H2>
                </Cell>
              ))}
            </TTHead>
            {thisDay.sales.map((salesman) => {
              if (i === 0) {
                return (
                  <NameCell>
                    <H2>{`${column.fn(salesman).split(' ')[0]} ${
                      column.fn(salesman).split(' ')[1]
                    }`}</H2>
                  </NameCell>
                );
              } else if (i === 3 || i === 6) {
                return (
                  <CellWithFill>
                    <FilledCell
                      width={
                        i === 3
                          ? (column.fn(salesman) / planes.to_cm) * 100
                          : (column.fn(salesman) / planes.to_cz) * 100
                      }
                      color={'#b8f2c5'}
                    />
                    <H3>{column.fn(salesman)}</H3>
                  </CellWithFill>
                );
              } else {
                return (
                  <Cell>
                    <H4>{column.fn(salesman)}</H4>
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
