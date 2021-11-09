import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useTypedSelector } from '../../lib/hooks';
import { planesActions, planesSelectors } from '../../lib/slices/planes';

const Wrapper = styled.div``;

export const PlanesPanel = (): JSX.Element => {
  const planes = useTypedSelector(planesSelectors.selectPlanes);
  const status = useTypedSelector(planesSelectors.selectStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(planesActions.getPlanes());
  }, []);

  return <Wrapper></Wrapper>;
};
