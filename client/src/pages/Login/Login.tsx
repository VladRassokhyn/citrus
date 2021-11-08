import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { InputField } from '../../Components/InputField';
import { FixLater } from '../../lib/globalTypes';
import { useTypedSelector } from '../../lib/hooks';
import { authSelectors } from '../../lib/slices/auth';
import { tryLogin } from '../../lib/slices/auth/auth.slice';

const Wrapper = styled.form`
  padding: 20px 5vw;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Button = styled.button`
  background-color: var(--color-button);
  color: white;
  width: 100%;
  height: 30px;
  border: 0;
  margin-top: 20px;
  border-radius: 5px;
`;

export const Login = (): JSX.Element => {
  const { handleSubmit, register } = useForm();
  const authUser = useTypedSelector(authSelectors.selectAuthUser);
  const dispatch = useDispatch();

  if (authUser) {
    return <Redirect to={'/'} />;
  }

  const handleLogin = (e: FixLater) => {
    dispatch(tryLogin(e));
  };

  return (
    <Wrapper onSubmit={handleSubmit(handleLogin)}>
      <InputField label={'Логин'} register={{ ...register('username') }} />
      <InputField
        label={'Пароль'}
        register={{ ...register('password') }}
        password
      />
      <Button>Войти</Button>
    </Wrapper>
  );
};
