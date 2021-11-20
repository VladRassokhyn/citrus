import styled from 'styled-components';
import { useTypedSelector } from '../../../lib/hooks';
import { authSelectors } from '../../../lib/slices/auth';
import { Planes } from '../../../lib/slices/planes/planes.type';
import { DaySales } from '../../../lib/slices/daySales';

type Props = {
  planes: Planes;
  daySales: DaySales;
  mounthSales: DaySales;
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
  background-color: ${(props) => (props.grow ? FillColors.GREEN : FillColors.RED)};
  padding: 3px;
  margin-left: 10px;
  font-size: 8pt;
  width: 24px;
  border-radius: 5px;
  &::after {
    content: '%';
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
`;

const H2 = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 12pt;
  color: var(--color-stroke);
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

export const EveningReportTable = (props: Props): JSX.Element => {
  const { planes, daySales, mounthSales } = props;
  const authUser = useTypedSelector(authSelectors.selectAuthUser);

  const dayCount = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
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

  const cmGrowthRatio = +(
    cmRatio -
    ((mounthSales.cm - daySales.cm) / (mounthSales.to - daySales.to)) * 100
  ).toFixed(2);

  const cmGrowthForecast = +(
    cmForecast -
    ((((mounthSales.cm - daySales.cm) / (day - 1)) * dayCount) / planes.cm) * 100
  ).toFixed(2);

  const czGrowthRatio = +(
    czRatio -
    ((mounthSales.cz - daySales.cz) / (mounthSales.to - daySales.to)) * 100
  ).toFixed(2);

  const czGrowthForecast = +(
    czForecast -
    ((((mounthSales.cz - daySales.cz) / (day - 1)) * dayCount) / planes.cz) * 100
  ).toFixed(2);

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
      <H3>{authUser!.tt.label}</H3>
      <Container>
        <H1>МЕСЯЦ</H1>
        <Row>
          <Cell>
            <H2>День</H2>
          </Cell>
          <Cell>
            <H2>{day}</H2>
          </Cell>
        </Row>

        <Row>
          <Cell>
            <H2>Доля ЦМ</H2>
            <H4>
              <Growth grow={cmGrowthRatio >= 0}>{cmGrowthRatio}</Growth>
            </H4>
          </Cell>
          <Cell>
            <H2>{cmRatio}%</H2>
          </Cell>
        </Row>

        <Row>
          <Cell>
            <H2>Прогноз ЦМ</H2>
            <H4>
              <Growth grow={cmGrowthForecast >= 0}>{cmGrowthForecast}</Growth>
            </H4>
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
            <H4>
              <Growth grow={czGrowthRatio >= 0}>{czGrowthRatio}</Growth>
            </H4>
          </Cell>
          <Cell>
            <H2>{czRatio}%</H2>
          </Cell>
        </Row>

        <Row>
          <Cell>
            <H2>Прогноз ЦЗ</H2>
            <H4>
              <Growth grow={czGrowthForecast >= 0}>{czGrowthForecast}</Growth>
            </H4>
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
            <H2>Сумма Устройств</H2>
          </Cell>
          <Cell>
            <H2>{daySales.to}</H2>
          </Cell>
        </Row>
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
