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
