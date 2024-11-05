import { ObjectId } from "mongodb";

//TODO: rename to Group, and include all properties in the backend
export interface GroupType {
  groupName: string;
  userId: ObjectId;
}

export interface GroupProfileType {
  id: string;
  bio: string;
  name: string;
  type: 'private' | 'public';  // Example: Using string literals if `type` has specific allowed values
}

export interface GroupResponse {
  _id: ObjectId;
  groupName: string;
  bio: string;
  owners: ObjectId[];
  users: ObjectId[];
  requests: ObjectId[];
  accountType: number;
}

export interface UserGroupsResponse {
  userId: ObjectId;
  groups: GroupResponse[];
}

export interface Group {
  _id: ObjectId;
  groupName: string;
  bio: string;
}