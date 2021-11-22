import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations';
import { daySalesActions, daySalesSelectors, DaySales } from '../../../lib/slices/daySales';
import { useCallback, useEffect, useState } from 'react';
import { Modal } from '../../../Components/Modal';
import { SalesInput } from '../SalesInput';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../lib/hooks';
import { LoadingStatuses } from '../../../lib/globalTypes';
import { Confirm } from '../../../Components/Confirm';
import { salesActions } from '../../../lib/slices/sales';
import { useHistory } from 'react-router';
import { Planes } from '../../../lib/slices/planes/planes.type';

type Props = {
  isEmpty?: boolean;
  title: string;
  delay: number;
  daySales?: DaySales;
  mounthSales?: DaySales;
  planes?: Planes;
  sales?: any;
  tt: { label: string; value: string };
  isHollyDay?: boolean;
};

type StyleProps = {
  delay?: number;
  withData?: boolean;
  disabled?: boolean;
  isEmpty?: boolean;
  isHollyDay?: boolean;
  isPositive?: boolean;
};

const animationIn = keyframes`${zoomIn}`;
const opacityAnimation = keyframes`0% {opacity: 0;} 100% {opacity: 1;}`;

const Button = styled.button<StyleProps>`
  background-color: ${(props) => (props.disabled ? '#aaa' : 'var(--color-button)')};
  color: white;
  width: 100%;
  height: 30px;
  opacity: 0;
  border: 0;
  transition: linear 0.1s;
  position: relative;
  z-index: 1000;
  display: none;
  ${(props) =>
    !props.disabled &&
    `&:hover {
      cursor: pointer;
      background-color: #1890ff;
    }`}
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
  background-color: ${(props) => (props.isHollyDay ? '#b3405b' : 'var(--color-button)')};
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
`;

const H1 = styled.h1`
  font-size: 10pt;
  color: ${(props) => props.color};
`;

const Wrapper = styled.div<StyleProps>`
  background-color: ${(props) =>
    props.isEmpty ? '#dfdfdf' : props.withData ? '#ebffeb' : '#fff0f0'};
  box-shadow: 0 0 5px #dfdfdf;
  border-radius: 10px;
  opacity: 0;
  min-width: 100px;
  animation: ${opacityAnimation} 0.1s forwards, ${animationIn} 0.3s forwards;
  animation-delay: ${(props) => props.delay && props.delay * 50}ms;
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

export const CalendarDay = (props: Props): JSX.Element => {
  const { isEmpty, title, delay, daySales, tt, isHollyDay, sales, planes, mounthSales } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { postStatus, updateStatus } = useTypedSelector(daySalesSelectors.selectDaySalesStatuses);
  const dispatch = useDispatch();
  const history = useHistory();

  const disabled =
    postStatus === LoadingStatuses.LOADING || updateStatus === LoadingStatuses.LOADING;

  const day = parseInt(title.split('.')[0]);
  const dayCount = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

  const cmRatio = +((mounthSales!.cm / mounthSales!.to) * 100).toFixed(2);
  const cmForecast = +((((mounthSales!.cm / day) * dayCount) / planes!.cm) * 100).toFixed();
  const czRatio = +((mounthSales!.cz / mounthSales!.to) * 100).toFixed(2);
  const czForecast = +((((mounthSales!.cz / day) * dayCount) / planes!.cz) * 100).toFixed();
  const caRatio = +((mounthSales!.ca / mounthSales!.to) * 100).toFixed(2);
  const caForecast = +((((mounthSales!.ca / day) * dayCount) / planes!.ca) * 100).toFixed();

  let cmGrowthForecast = 0;
  let czGrowthForecast = 0;
  let caGrowthForecast = 0;

  if (mounthSales && daySales && planes && day !== 1) {
    cmGrowthForecast = +(
      cmForecast -
      ((((mounthSales.cm - daySales.cm) / (day - 1)) * dayCount) / planes.cm) * 100
    ).toFixed(2);
    czGrowthForecast = +(
      czForecast -
      ((((mounthSales.cz - daySales.cz) / (day - 1)) * dayCount) / planes.cz) * 100
    ).toFixed(2);
    caGrowthForecast = +(
      czForecast -
      ((((mounthSales.ca - daySales.ca) / (day - 1)) * dayCount) / planes.ca) * 100
    ).toFixed(2);
  }

  console.log(cmGrowthForecast);

  const modalToggle = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const postDaySales = (payload: any) => {
    dispatch(salesActions.postSales({ sales: payload.sales, tt: tt.value, day: title }));
    dispatch(daySalesActions.postDaySales({ ...payload.parsed, day: title, tt: tt.value }));
  };

  const updateDaySales = (payload: any) => {
    sales &&
      dispatch(
        salesActions.updateSales({ sales: payload.sales, id: sales.id, tt: tt.value, day: title }),
      );
    dispatch(
      daySalesActions.updateDaySales({
        ...payload.parsed,
        id: daySales!.id,
        day: title,
        tt: tt.value,
      }),
    );
  };

  const handleDateteDaySales = () => {
    sales && dispatch(salesActions.deleteSales(sales));
    dispatch(daySalesActions.deleteDaySales(daySales));
  };

  const handleInfo = () => {
    history.push(`/analytics/main/${title.replace(/[^0-9]/g, '-')}`);
  };

  useEffect(() => {
    if (postStatus === LoadingStatuses.SUCCESS || updateStatus === LoadingStatuses.SUCCESS) {
      setIsModalOpen(false);
    }
  }, [postStatus, updateStatus]);

  if (isEmpty) return <Wrapper isEmpty delay={delay} />;

  return (
    <Wrapper delay={delay} withData={!!daySales}>
      <Title isHollyDay={isHollyDay}>{title.split('.')[0]}</Title>
      <Content>
        <ValueBlock>
          <H1 color={'gray'}>ТО: {daySales ? daySales.to : 'no data'}</H1>
        </ValueBlock>
        <ValueBlock>
          <H1 color={'green'}>ЦМ: {daySales ? daySales.cm : 'no data'}</H1>
          <Grow isPositive={cmGrowthForecast > 0}>{cmGrowthForecast}</Grow>
        </ValueBlock>
        <ValueBlock>
          <H1 color={'red'}>ЦЗ: {daySales ? daySales.cz : 'no data'}</H1>
          <Grow isPositive={czGrowthForecast > 0}>{czGrowthForecast}</Grow>
        </ValueBlock>
        <ValueBlock>
          <H1 color={'#9018ad'}>ЦА: {daySales ? daySales.ca : 'no data'}</H1>
          <Grow isPositive={caGrowthForecast > 0}>{caGrowthForecast}</Grow>
        </ValueBlock>
      </Content>
      {!!daySales ? (
        <>
          <Confirm title={'Очистить продажи за день ?'} confirmFn={handleDateteDaySales}>
            <Button>Очистить</Button>
          </Confirm>
          <Button disabled={disabled} onClick={modalToggle}>
            Обновить
          </Button>
          {sales && (
            <Button disabled={disabled} onClick={handleInfo}>
              Детально
            </Button>
          )}
        </>
      ) : (
        <Button disabled={disabled} onClick={modalToggle}>
          Заполнить
        </Button>
      )}
      {isModalOpen && (
        <Modal onClose={modalToggle}>
          {!!daySales ? (
            <SalesInput submitFn={updateDaySales} />
          ) : (
            <SalesInput submitFn={postDaySales} />
          )}
        </Modal>
      )}
    </Wrapper>
  );
};
