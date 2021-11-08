import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../lib/hooks';
import { userActions, userSelectors } from '../../lib/slices/users';
import { LoadingStatuses, UserRoles } from '../../lib/globalTypes';
import { Preloader } from '../../Components/Preloader';
import { Accordion } from '../../Components/Accordion';
import { NewUserForm } from './NewUserForm';
import { UserSubMenu } from './UserSubMenu';
import { authSelectors } from '../../lib/slices/auth';
import { selectSalesmans } from '../../lib/slices/users/users.selectors';

const Wrapper = styled.div`
  display: flex;
  padding: 20px 5vw;
  flex-direction: column;
  gap: 30px;
`;

export const Users = (): JSX.Element => {
  const users = useTypedSelector(selectSalesmans);
  const salesmansStatus = useTypedSelector(userSelectors.selectUsersStatus);
  const authUser = useTypedSelector(authSelectors.selectAuthUser);
  const dispatch = useDispatch();

  const isAdminOrManager =
    authUser &&
    (authUser.role === UserRoles.ADMIN || authUser.role === UserRoles.MANAGER);

  useEffect(() => {
    authUser && dispatch(userActions.getUsers(authUser.tt));
  }, []);

  if (salesmansStatus === LoadingStatuses.LOADING || !users) {
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
