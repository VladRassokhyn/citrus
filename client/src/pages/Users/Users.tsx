import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@lib/hooks';
import { userActions, userSelectors } from '@lib/slices/users';
import { LoadingStatuses, UserRoles } from '@lib/globalTypes';
import { Preloader } from '@components/Preloader';
import { Accordion } from '@components/Accordion';
import { NewUserForm } from './NewUserForm';
import { UserSubMenu } from './UserSubMenu';
import { authSelectors } from '@lib/slices/auth';

const Wrapper = styled.div`
  display: flex;
  padding: 20px 5vw;
  flex-direction: column;
  gap: 30px;
  @media (min-width: 560px) {
    padding: 20px 25vw;
  }
`;

export const Users = (): JSX.Element => {
  const allUsers = useTypedSelector(userSelectors.users);
  const usersStatus = useTypedSelector(userSelectors.status);
  const authUser = useTypedSelector(authSelectors.authUser);
  const dispatch = useDispatch();

  const isAdminOrManager =
    authUser && (authUser.role === UserRoles.ADMIN || authUser.role === UserRoles.MANAGER);

  useEffect(() => {
    authUser && dispatch(userActions.getUsers(authUser.shop.id));
  }, []);

  if (usersStatus === LoadingStatuses.LOADING || !allUsers) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      {isAdminOrManager && (
        <Accordion
          title={'Добавить пользователя'}
          titleColor={'white'}
          titleBgColor={'var(--color-button)'}
        >
          <NewUserForm />
        </Accordion>
      )}
      <div>
        {allUsers.map((user, index) => (
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
