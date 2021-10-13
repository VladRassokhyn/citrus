import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../lib/hooks';
import { selectAllSalesmans } from '../../lib/slices/salesmans';
import { getSalesmans } from '../../lib/slices/salesmans/salesmans.slice';
import { selectSalesmansStatus } from '../../lib/slices/salesmans/salesmans.selectors';
import { LoadingStatuses } from '../../lib/globalTypes';
import { Preloader } from '../../Components/Preloader';
import { Accordion } from '../../Components/Accordion';
import { NewSalesmanForm } from './NewSalesmanForm';
import { SalermasSubMenu } from './SalermanSubMenu';

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

  const handleEditSalesman = () => {
    console.log('edit');
  };

  const handleDeleteSalesman = () => {
    console.log('delete');
  };

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
          <Accordion
            titleBgColor={'#f1f1f1'}
            key={salesman.id}
            title={index + 1 + '. ' + salesman.lastname + ' ' + salesman.name}
          >
            <SalermasSubMenu
              editFn={handleEditSalesman}
              deleteFn={handleDeleteSalesman}
            />
          </Accordion>
        ))}
      </div>
    </Wrapper>
  );
};
