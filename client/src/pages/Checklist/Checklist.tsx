import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Accordion } from '../../Components/Accordion';
import { NewChecklistForm } from './NewChecklistForm';
import { useEffect } from 'react';
import { getSalesmans } from '../../lib/slices/salesmans';
import { useTypedSelector } from '../../lib/hooks';
import { selectSalesmansStatus } from '../../lib/slices/salesmans/salesmans.selectors';
import { LoadingStatuses } from '../../lib/globalTypes';
import { Preloader } from '../../Components/Preloader';

const Wrapper = styled.div`
  padding: 20px 5vw;
  display: flex;
  flex-direction: column;
`;

export const Checklist = (): JSX.Element => {
  const salesmansStatus = useTypedSelector(selectSalesmansStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSalesmans());
  }, []);

  if (salesmansStatus === LoadingStatuses.LOADING) {
    return <Preloader />;
  }

  return (
    <Wrapper>
      <Accordion
        title={'Создать чеклист'}
        titleColor={'white'}
        titleBgColor={'var(--color-button)'}
      >
        <NewChecklistForm />
      </Accordion>
    </Wrapper>
  );
};
