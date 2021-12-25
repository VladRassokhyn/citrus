import styled from 'styled-components';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Modal } from '../../../Components/Modal';
import { SalesInput } from '../SalesInput';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../lib/hooks';
import { LoadingStatuses } from '../../../lib/globalTypes';
import { Confirm } from '../../../Components/Confirm';
import { salesActions, salesSelectors } from '../../../lib/slices/sales';
import { useHistory } from 'react-router';
import { Planes } from '../../../lib/slices/planes/planes.type';
import { Sales } from '../../../lib/slices/sales/sales.type';
import { getCalcFns } from '../../../lib/common';
import { format } from 'date-fns';
import { Shop } from '../../../lib/slices/shop';

type Props = {
  tt: Shop;
  title: string;
  monthSales: Sales;
  planes?: Planes;
  sales: Sales | undefined;
  isWeekend?: boolean;
  isEmpty: boolean;
};

type StyleProps = {
  delay?: number;
  withData?: boolean;
  disabled?: boolean;
  isEmpty?: boolean;
  isWeekend?: boolean;
  isPositive?: boolean;
};

const Button = styled.button<StyleProps>`
  background-color: ${(props) => (props.disabled ? '#aaa' : 'var(--color-button)')};
  color: white;
  width: 100%;
  min-width: 80px;
  height: 30px;
  opacity: 0;
  border: 0;
  transition: linear 0.2s;
  position: relative;
  z-index: 1000;
  display: none;
  ${(props) =>
    !props.disabled &&
    `&:hover {
      cursor: pointer;
      background-color: #1890ff;
    }`}
  @media (max-width: 560px) {
    margin-left: -20px;
  }
`;

const ValueBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  padding: 3px 5px;
  border-radius: 5px;
`;

const Grow = styled.sup<StyleProps>`
  font-size: 8pt;
  color: ${(props) => (props.isPositive ? 'green' : 'red')};
`;

const Title = styled.h1<StyleProps>`
  width: 100%;
  padding: 5px 0;
  border-radius: 10px 10px 0 0;
  font-size: 14pt;
  color: white;
  box-shadow: 0 0 5px #909090;
  background-color: ${(props) => (props.isWeekend ? '#b3405b' : 'var(--color-button)')};
  text-align: center;
`;

const Content = styled.div`
  padding: 5% 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: space-between;
  height: 70%;
  opacity: 1;
  transition: linear 0.1s;
  @media (max-width: 560px) {
    display: none;
  }
`;

const H1 = styled.h1`
  font-size: 8pt;
  color: ${(props) => props.color};
`;

const H2 = styled.h1`
  font-size: 8pt;
  font-weight: 300;
  width: 100%;
  text-align: right;
`;

const Wrapper = styled.div<StyleProps>`
  background-color: ${(props) =>
    props.isEmpty ? '#dfdfdf' : props.withData ? '#ebffeb' : '#fff0f0'};
  box-shadow: 0 0 5px #909090;
  border-radius: 10px;
  min-width: 100px;
  height: 150px;
  @media (max-width: 560px) {
    min-width: 40px;
    width: 40px;
    height: 30px;
  }
  &:hover {
    cursor: pointer;
  }
  &:hover ${Button} {
    opacity: 1;
    display: block;
  }
  &:hover ${Content} {
    height: 0;
    opacity: 0;
  }
`;

export const CalendarDay = memo(
  (props: Props): JSX.Element => {
    const { title, isEmpty, isWeekend, sales, planes, monthSales, tt } = props;
    const salesStatus = useTypedSelector(salesSelectors.status);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const disabled = salesStatus === LoadingStatuses.LOADING;

    const cmSales = sales?.ttSales ? sales.ttSales[8] : 0;
    const czSales = sales?.ttSales ? sales.ttSales[10] : 0;
    const caSales = sales?.ttSales ? sales.ttSales[12] : 0;

    const calcFns = getCalcFns(sales?.day.split('.')[0], sales?.day.split('.')[1]);

    const growths = useMemo(
      () => ({
        cm: calcFns.growthForecast(planes?.cm, +cmSales, monthSales.ttSales[8]),
        cz: calcFns.growthForecast(planes?.cz, +czSales, monthSales.ttSales[10]),
        ca: calcFns.growthForecast(planes?.ca, +caSales, monthSales.ttSales[12]),
      }),
      [],
    );

    const modalToggle = useCallback(() => {
      setIsModalOpen((prev) => !prev);
    }, []);

    const postDaySales = (newSales: string) => {
      dispatch(
        salesActions.postSales({
          sales: newSales,
          tt: tt.name,
          day: title,
          month: parseInt(title.split('.')[1]) - 1,
          year: title.split('.')[2],
        }),
      );
    };

    const updateDaySales = (newSales: string) => {
      sales &&
        dispatch(
          salesActions.updateSales({
            month: parseInt(title.split('.')[1]) - 1,
            year: title.split('.')[2],
            sales: newSales,
            id: sales.id,
            tt: tt.name,
            day: title,
          }),
        );
    };

    const handleDaleteDaySales = () => {
      sales && dispatch(salesActions.deleteSales({ ...sales, tt: tt.name }));
    };

    const handleInfo = () => {
      history.push(`/analytics/main/${title.replace(/[^0-9]/g, '-')}`);
    };

    if (isEmpty) {
      return <Wrapper withData={false} />;
    }

    return (
      <Wrapper withData={!!sales}>
        <Title isWeekend={isWeekend}>{title.split('.')[0]}</Title>
        <Content>
          <H2>{sales ? format(new Date(sales.updatedAt), 'HH:mm, dd.MM') : 'no data'}</H2>

          <ValueBlock>
            <H1 color={'gray'}>ТО: {sales?.ttSales ? sales.ttSales[1] : 'no data'}</H1>
          </ValueBlock>
          <ValueBlock>
            <H1 color={'green'}>ЦМ: {sales?.ttSales ? sales.ttSales[8] : 'no data'}</H1>
            <Grow isPositive={growths.cm > 0}>{growths.cm}</Grow>
          </ValueBlock>
          <ValueBlock>
            <H1 color={'red'}>ЦЗ: {sales?.ttSales ? sales.ttSales[10] : 'no data'}</H1>
            <Grow isPositive={growths.cz > 0}>{growths.cz}</Grow>
          </ValueBlock>
          <ValueBlock>
            <H1 color={'#9018ad'}>ЦА: {sales?.ttSales ? sales.ttSales[12] : 'no data'}</H1>
            <Grow isPositive={growths.ca > 0}>{growths.ca}</Grow>
          </ValueBlock>
        </Content>
        {!!sales ? (
          <>
            <Confirm title={'Очистить продажи за день ?'} confirmFn={handleDaleteDaySales}>
              <Button>Очистить</Button>
            </Confirm>
            <Button disabled={disabled} onClick={modalToggle}>
              Обновить
            </Button>
            <Button disabled={disabled} onClick={handleInfo}>
              Детально
            </Button>
          </>
        ) : (
          <Button disabled={disabled} onClick={modalToggle}>
            Заполнить
          </Button>
        )}
        {isModalOpen && (
          <Modal onClose={modalToggle}>
            {!!sales ? (
              <SalesInput submitFn={updateDaySales} />
            ) : (
              <SalesInput submitFn={postDaySales} />
            )}
          </Modal>
        )}
      </Wrapper>
    );
  },
);
