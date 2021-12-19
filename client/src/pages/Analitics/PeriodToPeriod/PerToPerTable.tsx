import React from 'react';
import styled from 'styled-components';
import { Sales, SalesIndexes } from '../../../lib/slices/sales';

type Props = {
  sales1: Sales;
  sales2: Sales;
  per1: string;
  per2: string;
};

type CellProps = {
  isHead?: boolean;
  isName?: boolean;
  isEmpty?: boolean;
  noBorder?: boolean;
  isNegative?: boolean;
};

const Wrapper = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: 150px repeat(12, 1fr);
`;

const HeadTitle = styled.h1`
  font-size: 10pt;
  color: white;
`;

const Column = styled.div``;

const Cell = styled.div<CellProps>`
  ${(props) => props.isEmpty && 'border: none !important;'}
  border-bottom: 1px solid #dcdcdc;
  border-right: ${(props) => (props.noBorder ? 'none' : '1px solid #dcdcdc')};
  ${(props) => props.isName && 'border-left: 1px solid #dcdcdc'};
  display: flex;
  justify-content: ${(props) =>
    props.isName ? 'flex-start' : props.isHead ? 'center' : 'flex-end'};
  align-items: center;
  height: ${(props) => (props.isHead && props.isName ? '41px' : props.isEmpty ? '0' : '20px')};
  padding: 0 10px;
  background-color: ${(props) => props.isHead && 'var(--color-button)'};
  background-color: ${(props) => props.isNegative && '#ffcccc'};
`;

export const PerToPerTable = (props: Props): JSX.Element => {
  const { sales1, sales2, per1, per2 } = props;

  const columns = getColumns({ per1, per2 });

  const names = sales1.sales.map((s1) => s1[SalesIndexes.NAME]);

  sales2.sales.forEach((s2) => {
    if (!names.includes(s2[SalesIndexes.NAME])) {
      names.push(s2[SalesIndexes.NAME]);
    }
  });

  return (
    <Wrapper>
      {columns.map((column, i) => {
        const indexes = [1, 2, 4, 5, 7, 8, 10, 11];
        return (
          <Column>
            <Cell isEmpty={i === 0} isHead noBorder={indexes.includes(i)}>
              {i === 2 && <HeadTitle>TO</HeadTitle>}
              {i === 5 && <HeadTitle>Устройства</HeadTitle>}
              {i === 8 && <HeadTitle>ЦМ</HeadTitle>}
              {i === 11 && <HeadTitle>Доля</HeadTitle>}
            </Cell>
            <Cell isHead isName={i === 0}>
              <HeadTitle>{column.title}</HeadTitle>
            </Cell>
            {names.map((name) => {
              const row1 = sales1.sales.find((s1) => s1[SalesIndexes.NAME] === name) || [];
              const row2 = sales2.sales.find((s1) => s1[SalesIndexes.NAME] === name) || [];
              const result = column.fn(row1, row2);
              return (
                <Cell key={name} isName={i === 0} isNegative={result < 0}>
                  <h5>{result.toLocaleString('ru')}</h5>
                </Cell>
              );
            })}
          </Column>
        );
      })}
    </Wrapper>
  );
};

function getColumns(args: { per1: string; per2: string }) {
  const { per1, per2 } = args;
  return [
    {
      title: 'ФИО',
      fn: (sales1: (string | number)[], sales2: (string | number)[]) => {
        if (sales1[SalesIndexes.NAME] && sales2[SalesIndexes.NAME]) {
          return `${String(sales1[SalesIndexes.NAME]).split(' ')[0]} ${
            String(sales1[SalesIndexes.NAME]).split(' ')[1][0]
          }.`;
        } else {
          return '';
        }
      },
    },
    {
      title: `${per1}`,
      fn: (sales1: (string | number)[], sales2: (string | number)[]) =>
        sales1[SalesIndexes.TO] || 0,
    },
    {
      title: `${per2}`,
      fn: (sales1: (string | number)[], sales2: (string | number)[]) =>
        sales2[SalesIndexes.TO] || 0,
    },
    {
      title: 'Разница',
      fn: (sales1: (string | number)[], sales2: (string | number)[]) =>
        (+sales2[SalesIndexes.TO] || 0) - (+sales1[SalesIndexes.TO] || 0),
    },

    {
      title: `${per1}`,
      fn: (sales1: (string | number)[], sales2: (string | number)[]) =>
        sales1[SalesIndexes.DEVICES] || 0,
    },
    {
      title: `${per2}`,
      fn: (sales1: (string | number)[], sales2: (string | number)[]) =>
        sales2[SalesIndexes.DEVICES] || 0,
    },
    {
      title: 'Разница',
      fn: (sales1: (string | number)[], sales2: (string | number)[]) =>
        (+sales2[SalesIndexes.DEVICES] || 0) - (+sales1[SalesIndexes.DEVICES] || 0),
    },

    {
      title: `${per1}`,
      fn: (sales1: (string | number)[], sales2: (string | number)[]) =>
        sales1[SalesIndexes.CM] || 0,
    },
    {
      title: `${per2}`,
      fn: (sales1: (string | number)[], sales2: (string | number)[]) =>
        sales2[SalesIndexes.CM] || 0,
    },
    {
      title: 'Разница',
      fn: (sales1: (string | number)[], sales2: (string | number)[]) =>
        (+sales2[SalesIndexes.CM] || 0) - +sales1[SalesIndexes.CM],
    },
    {
      title: `${per1}`,
      fn: (sales1: (string | number)[], sales2: (string | number)[]) =>
        ((+sales1[SalesIndexes.CM] / +sales1[SalesIndexes.DEVICES]) * 100).toFixed(2),
    },
    {
      title: `${per2}`,
      fn: (sales1: (string | number)[], sales2: (string | number)[]) =>
        ((+sales2[SalesIndexes.CM] / +sales2[SalesIndexes.DEVICES]) * 100).toFixed(2),
    },
    {
      title: 'Разница',
      fn: (sales1: (string | number)[], sales2: (string | number)[]) =>
        (
          (+sales2[SalesIndexes.CM] / +sales2[SalesIndexes.DEVICES] -
            +sales1[SalesIndexes.CM] / +sales1[SalesIndexes.DEVICES]) *
          100
        ).toFixed(2),
    },
  ];
}