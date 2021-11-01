import React from 'react';
import styled from 'styled-components';
import { Checklist } from '../../lib/slices/checklist';
import viewList from '../../static/viewList.svg';
import trash from '../../static/trash.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteChecklist } from '../../lib/slices/checklist/checklist.slice';

type Props = {
  checklist: Checklist;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
  padding: 0 5%;
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

export const ChecklistSubMenu = (props: Props): JSX.Element => {
  const { checklist } = props;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteChecklist(checklist.id));
  };

  return (
    <Wrapper>
      <H1>Действия:</H1>
      <Link to={`/checklist/${checklist.id}`}>
        <Img style={{ marginTop: '15px' }} src={viewList} alt={'view'} />
      </Link>
      <Img src={trash} alt={'delete'} onClick={handleDelete} />
    </Wrapper>
  );
};
