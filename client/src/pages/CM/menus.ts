import { v4 as uuid } from 'uuid';

type Includent = {
  id: string;
  title: string;
  description: string;
};

type Item = {
  id: string;
  name: string;
  price: number;
  displayName: string;
  includes?: Includent[];
};

type Menus = {
  id: string;
  title: string;
  items: Item[];
};

export const menus: Menus[] = [
  {
    id: uuid(),
    title: 'Годовые Пакеты',
    items: [
      {
        id: uuid(),
        name: 'silverCardAndroid',
        displayName: 'Sivler Card Android',
        price: 800,
        includes: [
          {
            id: uuid(),
            title: 'Тех. поддержка',
            description:
              'Прошивка, обновления, исправление системных сбоев, настройка приложений на протяжении 12 месяцев. Поддержка оказывается в магазине, или на горячей линии по номеру 044-503-70-30',
          },
          {
            id: uuid(),
            title: 'Первоначальная настройка',
            description: 'Активация, настройка языка, даты, времени, интернета',
          },
          {
            id: uuid(),
            title: 'Обновление ПО до последней версии',
            description:
              'Обновление систем безопасности, добавление новых функций',
          },
          {
            id: uuid(),
            title: 'Настройка Учетной записи Google',
            description:
              'Активация синхронизации с Google. Восстановление старой учетной записи если это возможно',
          },
          {
            id: uuid(),
            title: 'Миграция данных',
            description:
              'Перенос информации со старого телефона. Перенос осуществляется с ОДНОГО старого телефона.',
          },
          {
            id: uuid(),
            title: 'Настройка браузеров',
            description:
              'Установка Chrome, Firefox, Opera и т.д. Синхронизация закладок и истории с учетной записью Google',
          },
          {
            id: uuid(),
            title: 'Настройка аудео и видео плееров',
            description:
              'Установка всех существующих форматов и кодеков аудио/видео, без которых большенство медиа-контента не будет воспроизводиться',
          },
          {
            id: uuid(),
            title: 'Настройка офисных программ',
            description:
              'Установка Docs, Sheets, Presentation, Adobe Acrobat. Все "вордовские", "екселевские" и т.д. файы будет открываться автоматически в нужной программе. Без них даже обычный "вордовский" документ не откроется.',
          },
          {
            id: uuid(),
            title: 'Файловые менеджеры',
            description:
              'ПУстановка архиватоа и альтернативных файовых менеджеров',
          },
          {
            id: uuid(),
            title: 'Блокировщик рекламы',
            description: 'Лицензионный антибанер AdLock 12мес.',
          },
          {
            id: uuid(),
            title: 'Родительский контроль',
            description: 'Лицензия Kroha 12мес.',
          },
          {
            id: uuid(),
            title: 'IPTV',
            description: 'Подписка на SweetTV 3мес',
          },
        ],
      },
      {
        id: uuid(),
        name: 'goldCardAndroid',
        displayName: 'Gold Card Android',
        price: 1500,
      },

      {
        id: uuid(),
        name: 'platinumCardAndroid',
        displayName: 'Platinum Card Android',
        price: 2000,
      },
    ],
  },
  { id: uuid(), title: 'Разовые Пакеты', items: [] },
  { id: uuid(), title: 'Разовые Услуги', items: [] },
  { id: uuid(), title: 'Space', items: [] },
];
