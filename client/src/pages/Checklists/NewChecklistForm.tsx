import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { InputField } from '../../Components/InputField';
import { useTypedSelector } from '../../lib/hooks';
import {
  checklistActions,
  checklistSelectors,
  checklistEditActions,
} from '../../lib/slices/checklist';
import trash from '../../static/trash.svg';
import { LoadingStatuses } from '../../lib/globalTypes';
import { Confirm } from '../../Components/Confirm';

type Props = {
  authUserId: number;
};

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
  height: 35px;
  background-color: var(--color-button);
  border-radius: 5px;
  border: 0;
  padding: 5px;
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
  align-items: center;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  width: 17px;
  height: 100%;
`;

const BottomBtns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const NewChecklistForm = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const checklist = useTypedSelector(checklistSelectors.selectSingleChecklist);
  const postStatus = useTypedSelector(checklistSelectors.selectPostChecklistStatus);

  useEffect(() => {
    if (postStatus === LoadingStatuses.LOADING) {
      setDisabled(true);
    }
    if (postStatus === LoadingStatuses.SUCCESS) {
      setDisabled(false);
    }
    return () => {
      dispatch(checklistEditActions.clearNewChecklist());
    };
  }, [postStatus]);

  const handleSubmit = useCallback(() => {
    dispatch(
      checklistActions.postNewChecklist({
        ...checklist,
        creatorId: props.authUserId,
      }),
    );
  }, [checklist, props.authUserId]);

  const appendCategory = useCallback(() => {
    dispatch(checklistEditActions.categoryAdded());
  }, []);

  const removeCategory = (index: number) => {
    dispatch(checklistEditActions.categoryRemoved(index));
  };

  const appendField = (categoryIndex: number) => {
    dispatch(checklistEditActions.fieldAdded(categoryIndex));
  };

  const removeField = (categoryIndex: number, fieldIndex: number) => {
    dispatch(checklistEditActions.fieldRemoved({ categoryIndex, fieldIndex }));
  };

  const resetForm = useCallback(() => dispatch(checklistEditActions.clearNewChecklist()), []);

  const handleChecklistTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(checklistEditActions.checklistTitleChanged(e.target.value));
  };

  const handleCategoryTitleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    dispatch(checklistEditActions.categoryTitleChanged({ title: e.target.value, index }));
  };

  const handleFieldTitleChange = (
    e: ChangeEvent<HTMLInputElement>,
    categoryIndex: number,
    fieldIndex: number,
  ) => {
    dispatch(
      checklistEditActions.fieldTitleChanged({
        title: e.target.value,
        categoryIndex,
        fieldIndex,
      }),
    );
  };

  return (
    <Wrapper>
      <InputField
        disabled={disabled}
        label={'Тема'}
        vertical
        value={checklist.title}
        onChange={handleChecklistTitleChange}
      />
      <HR />
      {checklist.categories.map((category, categoryIndex) => (
        <CategoryWrapper key={categoryIndex}>
          <Field>
            <InputField
              disabled={disabled}
              label={'Категория'}
              value={category.title}
              onChange={(e) => handleCategoryTitleChange(e, categoryIndex)}
            />
            <Img src={trash} onClick={() => removeCategory(categoryIndex)} />
          </Field>
          <H1>Поля Категории</H1>

          {category.fields.map((field, fieldIndex) => (
            <FieldsBlock key={`${categoryIndex}-${fieldIndex}`}>
              <Field>
                <InputField
                  disabled={disabled}
                  label={fieldIndex + 1 + ''}
                  value={field.title}
                  onChange={(e) => handleFieldTitleChange(e, categoryIndex, fieldIndex)}
                />
                <Img src={trash} onClick={() => removeField(categoryIndex, fieldIndex)} />
              </Field>
            </FieldsBlock>
          ))}
          <AddBtn disabled={disabled} onClick={() => appendField(categoryIndex)}>
            Добавить Поле
          </AddBtn>
          <HR />
        </CategoryWrapper>
      ))}
      <AddBtn disabled={disabled} onClick={appendCategory}>
        Добавить Категорию
      </AddBtn>
      <BottomBtns>
        <Confirm confirmFn={handleSubmit} title={'Сохранить форму ?'}>
          <Button disabled={disabled}>Сохранить</Button>
        </Confirm>
        <Confirm confirmFn={resetForm} title={'Очистить все поля формы ?'}>
          <Button disabled={disabled}>Очистить все</Button>
        </Confirm>
      </BottomBtns>
    </Wrapper>
  );
};
