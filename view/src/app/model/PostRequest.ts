export interface PostRequest{
  content: string;
  posterId: number,
  groupId: number,
  planTypeId: number,
  plannedDateStart: Date,
  plannedDateEnd: Date,
  title: string,
  url: string
}
