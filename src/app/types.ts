export type Result = Record<string, string | number>;

export type PaginatedResponse = {
  data: Result[];
  meta: {
    totalItems: number;
    totalPages: number;
  };
};
