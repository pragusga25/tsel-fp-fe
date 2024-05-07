export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum PrincipalType {
  USER = 'USER',
  GROUP = 'GROUP',
}

export enum RequestAssignmentOperation {
  ATTACH = 'ATTACH',
  DETACH = 'DETACH',
}

export enum RequestAssignmentStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum FreezeTimeTarget {
  USER = 'USER',
  GROUP = 'GROUP',
  ALL = 'ALL',
}

export type OkResponse = {
  ok: true;
};
export type IdResponse = {
  id: string;
};

export type PermissionSet = {
  arn: string;
  name?: string;
};

export type PermissionSets = PermissionSet[];

export type Assignment = {
  id: string;
  permissionSets: {
    arn: string;
    name: string;
  }[];
  principalId: string;
  principalType: PrincipalType;
  principalDisplayName: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  username: string;
  name: string;
  role: Role;
  principalId?: string;
  principalType?: PrincipalType;
};
export interface UserWithTimeStamps extends User {
  createdAt: string;
  updatedAt: string;
}
export interface UserWithPassword extends User {
  password: string;
}
export type ListAssignmentsData = Assignment[];
export type LoginData = {
  accessToken: string;
  user: User;
};
export type LoginPayload = {
  username: string;
  password: string;
};
export type CreateUserPayload = Omit<UserWithPassword, 'id'>;
export type RequestAssignmentPayload = {
  permissionSets: PermissionSets;
  operation: RequestAssignmentOperation;
  note?: string;
};

export type AcceptAssignmentRequestsPayload = {
  ids: string[];
  operation: RequestAssignmentOperation;
};

export type RejectAssignmentRequestsPayload = {
  ids: string[];
};

export type DeleteAssignmentRequestsPayload = {
  ids: string[];
};

export type RegisterPayload = Omit<UserWithPassword, 'id'>;
export type RegisterData = IdResponse;
export type GetUserData = User;
export type ListUsersData = UserWithTimeStamps[];
export type CreateUserData = IdResponse;
export type RequestAssignmentData = IdResponse;
export type AcceptAssignmentRequestsData = OkResponse;
export type RejectAssignmentRequestsData = OkResponse;
export type DeleteAssignmentRequestsData = OkResponse;
export type DeleteUsersPayload = {
  ids: string[];
};
export type DeleteUsersData = OkResponse;
export type ListPrincipalsData = {
  id: string;
  displayName: string;
  principalType: PrincipalType;
}[];
export type ListPermissionSetsData = PermissionSets;
export type ListMyPermissionSetsData = PermissionSets;
type AssignmentRequestData = {
  id: string;
  permissionSets: PermissionSets;
  operation: RequestAssignmentOperation;
  status: RequestAssignmentStatus;
  note: string | null;
  requestedAt: string;
  respondedAt: string | null;
  responder: {
    name: string;
    username: string;
  } | null;
};
export type ListMyAssignmentRequestsData = AssignmentRequestData[];
interface AssignmentRequestWithRequesterData extends AssignmentRequestData {
  requester: {
    name: string;
    username: string;
  };
}

export type ListAssignmentRequestsData = AssignmentRequestWithRequesterData[];
export type GetIdentityInstanceData = {
  instanceArn: string;
  identityStoreId: string;
};
export type UpsertIdentityInstancePayload = GetIdentityInstanceData;
export type ListFreezeTimesData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  creator: {
    name: string;
  };
  note: string | null;
  target: FreezeTimeTarget;
  permissionSets: PermissionSets;
  startTime: string;
  endTime: string;
}[];
export type CreateFreezeTimePayload = {
  note?: string;
  target: FreezeTimeTarget;
  permissionSets: PermissionSets;
  startTime: string;
  endTime: string;
};
export type CreateFreezeTimeData = OkResponse;
export type DeleteFreezeTimesPayload = {
  ids: string[];
};
export type DeleteFreezeTimesData = OkResponse;
export type UpsertIdentityInstanceData = OkResponse;
export type UpdateUserPasswordPayload = {
  oldPassword: string;
  newPassword: string;
};
export type UpdateUserPasswordData = OkResponse;
