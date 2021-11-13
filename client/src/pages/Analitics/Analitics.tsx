import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { CollapsedItem } from '../../Components/CollapsedItem';
import { Preloader } from '../../Components/Preloader';
import { LoadingStatuses } from '../../lib/globalTypes';
import { useTypedSelector } from '../../lib/hooks';
import { authSelectors } from '../../lib/slices/auth';
import { planesActions, planesSelectors } from '../../lib/slices/planes';
import { PlanesPanel } from './PlanesPanel';

const Wrapper = styled.div``;

export const Analitic = (): JSX.Element => {
  const planes = useTypedSelector(planesSelectors.selectPlanes);
  const status = useTypedSelector(planesSelectors.selectStatus);
  const authUser = useTypedSelector(authSelectors.selectAuthUser);
  const dispatch = useDispatch();

  useEffect(() => {
    authUser && dispatch(planesActions.getPlanes(authUser.tt));
  }, []);

  if (status === LoadingStatuses.LOADING) {
    return <Preloader />;
  }
  return (
    <Wrapper>
      <PlanesPanel planes={planes} />
    </Wrapper>
  );
};
