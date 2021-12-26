import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useTypedSelector } from '../../../lib/hooks';
import { Planes } from '../../../lib/slices/planes/planes.type';
import { Sales, SalesTuple } from '../../../lib/slices/sales/sales.type';
import { Shop, shopActions, shopSelectors } from '../../../lib/slices/shop';

type Props = {
  columns: {
    label: string;
    fn: (sales: SalesTuple) => string | number;
  }[];
  sales: Sales;
  planes: Planes;
};

type CellProps = {
  width?: number;
  color?: string;
  isZeroOrNegative?: boolean;
  selected?: boolean;
};

type FilledCellProps = {
  width: number;
  isZeroOrNegative?: boolean;
  selected?: boolean;
};

const FilledCell = styled.div<FilledCellProps>`
  width: ${(props) => (props.width && props.width > 100 ? 100 : props.width)}%;
  background-color: ${(props) => props.isZeroOrNegative && 'transparent !important'};
  background-color: ${(props) =>
    props.width > 100 ? '#ccffcc' : props.width >= 85 && props.width <= 99 ? '#fff0b3' : '#ffcccc'};
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: linear 0.1s;
  height: 20px;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 200px 100px 100px repeat(9, 1fr);
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  &:last-child {
    border: 0;
  }
`;

const Cell = styled.div<CellProps>`
  background-color: ${(props) => props.selected && '#b3e6ff !important'};
  border-right: 1px solid #dfdfdf;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  height: 20px;
  transition: linear 0.1s;
  background-color: ${(props) => props.isZeroOrNegative && '#ffcccc'} !important;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  @media (max-width: 560px) {
    padding: 0 10px;
  }
`;

const CellWithFill = styled.div<CellProps>`
  height: 20px;
  transition: linear 0.1s;
  border-right: 1px solid #dfdfdf;
  background-color: ${(props) => props.isZeroOrNegative && '#ffcccc !important'};
  background-color: ${(props) => props.selected && '#b3e6ff'};
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
  font-size: 10pt;
  color: black;
  width: 90%;
  text-align: right;
  position: relative;
  z-index: 600;
  top: -17px;
`;

const H4 = styled.h1`
  font-size: 10pt;
  color: black;
  font-weight: 800;
`;

const NameCell = styled.div<CellProps>`
  border-right: 1px solid #dfdfdf;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 20px;
  padding-left: 10px;
  transition: linear 0.1s;
  background-color: ${(props) => props.selected && '#b3e6ff !important'};
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const DetailTable = (props: Props): JSX.Element => {
  const { columns, sales, planes } = props;
  const dispatch = useDispatch();
  const currentShop = useTypedSelector(shopSelectors.currentShop);
  const [sortReverse, setSortReverse] = useState(false);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [sale, setSale] = useState(sales);
  const shops = useTypedSelector(shopSelectors.allShops);

  const sortByFn = (fn: (arg: SalesTuple) => string | number) => {
    if (sales) {
      const sortedSales = [...sales.sales].sort((a, b) => +fn(b) - +fn(a));
      if (sortReverse) {
        sortedSales.reverse();
      }
      setSale({ ...sales, sales: sortedSales });
      setSortReverse((prev) => !prev);
    }
  };

  useEffect(() => {
    setSale(sales);
  }, [sales]);

  const handleSelectRow = (j: number) => {
    if (j === selectedRow) {
      setSelectedRow(-1);
    } else {
      setSelectedRow(j);
    }
  };

  const handleClick = (name: string | number) => {
    if (currentShop?.name === 'KIEV_ALL' || currentShop?.name === 'KHARKOV_ALL') {
      const shop = shops?.find((sh) => sh.name_1c === name);
      shop && dispatch(shopActions.setCurrentShop(shop));
    }
  };

  return (
    <Wrapper>
      {columns.map((column, i) => {
        return (
          <Column key={i}>
            <Head>
              {i === 3 && <SeparatedCellTop />}
              {i === 4 && (
                <SeparatedCellTop>
                  <H1>ЦМ {' ' + planes.to_cm}</H1>
                </SeparatedCellTop>
              )}
              {i === 5 && <SeparatedCellTop border />}

              {i === 6 && <SeparatedCellTop />}
              {i === 7 && (
                <SeparatedCellTop>
                  <H1>ЦЗ {' ' + planes.to_cz}</H1>
                </SeparatedCellTop>
              )}
              {i === 8 && <SeparatedCellTop border />}

              {i < 3 || i > 8 ? (
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
                <H2>
                  {i === 0
                    ? currentShop?.shortName
                    : !isNaN(+column.fn(sales.ttSales)) &&
                      column.fn(sales.ttSales).toLocaleString('ru')}
                </H2>
              </Cell>
            </TTHead>
            {sale.sales.map((salesman, j) => {
              if (i === 0) {
                return (
                  <NameCell
                    selected={j === selectedRow}
                    key={salesman[0]}
                    onMouseEnter={() => handleSelectRow(j)}
                    onClick={() => handleClick(salesman[0])}
                  >
                    <H2>{getShortName(shops!, column.fn(salesman) as string)}</H2>
                  </NameCell>
                );
              } else if (i === 4) {
                const isZero = +salesman[1] === 0 && +salesman[8] === 0;
                return (
                  <CellWithFill selected={j === selectedRow} key={salesman[0]}>
                    <FilledCell
                      isZeroOrNegative={isZero}
                      selected={j === selectedRow}
                      width={(+column.fn(salesman) / planes.to_cm) * 100}
                    />
                    <H3>{isZero ? (0).toFixed(2) : column.fn(salesman)}</H3>
                  </CellWithFill>
                );
              } else if (i === 7) {
                const isZero = +salesman[1] === 0 && +salesman[10] === 0;
                return (
                  <CellWithFill selected={j === selectedRow} key={salesman[0]}>
                    <FilledCell
                      isZeroOrNegative={isZero}
                      selected={j === selectedRow}
                      width={(+column.fn(salesman) / planes.to_cz) * 100}
                      color={isZero ? '#ffcccc' : '#b8f2c5'}
                    />
                    <H3>{isZero ? (0).toFixed(2) : column.fn(salesman)}</H3>
                  </CellWithFill>
                );
              } else if (i === 5 || i === 8) {
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
