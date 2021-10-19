import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { Preloader } from '../../../Components/Preloader';
import { LoadingStatuses } from '../../../lib/globalTypes';
import { useTypedSelector } from '../../../lib/hooks';
import {
  selectOneUser,
  selectOneUserStatus,
  getOneUser,
} from '../../../lib/slices/users';

const Wrapper = styled.div``;

export const User = (): JSX.Element | null => {
  const { userId } = useParams<{ userId: string }>();
  const user = useTypedSelector(selectOneUser);
  const status = useTypedSelector(selectOneUserStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneUser(userId));
  }, []);

  if (status === LoadingStatuses.LOADING) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      <h3>id : {user && user.id}</h3>
      <h3>Имя : {user && user.name}</h3>
      <h3>Фамилия : {user && user.lastName}</h3>
      <h3>Логин : {user && user.username}</h3>
    </Wrapper>
  );
};
