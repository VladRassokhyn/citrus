import styled, { Keyframes, keyframes } from 'styled-components';

type Props = {
  plane: number;
  sale: number;
  title?: string;
  color: string;
  showFact?: boolean;
};

type StyleProps = {
  progress: number;
  animation: Keyframes;
  color: string;
};

const Wrapper = styled.div``;

const SVG = styled.svg`
  width: 150px;
  height: 150px;
`;

const CircleBg = styled.circle`
  fill: none;
  stroke-width: 20px;
  stroke: #f1f1f1;
`;

const CircleProgress = styled.circle<StyleProps>`
  fill: none;
  stroke-width: 20px;
  stroke: ${(props) => props.color};
  stroke-linecap: round;
  stroke-dasharray: 326.56;
  stroke-dashoffset: ${(props) => 326 - (props.progress / 100) * 326};
  transform-origin: 50% 50%;
  transform: rotate(280deg);
  animation: ${(props) => props.animation} 1.5s ease-in-out;
`;

const Out = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
`;

const Text = styled.h1`
  position: absolute;
  width: 100%;
  top: 50px;
  font-size: 12pt;
  text-align: center;
  line-height: 22px;
  color: var(--color-stroke);
`;

const BidText = styled.span`
  display: block;
  font-size: 14pt;
`;

export const Circle = (props: Props): JSX.Element => {
  const { plane, sale, title, color, showFact } = props;

  const fact = +((sale / plane) * 100).toFixed(2);
  const animation = keyframes`
  from {
    stroke-dashoffset: 326.56;
  }
  to {
    stroke-dashoffset: ${326 - ((fact > 100 ? 100 : fact) / 100) * 326};
  }`;

  return (
    <Wrapper>
      <Out>
        <Text>
          {title && title}
          <BidText>{showFact ? sale : isNaN(fact) ? 0 : fact}</BidText>
        </Text>
        <SVG>
          <CircleBg cx="75" cy="75" r="52"></CircleBg>
          <CircleProgress
            color={color}
            animation={animation}
            progress={fact > 100 ? 100 : fact}
            cx="75"
            cy="75"
            r="52"
          ></CircleProgress>
        </SVG>
      </Out>
    </Wrapper>
  );
};
