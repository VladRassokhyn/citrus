export type ChecklistInitialState = {
  checklists: Checklist[];
  newChecklist: Checklist | null;
};
export type ChecklistCategorie = {
  id: string;
  title: string;
  subCategories?: {
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
  categories: ChecklistCategorie[];
};
