import styled from 'styled-components';
import trash from '../../static/trash.svg';
import edit from '../../static/edit.svg';
import viewList from '../../static/viewList.svg';

type Props = {
  editFn: () => void;
  deleteFn: () => void;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 30px;
  padding-right: 20px;
  margin-left: 20px;
  border-left: 1px solid #f1f1f1;
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const H1 = styled.h1`
  margin-right: 30px;
  font-size: 12pt;
  color: var(--color-stroke);
`;

export const SalermasSubMenu = (props: Props): JSX.Element => {
  const { editFn, deleteFn } = props;
  return (
    <Wrapper>
      <H1>Действия:</H1>
      <Img src={edit} alt={'edit'} onClick={editFn} />
      <Img src={viewList} alt={'view'} />
      <Img src={trash} alt={'delete'} onClick={deleteFn} />
    </Wrapper>
  );
};
