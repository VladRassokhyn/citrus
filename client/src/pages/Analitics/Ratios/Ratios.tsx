import { SalesIndexes, salesSelectors, SalesTuple } from '@lib/slices/sales';
import { useCallback, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Selector from 'react-select';
import { getColumns, options } from './config';
import { useTypedSelector } from '@lib/hooks';
import { getCalcFns } from '@lib/common';
import { DayRange } from '@components/DayRange';
import settings from '@static/settings.svg';
import { InputField } from '@components/InputField';
import { Checkbox } from '@components/Checkbox';

type Props = {
  authUser: any;
};

type StyleProps = {
  isName?: boolean;
  isTT?: boolean;
  isOpen?: boolean;
  withLag?: boolean;
  colorise?: string;
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-dirrection: row;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
`;

const Selectors = styled.div`
  display: grid;
  grid-template-columns: 40% 40% 10%;
  width: 600px;
  align-items: center;
  gap: 50px;
  margin-bottom: 10px;
`;

const Table = styled.div<StyleProps>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.withLag ? '200px 150px 150px 150px 150px' : '200px 150px 150px 150px'};
`;

const Cell = styled.div<StyleProps>`
  padding: 5px;
  ${(props) => props.isName && 'padding-left: 15px;'};
  border-right: 1px solid #d1d1d1;
  text-align: ${(props) => (props.isName ? 'left' : 'center')};
  background-color: ${(props) => props.isTT && '#d1d1d1'} !important;
  background-color: ${(props) => props.colorise} !important;
  &:nth-child(even) {
    background-color: #e1e1e1;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeadCell = styled.div<StyleProps>`
  height: 30px;
  background-color: var(--color-button);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeadTite = styled.h1`
  font-size: 10pt;
  color: white;
`;

const Name = styled.h1`
  font-size: 10pt;
  color: var(--color-stroke);
`;

const Value = styled.h1`
  font-size: 10pt;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const Settings = styled.div<StyleProps>`
  border-top: 1px solid var(--color-stroke);
  border-bottom: 1px solid var(--color-stroke);
  padding: 0 20px;
  margin: 5px 0;
  height: ${(props) => (props.isOpen ? '100px' : '0')};
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  transition: height 0.3s;
`;

const SettingsContent = styled.div<StyleProps>`
  padding: 1% 5%;
  width: 90%;
  height: 85%;
  background-color: #edf2f5;
  display: flex;
  flex-direction: column;
  gap: 10px;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
`;

const SettingRow = styled.div`
  display: grid;
  grid-template-columns: 40% 30%;
  gap: 100px;
  align-items: center;
`;

export const Ratios = (props: Props): JSX.Element => {
  const salesLength = useTypedSelector(salesSelectors.salesLength);
  const [from, setFrom] = useState({ label: 'Устройства', value: SalesIndexes.DEVICES });
  const [to, setTo] = useState({ label: 'ЦМ', value: SalesIndexes.CM });
  const [dayFrom, setDayFrom] = useState(0);
  const [dayTo, setDayTo] = useState(salesLength);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [withLag, setWithLag] = useState(false);
  const [planeValue, setPlaneValue] = useState('');
  const [colorise, setColorise] = useState(false);
  const allSales = useTypedSelector(salesSelectors.salsesByRange(dayFrom, dayTo));

  const calcFns = getCalcFns();
  const sales = calcFns.monthSalesNew(allSales);
  const columns = getColumns(from, to);

  if (withLag) {
    columns.push({
      label: `Отставание`,
      value: (sale: SalesTuple) =>
        (+(+sale[to.value] - +sale[from.value] * (+planeValue / 100)).toFixed(0)).toLocaleString(
          'ru',
        ),
    });
  }

  const settingsToggle = useCallback(() => setSettingsOpen((prev) => !prev), []);
  const withLagToggle = useCallback(() => setWithLag((prev) => !prev), []);
  const coloriseToggle = useCallback(() => setColorise((prev) => !prev), []);

  const getPlane = (e: any) => {
    if (!isNaN(parseFloat(e.target.value))) {
      setPlaneValue(e.target.value);
    }
  };

  if (salesLength === 0) {
    return <h3>No sales in range</h3>;
  }

  return (
    <Wrapper>
      <DayRange from={dayFrom} to={dayTo} changeFrom={setDayFrom} changeTo={setDayTo} />
      <div>
        <Selectors>
          <Selector defaultValue={from} onChange={(e) => setFrom(e!)} options={options} />
          <Selector defaultValue={to} onChange={(e) => setTo(e!)} options={options} />
          <Img src={settings} onClick={settingsToggle} />
        </Selectors>
        <Settings isOpen={settingsOpen}>
          <SettingsContent isOpen={settingsOpen}>
            <SettingRow>
              <Checkbox
                value={withLag}
                handleChange={withLagToggle}
                label={'Показать отставание'}
              />
              {withLag && (
                <InputField label={'Плановое соотношение'} value={planeValue} onChange={getPlane} />
              )}
            </SettingRow>
            <SettingRow>
              <Checkbox value={colorise} handleChange={coloriseToggle} label={'Выделить цветом'} />
            </SettingRow>
          </SettingsContent>
        </Settings>

        <Table withLag={withLag}>
          {columns.map((column, i) => {
            return (
              <Column key={column.label}>
                <HeadCell isName={i === 0}>
                  <HeadTite>{column.label}</HeadTite>
                </HeadCell>{' '}
                <Cell isName={i === 0} isTT>
                  {i === 0 ? (
                    <Name>{column.value(sales.ttSales)}</Name>
                  ) : (
                    <Value>{column.value(sales.ttSales)?.toLocaleString('ru')}</Value>
                  )}
                </Cell>
                {sales.sales.map((sale, saleI) => {
                  const cellColor =
                    i === 3 && colorise
                      ? column.value(sale) < planeValue
                        ? '#edbbbb'
                        : '#bfedbb'
                      : '';
                  return (
                    <Cell key={`${i}-${saleI}`} isName={i === 0} colorise={cellColor}>
                      {i === 0 ? (
                        <Name>{column.value(sale)}</Name>
                      ) : (
                        <Value>{column.value(sale).toLocaleString('ru')}</Value>
                      )}
                    </Cell>
                  );
                })}
              </Column>
            );
          })}
        </Table>
      </div>
    </Wrapper>
  );
};
