import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../lib/hooks';
import {
  getUsers,
  selectAllUsers,
  selectUsersStatus,
} from '../../lib/slices/users';
import { LoadingStatuses, UserRoles } from '../../lib/globalTypes';
import { Preloader } from '../../Components/Preloader';
import { Accordion } from '../../Components/Accordion';
import { NewUserForm } from './NewUserForm';
import { UserSubMenu } from './UserSubMenu';
import { selectAuthUser } from '../../lib/slices/auth';
import { selectSalesmans } from '../../lib/slices/users/users.selectors';

const Wrapper = styled.div`
  display: flex;
  padding: 20px 5vw;
  flex-direction: column;
  gap: 30px;
`;

export const Users = (): JSX.Element => {
  const users = useTypedSelector(selectSalesmans);
  const salesmansStatus = useTypedSelector(selectUsersStatus);
  const authUser = useTypedSelector(selectAuthUser);
  const dispatch = useDispatch();

  const isAdmin = authUser && authUser.role === UserRoles.ADMIN;

  useEffect(() => {
    authUser && dispatch(getUsers(authUser.tt));
  }, []);

  if (salesmansStatus === LoadingStatuses.LOADING || !users) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      {isAdmin && (
        <Accordion
          title={'Добавить пользователя'}
          titleColor={'white'}
          titleBgColor={'var(--color-button)'}
        >
          <NewUserForm />
        </Accordion>
      )}
      <div>
        {users.map((user, index) => (
          <Accordion
            titleBgColor={'#f1f1f1'}
            key={user.id}
            title={index + 1 + '. ' + user.lastName + ' ' + user.name}
          >
            <UserSubMenu user={user} />
          </Accordion>
        ))}
      </div>
    </Wrapper>
  );
};
