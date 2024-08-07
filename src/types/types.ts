export type column = {
  id: string;
  name: string;
  boardId: string;
};

export type colName = {
  value: string;
  error: string;
};

export type board = {
  id: string;
  name: string;
};

export type card = {
  id: string;
  heading: string;
  description: string;
  notes: string;
  date: string;
  link: string[];
  // tag: string;
  columnId: string;
  boardId: string;
  storyPoints: number;
};
