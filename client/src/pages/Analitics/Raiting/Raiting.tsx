import { Preloader } from '@components/Preloader';
import { LoadingStatuses } from '@lib/globalTypes';
import { useTypedSelector } from '@lib/hooks';
import { raitingActions, raitingSelectors } from '@lib/slices/raiting';
import { SalesIndexes, salesSelectors } from '@lib/slices/sales';
import { User } from '@lib/slices/users';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

type Props = {
  authUser: User;
};

const Wrapper = styled.div``;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const H5 = styled.h1`
  font-size: 10pt;
  width: 300px;
`;

export const Raiting = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(SalesIndexes.CM);
  const { month, year } = useTypedSelector(salesSelectors.monthAndYear);
  const sales = useTypedSelector(raitingSelectors.sales);
  const status = useTypedSelector(raitingSelectors.status);
  console.log('render');
  useEffect(() => {
    dispatch(raitingActions.getSales({ month, year }));
  }, []);

  useEffect(() => {
    dispatch(raitingActions.sortBy(category));
  }, [category]);

  if (status === LoadingStatuses.LOADING) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      {sales?.map((sale: any) => {
        return (
          <Row key={sale[0]}>
            <H5>{sale[0]}</H5>
            <H5>{sale[category]}</H5>
          </Row>
        );
      })}
    </Wrapper>
  );
};
