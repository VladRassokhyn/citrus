import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Selector from 'react-select';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { FixLater, LoadingStatuses, UserRoles, TT, User } from '../../lib/globalTypes';
import { userActions, userSelectors } from '../../lib/slices/users';
import { useTypedSelector } from '../../lib/hooks';
import { InputField } from '../../Components/InputField';

type Props = {
  user?: User;
};

type StyleProps = {
  disabled: boolean;
};

const Wrapper = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  min-height: 100px;
  padding: 20px 10px;
  gap: 20px;
`;

const Button = styled.button<StyleProps>`
  width: 50%;
  height: 30px;
  background-color: ${(props) => (props.disabled ? 'lightgrey' : 'var(--color-secondary)')};
  border: 1px solid #d1d1d1;
  color: white;
  font-size: 14pt;
`;

const roleSelectorOptions = [
  { label: UserRoles.SALESMAN, value: UserRoles.SALESMAN },
  { label: UserRoles.MANAGER, value: UserRoles.MANAGER },
];

const TTselectorOptions = [
  { label: TT.BLOCK, value: TT.BLOCK },
  { label: TT.KR29, value: TT.KR29 },
  { label: TT.KR52, value: TT.KR52 },
  { label: TT.BV23, value: TT.BV23 },
  { label: TT.DRIM, value: TT.DRIM },
  { label: TT.LAVINA, value: TT.LAVINA },
  { label: TT.GLOBUS, value: TT.GLOBUS },
  { label: TT.GORODOK, value: TT.GORODOK },
  { label: TT.OCEAN, value: TT.OCEAN },
  { label: TT.PIRAMIDA, value: TT.PIRAMIDA },
  { label: TT.RIVER, value: TT.RIVER },
  { label: TT.SKY, value: TT.SKY },
  { label: TT.BV66, value: TT.BV66 },
  { label: TT.HITMALL, value: TT.HITMALL },
];

export const NewUserForm = (props: Props): JSX.Element => {
  const { user } = props;
  const dispatch = useDispatch();
  const CRUDstatus = useTypedSelector(userSelectors.selectUsersCRUSstatus);
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit, control } = useForm({
    defaultValues: { ...user, password: '' },
  });

  const handleSave = (e: FixLater) => {
    if (user) {
      dispatch(userActions.updateUser({ id: user.id, dto: e }));
    } else {
      dispatch(userActions.postNewUser({ ...e, role: e.role.value, tt: e.tt.value }));
    }
  };

  useEffect(() => {
    if (CRUDstatus === LoadingStatuses.LOADING) {
      setDisabled(true);
    }
    if (CRUDstatus === LoadingStatuses.SUCCESS) {
      setDisabled(false);
    }
  }, [CRUDstatus]);

  return (
    <Wrapper onSubmit={handleSubmit(handleSave)}>
      {!user && (
        <>
          <InputField register={{ ...register('username') }} label={'Логин'} disabled={disabled} />
          <InputField
            password
            register={{ ...register('password') }}
            label={'Пароль'}
            disabled={disabled}
          />
        </>
      )}

      <InputField register={{ ...register('name') }} label={'Имя'} disabled={disabled} />
      <InputField register={{ ...register('lastName') }} label={'Фамилия'} disabled={disabled} />
      {!user && (
        <Controller
          control={control}
          name="tt"
          render={({ field: { onChange } }) => (
            <Selector onChange={onChange} placeholder={'ТТ'} options={TTselectorOptions} />
          )}
        />
      )}

      {!user && (
        <Controller
          control={control}
          name="role"
          render={({ field: { onChange } }) => (
            <Selector placeholder={'Роль'} onChange={onChange} options={roleSelectorOptions} />
          )}
        />
      )}
      <Button disabled={disabled} type={'submit'}>
        {disabled ? 'Загрузка...' : 'Сохранить'}
      </Button>
    </Wrapper>
  );
};
