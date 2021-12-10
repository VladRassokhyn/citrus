import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type Props = {
  submitFn: (sales: { sales: string }) => void;
};

type StyleProps = {
  disabled?: boolean;
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const Input = styled.textarea`
  height: 100px;
  width: 100%;
  font-size: 4pt;
`;

const SubmitBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const Button = styled.button<StyleProps>`
  background-color: ${(props) => (props.disabled ? '#aaa' : 'var(--color-button)')};
  color: white;
  min-width: 100px;
  height: 30px;
  border: 0;
  border-radius: 5px;
  transition: linear 0.3s;
  ${(props) =>
    !props.disabled &&
    `&:hover {
      cursor: pointer;
      background-color: #1890ff;
    }`}
`;

const H1 = styled.h1`
  font-size: 12pt;
`;

export const SalesInput = (props: Props): JSX.Element => {
  const { submitFn } = props;
  const [value, setValue] = useState('');
  const [parsedValue, setParsedValue] = useState<any | null>(null);

  useEffect(() => {
    if (value && value.length > 100) {
      const newValue = parse(value);
      const to = parseInt(newValue[3][1].replace(/\s/g, ''));
      const cm = parseInt(newValue[3][8].replace(/\s/g, ''));
      const cz = parseInt(newValue[3][10].replace(/\s/g, ''));
      const ca = parseInt(newValue[3][12].replace(/\s/g, ''));
      const newDaySales = {
        day: '',
        to: isNaN(to) ? 0 : to,
        cm: isNaN(cm) ? 0 : cm,
        cz: isNaN(cz) ? 0 : cz,
        ca: isNaN(ca) ? 0 : ca,
      };
      setParsedValue(newDaySales);
    }
  }, [value]);

  return (
    <Wrapper>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <SubmitBlock>
        {parsedValue && (
          <Container>
            <H1>Устройства: {parsedValue.to}</H1>
            <H1>ЦМ: {parsedValue.cm}</H1>
            <H1>ЦЗ: {parsedValue.cz}</H1>
            <H1>ЦА: {parsedValue.ca}</H1>
          </Container>
        )}
        <Button disabled={!parsedValue} onClick={() => parsedValue && submitFn({ sales: value })}>
          Сохранить
        </Button>
      </SubmitBlock>
    </Wrapper>
  );
};

function parse(input: string) {
  let inputToArray = [];
  const a = input;
  inputToArray = a.replace(/\n/g, '\t').split('\t');
  const result: string[][] = [];
  let tmp: string[] = [];

  inputToArray.forEach((item, index) => {
    tmp.push(item);
    if ((index + 1) % 17 === 0) {
      result.push(tmp);
      tmp = [];
    }
  });

  return result;
}
