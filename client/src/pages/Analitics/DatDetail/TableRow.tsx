import styled from 'styled-components';

type Props = {
  cells: (string | number)[];
  isTT: boolean;
  isHeader?: boolean;
  isMainTable?: boolean;
};

type StyleProps = {
  isTT: boolean;
  isHeader?: boolean;
  isMainTable?: boolean;
};

const Wrapper = styled.div<StyleProps>`
  height: 30px;
  background-color: ${(props) =>
    props.isHeader ? 'var(--color-button)' : props.isTT && '#dfdfdf'};
  color: ${(props) => props.isHeader && 'white'};
  ${(props) =>
    props.isMainTable
      ? `display: grid; grid-template-columns: 2fr repeat(8, 1fr);`
      : `
  display: flex;
  flex-direction: row;
  align-items: center;`}
`;

const NameCell = styled.div`
  height: 100%;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-right: 1px solid var(--color-button);
  border-left: 1px solid var(--color-button);
  border-bottom: 1px solid var(--color-button);
`;

const Cell = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  padding-right: 10px;
  border-right: 1px solid var(--color-button);
  border-bottom: 1px solid var(--color-button);
`;

export const TableRow = (props: Props): JSX.Element => {
  const { cells, isTT, isHeader, isMainTable } = props;

  return (
    <Wrapper isTT={isTT} isHeader={isHeader} isMainTable={isMainTable}>
      {cells.map((cell, index) => {
        if (index === 0) {
          return <NameCell key={index}>{cell}</NameCell>;
        } else {
          return <Cell key={index}>{cell}</Cell>;
        }
      })}
    </Wrapper>
  );
};
