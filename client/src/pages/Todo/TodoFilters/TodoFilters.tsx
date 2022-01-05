import styled from 'styled-components';
import Selector from 'react-select';
import { importanceOptions } from './config';
import { useState } from 'react';
import { FixLater } from '@lib/globalTypes';

type Props = {
  isOpen: boolean;
};

type StyleProps = {
  isOpen?: boolean;
};

const Wrapper = styled.div<StyleProps>`
  width: 96%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 10px 2%;
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  height: ${(props) => (props.isOpen ? '100px' : '0px')};
  transition: height 0.1s;
`;

const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.h1`
  font-size: 10pt;
  color: var(--color-stroke);
`;

export const TodoFilters = (props: Props): JSX.Element => {
  const { isOpen } = props;
  const [importance, setImportance] = useState({ label: 'Сначала Важные', value: 'Важно' });

  const handleImportanceSort = (e: FixLater) => {
    setImportance(e);
  };

  return (
    <Wrapper isOpen={isOpen}>
      <FilterItem>
        <Label>Важность</Label>
        <Selector
          defaultValue={importance}
          options={importanceOptions}
          onChange={handleImportanceSort}
        />
      </FilterItem>

      <FilterItem>
        <Label>Категория</Label>
        <Selector
          defaultValue={importance}
          options={importanceOptions}
          onChange={handleImportanceSort}
        />
      </FilterItem>

      <FilterItem>
        <Label>Создатель</Label>
        <Selector
          defaultValue={importance}
          options={importanceOptions}
          onChange={handleImportanceSort}
        />
      </FilterItem>
    </Wrapper>
  );
};
