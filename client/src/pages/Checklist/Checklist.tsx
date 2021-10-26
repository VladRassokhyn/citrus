import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Accordion } from '../../Components/Accordion';
import { NewChecklistForm } from './NewChecklistForm';
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
      {checklists?.map((checklist) => {
        return <h1>{checklist.title}</h1>;
      })}
    </Wrapper>
  );
};
