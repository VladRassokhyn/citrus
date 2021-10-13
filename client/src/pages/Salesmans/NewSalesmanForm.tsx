import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FixLater, LoadingStatuses } from '../../lib/globalTypes';
import { postNewSalesman } from '../../lib/slices/salesmans/salesmans.slice';
import { useEffect, useState } from 'react';
import { useTypedSelector } from '../../lib/hooks';
import { selectSalesmansCRUSstatus } from '../../lib/slices/salesmans/salesmans.selectors';
import { InputField } from '../../Components/InputField';

type StyleProps = {
  disabled: boolean;
};

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100px;
  padding: 20px 10px;
  gap: 20px;
`;

const Field = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  width: 70%;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  padding: 3px;
  height: 25px;
  font-size: 10pt;
`;

const H1 = styled.h1`
  font-size: 12pt;
  color: var(--color-stroke);
`;

const Button = styled.button<StyleProps>`
  width: 50%;
  height: 30px;
  background-color: ${(props) =>
    props.disabled ? 'lightgrey' : 'var(--color-secondary)'};
  border: 1px solid #d1d1d1;
  color: white;
  font-size: 14pt;
`;

export const NewSalesmanForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const CRUDstatus = useTypedSelector(selectSalesmansCRUSstatus);
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleSave = (e: FixLater) => {
    dispatch(
      postNewSalesman({
        dto: { name: e.name, lastname: e.lastname },
        adminPassword: e.adminPassword,
      }),
    );
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
      <InputField
        register={{ ...register('name') }}
        label={'Имя'}
        disabled={disabled}
      />
      <InputField
        register={{ ...register('lastname') }}
        label={'Фамилия'}
        disabled={disabled}
      />
      <InputField
        password
        register={{ ...register('adminPassword') }}
        label={'Пароль Администратора'}
        disabled={disabled}
      />
      <Button disabled={disabled} type={'submit'}>
        {disabled ? 'Загрузка...' : 'Сохранить'}
      </Button>
    </Wrapper>
  );
};
