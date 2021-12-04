import styled from 'styled-components';
import { Shop, shopActions, shopSelectors } from '../../../lib/slices/shop';
import { User } from '../../../lib/slices/users';
import { useTypedSelector } from '../../../lib/hooks';
import { useForm } from 'react-hook-form';
import { InputField } from '../../../Components/InputField';
import { useDispatch } from 'react-redux';
import { Preloader } from '../../../Components/Preloader';
import { Confirm } from '../../../Components/Confirm';
import trash from '../../../static/trash.svg';

type Props = {
  authUser: User;
};

const Wrapper = styled.div``;

const NewShopTitle = styled.h1`
  font-size: 14pt;
  color: var(--color-button);
`;

const NewShopForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 50%;
  gap: 15px;
  padding: 15px;
  @media (max-width: 560px) {
    width: 100%;
  }
`;

const Btns = styled.div`
  width: 100%;
  padding: 0 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const NewFormBtn = styled.button`
  background-color: var(--color-button);
  color: white;
  min-width: 100px;
  height: 35px;
  border: 0;
  border-radius: 5px;
  transition: linear 0.3s;
  &:hover {
    cursor: pointer;
    background-color: #1890ff;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  opacity: 0;
  align-items: center;
  justify-content: center;
  transition: linear 0.3s;
  height: 30px;
  border-radius: 0 5px 5px 0;
  &:hover {
    background-color: #dfdfdf;
  }
`;

const SalesmanContainer = styled.div`
  display: grid;
  border-radius: 5px;
  height: 30px;
  min-width: 350px;
  grid-template-columns: 1fr 50px;
  grid-gap: 1px 0;
  align-items: center;
  transition: linear 0.3s;
  &:hover {
    box-shadow: 0 0 5px #dfdfdf;
    cursor: pointer;
  }
  &:hover ${ImgContainer} {
    opacity: 1;
  }
`;

const H1 = styled.h1`
  font-size: 12pt;
  padding: 5px 10px;
  color: var(--color-stroke);
`;

const Img = styled.img`
  width: 15px;
`;

export const Shops = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const shops = useTypedSelector(shopSelectors.allShops);
  const { handleSubmit, register } = useForm({
    defaultValues: { name: '', shortName: '', name_1c: '' },
  });

  const handleSave = (e: { name: string; shortName: string; name_1c: string }) => {
    dispatch(shopActions.postShop(e));
  };

  const handleDelete = (shop: Shop) => {
    console.log('try delete, ', shop);
  };

  if (!shops) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      <NewShopForm onSubmit={handleSubmit(handleSave)}>
        <NewShopTitle>Добавить магазин</NewShopTitle>
        <InputField label={'Кодовое имя'} register={{ ...register('name') }} />
        <InputField label={'Короткое имя'} register={{ ...register('shortName') }} />
        <InputField label={'Имя как в 1С'} register={{ ...register('name_1c') }} />
        <Btns>
          <NewFormBtn type="reset">reset</NewFormBtn>
          <NewFormBtn type="submit">submit</NewFormBtn>
        </Btns>
      </NewShopForm>
      {shops?.map((shop, i) => (
        <SalesmanContainer key={shop.id}>
          <H1>
            {i + 1}. {shop.shortName}
          </H1>
          <Confirm title={'Удалить магазин ?'} confirmFn={() => handleDelete(shop)}>
            <ImgContainer>
              <Img src={trash} />
            </ImgContainer>
          </Confirm>
        </SalesmanContainer>
      ))}
    </Wrapper>
  );
};
