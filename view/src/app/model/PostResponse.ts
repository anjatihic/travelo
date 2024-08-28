export interface PostResponse{
  id: number;
  content: string;
  createdAt: Date;
  status: boolean;
  posterUsername: string;
  groupId: number;
  planTypeId: number;
  plannedDateStart: Date;
  plannedDateEnd: Date;
  title: string;
  url: string;
}
