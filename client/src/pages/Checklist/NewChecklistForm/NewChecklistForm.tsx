import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { InputField } from '../../../Components/InputField';
import { useTypedSelector } from '../../../lib/hooks';
import { postNewChecklist } from '../../../lib/slices/checklist';
import {
  categoryAdded,
  categoryRemoved,
  categoryTitleChanged,
  checklistTitleChanged,
  fieldAdded,
  fieldRemoved,
  fieldTitleChanged,
  selectNewChecklist,
} from '../../../lib/slices/newChecklist';
import trash from '../../../static/trash.svg';

const Wrapper = styled.div`
  padding: 15px 5%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HR = styled.hr`
  width: 100%;
  height: 1px;
  border: 0;
  background-color: gray;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 15px;
  height: 30px;
  background-color: var(--color-button);
  border: 1px solid #d1d1d1;
  color: white;
  font-size: 14pt;
`;

const AddBtn = styled.button`
  background-color: var(--color-secondary);
  border: 0;
  padding: 5px 10px;
  color: white;
  font-size: 14pt;
  border-radius: 5px;
`;

const H1 = styled.h1`
  margin: 20px 0;
  font-size: 12pt;
  color: var(--color-stroke);
  text-align: center;
`;

const FieldsBlock = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  width: 100%;
  margin: 5px 0;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NewChecklistForm = (): JSX.Element => {
  const checklist = useTypedSelector(selectNewChecklist);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log(checklist);
    dispatch(postNewChecklist(checklist));
  };

  const appendCategory = () => {
    dispatch(categoryAdded());
  };

  const removeCategory = (index: number) => {
    dispatch(categoryRemoved(index));
  };

  const appendField = (categoryIndex: number) => {
    dispatch(fieldAdded(categoryIndex));
  };

  const removeField = (categoryIndex: number, fieldIndex: number) => {
    dispatch(fieldRemoved({ categoryIndex, fieldIndex }));
  };

  const handleCategoryTitleChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    dispatch(categoryTitleChanged({ title: e.target.value, index }));
  };

  const handleFieldTitleChange = (
    e: ChangeEvent<HTMLInputElement>,
    categoryIndex: number,
    fieldIndex: number,
  ) => {
    dispatch(
      fieldTitleChanged({
        title: e.target.value,
        categoryIndex,
        fieldIndex,
      }),
    );
  };

  return (
    <Wrapper>
      <InputField
        label={'Тема'}
        vertical
        value={checklist.title}
        onChange={(e) => dispatch(checklistTitleChanged(e.target.value))}
      />
      <HR />
      {checklist.categories.map((category, categoryIndex) => (
        <CategoryWrapper key={categoryIndex}>
          <Field>
            <InputField
              label={'Категория'}
              value={category.title}
              onChange={(e) => handleCategoryTitleChange(e, categoryIndex)}
            />
            <img src={trash} onClick={() => removeCategory(categoryIndex)} />
          </Field>
          <H1>Поля Категории</H1>

          {category.fields.map((field, fieldIndex) => (
            <FieldsBlock key={`${categoryIndex}-${fieldIndex}`}>
              <Field>
                <InputField
                  label={fieldIndex + 1 + ''}
                  value={field.title}
                  onChange={(e) =>
                    handleFieldTitleChange(e, categoryIndex, fieldIndex)
                  }
                />
                <img
                  src={trash}
                  onClick={() => removeField(categoryIndex, fieldIndex)}
                />
              </Field>
            </FieldsBlock>
          ))}
          <AddBtn onClick={() => appendField(categoryIndex)}>
            Добавить Поле
          </AddBtn>
          <HR />
        </CategoryWrapper>
      ))}
      <AddBtn onClick={appendCategory}>Добавить Категорию</AddBtn>
      <Button onClick={handleSubmit}>Сохранить чек-лист</Button>
    </Wrapper>
  );
};
