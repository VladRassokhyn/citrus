export type ChecklistInitialState = {
  checklists: Checklist[];
  newChecklist: Checklist | null;
};
export type ChecklistTheme = {
  id: string;
  title: string;
  subThemes?: {
    id: string;
    title: string;
    fields: {
      id: string;
      title: string;
      checkbox: boolean;
    }[];
  }[];
};

export type Checklist = {
  id?: string;
  name: string;
  salesmanId: string;
  themes: ChecklistTheme[];
};
