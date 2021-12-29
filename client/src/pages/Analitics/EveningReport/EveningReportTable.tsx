import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { getCalcFns } from '@lib/common';
import React, { useMemo, useState } from 'react';
import { Screenshot } from '@components/Screenshot';
import { useTypedSelector } from '@lib/hooks';
import { planesSelectors } from '@lib/slices/planes';
import { Shop } from '@lib/slices/shop';
import { Sales } from '@lib/slices/sales';
import { Planes } from '@lib/slices/planes/planes.type';
import { rowsConfig, getCalcs } from './config';

type Props = {
  currentShop: Shop;
  sales: Sales[];
  day: number;
  month: number;
};

type CellProps = {
  width?: number;
  color?: string;
  grow?: boolean;
  transparent?: boolean;
  isDayCell?: boolean;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const H2 = styled.h2<{ isDayCell?: boolean }>`
  width: 100%;
  text-align: ${(props) => (props.isDayCell ? 'right' : 'center')};
  font-size: 12pt;
  color: var(--color-stroke);
`;

const Cell = styled.div<CellProps>`
  width: 200px;
  height: 30px;
  display: ${(props) => (props.isDayCell ? 'grid' : 'flex')};
  ${(props) => props.isDayCell && 'grid-template-columns: 70% 30%;'};
  align-items: center;
  ${(props) => props.isDayCell && 'padding: 10px 0;'};
  border-bottom: 1px solid gray;
  &:nth-child(2) {
    border-left: 1px solid gray;
  }
  @media (max-width: 559px) {
    width: 45%;
  }
`;

const FilledCell = styled.div<CellProps>`
  width: ${(props) =>
    (props.width && props.width > 100) || !props.transparent ? 100 : props.width}%;
  background-color: ${(props) => (!props.transparent ? 'transparent' : props.color)};
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Growth = styled.sup<CellProps>`
  color: ${(props) => (props.grow ? 'green' : 'red')};
  padding: 3px;
  margin-left: 10px;
  font-size: 8pt;
  width: 24px;
  border-radius: 5px;
  &::after {
    content: '%';
  }
  &::before {
    content: ${(props) => (props.grow ? "'+'" : '')};
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const H1 = styled.h1`
  width: 391px;
  padding: 5px;
  text-align: center;
  font-size: 14pt;
  color: white;
  margin-top: 30px;
  background-color: var(--color-button);
  @media (max-width: 559px) {
    width: 90vw;
  }
`;

const H3 = styled.h3`
  width: 391px;
  height: 40px;
  text-align: center;
`;

const H4 = styled.h2`
  width: 35%;
  text-align: center;
  font-size: 12pt;
  color: var(--color-stroke);
`;

const ScreenContainer = styled.div`
  min-width: 401px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  border: 1px solid #d7d7d7;
  border-radius: 10px;
  background-color: white;
`;

const Button = styled.button`
  width: 200px;
  background-color: var(--color-button);
  color: white;
  min-width: 100px;
  height: 30px;
  border: 0;
  border-radius: 5px;
  transition: linear 0.3s;
  &:hover {
    cursor: pointer;
    background-color: #3d82eb;
  }
`;

export const EveningReportTable = (props: Props): JSX.Element => {
  const { day, month, sales, currentShop } = props;
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const planes = useTypedSelector<Planes | null>(planesSelectors.planes);

  if (!planes) {
    return <h1>Update the Planes!</h1>;
  }

  const calcFns = getCalcFns(day, month);

  const monthSales = calcFns.monthSalesNew(sales);
  const lastDaySales = sales[sales.length - 1];

  const onScreenshot = () => {
    html2canvas(document.getElementById('evening-report') as HTMLElement).then((canvas) => {
      canvas.toBlob(function (blob) {
        //@ts-ignore
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]);
      });
      const base64 = canvas.toDataURL();
      setScreenshot(base64);
    });
  };

  const calcs: any = useMemo(() => getCalcs(lastDaySales, monthSales, calcFns, planes, day), [
    lastDaySales,
    monthSales,
    planes,
    day,
  ]);

  const rows = rowsConfig.map((row, i) => {
    if (row.isHeader) {
      return <H1 key={`${row.label} ${i}`}>{row.value}</H1>;
    } else {
      return (
        <Row key={`${row.label} ${i}`}>
          <Cell>
            <H2 isDayCell={row.isDayCell}>{row.label}</H2>
            {row.growth && (
              <H4>
                <Growth grow={calcs[row.growth] >= 0}>{calcs[row.growth]}</Growth>
              </H4>
            )}
          </Cell>
          <Cell>
            <FilledCell
              transparent={row.withFill}
              width={calcs[row.value] >= 0 ? calcs[row.value] : 100}
              color={row.color && row.color(calcs[row.value])}
            >
              <H2>
                {calcs[row.value]}
                {row.withPercent && '%'}
              </H2>
            </FilledCell>
          </Cell>
        </Row>
      );
    }
  });

  return (
    <Wrapper>
      {screenshot && <Screenshot onClose={setScreenshot} image={screenshot} />}
      <Button onClick={onScreenshot}>Сделать скрин</Button>
      <div id={'evening-report'}>
        <ScreenContainer>
          <Container>
            <H3>{currentShop.shortName}</H3>
            {rows}
          </Container>
        </ScreenContainer>
      </div>
    </Wrapper>
  );
};
