import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Preloader } from '../../../Components/Preloader';
import { User } from '../../../lib/globalTypes';
import { useTypedSelector } from '../../../lib/hooks';
import { salesmanActions, salesmanSelectors } from '../../../lib/slices/salesman';

type Props = {
  authUser: User;
};

const Wrapper = styled.div``;

export const Salesmans = (props: Props): JSX.Element => {
  const { authUser } = props;
  const salesmans = useTypedSelector(salesmanSelectors.selectAllSalesmans);
  const dispatch = useDispatch();

  if (!salesmans) return <Preloader />;

  useEffect(() => {
    dispatch(salesmanActions.getSalesmans(authUser.tt));
  }, []);

  return (
    <Wrapper>
      {salesmans.map((salesman) => (
        <h1 key={salesman.id}>{salesman.name}</h1>
      ))}
    </Wrapper>
  );
};
