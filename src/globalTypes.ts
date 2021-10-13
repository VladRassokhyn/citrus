export type ChecklistDTO = {
  checklistTitle: string;
  categories: {
    categoryTitle: string;
    subCategories: {
      subCategoryTitle: string;
      fields: {
        fieldTitle: string;
        checked: boolean;
      }[];
    }[];
  }[];
};
