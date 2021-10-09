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
`;

const H1 = styled.h1`
  margin: 10px;
  text-align: center;
  color: var(--color-paragraph);
  font-size: 18pt;
`;

const H2 = styled.h1`
  color: gray;
  opacity: 0.8;
  text-align: center;
  font-size: 13pt;
  margin: 10px;
`;

const H3 = styled.h1`
  margin: 10px;
  text-align: center;
  color: var(--color-stroke);
  font-size: 22pt;
`;

const Button = styled.button`
  width: 90%;
  margin: 0 5%;
  padding: 10px 0;
  background-color: var(--color-button);
  color: white;
  border: 0;
  border-radius: 5px;
`;

export const CmMenu = (): JSX.Element => {
  const [isOpenAll, setIsOpenAll] = useState(true);

  const handleOpenAll = useCallback(() => {
    setIsOpenAll((prev) => !prev);
  }, []);

  return (
    <Wrapper>
      {menus.map((menu) => (
        <CollapsedItem key={menu.id} title={menu.title}>
          <Slider>
            {menu.os.map((os) => (
              <div key={os.id}>
                <H3>{os.displayName}</H3>
                <Button onClick={handleOpenAll}>
                  Показать/Скрыть описание
                </Button>
                {os.items.map((item) => (
                  <Slide key={item.id}>
                    <H1>{item.displayName}</H1>
                    {item.price && <H2>{item.price}грн.</H2>}
                    {item.includes &&
                      item.includes.map((inc, index) => (
                        <Option
                          key={inc.id}
                          price={inc.price}
                          title={inc.title}
                          description={inc.description}
                          isOpenAll={isOpenAll}
                          index={index + 1}
                        />
                      ))}
                  </Slide>
                ))}
              </div>
            ))}
          </Slider>
        </CollapsedItem>
      ))}
    </Wrapper>
  );
};
