export interface TravelGroupResponse{
  id: number;
  code: string;
  name: string;
  createdAt: Date;
  status: boolean;
  tripStart: Date;
  tripEnd: Date;
  description: string;
  image: string;
  usersIds: number[];

}
