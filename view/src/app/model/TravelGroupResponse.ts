export interface TravelGroupResponse{
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
