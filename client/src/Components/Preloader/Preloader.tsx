import React from 'react';
import styled from 'styled-components';
import './preloader.css';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Preloader = (): JSX.Element => {
  return (
    <Wrapper>
      <div className="body">
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="base">
          <span></span>
          <div className="face"></div>
        </div>
      </div>
      <div className="longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1 className="loading-h1">Загрузка...</h1>
    </Wrapper>
  );
};
