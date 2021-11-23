import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { Accordion } from '../../../Components/Accordion';
import { Checkbox } from '../../../Components/Checkbox';
import { Preloader } from '../../../Components/Preloader';
import { LoadingStatuses } from '../../../lib/globalTypes';
import { useTypedSelector } from '../../../lib/hooks';
import { userActions, userSelectors } from '../../../lib/slices/users';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 5vw;
`;

const Head = styled.div`
  margin-bottom: 30px;
`;

const ChecklistContainer = styled.div`
  box-shadow: 0 0 5px 5px #f1f1f1;
  padding: 5px;
  border-radius: 5px;
`;

const CategoryContsiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FieldsContainer = styled.div`
  width: 80vw;
  padding: 10vw;
`;

const H1 = styled.h1`
  text-align: center;
  margin: 20px 0;
  font-size: 18pt;
  color: var(--color-button);
`;

const H2 = styled.h1`
  font-size: 14pt;
  color: var(--color-stroke);
`;

export const User = (): JSX.Element | null => {
  const { userId } = useParams<{ userId: string }>();
  const user = useTypedSelector(userSelectors.selectOneUser);
  const userStatus = useTypedSelector(userSelectors.selectOneUserStatus);
  const userChecklists = useTypedSelector(userSelectors.selectUserChecklists);
  const userChecklistStatus = useTypedSelector(userSelectors.selectUserChecklistsStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getOneUser(userId));
    dispatch(userActions.getUserChecklists(userId));
  }, []);

  if (userStatus === LoadingStatuses.LOADING || userChecklistStatus === LoadingStatuses.LOADING) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      <Head>
        <h3>id : {user && user.id}</h3>
        <h3>Имя : {user && user.name}</h3>
        <h3>Фамилия : {user && user.lastName}</h3>
        <h3>TT : {user && user.tt}</h3>
      </Head>

      <H2>Пройденные чек-листы</H2>
      {userChecklists &&
        userChecklists.map((checklist) => (
          <Accordion
            titleBgColor={'#f1f1f1'}
            title={`${checklist.title}  -  ${checklist.mark}/${checklist.maxMark}`}
          >
            <ChecklistContainer>
              <H1>{checklist.title}</H1>
              {checklist.categories.map((category) => (
                <CategoryContsiner key={category.id}>
                  <H2>{category.title}</H2>
                  <FieldsContainer>
                    {category.fields.map((field) => (
                      <Checkbox key={field.id} value={field.checked} fullSize label={field.title} />
                    ))}
                  </FieldsContainer>
                </CategoryContsiner>
              ))}
            </ChecklistContainer>
          </Accordion>
        ))}
    </Wrapper>
  );
};
