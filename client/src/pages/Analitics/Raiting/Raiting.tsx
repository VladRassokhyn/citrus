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

const Wrapper = styled.div``;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const H2 = styled.h1`
  font-size: 10pt;
  width: 100px;
`;

const H1 = styled.h1`
  font-size: 10pt;
  width: 400px;
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
      <Row>
        <h4>service: </h4>
        <Selector
          options={selectorOptions}
          onChange={onChange}
          defaultValue={{ label: 'ЦМ', value: SalesIndexes.CM }}
        />
      </Row>
      {sales?.map((sale: any, i: number) => {
        return (
          <Row key={sale[0]}>
            <h5>{i + 1}. </h5>
            <H1>{sale[0]}</H1>
            <H2>{sale[category]}</H2>
          </Row>
        );
      })}
    </Wrapper>
  );
};
