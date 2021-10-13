import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

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

const Input = styled.input`
  width: 70%;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  padding: 3px;
  height: 25px;
  font-size: 10pt;
`;

export const NewChecklistForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Input />
      <Button type="submit">Сохранить</Button>
    </Form>
  );
};
