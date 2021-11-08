import React from 'react';
import styled from 'styled-components';
import trash from '../../static/trash.svg';
import edit from '../../static/edit.svg';
import viewList from '../../static/viewList.svg';
import { useDispatch } from 'react-redux';
import { Modal } from '../../Components/Modal';
import { useTypedSelector } from '../../lib/hooks';
import { userActions } from '../../lib/slices/users';
import { User, UserRoles } from '../../lib/globalTypes';
import { useState } from 'react';
import { NewUserForm } from './NewUserForm';
import { Link } from 'react-router-dom';
import { authSelectors } from '../../lib/slices/auth';
import { Confirm } from '../../Components/Confirm';

type Props = {
  user: User;
};

type ButtonProps = {
  disabled?: boolean;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
  padding: 0 5%;
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

export const UserSubMenu = (props: Props): JSX.Element => {
  const { user } = props;
  const dispatch = useDispatch();
  const [accesError, setAccesError] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const authUser = useTypedSelector(authSelectors.selectAuthUser);

  const isUserAuth = authUser && authUser.id === user.id;
  const isAdminAuth = authUser && authUser.role === UserRoles.ADMIN;

  const handleEdit = () => {
    if (isUserAuth || isAdminAuth) {
      setIsEditForm(true);
    } else {
      setAccesError(true);
    }
  };

  const handleDelete = () => {
    if (isAdminAuth) {
      dispatch(userActions.deleteUser(user.id));
    } else {
      setAccesError(true);
    }
  };

  const handleCloseModal = () => {
    setAccesError(false);
  };

  return (
    <Wrapper>
      {accesError && (
        <Modal onClose={handleCloseModal}>
          <H1>Не хватает прав</H1>
        </Modal>
      )}
      {isEditForm ? (
        <NewUserForm user={user} />
      ) : (
        <>
          <H1>Действия:</H1>
          <Img src={edit} alt={'edit'} onClick={handleEdit} />
          <Link to={`/users/${user.id}`}>
            <Img src={viewList} alt={'view'} />
          </Link>
          <Confirm confirmFn={handleDelete} title={'Удалить пользователя ?'}>
            <Img src={trash} alt={'delete'} />
          </Confirm>
        </>
      )}
    </Wrapper>
  );
};
