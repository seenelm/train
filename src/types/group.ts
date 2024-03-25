import { ObjectId } from "mongodb";

//TODO: rename to Group, and include all properties in the backend
export interface GroupType {
  groupName: string;
  userId: ObjectId;
}
