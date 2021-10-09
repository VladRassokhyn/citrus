import styled, { keyframes } from 'styled-components';
import { bounceInUp } from 'react-animations';
import { CollapsedItem } from '../../Components/CollapsedItem';
import { licPO, menus } from './menus';
import { useCallback, useState } from 'react';
import { Option } from './Option';
import { Slider } from '../../Components/Slider/Slider';
import { Space } from './Space/Space';
import link from '../../static/link.svg';

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

const LicPoWrapper = styled.div`
  padding: 20px 5vw;
`;

const H4 = styled.h1`
  font-size: 14pt;
`;

const H5 = styled.h1`
  font-size: 10pt;
`;

const LicType = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 30px;
  border-bottom: 1px solid gray;
`;

const A = styled.a`
  color: red;
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
      <CollapsedItem title={'Space'}>
        <Space />
      </CollapsedItem>

      <CollapsedItem title={'ЛицПО'}>
        <LicPoWrapper>
          <h4 style={{ marginBottom: '20px' }}>
            <b style={{ color: 'red' }}>Красный текст </b> - ссылка на
            презентацию
          </h4>
          {licPO.map((vendor) => (
            <>
              {vendor.link ? (
                <A href={vendor.link}>
                  <H4>{vendor.title}</H4>
                </A>
              ) : (
                <H4>{vendor.title}</H4>
              )}
              {vendor.types.map((type) => (
                <LicType>
                  {type.link ? (
                    <A href={type.link}>
                      <H5>{type.title + ' ' + type.period}</H5>
                    </A>
                  ) : (
                    <H5>{type.title + ' ' + type.period}</H5>
                  )}
                  <H5>{type.price}</H5>
                </LicType>
              ))}
            </>
          ))}
        </LicPoWrapper>
      </CollapsedItem>
    </Wrapper>
  );
};
