import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Preloader } from '../../../Components/Preloader';
import { LoadingStatuses, Salesman, User } from '../../../lib/globalTypes';
import { useTypedSelector } from '../../../lib/hooks';
import { salesmanActions, salesmanSelectors } from '../../../lib/slices/salesman';
import { NewSalesman } from './NewSalesman';
import trash from '../../../static/trash.svg';
import { Confirm } from '../../../Components/Confirm';

type Props = {
  authUser: User;
};

const Wrapper = styled.div``;

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
  const { authUser } = props;
  const salesmans = useTypedSelector(salesmanSelectors.selectAllSalesmans);
  const { getStatus } = useTypedSelector(salesmanSelectors.selectSalesmanStatuses);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!salesmans) {
      dispatch(salesmanActions.getSalesmans(authUser.tt));
    }
  }, []);

  if (getStatus === LoadingStatuses.LOADING) return <Preloader />;

  const handleDeleteSalesman = (salesman: Salesman) => {
    dispatch(salesmanActions.deleteSalesman(salesman));
  };

  return (
    <Wrapper>
      <NewSalesman tt={authUser.tt} />
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
