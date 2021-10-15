import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { InputField } from '../../Components/InputField';
import { FixLater } from '../../lib/globalTypes';
import { tryLogin } from '../../lib/slices/auth/auth.slice';

const Wrapper = styled.div``;

const Button = styled.button``;

export const Login = (): JSX.Element => {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();

  const handleLogin = (e: FixLater) => {
    console.log(e);
    dispatch(tryLogin(e));
  };

  console.log(localStorage.getItem('token'));

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(handleLogin)}>
        <InputField label={'Логин'} register={{ ...register('username') }} />
        <InputField
          label={'Пароль'}
          register={{ ...register('password') }}
          password
        />
        <Button>Войти</Button>
      </form>
    </Wrapper>
  );
};
