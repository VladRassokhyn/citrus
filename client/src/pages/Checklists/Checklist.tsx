import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import Select from 'react-select';
import { Checkbox } from '@components/Checkbox';
import { Preloader } from '@components/Preloader';
import { FixLater, LoadingStatuses, UserRoles } from '@lib/globalTypes';
import { useTypedSelector } from '@lib/hooks';
import {
  Category,
  checklistActions,
  checklistSelectors,
  checklistEditActions,
} from '@lib/slices/checklist/';
import { User, userActions, userSelectors } from '@lib/slices/users';

type Props = {
  authUser: User;
};

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 560px) {
    padding: 0 25vw;
  }
`;

const Head = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  padding: 0 5vw 30px 5vw;
  background-color: #f1f1f1;
  border-radius: 5px;
  box-shadow: 0 0 5px gray;
`;

const HeadField = styled.div`
  width: 100%;
`;

const CategoryContsiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FieldsContainer = styled.div`
  width: 90vw;
  padding: 5vw;
  @media (min-width: 560px) {
    width: 560px;
  }
`;

const H1 = styled.h1`
  margin: 20px 0;
  font-size: 18pt;
  color: var(--color-button);
`;

const H2 = styled.h1`
  font-size: 14pt;
  color: var(--color-stroke);
`;

const H3 = styled.h1`
  width: 100%;
  text-align: center;
  margin: 10px 0;
  font-size: 14pt;
  color: var(--color-stroke);
`;

const Button = styled.button`
  width: 90%;
  margin: 30px 0;
  height: 30px;
  background-color: var(--color-button);
  border: 1px solid #d1d1d1;
  color: white;
  font-size: 14pt;
`;

export const Checklist = (props: Props): JSX.Element => {
  const { checklistId } = useParams<{ checklistId: string }>();
  const [salesmanId, setSalesmanId] = useState<number>(0);
  const [managerId, setManagerId] = useState<number>(0);
  const [showChecklist, setShowChecklist] = useState(false);
  const users = useTypedSelector(userSelectors.users);
  const usersStatus = useTypedSelector(userSelectors.status);
  const checklist = useTypedSelector(checklistSelectors.singleChecklist);
  const checklistStatus = useTypedSelector(checklistSelectors.status);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checklistActions.getSingleChecklist(checklistId));
    dispatch(userActions.getUsers(props.authUser.shop.id));

    return () => {
      dispatch(checklistEditActions.clearNewChecklist());
    };
  }, []);

  useEffect(() => {
    if (salesmanId && managerId) {
      setShowChecklist(true);
    }
    return () => {
      setShowChecklist(false);
    };
  }, [salesmanId, managerId]);

  const salesmansOptions = useMemo(
    () =>
      users
        .filter((user) => user.role === UserRoles.SALESMAN)
        .map((user) => ({
          label: user.lastName + ' ' + user.name,
          value: user.id,
        })),
    [users],
  );

  const managersOptions = useMemo(
    () =>
      users
        .filter((user) => user.role === UserRoles.MANAGER || user.role === UserRoles.ADMIN)
        .map((user) => ({
          label: user.lastName + ' ' + user.name,
          value: user.id,
        })),
    [users],
  );

  const handleSubmit = (e: FixLater) => {
    e.preventDefault();
    const categories = checklist.categories.map((cat) => ({
      title: cat.title,
      fields: cat.fields.map((field) => ({
        title: field.title,
        checked: field.checked,
      })),
    }));
    const { mark, maxMark } = getChecklistMarks(categories);
    const newChecklist = {
      ...checklist,
      passed: true,
      passerId: salesmanId,
      managerId,
      mark,
      maxMark,
      categories,
    };
    dispatch(checklistActions.postNewChecklist(newChecklist));

    if (checklistStatus === LoadingStatuses.SUCCESS) {
      history.push('/checklist');
    }
  };

  const handleCheckedChange = (fieldIndex: number, categoryIndex: number) => {
    dispatch(checklistEditActions.fieldCheckedChanged({ fieldIndex, categoryIndex }));
  };

  const handleChangeSalesman = (e: FixLater) => {
    setSalesmanId(e.value);
  };

  const handleChangeManager = (e: FixLater) => {
    setManagerId(e.value);
  };

  if (checklistStatus === LoadingStatuses.LOADING || usersStatus === LoadingStatuses.LOADING) {
    return <Preloader />;
  }

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Head>
        <HeadField>
          <H3>??????????</H3>
          <Select options={salesmansOptions} name={'salesman'} onChange={handleChangeSalesman} />
        </HeadField>
        <HeadField>
          <H3>??????????????????</H3>
          <Select options={managersOptions} name={'manager'} onChange={handleChangeManager} />
        </HeadField>
      </Head>
      {showChecklist && (
        <>
          <H1>{checklist.title}</H1>
          {checklist.categories.map((category, categoryIndex) => (
            <CategoryContsiner key={category.id}>
              <H2>{category.title}</H2>
              <FieldsContainer>
                {category.fields.map((field, fieldIndex) => (
                  <Checkbox
                    key={field.id}
                    value={field.checked}
                    fullSize
                    handleChange={() => handleCheckedChange(fieldIndex, categoryIndex)}
                    label={field.title}
                  />
                ))}
              </FieldsContainer>
            </CategoryContsiner>
          ))}
          <Button type="submit">??????????????????</Button>
        </>
      )}
    </Wrapper>
  );
};

const getChecklistMarks = (categories: Category[]) => {
  let mark = 0;
  let maxMark = 0;
  categories.forEach((cat) => {
    cat.fields.forEach((field) => {
      if (field.checked) {
        mark += 1;
      }
      maxMark += 1;
    });
  });
  return { mark, maxMark };
};
