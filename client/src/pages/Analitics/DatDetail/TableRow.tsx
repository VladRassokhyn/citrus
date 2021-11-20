import styled from 'styled-components';

type Props = {
  cells: (string | number)[];
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
`;

const NameCell = styled.div`
  width: 200px;
`;

const Cell = styled.div`
  display: flex;
  align-items: right;
  padding-right: 10px;
  width: 70px;
`;

export const TableRow = (props: Props): JSX.Element => {
  const { cells } = props;

  return (
    <Wrapper>
      {cells.map((cell, index) => {
        if (index === 0) {
          return <NameCell key={index}>{cell}</NameCell>;
        } else {
          return <Cell key={index}>{isNaN(+cell) ? 0 : cell}</Cell>;
        }
      })}
    </Wrapper>
  );
};
