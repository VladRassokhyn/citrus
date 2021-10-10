import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../lib/hooks';
import { selectAllSalesmans } from '../../lib/slices/salesmans';
import { getSalesmans } from '../../lib/slices/salesmans/salesmans.slice';
import { selectSalesmansStatus } from '../../lib/slices/salesmans/salesmans.selectors';
import { LoadingStatuses } from '../../lib/types';
import { Preloader } from '../../Components/Preloader';

const Wrapper = styled.div``;

export const Salesmans = (): JSX.Element => {
  const salesmans = useTypedSelector(selectAllSalesmans);
  const salesmansStatus = useTypedSelector(selectSalesmansStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSalesmans());
  }, []);

  if (salesmansStatus === LoadingStatuses.LOADING || !salesmans) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      {salesmans.map((salesman) => (
        <h4 key={salesman.id}>
          {salesman.name}
          {salesman.lastName}
        </h4>
      ))}
    </Wrapper>
  );
};
