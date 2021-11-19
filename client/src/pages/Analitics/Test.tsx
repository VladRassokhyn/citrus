import styled from 'styled-components';
import { Salesman } from '../../lib/globalTypes';
import { Sales } from '../../lib/slices/sales/sales.type';

type Props = {
  sales: any;
  salesmans: Salesman[] | null;
};

const Wrapper = styled.div``;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Name = styled.h1`
  font-size: 8pt;
  width: 150px;
`;

const Value = styled.div`
  font-size: 10pt;
  width: 50px;
  text-align: right;
`;

export const Test = (props: Props) => {
  const { sales, salesmans } = props;
  const salesmansNames = getSalesmansNames(salesmans);

  return (
    <Wrapper>
      {sales?.map((day: Sales) => {
        return (
          <div>
            <h4>{day.day}</h4>
            {day.sales.map((daySales, i) => {
              if (salesmansNames.includes(daySales[0])) {
                return (
                  <Line key={i}>
                    {daySales.map((cell, i) => {
                      if (i === 0) {
                        return (
                          <Name key={i}>
                            {cell.split(' ')[0]} {cell.split(' ')[1]}
                          </Name>
                        );
                      }
                      if (i === 1 || i === 8 || i === 10 || i === 12) {
                        const value = parseInt(cell.replace(/\s/g, ''));
                        return <Value>{isNaN(value) ? 0 : value}</Value>;
                      }
                    })}
                  </Line>
                );
              }
            })}
          </div>
        );
      })}
    </Wrapper>
  );
};

function getSalesmansNames(salesmans: Salesman[] | null) {
  if (!salesmans) {
    return [];
  }
  const names: string[] = [];
  salesmans.forEach((salesman) => {
    names.push(salesman.name);
  });
  return names;
}
