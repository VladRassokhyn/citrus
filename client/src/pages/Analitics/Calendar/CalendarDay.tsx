import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations';
import { daySalesActions, daySalesSelectors, Sales } from '../../../lib/slices/daySales';
import { useCallback, useEffect, useState } from 'react';
import { Modal } from '../../../Components/Modal';
import { SalesInput } from '../SalesInput';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../lib/hooks';
import { LoadingStatuses } from '../../../lib/globalTypes';
import { Confirm } from '../../../Components/Confirm';
import { salesActions } from '../../../lib/slices/sales';

type Props = {
  isEmpty?: boolean;
  title: string;
  delay: number;
  daySales?: Sales;
  tt: { label: string; value: string };
  isHollyDay?: boolean;
};

type StyleProps = {
  delay?: number;
  withData?: boolean;
  disabled?: boolean;
  isEmpty?: boolean;
  isHollyDay?: boolean;
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
  margin-top: 5px;
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
  const { isEmpty, title, delay, daySales, tt, isHollyDay } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { postStatus, updateStatus } = useTypedSelector(daySalesSelectors.selectDaySalesStatuses);
  const dispatch = useDispatch();

  const disabled =
    postStatus === LoadingStatuses.LOADING || updateStatus === LoadingStatuses.LOADING;

  const modalToggle = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const postDaySales = (payload: any) => {
    dispatch(salesActions.postSales({ sales: payload.sales, tt: tt.value, day: title }));
    dispatch(daySalesActions.postDaySales({ ...payload.parsed, day: title, tt: tt.value }));
  };

  const updateDaySales = (payload: any) => {
    dispatch(
      daySalesActions.updateDaySales({ ...payload, id: daySales!.id, day: title, tt: tt.value }),
    );
  };

  const handleDateteDaySales = () => {
    dispatch(daySalesActions.deleteDaySales(daySales));
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
        <H1 color={'gray'}>ТО: {daySales ? daySales.to : 'no data'}</H1>
        <H1 color={'green'}>ЦМ: {daySales ? daySales.cm : 'no data'}</H1>
        <H1 color={'red'}>ЦЗ: {daySales ? daySales.cz : 'no data'}</H1>
        <H1 color={'#9018ad'}>ЦА: {daySales ? daySales.ca : 'no data'}</H1>
      </Content>
      {!!daySales ? (
        <>
          <Confirm title={'Очистить продажи за день ?'} confirmFn={handleDateteDaySales}>
            <Button>Очистить</Button>
          </Confirm>
          <Button disabled={disabled} onClick={modalToggle}>
            Обновить
          </Button>
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
