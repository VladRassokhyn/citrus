import styled from 'styled-components';
import { Planes } from '../../../lib/slices/planes/planes.type';
import { Sales } from './types';

type Props = {
  planes: Planes;
  daySales: Sales;
  mounthSales: Sales;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Cell = styled.div`
  width: 100px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const H1 = styled.h1``;

const H2 = styled.h2``;

export const EveningReportTable = (props: Props): JSX.Element => {
  const { planes, daySales, mounthSales } = props;

  const dayCount = 31;
  const day = new Date().getDate();

  const cmRatio = ((mounthSales.cm / mounthSales.to) * 100).toFixed(2);
  const cmForecast = (
    (((mounthSales.cm / day) * dayCount) / planes.cm) *
    100
  ).toFixed();
  const czRatio = ((mounthSales.cz / mounthSales.to) * 100).toFixed(2);
  const czForecast = (
    (((mounthSales.cz / day) * dayCount) / planes.cz) *
    100
  ).toFixed();

  //const cmDayPlane =
  const cmDayRatio = ((daySales.cm / daySales.to) * 100).toFixed(2);
  const cmDayRate = ((daySales.cm / planes.cm) * 100).toFixed();
  const czDayRatio = ((daySales.cz / daySales.to) * 100).toFixed(2);
  const czDayRate = ((daySales.cz / planes.cz) * 100).toFixed();

  return (
    <Wrapper>
      <Container>
        <H1>Месяц</H1>
        <Row>
          <Cell>День</Cell>
          <Cell>{day}</Cell>
        </Row>

        <Row>
          <Cell>Доля ЦМ</Cell>
          <Cell>{cmRatio}%</Cell>
        </Row>

        <Row>
          <Cell>Прогноз ЦМ</Cell>
          <Cell>{cmForecast}%</Cell>
        </Row>

        <Row>
          <Cell>Доля ЦЗ</Cell>
          <Cell>{czRatio}%</Cell>
        </Row>

        <Row>
          <Cell>Прогноз ЦЗ</Cell>
          <Cell>{czForecast}%</Cell>
        </Row>
      </Container>
    </Wrapper>
  );
};
