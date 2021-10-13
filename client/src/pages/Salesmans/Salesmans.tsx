import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../lib/hooks';
import { selectAllSalesmans } from '../../lib/slices/salesmans';
import {
  deleteSalesman,
  getSalesmans,
} from '../../lib/slices/salesmans/salesmans.slice';
import {
  selectSalesmansCRUSstatus,
  selectSalesmansStatus,
} from '../../lib/slices/salesmans/salesmans.selectors';
import { LoadingStatuses } from '../../lib/globalTypes';
import { Preloader } from '../../Components/Preloader';
import { Accordion } from '../../Components/Accordion';
import { NewSalesmanForm } from './NewSalesmanForm';
import { SalermasSubMenu } from './SalermanSubMenu';
import { InputField } from '../../Components/InputField';
import { Modal } from '../../Components/Modal';

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
          <Accordion
            titleBgColor={'#f1f1f1'}
            key={salesman.id}
            title={index + 1 + '. ' + salesman.lastname + ' ' + salesman.name}
          >
            <SalermasSubMenu salesmanId={salesman.id} />
          </Accordion>
        ))}
      </div>
    </Wrapper>
  );
};
