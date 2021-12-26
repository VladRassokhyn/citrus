import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useTypedSelector } from '../../../lib/hooks';
import { paths } from '../../../lib/routing';
import { Sales, SalesIndexes } from '../../../lib/slices/sales';
import { salesmanSelectors } from '../../../lib/slices/salesman';
import { Shop, shopActions, shopSelectors } from '../../../lib/slices/shop';

type Props = {
  sales1: Sales;
  sales2: Sales;
  per1: string;
  per2: string;
  service: number;
  serviceTitle: string;
};

type CellProps = {
  isHead?: boolean;
  isName?: boolean;
  isEmpty?: boolean;
  noBorder?: boolean;
  isNegative?: boolean;
  isDiff?: boolean;
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
  background-color: ${(props) => props.isDiff && '#c0ffa3'};
  transition: linear 0.3s;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.isHead && !props.isEmpty && !props.noBorder && '#2b78ed'};
  }
`;

export const PerToPerTable = (props: Props): JSX.Element => {
  const { sales1, sales2, per1, per2, service, serviceTitle } = props;
  const salesmans = useTypedSelector(salesmanSelectors.salesmans);
  const shops = useTypedSelector(shopSelectors.allShops);
  const currentShop = useTypedSelector(shopSelectors.currentShop);
  const [sortColumn, setSortColumn] = useState(1);
  const [reverse, setReverse] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const isPPC = currentShop?.name === 'KIEV_ALL' || currentShop?.name === 'KHARKOV_ALL';

  const columns = getColumns({ per1, per2, shops: isPPC ? shops : null, service });

  const names = sales1.sales.map((s1) => s1[SalesIndexes.NAME]);

  sales2.sales.forEach((s2) => {
    if (!names.includes(s2[SalesIndexes.NAME])) {
      names.push(s2[SalesIndexes.NAME]);
    }
  });

  names.sort((name1, name2) => {
    const row1name1 = sales1.sales.find((s1) => s1[SalesIndexes.NAME] === name1) || [];
    const row2name1 = sales2.sales.find((s1) => s1[SalesIndexes.NAME] === name1) || [];
    const row1name2 = sales1.sales.find((s1) => s1[SalesIndexes.NAME] === name2) || [];
    const row2name2 = sales2.sales.find((s1) => s1[SalesIndexes.NAME] === name2) || [];
    let diff =
      +columns[sortColumn].fn(row1name2, row2name2) - +columns[sortColumn].fn(row1name1, row2name1);
    if (isNaN(diff)) {
      diff = -1;
    }
    return diff;
  });

  if (reverse) {
    names.reverse();
  }

  const handleLink = (name: string | number) => {
    if (isPPC) {
      const shop = shops?.find((sh) => sh.name_1c === name);
      shop && dispatch(shopActions.setCurrentShop(shop));
    } else {
      const salesman = salesmans?.find((man) => man.name === name);
      history.push(paths.ANALYTICS.PERIOD_TO_PERIOD.BY_SALESMAN({ salesmanId: salesman!.id }));
    }
  };

  const handleSort = (index: number) => {
    if (index === sortColumn) {
      setReverse((prev) => !prev);
    } else {
      setSortColumn(index);
    }
  };

  return (
    <Wrapper>
      {columns.map((column, i) => {
        const indexes = [1, 2, 4, 5, 7, 8, 10, 11];
        return (
          <Column key={i}>
            <Cell isEmpty={i === 0} isHead noBorder={indexes.includes(i)}>
              {i === 2 && <HeadTitle>TO</HeadTitle>}
              {i === 5 && <HeadTitle>Устройства</HeadTitle>}
              {i === 8 && <HeadTitle>{serviceTitle}</HeadTitle>}
              {i === 11 && <HeadTitle>Доля</HeadTitle>}
            </Cell>
            <Cell isHead isName={i === 0} onClick={() => handleSort(i)}>
              <HeadTitle>{column.title}</HeadTitle>
            </Cell>
            {names.map((name) => {
              const row1 = sales1.sales.find((s1) => s1[SalesIndexes.NAME] === name) || [];
              const row2 = sales2.sales.find((s1) => s1[SalesIndexes.NAME] === name) || [];
              const result =
                i !== 0
                  ? isNaN(+column.fn(row1, row2))
                    ? (0).toFixed(2)
                    : column.fn(row1, row2)
                  : column.fn(row1, row2);
              return (
                <Cell
                  key={name}
                  isName={i === 0}
                  isNegative={result < 0}
                  isDiff={column.title === 'Разница' && result > 0}
                  onClick={() => handleLink(name)}
                >
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

function getColumns(args: { per1: string; per2: string; shops: Shop[] | null; service: number }) {
  const { per1, per2, shops, service } = args;
  return [
    {
      title: 'ФИО',
      fn: (sales1: (string | number)[], sales2: (string | number)[]) => {
        if (sales1[SalesIndexes.NAME] && sales2[SalesIndexes.NAME]) {
          if (shops) {
            const shop = shops.find((sh) => sh.name_1c === sales1[SalesIndexes.NAME]);
            return shop?.shortName || '';
          } else {
            return `${String(sales1[SalesIndexes.NAME]).split(' ')[0]}`;
          }
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
      fn: (sales1: (string | number)[], sales2: (string | number)[]) => sales1[service] || 0,
    },
    {
      title: `${per2}`,
      fn: (sales1: (string | number)[], sales2: (string | number)[]) => sales2[service] || 0,
    },
    {
      title: 'Разница',
      fn: (sales1: (string | number)[], sales2: (string | number)[]) =>
        (+sales2[service] || 0) - +sales1[SalesIndexes.CM],
    },
    {
      title: `${per1}`,
      fn: (sales1: (string | number)[], sales2: (string | number)[]) =>
        ((+sales1[SalesIndexes.CM] / +sales1[SalesIndexes.DEVICES]) * 100).toFixed(2),
    },
    {
      title: `${per2}`,
      fn: (sales1: (string | number)[], sales2: (string | number)[]) =>
        ((+sales2[service] / +sales2[SalesIndexes.DEVICES]) * 100).toFixed(2),
    },
    {
      title: 'Разница',
      fn: (sales1: (string | number)[], sales2: (string | number)[]) =>
        (
          (+sales2[service] / +sales2[SalesIndexes.DEVICES] -
            +sales1[service] / +sales1[SalesIndexes.DEVICES]) *
          100
        ).toFixed(2),
    },
  ];
}
