import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { InputField } from '../../Components/InputField';
import { FixLater, LoadingErrors, LoadingStatuses } from '../../lib/globalTypes';
import { useTypedSelector } from '../../lib/hooks';
import { paths } from '../../lib/routing';
import { authSelectors, authActions } from '../../lib/slices/auth';

const Wrapper = styled.form`
  padding: 20px 5vw;
  display: flex;
  flex-direction: column;
  gap: 25px;
  @media (min-width: 560px) {
    padding: 25vh 35vw;
  }
`;

const Button = styled.button`
  background-color: var(--color-button);
  color: white;
  width: 100%;
  height: 30px;
  border: 0;
  margin-top: 20px;
  border-radius: 5px;
  transition: linear 0.3s;
  &:hover {
    cursor: pointer;
    background-color: #0780ff;
  }
`;

export const Login = (): JSX.Element => {
  const { handleSubmit, register } = useForm();
  const authUser = useTypedSelector(authSelectors.authUser);
  const authStatus = useTypedSelector(authSelectors.status);
  const authError = useTypedSelector(authSelectors.error);
  const dispatch = useDispatch();

  const isDisabled = authStatus === LoadingStatuses.LOADING;
  const isError = authError === LoadingErrors.NOT_AUTORISED;

  if (authUser) {
    return <Redirect to={paths.BASE()} />;
  }

  const handleLogin = (e: FixLater) => {
    dispatch(authActions.tryLogin(e));
  };

  return (
    <Wrapper onSubmit={handleSubmit(handleLogin)}>
      <InputField
        isError={isError}
        disabled={isDisabled}
        label={'Логин'}
        register={{ ...register('username') }}
      />
      <InputField
        isError={isError}
        disabled={isDisabled}
        label={'Пароль'}
        register={{ ...register('password') }}
        password
      />
      <Button disabled={isDisabled}>Войти</Button>
    </Wrapper>
  );
};
