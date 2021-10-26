export type ChecklistDTO = {
  title: string;
  categories: {
    title: string;
    fields: {
      title: string;
      checked: boolean;
    }[];
  }[];
};
