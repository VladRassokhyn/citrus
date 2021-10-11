import styled from 'styled-components';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../lib/hooks';
import { selectAllSalesmans } from '../../lib/slices/salesmans';
import { menus } from '../CM/menus';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { FixLater } from '../../lib/globalTypes';
import { Checkbox } from '../../Components/Checkbox';
import { selectNewChecklist } from '../../lib/slices/checklist/checklist.selectors';
import {
  fieldCheckboxChanged,
  newChecklistAdded,
} from '../../lib/slices/checklist/checklist.slice';

const Form = styled.form`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OSWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const OSItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const H1 = styled.h1`
  margin: 10px;
  text-align: center;
  color: var(--color-stroke);
  font-size: 22pt;
`;

const H2 = styled.h1`
  color: gray;
  opacity: 0.8;
  text-align: center;
  font-size: 13pt;
  margin: 10px;
`;

const Button = styled.button`
  background-color: var(--color-button);
  color: white;
  width: 100%;
  height: 30px;
  border: 0;
  margin-top: 20px;
`;

export const NewChecklistForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const [themeName, setThemeName] = useState('');
  const [salesmanId, setSalesmanId] = useState<string | null>(null);
  const salesmans = useTypedSelector(selectAllSalesmans);
  const newChecklist = useTypedSelector(selectNewChecklist);
  const { register, handleSubmit } = useForm();

  const salesmanOptions = useMemo(
    () =>
      salesmans.map((salesman) => {
        return {
          value: salesman.id,
          label: `${salesman.lastname} ${salesman.name}`,
        };
      }),
    [salesmans],
  );

  const themeOptions = useMemo(
    () =>
      menus.map((menu) => {
        return {
          value: menu.id,
          label: menu.title,
        };
      }),
    [menus],
  );

  const handleFieldChange = (
    themeId: string,
    subThemeId: string,
    fieldId: string,
  ) => {
    dispatch(fieldCheckboxChanged({ themeId, subThemeId, fieldId }));
  };

  const handleThemeChange = (e: FixLater) => {
    setThemeName(e.value);
    dispatch(newChecklistAdded(e.value));
  };

  const theme =
    newChecklist &&
    newChecklist.themes.map((theme) => (
      <OSWrapper key={theme.id}>
        <H1>{theme.title}</H1>
        {theme.subThemes?.map((subTheme) => (
          <OSItemWrapper key={subTheme.id}>
            <H2>{subTheme.title}</H2>
            {subTheme.fields.map((field) => (
              <Checkbox
                register={{ ...register(field.id) }}
                handleChange={() =>
                  handleFieldChange(theme.id, subTheme.id, field.id)
                }
                key={field.id}
                value={field.checkbox}
                label={field.title}
              />
            ))}
          </OSItemWrapper>
        ))}
      </OSWrapper>
    ));

  const handleFormSubmit = (e: any) => {
    const checklist = {
      name: themeName,
      fields: e,
    };
    console.log(checklist);
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Select name={'salesman'} options={salesmanOptions} />
      <Select
        onChange={handleThemeChange}
        name={'theme'}
        options={themeOptions}
      />
      {theme}
      <Button type="submit">Сохранить</Button>
    </Form>
  );
};
