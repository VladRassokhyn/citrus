import styled from 'styled-components';
import { Planes } from '../../../lib/slices/planes/planes.type';
import { Sales } from './types';

type Props = {
  planes: Planes;
  daySales: Sales;
  mounthSales: Sales;
};

type CellProps = {
  width: number;
  color: string;
};

enum FillColors {
  RED = 'rgb(255, 0, 0, .3)',
  YELLOW = 'rgb(255, 255, 0, .5)',
  GREEN = 'rgb(0, 255, 0, .3)',
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
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
`;

const FilledCell = styled.div<CellProps>`
  width: ${(props) => (props.width > 100 ? 100 : props.width)}%;
  background-color: ${(props) => props.color};
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
`;

const H2 = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 12pt;
  color: var(--color-stroke);
`;

export const EveningReportTable = (props: Props): JSX.Element => {
  const { planes, daySales, mounthSales } = props;

  const dayCount = 31;
  const day = new Date().getDate();

  const cmRatio = +((mounthSales.cm / mounthSales.to) * 100).toFixed(2);
  const cmForecast = +((((mounthSales.cm / day) * dayCount) / planes.cm) * 100).toFixed();
  const czRatio = +((mounthSales.cz / mounthSales.to) * 100).toFixed(2);
  const czForecast = +((((mounthSales.cz / day) * dayCount) / planes.cz) * 100).toFixed();

  const cmDayPlane = +((planes.cm - mounthSales.cm) / (dayCount - day)).toFixed(0);
  const czDayPlane = +((planes.cz - mounthSales.cz) / (dayCount - day)).toFixed(0);

  const cmDayRatio = +((daySales.cm / daySales.to) * 100).toFixed(2);
  const cmDayRate = +((daySales.cm / cmDayPlane) * 100).toFixed();
  const czDayRatio = +((daySales.cz / daySales.to) * 100).toFixed(2);
  const czDayRate = +((daySales.cz / czDayPlane) * 100).toFixed();

  const cmForecastColor =
    cmForecast > 90 ? FillColors.GREEN : cmForecast > 70 ? FillColors.YELLOW : FillColors.RED;
  const czForecastColor =
    czForecast > 90 ? FillColors.GREEN : czForecast > 70 ? FillColors.YELLOW : FillColors.RED;
  const cmDayRateColor =
    cmDayRate > 90 ? FillColors.GREEN : cmDayRate > 70 ? FillColors.YELLOW : FillColors.RED;
  const czDayRateColor =
    czDayRate > 90 ? FillColors.GREEN : czDayRate > 70 ? FillColors.YELLOW : FillColors.RED;

  return (
    <Wrapper>
      <Container>
        <H1>МЕСЯЦ</H1>
        <Row>
          <Cell>
            <H2>
              <H2>День</H2>
            </H2>
          </Cell>
          <Cell>
            <H2>{day}</H2>
          </Cell>
        </Row>

        <Row>
          <Cell>
            <H2>Доля ЦМ</H2>
          </Cell>
          <Cell>
            <H2>{cmRatio}%</H2>
          </Cell>
        </Row>

        <Row>
          <Cell>
            <H2>Прогноз ЦМ</H2>
          </Cell>
          <Cell>
            <H2>
              <FilledCell width={cmForecast} color={cmForecastColor}>
                <H2>{cmForecast}%</H2>
              </FilledCell>
            </H2>
          </Cell>
        </Row>

        <Row>
          <Cell>
            <H2>Доля ЦЗ</H2>
          </Cell>
          <Cell>
            <H2>{czRatio}%</H2>
          </Cell>
        </Row>

        <Row>
          <Cell>
            <H2>Прогноз ЦЗ</H2>
          </Cell>
          <Cell>
            <FilledCell width={czForecast} color={czForecastColor}>
              <H2>{czForecast}%</H2>
            </FilledCell>
          </Cell>
        </Row>
      </Container>
      <Container>
        <H1>ДЕНЬ</H1>
        <Row>
          <Cell>
            <H2>Сумма ЦМ</H2>
          </Cell>
          <Cell>
            <H2>{daySales.cm}</H2>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <H2>Доля ЦМ</H2>
          </Cell>
          <Cell>
            <H2>{cmDayRatio}%</H2>
          </Cell>
        </Row>

        <Row>
          <Cell>
            <H2>Выполнение ЦМ</H2>
          </Cell>
          <Cell>
            <FilledCell width={cmDayRate} color={cmDayRateColor}>
              <H2>{cmDayRate}%</H2>
            </FilledCell>
          </Cell>
        </Row>

        <Row>
          <Cell>
            <H2>Сумма ЦЗ</H2>
          </Cell>
          <Cell>
            <H2>{daySales.cz}</H2>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <H2>Доля ЦЗ</H2>
          </Cell>
          <Cell>
            <H2>{czDayRatio}%</H2>
          </Cell>
        </Row>

        <Row>
          <Cell>
            <H2>Выполнение ЦЗ</H2>{' '}
          </Cell>
          <Cell>
            <FilledCell width={czDayRate} color={czDayRateColor}>
              <H2>{czDayRate}%</H2>{' '}
            </FilledCell>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <H2>Сумма ЦА</H2>
          </Cell>
          <Cell>
            <H2>{daySales.ca}</H2>
          </Cell>
        </Row>
      </Container>
    </Wrapper>
  );
};
