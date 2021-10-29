import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Accordion } from '../../Components/Accordion';
import { NewChecklistForm } from './NewChecklistForm/NewChecklistForm';
import { getUsers, selectUsersStatus } from '../../lib/slices/users';
import { useTypedSelector } from '../../lib/hooks';
import { LoadingStatuses } from '../../lib/globalTypes';
import { Preloader } from '../../Components/Preloader';
import {
  selectAllChecklists,
  selectChecklistsStatus,
  getChecklists,
} from '../../lib/slices/checklist';

const Wrapper = styled.div`
  padding: 20px 5vw;
  display: flex;
  flex-direction: column;
`;

const ChecklistsList = styled.div`
  display: flex;
  margin-top: 30px;
`;

export const Checklist = (): JSX.Element => {
  const usersStatus = useTypedSelector(selectUsersStatus);
  const dispatch = useDispatch();
  const checklists = useTypedSelector(selectAllChecklists);
  const checklistStatus = useTypedSelector(selectChecklistsStatus);

  const isChecklistsLoading = checklistStatus === LoadingStatuses.LOADING;
  const isUsersLoading = usersStatus === LoadingStatuses.LOADING;

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getChecklists());
  }, []);

  if (isUsersLoading || isChecklistsLoading) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      <Accordion
        title={'Создать чеклист'}
        titleColor={'white'}
        titleBgColor={'var(--color-button)'}
      >
        <NewChecklistForm />
      </Accordion>
      <ChecklistsList>
        {checklists?.map((checklist, index) => (
          <Accordion
            titleBgColor={'#f1f1f1'}
            key={checklist.id}
            title={index + 1 + '. ' + checklist.title}
          >
            <h1>submenu</h1>
          </Accordion>
        ))}
      </ChecklistsList>
    </Wrapper>
  );
};
