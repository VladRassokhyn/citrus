import { LoadingStatuses } from './../../globalTypes';

export type Checklist = {
  title: string;
  passed: false;
  creatorId: number;
  managerId: number;
  passerId: number;
  mark: number;
  maxMark: number;
  id?: number;
  categories: Category[];
};

export type Category = {
  id?: number;
  title: string;
  fields: Field[];
};

export type Field = {
  id?: number;
  title: string;
  checked: boolean;
};

export type ChecklistState = {
  status: LoadingStatuses;
  postChecklistStatus: LoadingStatuses;
  checklists: Checklist[] | null;
  singleChecklist: Checklist;
  singleChecklistStatus: LoadingStatuses;
};
