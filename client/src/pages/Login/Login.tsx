import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { InputField } from '../../Components/InputField';
import { FixLater, LoadingStatuses } from '../../lib/globalTypes';
import { useTypedSelector } from '../../lib/hooks';
import { authSelectors, tryLogin } from '../../lib/slices/auth';

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
  const authUser = useTypedSelector(authSelectors.selectAuthUser);
  const { loginStatus } = useTypedSelector(authSelectors.selectAuthStatuses);
  const dispatch = useDispatch();

  const isDisabled = loginStatus === LoadingStatuses.LOADING;
  const isError = loginStatus === LoadingStatuses.ERROR;

  if (authUser) {
    return <Redirect to={'/'} />;
  }

  const handleLogin = (e: FixLater) => {
    dispatch(tryLogin(e));
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
