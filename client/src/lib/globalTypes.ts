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
  tt: string;
};

export const TTselectorOptions = [
  { label: TT.BLOCK, value: TT.BLOCK },
  { label: TT.KR29, value: TT.KR29 },
  { label: TT.KR52, value: TT.KR52 },
  { label: TT.BV23, value: TT.BV23 },
  { label: TT.DRIM, value: TT.DRIM },
  { label: TT.LAVINA, value: TT.LAVINA },
  { label: TT.GLOBUS, value: TT.GLOBUS },
  { label: TT.GORODOK, value: TT.GORODOK },
  { label: TT.OCEAN, value: TT.OCEAN },
  { label: TT.PIRAMIDA, value: TT.PIRAMIDA },
  { label: TT.RIVER, value: TT.RIVER },
  { label: TT.SKY, value: TT.SKY },
  { label: TT.BV66, value: TT.BV66 },
  { label: TT.HITMALL, value: TT.HITMALL },
  { label: TT.RESPUBLIKA, value: TT.RESPUBLIKA },
  { label: TT.KOPERNIKA, value: TT.KOPERNIKA },
  { label: TT.CHERKAS, value: TT.CHERKAS },
  { label: TT.CHERNIGOV_CUM, value: TT.CHERNIGOV_CUM },
  { label: TT.VICTORIYA, value: TT.VICTORIYA },
  { label: TT.CHERNIGOV_HOLLYWOOD, value: TT.CHERNIGOV_HOLLYWOOD },
  { label: TT.SOBORNAYA, value: TT.SOBORNAYA },
  { label: TT.MEGAMALL, value: TT.MEGAMALL },
  { label: TT.SKYPARK, value: TT.SKYPARK },
  { label: TT.FRANKOVSK, value: TT.FRANKOVSK },
];
