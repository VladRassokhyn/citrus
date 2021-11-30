import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { calcFns } from '../../../lib/common';
import { useMemo, useState } from 'react';
import { Screenshot } from '../../../Components/Screenshot';
import { Redirect } from 'react-router';
import { useTypedSelector } from '../../../lib/hooks';
import { planesSelectors } from '../../../lib/slices/planes';
import { paths } from '../../../lib/routing';
import { User } from '../../../lib/slices/users';
import { salesSelectors } from '../../../lib/slices/sales';

type Props = {
  authUser: User;
};

type CellProps = {
  width?: number;
  color?: string;
  grow?: boolean;
};

enum FillColors {
  RED = 'rgb(255, 0, 0, .3)',
  YELLOW = 'rgb(255, 255, 0, .5)',
  GREEN = 'rgb(0, 255, 0, .3)',
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Cell = styled.div`
  width: 200px;
  height: 30px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
  &:nth-child(2) {
    border-left: 1px solid gray;
  }
  @media (max-width: 559px) {
    width: 45%;
  }
`;

const H2 = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 12pt;
  color: var(--color-stroke);
`;

const DayCell = styled.div`
  width: 200px;
  height: 30px;
  display: grid;
  grid-template-columns: 70% 30%;
  align-items: center;
  border-bottom: 1px solid gray;
  &:nth-child(2) {
    border-left: 1px solid gray;
  }
  @media (max-width: 559px) {
    width: 45%;
  }
  & ${H2} {
    text-align: right;
  }
`;

const FilledCell = styled.div<CellProps>`
  width: ${(props) => (props.width && props.width > 100 ? 100 : props.width)}%;
  background-color: ${(props) => props.color};
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
  gap: 20px;
  justify-content: center;
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

export const EveningReport = (props: Props): JSX.Element => {
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const planes = useTypedSelector(planesSelectors.selectPlanes);
  const sales = useTypedSelector(salesSelectors.selectAllSales);

  if (!planes || !sales || sales?.length === 0) {
    return <Redirect to={paths.ANALYTICS.MAIN.BASE()} />;
  }

  const mounthSales = useMemo(() => calcFns.mounthSalesNew(sales), [sales]);
  const daySales = sales[sales.length - 1];

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

  const day = new Date().getDate();

  const calcs = useMemo(
    () => ({
      cmDayRatio: calcFns.ratio(daySales.ttSales[8], daySales.ttSales[1]),
      czDayRatio: calcFns.ratio(daySales.ttSales[10], daySales.ttSales[1]),
      cmRatio: calcFns.ratio(mounthSales.ttSales[8], mounthSales.ttSales[1]),
      czRatio: calcFns.ratio(mounthSales.ttSales[10], mounthSales.ttSales[1]),
      cmForecast: calcFns.forecastPercent(mounthSales.ttSales[8], planes.cm),
      czForecast: calcFns.forecastPercent(mounthSales.ttSales[10], planes.cz),
      cmGrowthForecast: calcFns.growthForecast(
        planes.cm,
        daySales.ttSales[8],
        mounthSales.ttSales[8],
      ),
      czGrowthForecast: calcFns.growthForecast(
        planes.cz,
        daySales.ttSales[10],
        mounthSales.ttSales[10],
      ),
      cmDayRate: calcFns.ratio(
        daySales.ttSales[8],
        calcFns.dayPlane(mounthSales.ttSales[8], planes.cm),
      ),
      czDayRate: calcFns.ratio(
        daySales.ttSales[10],
        calcFns.dayPlane(mounthSales.ttSales[10], planes.cz),
      ),
      cmGrowthRatio: calcFns.growthRatio(
        daySales.ttSales[8],
        daySales.ttSales[1],
        mounthSales.ttSales[8],
        mounthSales.ttSales[1],
      ),
      czGrowthRatio: calcFns.growthRatio(
        daySales.ttSales[10],
        daySales.ttSales[1],
        mounthSales.ttSales[10],
        mounthSales.ttSales[1],
      ),
    }),
    [],
  );

  const cmForecastColor =
    calcs.cmForecast > 90
      ? FillColors.GREEN
      : calcs.cmForecast > 70
      ? FillColors.YELLOW
      : FillColors.RED;
  const czForecastColor =
    calcs.czForecast > 90
      ? FillColors.GREEN
      : calcs.czForecast > 70
      ? FillColors.YELLOW
      : FillColors.RED;
  const cmDayRateColor =
    calcs.cmDayRate > 90 || calcs.cmDayRate < 0
      ? FillColors.GREEN
      : calcs.cmDayRate > 70
      ? FillColors.YELLOW
      : FillColors.RED;
  const czDayRateColor =
    calcs.czDayRate > 90 || calcs.czDayRate < 0
      ? FillColors.GREEN
      : calcs.czDayRate > 70
      ? FillColors.YELLOW
      : FillColors.RED;

  return (
    <Wrapper>
      {screenshot && <Screenshot onClose={setScreenshot} image={screenshot} />}
      <Button onClick={onScreenshot}>Сделать скрин</Button>
      <div id={'evening-report'}>
        <ScreenContainer>
          <H3>{props.authUser.tt.label}</H3>
          <Container>
            <H1>МЕСЯЦ</H1>
            <Row>
              <DayCell>
                <H2>День</H2>
              </DayCell>
              <Cell>
                <H2>{day}</H2>
              </Cell>
            </Row>

            <Row>
              <DayCell>
                <H2>Доля ЦМ</H2>
                <H4>
                  <Growth grow={calcs.cmGrowthRatio >= 0}>{calcs.cmGrowthRatio}</Growth>
                </H4>
              </DayCell>
              <Cell>
                <H2>{calcs.cmRatio}%</H2>
              </Cell>
            </Row>

            <Row>
              <DayCell>
                <H2>Прогноз ЦМ</H2>
                <H4>
                  <Growth grow={calcs.cmGrowthForecast >= 0}>{calcs.cmGrowthForecast}</Growth>
                </H4>
              </DayCell>
              <Cell>
                <H2>
                  <FilledCell width={calcs.cmForecast} color={cmForecastColor}>
                    <H2>{calcs.cmForecast}%</H2>
                  </FilledCell>
                </H2>
              </Cell>
            </Row>

            <Row>
              <DayCell>
                <H2>Доля ЦЗ</H2>
                <H4>
                  <Growth grow={calcs.czGrowthRatio >= 0}>{calcs.czGrowthRatio}</Growth>
                </H4>
              </DayCell>
              <Cell>
                <H2>{calcs.czRatio}%</H2>
              </Cell>
            </Row>

            <Row>
              <DayCell>
                <H2>Прогноз ЦЗ</H2>
                <H4>
                  <Growth grow={calcs.czGrowthForecast >= 0}>{calcs.czGrowthForecast}</Growth>
                </H4>
              </DayCell>
              <Cell>
                <FilledCell width={calcs.czForecast} color={czForecastColor}>
                  <H2>{calcs.czForecast}%</H2>
                </FilledCell>
              </Cell>
            </Row>
          </Container>
          <Container>
            <H1>ДЕНЬ</H1>

            <Row>
              <Cell>
                <H2>Сумма Устройств</H2>
              </Cell>
              <Cell>
                <H2>{daySales.ttSales[1]}</H2>
              </Cell>
            </Row>
            <Row>
              <Cell>
                <H2>Сумма ЦМ</H2>
              </Cell>
              <Cell>
                <H2>{daySales.ttSales[8]}</H2>
              </Cell>
            </Row>
            <Row>
              <Cell>
                <H2>Доля ЦМ</H2>
              </Cell>
              <Cell>
                <H2>{calcs.cmDayRatio}%</H2>
              </Cell>
            </Row>

            <Row>
              <Cell>
                <H2>Выполнение ЦМ</H2>
              </Cell>
              <Cell>
                <FilledCell
                  width={calcs.cmDayRate >= 0 ? calcs.cmDayRate : 100}
                  color={cmDayRateColor}
                >
                  <H2>{calcs.cmDayRate >= 0 ? calcs.cmDayRate : 100}%</H2>
                </FilledCell>
              </Cell>
            </Row>

            <Row>
              <Cell>
                <H2>Сумма ЦЗ</H2>
              </Cell>
              <Cell>
                <H2>{daySales.ttSales[10]}</H2>
              </Cell>
            </Row>
            <Row>
              <Cell>
                <H2>Доля ЦЗ</H2>
              </Cell>
              <Cell>
                <H2>{calcs.czDayRatio}%</H2>
              </Cell>
            </Row>

            <Row>
              <Cell>
                <H2>Выполнение ЦЗ</H2>
              </Cell>
              <Cell>
                <FilledCell
                  width={calcs.czDayRate >= 0 ? calcs.czDayRate : 100}
                  color={czDayRateColor}
                >
                  <H2>{calcs.czDayRate >= 0 ? calcs.czDayRate : 100}%</H2>
                </FilledCell>
              </Cell>
            </Row>
            <Row>
              <Cell>
                <H2>Сумма ЦА</H2>
              </Cell>
              <Cell>
                <H2>{daySales.ttSales[12]}</H2>
              </Cell>
            </Row>
          </Container>
        </ScreenContainer>
      </div>
    </Wrapper>
  );
};
