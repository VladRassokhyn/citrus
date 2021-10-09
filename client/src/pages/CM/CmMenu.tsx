import styled, { keyframes } from 'styled-components';
import { bounceInUp } from 'react-animations';
import { CollapsedItem } from '../../Components/CollapsedItem';
import { menus } from './menus';
import { useCallback, useState } from 'react';
import { Option } from './Option';
import { Slider } from '../../Components/Slider/Slider';

const bounceShow = keyframes`${bounceInUp}`;

const Wrapper = styled.div`
  padding: 20px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  animation: 1s ${bounceShow};
  align-items: center;
  justify-content: center;
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5vw;
  min-width: 90vw;
  min-height: 500px;
`;

const H1 = styled.h1`
  text-align: center;
  color: var(--color-stroke);
  font-size: 18pt;
`;

const H3 = styled.h1`
  color: gray;
  opacity: 0.8;
  text-align: center;
  font-size: 13pt;
  margin: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  background-color: var(--color-button);
  color: white;
  border: 0;
  border-radius: 5px;
`;

export const CmMenu = (): JSX.Element => {
  const [isOpenAll, setIsOpenAll] = useState(false);

  const handleOpenAll = useCallback(() => {
    setIsOpenAll((prev) => !prev);
  }, []);

  return (
    <Wrapper>
      {menus.map((menu) => (
        <CollapsedItem key={menu.id} title={menu.title}>
          <Slider>
            {menu.items.map((item) => (
              <Slide key={item.id}>
                <H1>{item.displayName}</H1>
                <H3>{item.price}грн.</H3>
                <Button onClick={handleOpenAll}>Показать все</Button>
                {item.includes &&
                  item.includes.map((inc) => (
                    <Option
                      key={inc.id}
                      title={inc.title}
                      description={inc.description}
                      isOpenAll={isOpenAll}
                    />
                  ))}
              </Slide>
            ))}
          </Slider>
        </CollapsedItem>
      ))}
    </Wrapper>
  );
};
