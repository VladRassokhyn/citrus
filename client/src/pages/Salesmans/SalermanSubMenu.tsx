import styled from 'styled-components';
import trash from '../../static/trash.svg';
import edit from '../../static/edit.svg';
import viewList from '../../static/viewList.svg';
import { useDispatch } from 'react-redux';
import { Modal } from '../../Components/Modal';
import { InputField } from '../../Components/InputField';
import { useTypedSelector } from '../../lib/hooks';
import { selectSalesmansCRUSstatus } from '../../lib/slices/salesmans/salesmans.selectors';
import { LoadingStatuses } from '../../lib/globalTypes';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  deleteSalesman,
  statusesResets,
} from '../../lib/slices/salesmans/salesmans.slice';
import { NewSalesmanForm } from './NewSalesmanForm';
import { Salesman } from '../../lib/slices/salesmans/salesmans.types';

type Props = {
  salesman: Salesman;
};

type ButtonProps = {
  disabled?: boolean;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 30px;
  padding-right: 20px;
  margin-left: 20px;
  border-left: 1px solid #f1f1f1;
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const H1 = styled.h1`
  margin-right: 30px;
  font-size: 12pt;
  color: var(--color-stroke);
`;

const Button = styled.button<ButtonProps>`
  width: 50%;
  height: 30px;
  background-color: ${(props) =>
    props.disabled ? 'lightgrey' : 'var(--color-button)'};
  border: 1px solid #d1d1d1;
  color: white;
  font-size: 14pt;
  border-radius: 5px;
`;

export const SalermasSubMenu = (props: Props): JSX.Element => {
  const { salesman } = props;
  const CRUDstatus = useTypedSelector(selectSalesmansCRUSstatus);
  const [adminPassword, setAdminPassword] = useState('');
  const dispatch = useDispatch();
  const [isPasswordForm, setIsPasswordForm] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);

  const disabled = CRUDstatus === LoadingStatuses.LOADING;
  const forbidden = CRUDstatus === LoadingStatuses.ERROR;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (forbidden) {
        dispatch(statusesResets());
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [forbidden]);

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setAdminPassword(e.target.value);
  };

  const handleTryEditSalesman = () => {
    setIsEditForm(true);
  };

  const handleTryDeleteSalesman = () => {
    setIsPasswordForm(true);
  };

  const handleDelete = () => {
    dispatch(deleteSalesman({ salesmanId: salesman.id, adminPassword }));
  };

  const handleCloseModal = () => {
    setIsPasswordForm(false);
  };

  return (
    <Wrapper>
      {isPasswordForm && (
        <Modal onClose={handleCloseModal}>
          {forbidden ? (
            <h1>Самозванец</h1>
          ) : (
            <>
              <InputField
                disabled={disabled}
                value={adminPassword}
                label={'Пароль администратора'}
                onChange={handleChangePassword}
                vertical
                password
              />
              <Button onClick={handleDelete} disabled={disabled}>
                Подтвердить
              </Button>
            </>
          )}
        </Modal>
      )}
      {isEditForm ? (
        <NewSalesmanForm
          initialLastName={salesman.lastname}
          initialName={salesman.name}
          salesmanId={salesman.id}
          isUpdate
        />
      ) : (
        <>
          <H1>Действия:</H1>
          <Img src={edit} alt={'edit'} onClick={handleTryEditSalesman} />
          <Img src={viewList} alt={'view'} />
          <Img src={trash} alt={'delete'} onClick={handleTryDeleteSalesman} />
        </>
      )}
    </Wrapper>
  );
};
