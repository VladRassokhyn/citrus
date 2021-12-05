import { useState } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../../lib/hooks';
import { Planes } from '../../../lib/slices/planes/planes.type';
import { Sales } from '../../../lib/slices/sales/sales.type';
import { Shop, shopSelectors } from '../../../lib/slices/shop';

type Props = {
  currentShop: Shop;
  columns: {
    label: string;
    fn: (sales: (string | number)[]) => string | number;
  }[];
  thisDay: Sales;
  ttSales: (string | number)[];
  planes: Planes;
};

type CellProps = {
  width?: number;
  color?: string;
  isZeroOrNegative?: boolean;
  selected?: boolean;
};

const FilledCell = styled.div<CellProps>`
  width: ${(props) => (props.width && props.width > 100 ? 100 : props.width)}%;
  background-color: ${(props) => props.color};
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: linear 0.1s;
  height: ${(props) => (props.selected ? '30px' : '20px')};
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 200px repeat(9, 1fr);
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  &:last-child {
    border: 0;
  }
`;

const Cell = styled.div<CellProps>`
  border-right: 1px solid #dfdfdf;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;

  height: ${(props) => (props.selected ? '30px' : '20px')};
  transition: linear 0.1s;
  background-color: ${(props) => props.isZeroOrNegative && '#ffcccc'} !important;
  border-bottom: 1px solid ${(props) => (props.selected ? 'var(--color-button)' : '#dfdfdf')};
  ${(props) => props.selected && 'border-top: 1px solid var(--color-button);'};
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const CellWithFill = styled.div<CellProps>`
  height: ${(props) => (props.selected ? '30px' : '20px')};
  transition: linear 0.1s;
  border-right: 1px solid #dfdfdf;
  border-bottom: 1px solid ${(props) => (props.selected ? 'var(--color-button)' : '#dfdfdf')};
  ${(props) => props.selected && 'border-top: 1px solid var(--color-button);'};
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const SeparatedCellTop = styled.div<{ border?: boolean }>`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #dfdfdf;
  ${(props) => props.border && 'border-right: 1px solid #dfdfdf'};
`;

const SeparatedCellBot = styled.div`
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #dfdfdf;
  &:hover {
    cursor: pointer;
    background-color: #1890ff;
  }
`;

const Head = styled.div`
  height: 45px;
  background-color: var(--color-button);
  border-bottom: 1px solid #dfdfdf;
  & ${Cell} {
    height: 45px;
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
  height: 20px;
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
  font-size: 10pt;
  color: var(--color-stroke);
`;
const H3 = styled.h1`
  font-size: 8pt;
  color: var(--color-stroke);
  width: 90%;
  text-align: right;
  position: relative;
  z-index: 600;
  top: -17px;
`;

const H4 = styled.h1`
  font-size: 8pt;
  color: var(--color-stroke);
`;

const NameCell = styled.div<CellProps>`
  border-right: 1px solid #dfdfdf;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: ${(props) => (props.selected ? '30px' : '20px')};
  padding-left: 10px;
  transition: linear 0.1s;
  border-bottom: 1px solid ${(props) => (props.selected ? 'var(--color-button)' : '#dfdfdf')};
  ${(props) => props.selected && 'border-top: 1px solid var(--color-button);'};
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const DetailTable = (props: Props): JSX.Element => {
  const { columns, thisDay, ttSales, planes } = props;
  const [sortReverse, setSortReverse] = useState(false);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [sales, setSales] = useState(thisDay);
  const shops = useTypedSelector(shopSelectors.allShops);

  const sortByFn = (fn: (arg: (string | number)[]) => string | number) => {
    if (thisDay) {
      const sortedSales = [...thisDay.sales].sort((a, b) => +fn(b) - +fn(a));
      if (sortReverse) {
        sortedSales.reverse();
      }
      setSales({ ...sales, sales: sortedSales });
      setSortReverse((prev) => !prev);
    }
  };

  const handleSelectRow = (j: number) => {
    if (j === selectedRow) {
      setSelectedRow(-1);
    } else {
      setSelectedRow(j);
    }
  };

  return (
    <Wrapper>
      {columns.map((column, i) => {
        return (
          <Column key={i}>
            <Head>
              {i === 2 && <SeparatedCellTop />}
              {i === 3 && (
                <SeparatedCellTop>
                  <H1>ЦМ</H1>
                </SeparatedCellTop>
              )}
              {i === 4 && <SeparatedCellTop border />}

              {i === 5 && <SeparatedCellTop />}
              {i === 6 && (
                <SeparatedCellTop>
                  <H1>ЦЗ</H1>
                </SeparatedCellTop>
              )}
              {i === 7 && <SeparatedCellTop border />}

              {i < 2 || i > 7 ? (
                <Cell onClick={() => sortByFn(column.fn)}>
                  <H1>{column.label}</H1>
                </Cell>
              ) : (
                <SeparatedCellBot onClick={() => sortByFn(column.fn)}>
                  <H1>{column.label}</H1>
                </SeparatedCellBot>
              )}
            </Head>

            <TTHead>
              <Cell>
                <H2>{i === 0 ? props.currentShop.shortName : column.fn(ttSales)}</H2>
              </Cell>
            </TTHead>
            {sales.sales.map((salesman, j) => {
              if (i === 0) {
                return (
                  <NameCell
                    selected={j === selectedRow}
                    key={salesman[0]}
                    onClick={() => handleSelectRow(j)}
                  >
                    <H2>{getShortName(shops!, column.fn(salesman) as string)}</H2>
                  </NameCell>
                );
              } else if (i === 3) {
                const isZero = +salesman[1] === 0 && +salesman[8] === 0;
                return (
                  <CellWithFill selected={j === selectedRow} key={salesman[0]}>
                    <FilledCell
                      selected={j === selectedRow}
                      width={(+column.fn(salesman) / planes.to_cm) * 100}
                      color={isZero ? '#ffcccc' : '#b8f2c5'}
                    />
                    <H3>{isZero ? (0.001).toFixed(2) : column.fn(salesman)}</H3>
                  </CellWithFill>
                );
              } else if (i === 6) {
                const isZero = +salesman[1] === 0 && +salesman[10] === 0;
                return (
                  <CellWithFill selected={j === selectedRow} key={salesman[0]}>
                    <FilledCell
                      selected={j === selectedRow}
                      width={(+column.fn(salesman) / planes.to_cz) * 100}
                      color={isZero ? '#ffcccc' : '#b8f2c5'}
                    />
                    <H3>{isZero ? (0.001).toFixed(2) : column.fn(salesman)}</H3>
                  </CellWithFill>
                );
              } else if (i === 4 || i === 7) {
                return (
                  <Cell selected={j === selectedRow} key={salesman[0]}>
                    <H4>
                      {column.fn(salesman) > 0
                        ? 'В доле'
                        : '-' + (-column.fn(salesman)).toLocaleString('ru')}
                    </H4>
                  </Cell>
                );
              } else {
                return (
                  <Cell
                    selected={j === selectedRow}
                    key={salesman[0]}
                    isZeroOrNegative={column.fn(salesman) === 0 || column.fn(salesman) < 0}
                  >
                    <H4>{column.fn(salesman).toLocaleString('ru')}</H4>
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

function getShortName(shops: Shop[], fullName: string) {
  const shop = shops.find((shop) => shop.name_1c === fullName);
  if (!!shop) {
    return shop.shortName;
  } else {
    return `${fullName.split(' ')[0]} ${fullName.split(' ')[1]}`;
  }
}
