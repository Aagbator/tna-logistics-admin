export interface PagedDataModel {
  isLast: boolean;
  isFirst: boolean;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
  page: number;
  data: Array<any>;
}
