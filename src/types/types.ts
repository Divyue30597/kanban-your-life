export type column = {
  id: string;
  name: string;
  boardId: string;
  bgColor: string;
  cards?: card[];
};

export type board = {
  id: string;
  name: string;
  columns?: column[];
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
  index: number;
};

export type date = {
  date: number;
  weekday: number;
  achievedTarget: boolean;
};

export type colName = {
  value: string;
  error: string;
};

export type InputType = {
  value: string;
  error: string;
};
