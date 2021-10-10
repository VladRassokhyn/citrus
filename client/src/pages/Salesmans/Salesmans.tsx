import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../lib/hooks';
import { selectAllSalesmans } from '../../lib/slices/salesmans';
import { getSalesmans } from '../../lib/slices/salesmans/salesmans.slice';
import { selectSalesmansStatus } from '../../lib/slices/salesmans/salesmans.selectors';
import { LoadingStatuses } from '../../lib/types';
import { Preloader } from '../../Components/Preloader';
import { Accordion } from '../../Components/Accordion';
import { NewSalesmanForm } from './NewSalesmanForm';

const Wrapper = styled.div`
  display: flex;
  padding: 20px 5vw;
  flex-direction: column;
  gap: 30px;
`;

export const Salesmans = (): JSX.Element => {
  const salesmans = useTypedSelector(selectAllSalesmans);
  const salesmansStatus = useTypedSelector(selectSalesmansStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSalesmans());
  }, []);

  if (salesmansStatus === LoadingStatuses.LOADING || !salesmans) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      <Accordion
        title={'Добавить продавца'}
        titleColor={'white'}
        titleBgColor={'var(--color-button)'}
      >
        <NewSalesmanForm />
      </Accordion>
      <div>
        {salesmans.map((salesman, index) => (
          <h4 key={salesman.id}>
            {index + 1 + '. ' + salesman.lastname + ' ' + salesman.name}
          </h4>
        ))}
      </div>
    </Wrapper>
  );
};
