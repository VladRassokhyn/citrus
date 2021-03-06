import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Accordion } from '@components/Accordion';
import { NewChecklistForm } from './NewChecklistForm';
import { User, userActions, userSelectors } from '@lib/slices/users';
import { useTypedSelector } from '@lib/hooks';
import { LoadingStatuses } from '@lib/globalTypes';
import { Preloader } from '@components/Preloader';
import { checklistSelectors, checklistActions } from '@lib/slices/checklist';
import { ChecklistSubMenu } from './ChecklistSubMenu';

type Props = {
  authUser: User;
};

const Wrapper = styled.div`
  padding: 20px 5vw;
  display: flex;
  flex-direction: column;
  @media (min-width: 560px) {
    padding: 20px 25vw;
  }
`;

const ChecklistsList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const H1 = styled.h1`
  margin-bottom: 15px;
  width: 100%;
  text-align: center;
  font-size: 12pt;
  color: var(--color-stroke);
`;

export const Checklists = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const usersStatus = useTypedSelector(userSelectors.status);
  const checklists = useTypedSelector(checklistSelectors.checklists);
  const checklistStatus = useTypedSelector(checklistSelectors.status);

  const isChecklistsLoading = checklistStatus === LoadingStatuses.LOADING;
  const isUsersLoading = usersStatus === LoadingStatuses.LOADING;

  useEffect(() => {
    dispatch(userActions.getUsers(props.authUser.shop.id));
    dispatch(checklistActions.getChecklists());
  }, []);

  if (isUsersLoading || isChecklistsLoading) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      <Accordion
        title={'Создать чек-лист'}
        titleColor={'white'}
        titleBgColor={'var(--color-button)'}
      >
        <NewChecklistForm authUserId={props.authUser.id} />
      </Accordion>
      <ChecklistsList>
        <H1>Доступные чек-листы</H1>
        {checklists?.map((checklist, index) => (
          <Accordion
            titleBgColor={'#f1f1f1'}
            key={checklist.id}
            title={index + 1 + '. ' + checklist.title}
          >
            <ChecklistSubMenu checklist={checklist} authUserId={props.authUser.id} />
          </Accordion>
        ))}
      </ChecklistsList>
    </Wrapper>
  );
};
