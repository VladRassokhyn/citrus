import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';
import Select from 'react-select';
import { Checkbox } from '../../Components/Checkbox';
import { Preloader } from '../../Components/Preloader';
import { FixLater, LoadingStatuses, UserRoles } from '../../lib/globalTypes';
import { useTypedSelector } from '../../lib/hooks';
import {
  fieldCheckedChanged,
  getSingleChecklist,
  selectSingleChecklist,
  selectSingleChecklistStatus,
} from '../../lib/slices/checklist/';
import {
  getUsers,
  selectAllUsers,
  selectUsersStatus,
} from '../../lib/slices/users';

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
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

export const Checklist = (): JSX.Element => {
  const { checklistId } = useParams<{ checklistId: string }>();
  const [salesmanId, setSalesmanId] = useState<number | null>(null);
  const [namagerId, setManagerId] = useState<number | null>(null);
  const users = useTypedSelector(selectAllUsers);
  const usersStatus = useTypedSelector(selectUsersStatus);
  const checklist = useTypedSelector(selectSingleChecklist);
  const checklistStatus = useTypedSelector(selectSingleChecklistStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleChecklist(checklistId));
    dispatch(getUsers());
  }, []);

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
        .filter(
          (user) =>
            user.role === UserRoles.MANAGER || user.role === UserRoles.ADMIN,
        )
        .map((user) => ({
          label: user.lastName + ' ' + user.name,
          value: user.id,
        })),
    [users],
  );

  const handleCheckedChange = (fieldIndex: number, categoryIndex: number) => {
    dispatch(fieldCheckedChanged({ fieldIndex, categoryIndex }));
  };

  const handleSubmit = (e: FixLater) => {
    e.preventDefault();
    console.log(e);
  };

  const handleChangeSalesman = (e: FixLater) => {
    setSalesmanId(e.value);
  };

  const handleChangeManager = (e: FixLater) => {
    setManagerId(e.value);
  };

  if (
    checklistStatus === LoadingStatuses.LOADING ||
    usersStatus === LoadingStatuses.LOADING
  ) {
    return <Preloader />;
  }

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Head>
        <HeadField>
          <H3>Сдает</H3>
          <Select
            options={salesmansOptions}
            name={'salesman'}
            onChange={handleChangeSalesman}
          />
        </HeadField>
        <HeadField>
          <H3>Принимает</H3>
          <Select
            options={managersOptions}
            name={'manager'}
            onChange={handleChangeManager}
          />
        </HeadField>
      </Head>
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
                handleChange={() =>
                  handleCheckedChange(fieldIndex, categoryIndex)
                }
                label={field.title}
              />
            ))}
          </FieldsContainer>
        </CategoryContsiner>
      ))}
      <button type="submit">save</button>
    </Wrapper>
  );
};
