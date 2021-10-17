import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ second?: boolean }>`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.second && '#f1f1f1'};
`;

const Sides = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Side = styled.div`
  width: 40%;
  padding: 0 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  border-top: 1px solid gray;
`;

const H1 = styled.h1`
  font-size: 20pt;
  margin: 20px 0 0 0;
  color: var(--color-stroke);
`;

const H2 = styled.h1`
  margin: 10px 0;
  font-size: 14pt;
  color: gray;
`;

const H3 = styled.h1`
  font-size: 10pt;
  margin: 5px 0 0 0;
`;

const H4 = styled.h1`
  text-align: center;
  font-size: 12pt;
  color: var(--color-tertiary);
`;

export const Space = (): JSX.Element => {
  return (
    <Wrapper>
      <Wrapper>
        <H1>Space 10%</H1>
        <H2>ЦМ - 60% ЦЗ - 40% </H2>
        <H3>Цена услуги: 10% от стоимости устройства</H3>
        <H3>Цена устройства: от 7999 грн.</H3>
        <Sides>
          <Side>
            <H2>ЦМ</H2>
            <H4>Silver Card</H4>
          </Side>
          <Side>
            <H2>ЦЗ</H2>
            <H4>Продленка 1 год</H4>
          </Side>
        </Sides>
      </Wrapper>
      <Wrapper second>
        <H1>Space 15%</H1>
        <H2>ЦМ - 60% ЦЗ - 40% </H2>
        <H3>Цена услуги: 15% от стоимости устройства</H3>
        <H3>Цена устройства: от 7999 грн.</H3>
        <Sides>
          <Side>
            <H2>ЦМ</H2>
            <H4>Gold Card</H4>
          </Side>
          <Side>
            <H2>ЦЗ</H2>
            <H4>Продленка 2 годa</H4>
          </Side>
        </Sides>
      </Wrapper>
      <Wrapper>
        <H1>Space 20%</H1>
        <H2>ЦМ - 50% ЦЗ - 50% </H2>
        <H3>Цена услуги: 20% от стоимости устройства</H3>
        <H3>Цена устройства: от 7999 грн.</H3>
        <Sides>
          <Side>
            <H2>ЦМ</H2>
            <H4>Platinum Card</H4>
          </Side>
          <Side>
            <H2>ЦЗ</H2>
            <H4>Защита Дисплея support.ua 1год</H4>
          </Side>
        </Sides>
      </Wrapper>
    </Wrapper>
  );
};
