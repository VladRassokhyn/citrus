export type FixLater = any;

export enum LoadingStatuses {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  SALESMAN = 'SALESMAN',
  MANAGER = 'MANAGER',
}

export enum TT {
  KR29 = 'KR29',
  KR52 = 'KR52',
  BV23 = 'BV23',
  BV66 = 'BV66',
  GLOBUS = 'GLOBUS',
  LAVINA = 'LAVINA',
  DRIM = 'DRIM',
  OCEAN = 'OCEAN',
  PIRAMIDA = 'PIRAMIDA',
  BLOCK = 'BLOCK',
  SKY = 'SKY',
  GORODOK = 'GORODOK',
  RIVER = 'RIVER',
  HITMALL = 'HITMALL',
  RESPUBLIKA = 'RESPUBLIKA',
  KOPERNIKA = 'KOPERNIKA',
  VICTORIYA = 'VICTORIYA',
  CHERKAS = 'CHERKAS',
  CHERNIGOV_CUM = 'CHERNIGOV_CUM',
  CHERNIGOV_HOLLYWOOD = 'CHERNIGOV_HOLLYWOOD',
  SOBORNAYA = 'SOBORNAYA',
  MEGAMALL = 'MEGAMALL',
  SKYPARK = 'SKYPARK',
  FRANKOVSK = 'FRANKOVSK',
}

export enum TTlabel {
  KR29 = 'Киев_Крещатик 29',
  KR52 = 'Киев_Крещатик 52',
  BV23 = 'Киев_Б.Васильковская,23',
  BV66 = 'Киев_Б.Васильковская,66',
  GLOBUS = 'Киев_Глобус',
  LAVINA = 'Киев_Берковецкая, 6Д (ТРЦ Лавина)',
  DRIM = 'Киев_Дрим Таун',
  OCEAN = 'Киев_Горького, 176',
  PIRAMIDA = 'Киев_Пирамида, А. Мишуги, 4',
  BLOCK = 'Киев_Блокбастер,просп. С. Бандеры,34В',
  SKY = 'Киев_Скаймол, Ген. Ватутина, 2',
  GORODOK = 'КиЇв_Городок, пр. С.Бандери,23',
  RIVER = 'Киев_Ривермол, Днепровская наб.,12',
  HITMALL = 'Киев_Хит_Молл,проспект Перемоги, 134/1',
  RESPUBLIKA = 'RESPUBLIKA',
  KOPERNIKA = 'Львов_Коперника,2',
  VICTORIYA = 'Львов_Кульпарковская, 226а "Victoria Gardens"',
  CHERKAS = 'Черкассы_Любава,б. Шевченка, 208/1',
  CHERNIGOV_CUM = 'Чернигов_ проспект Миру, буд. 49,  ЦУМ Чернігів',
  CHERNIGOV_HOLLYWOOD = 'Чернигов_Голливуд,ул. 77-й Гвард. Дивизии, 1В',
  SOBORNAYA = 'Винница_вул. Соборна, буд. 22 прим.38',
  MEGAMALL = 'Винница_Мегамолл,600 -летие, 17',
  SKYPARK = 'Вінниця_Sky Park, Соборна,24',
  FRANKOVSK = 'FRANKOVSK',
}

export enum LoadingErrors {
  IDLE = 'EDLI',
  NOT_AUTORISED = 'NOT_AUTORISED',
  BAD_REQUEST = 'BAD_REQUEST',
  NOT_FOUND = 'NOT_FOUND',
}

export type User = {
  username: string;
  name: string;
  lastName: string;
  role: UserRoles;
  id: number;
  tt: { label: string; value: string };
};

export type Salesman = {
  name: string;
  id: number;
  tt: string;
};

export type SalesPayload = {
  id?: number;
  day: string;
  tt: string;
  sales: string;
};

export const TTselectorOptions = [
  { label: TTlabel.KR29, value: TT.KR29 },
  { label: TTlabel.KR52, value: TT.KR52 },
  { label: TTlabel.BV23, value: TT.BV23 },
  { label: TTlabel.DRIM, value: TT.DRIM },
  { label: TTlabel.BLOCK, value: TT.BLOCK },
  { label: TTlabel.LAVINA, value: TT.LAVINA },
  { label: TTlabel.GLOBUS, value: TT.GLOBUS },
  { label: TTlabel.GORODOK, value: TT.GORODOK },
  { label: TTlabel.OCEAN, value: TT.OCEAN },
  { label: TTlabel.PIRAMIDA, value: TT.PIRAMIDA },
  { label: TTlabel.RIVER, value: TT.RIVER },
  { label: TTlabel.SKY, value: TT.SKY },
  { label: TTlabel.BV66, value: TT.BV66 },
  { label: TTlabel.HITMALL, value: TT.HITMALL },
  { label: TTlabel.RESPUBLIKA, value: TT.RESPUBLIKA },
  { label: TTlabel.KOPERNIKA, value: TT.KOPERNIKA },
  { label: TTlabel.CHERKAS, value: TT.CHERKAS },
  { label: TTlabel.CHERNIGOV_CUM, value: TT.CHERNIGOV_CUM },
  { label: TTlabel.VICTORIYA, value: TT.VICTORIYA },
  { label: TTlabel.CHERNIGOV_HOLLYWOOD, value: TT.CHERNIGOV_HOLLYWOOD },
  { label: TTlabel.SOBORNAYA, value: TT.SOBORNAYA },
  { label: TTlabel.MEGAMALL, value: TT.MEGAMALL },
  { label: TTlabel.SKYPARK, value: TT.SKYPARK },
  { label: TTlabel.FRANKOVSK, value: TT.FRANKOVSK },
];
