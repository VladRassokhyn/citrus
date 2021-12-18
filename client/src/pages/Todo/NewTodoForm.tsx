import styled, { keyframes } from 'styled-components';
import { FormTypes } from './types';
import { slideInRight, slideOutRight } from 'react-animations';
import { useForm, Controller } from 'react-hook-form';
import { InputField } from '../../Components/InputField';
import closeX from '../../static/closeX.svg';
import Select from 'react-select';
import { importanceOptions, importanceStyles, categoryOptions } from './selectConfig';
import { User } from '../../lib/slices/users';
import { format } from 'date-fns';
import { TodoPayload } from '../../lib/slices/todo/todo.type';
import { useEffect } from 'react';

const openAnimation = keyframes`${slideInRight}`;
const closeAnimation = keyframes`${slideOutRight}`;

type Props = {
  authUser: User;
  type: FormTypes;
  isClosing: boolean;
  executors: User[];
  onClose: () => void;
  action: (payload: TodoPayload) => void;
};

type StyleProps = {
  isClosing: boolean;
};

const Wrapper = styled.div<StyleProps>`
  width: 440px;
  padding: 15px 30px;
  height: 100%;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px gray;
  position: fixed;
  right: 0;
  top: 50px;
  animation: ${(props) => (props.isClosing ? closeAnimation : openAnimation)} 0.3s forwards;
  @media (max-width: 560px) {
    width: 90%;
    padding: 10px 5%;
  }
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 95% 5%;
  justify-items: center;
`;

const Img = styled.img`
  width: 15px;
  height: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const H1 = styled.h1`
  font-size: 16pt;
  color: var(--color-button);
`;
const Description = styled.textarea`
  width: 95%;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  padding: 3px;
  height: 25px;
  font-size: 10pt;
  height: 150px;
  font-size: 10pt;
  margin-top: 10px;
  resize: none;
  padding: 10px;
`;

const H2 = styled.h1`
  font-size: 12pt;
  color: var(--color-stroke);
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

const Form = styled.form`
  margin-top: 15px;
`;

const Selectors = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const Selector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: var(--color-button);
  color: white;
  width: 150px;
  height: 30px;
  border: 0;
  margin-top: 20px;
  border-radius: 5px;
  transition: linear 0.3s;
  &:hover {
    cursor: pointer;
    background-color: #0780ff;
  }
`;

const defaultValues = {
  title: '',
  description: '',
  importance: { value: 'Не важно', label: 'Не важно', color: 'green' },
  creatorId: 0,
  executorId: 0,
  finished: false,
  deadline: '',
  createdAt: '',
  category: { value: 'Баги', label: 'Баги' },
};

export const NewTodoForm = (props: Props): JSX.Element => {
  const { handleSubmit, register, reset, control } = useForm({ defaultValues });

  const save = (formData: any) => {
    const newTodo = {
      ...formData,
      importance: formData.importance.value,
      category: formData.category.value,
      creatorId: props.authUser.id,
      executorId: 1,
      createdAt: format(new Date(), 'dd.MM.yyyy'),
    };
    props.action(newTodo);
  };

  useEffect(() => {
    return () => props.onClose();
  }, []);

  return (
    <Wrapper isClosing={props.isClosing}>
      <Header>
        <H1>Новая заявка</H1>
        <Img src={closeX} onClick={props.onClose} />
      </Header>
      <Form onSubmit={handleSubmit(save)}>
        <InputField label={'Имя задачи'} register={{ ...register('title') }} />
        <H2>Описание</H2>
        <Description {...register('description')} />
        <Selectors>
          <Selector>
            <H2>Важность</H2>
            <Controller
              control={control}
              name="importance"
              render={({ field }) => (
                <Select
                  name={field.name}
                  ref={field.ref}
                  onChange={field.onChange}
                  value={field.value}
                  options={importanceOptions}
                  styles={importanceStyles}
                />
              )}
            />
          </Selector>

          <Selector>
            <H2>Категория</H2>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  name={field.name}
                  ref={field.ref}
                  onChange={field.onChange}
                  value={field.value}
                  options={categoryOptions}
                />
              )}
            />
          </Selector>
        </Selectors>
        <Selector>
          <H2>Исполнитель</H2>
          <Select
            options={[{ value: '1', label: 'Рассохин Владислав' }]}
            defaultValue={{ value: '1', label: 'Рассохин Владислав' }}
          />
        </Selector>
        <Buttons>
          <Button onClick={() => reset(defaultValues)}>Сбросить</Button>
          <Button type={'submit'}>Сохранить</Button>
        </Buttons>
      </Form>
    </Wrapper>
  );
};
