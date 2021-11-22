import { useState } from 'react';
import styled from 'styled-components';
import { DaySales } from '../../../lib/slices/daySales';

type Props = {
  days: (string | null)[];
  sales: DaySales[] | null;
};

type StyleProps = {
  daysCount?: number;
  barHeight?: number;
  color?: string;
  isHolyday?: boolean;
  salfe?: boolean;
  activeColor?: string;
  active?: boolean;
};

const Wrapper = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 5px #dfdfdf;
  margin-bottom: 15px;
  padding: 15px 3%;
  display: grid;
  grid-template-columns: 30px 1fr 100px;
`;

const Container = styled.div<StyleProps>`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(${(props) => props.daysCount}, 1fr);
  gap: 1px;
  background-color: #f1f1f1;
`;

const DayNumber = styled.h1<StyleProps>`
  font-size: 10pt;
  height: 20px;
  text-align: center;
  padding: 4px 0 0 0;
  color: ${(props) => props.isHolyday && '#b3405b'};
`;

const Bars = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Day = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 0 3px;
  justify-content: flex-end;
  height: 100%;
  background-color: white;
`;

const Bar = styled.div<StyleProps>`
  width: ${(props) => (props.salfe ? '100%' : '33%')};
  height: ${(props) => props.barHeight}px;
  background-color: ${(props) => props.color};
`;

const Values = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
  padding: 0 5px 0 0;
  border-right: 1px solid #dfdfdf;
  flex-direction: column;
  justify-content: space-between;
`;

const Value = styled.h6``;

const Buttons = styled.div`
  display: flex;
  height: 100%;
  padding: 0 0 0 10px;
  border-left: 1px solid #dfdfdf;
  flex-direction: column;
  gap: 5px;
`;

const Btn = styled.button<StyleProps>`
  color: ${(props) => (props.active ? 'white' : 'var(--color-stroke)')};
  width: 100%;
  border: 0;
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? props.activeColor : props.color)};
  transition: linear 0.3s;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.activeColor};
    color: white;
  }
`;

export const DayByDay = (props: Props) => {
  const [activeBar, setActiveBar] = useState('ALL');

  const maxVaue = props.sales ? getMaxValue(props.sales, activeBar) : 10000;

  return (
    <Wrapper>
      <Values>
        <Value>{maxVaue.toFixed(0)}</Value>
        <Value>{(maxVaue / 2).toFixed(0)}</Value>
        <Value>0</Value>
        <Value></Value>
      </Values>
      <Container daysCount={props.days.length}>
        {props.sales &&
          props.days.map((day) => {
            const daySales = props.sales!.find((salesItem) => salesItem.day === day!.split(' ')[1]);
            const isHollyDay =
              day!.split('.')[0].split(' ')[0] === 'Saturday' || day!.split(' ')[0] === 'Sunday';
            return (
              <Day key={day}>
                {daySales && activeBar === 'ALL' ? (
                  <Bars>
                    <Bar barHeight={(daySales.cm / maxVaue) * 100} color={'green'} />
                    <Bar barHeight={(daySales.cz / maxVaue) * 100} color={'red'} />
                    <Bar barHeight={(daySales.ca / maxVaue) * 100} color={'#9018ad'} />
                  </Bars>
                ) : (
                  daySales && (
                    <>
                      {activeBar === 'CM' && (
                        <Bar salfe barHeight={(daySales.cm / maxVaue) * 100} color={'green'} />
                      )}
                      {activeBar === 'CZ' && (
                        <Bar salfe barHeight={(daySales.cz / maxVaue) * 100} color={'red'} />
                      )}
                      {activeBar === 'CA' && (
                        <Bar salfe barHeight={(daySales.ca / maxVaue) * 100} color={'#9018ad'} />
                      )}
                    </>
                  )
                )}
                <DayNumber isHolyday={isHollyDay}>{day!.split('.')[0].split(' ')[1]}</DayNumber>
              </Day>
            );
          })}
      </Container>
      <Buttons>
        <Btn
          color={'#b8e1f2'}
          activeColor={'#413eed'}
          active={activeBar === 'ALL'}
          onClick={() => setActiveBar('ALL')}
        >
          Все
        </Btn>
        <Btn
          color={'#b8f2c5'}
          activeColor={'#347f2d'}
          active={activeBar === 'CM'}
          onClick={() => setActiveBar('CM')}
        >
          ЦМ
        </Btn>
        <Btn
          color={'#f2b8b8'}
          activeColor={'#ab3744'}
          active={activeBar === 'CZ'}
          onClick={() => setActiveBar('CZ')}
        >
          ЦЗ
        </Btn>
        <Btn
          color={'#f2b8e9'}
          activeColor={'#a937ab'}
          active={activeBar === 'CA'}
          onClick={() => setActiveBar('CA')}
        >
          ЦА
        </Btn>
      </Buttons>
    </Wrapper>
  );
};

function getMaxValue(sales: DaySales[], activeBar: string) {
  const sortedByCm = [...sales].sort((a, b) => b.cm - a.cm);
  const sortedByCz = [...sales].sort((a, b) => b.cz - a.cz);
  const sortedByCa = [...sales].sort((a, b) => b.ca - a.ca);

  if (activeBar === 'CM') return sortedByCm[0].cm;
  if (activeBar === 'CZ') return sortedByCz[0].cz;
  if (activeBar === 'CA') return sortedByCa[0].ca;

  if (sortedByCm[0].cm > sortedByCz[0].cz || sortedByCm[0].cm > sortedByCa[0].ca) {
    return sortedByCm[0].cm;
  } else if (sortedByCz[0].cz > sortedByCz[0].cm || sortedByCz[0].cz > sortedByCa[0].ca) {
    return sortedByCz[0].cz;
  } else if (sortedByCa[0].ca > sortedByCz[0].cm || sortedByCa[0].ca > sortedByCa[0].cz) {
    return sortedByCa[0].ca;
  } else {
    return 10000;
  }
}