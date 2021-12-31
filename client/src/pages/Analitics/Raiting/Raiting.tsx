import { Preloader } from '@components/Preloader';
import { LoadingStatuses } from '@lib/globalTypes';
import { useTypedSelector } from '@lib/hooks';
import { raitingActions, raitingSelectors } from '@lib/slices/raiting';
import { SalesIndexes, salesSelectors } from '@lib/slices/sales';
import { User } from '@lib/slices/users';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Selector from 'react-select';
import { selectorOptions } from './selectorOptions';

type Props = {
  authUser: User;
};

type StyleProps = {
  isHead?: boolean;
};

const Wrapper = styled.div`
  width: 500px;
  padding: 15px 3%;
  @media (max-width: 560px) {
    width: 90%;
  }
`;

const Row = styled.div<StyleProps>`
  display: grid;
  height: 30px;
  grid-template-columns: ${(props) => (props.isHead ? '70% 30%' : '10% 65% 25%')};
  align-items: center;
  margin-bottom: ${(props) => props.isHead && '20px'};
  &:nth-child(even) {
    background-color: #e1e1e1;
  }
`;

const HeadTitle = styled.h1`
  font-size: 14pt;
  color: var(--color-button);
`;

const Name = styled.h1`
  font-size: 10pt;
  color: var(--color-stroke);
`;

const Value = styled.h1`
  font-size: 12pt;
  text-align: center;
`;

const Place = styled.h1`
  font-size: 12pt;
  text-align: center;
`;

export const Raiting = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(SalesIndexes.CM);
  const { month, year } = useTypedSelector(salesSelectors.monthAndYear);
  const sales = useTypedSelector(raitingSelectors.sales);
  const status = useTypedSelector(raitingSelectors.status);

  useEffect(() => {
    dispatch(raitingActions.getSales({ month, year }));
  }, []);

  useEffect(() => {
    dispatch(raitingActions.sortBy(category));
  }, [category]);

  if (status === LoadingStatuses.LOADING) {
    return <Preloader />;
  }

  const onChange = (e: any) => {
    setCategory(e.value);
  };

  return (
    <Wrapper>
      <Row isHead>
        <HeadTitle>Рейтинг по категории :</HeadTitle>
        <Selector
          options={selectorOptions}
          onChange={onChange}
          defaultValue={{ label: 'ЦМ', value: SalesIndexes.CM }}
        />
      </Row>
      {sales?.map((sale: any[], i: number) => {
        if (i < 30)
          return (
            <Row key={sale[0]}>
              <Place>{i + 1}.</Place>
              <Name>
                {sale[0].split(' ')[0]} {sale[0].split(' ')[1]}
              </Name>
              <Value>{sale[category].toLocaleString('ru')}</Value>
            </Row>
          );
      })}
    </Wrapper>
  );
};
