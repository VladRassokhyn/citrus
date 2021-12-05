import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { LoadingStatuses, Salesman } from '../../../lib/globalTypes';
import { salesmanActions, salesmanSelectors } from '../../../lib/slices/salesman';
import { NewSalesman } from './NewSalesman';
import trash from '../../../static/trash.svg';
import { Confirm } from '../../../Components/Confirm';
import { useEffect } from 'react';
import { useTypedSelector } from '../../../lib/hooks';
import { Preloader } from '../../../Components/Preloader';
import { Shop } from '../../../lib/slices/shop';

type Props = {
  currentShop: Shop;
};

const Wrapper = styled.div`
  min-width: 560px;
`;

const Container = styled.div`
  margin-top: 30px;
  width: 30%;
  display: flex;
  flex-direction: column;
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

export const Salesmans = (props: Props): JSX.Element => {
  const salesmans = useTypedSelector(salesmanSelectors.selectAllSalesmans);
  const { getStatus } = useTypedSelector(salesmanSelectors.selectSalesmanStatuses);
  const dispatch = useDispatch();

  const handleDeleteSalesman = (salesman: Salesman) => {
    dispatch(salesmanActions.deleteSalesman(salesman));
  };

  useEffect(() => {
    dispatch(salesmanActions.getSalesmans(props.currentShop.name));
  }, []);

  if (getStatus === LoadingStatuses.LOADING) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      <NewSalesman currentShop={props.currentShop} />
      <Container>
        {salesmans?.map((salesman, i) => (
          <SalesmanContainer key={salesman.id}>
            <H1>
              {i + 1}. {salesman.name.split(' ')[0]} {salesman.name.split(' ')[1]}
            </H1>
            <Confirm title={'Удалить продавца ?'} confirmFn={() => handleDeleteSalesman(salesman)}>
              <ImgContainer>
                <Img src={trash} />
              </ImgContainer>
            </Confirm>
          </SalesmanContainer>
        ))}
      </Container>
    </Wrapper>
  );
};
