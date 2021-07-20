export interface IBill{
    id:string;
    name:string;
    description:string;
    amount:number;
    fileId?:string;
    userId:string;
    status:number;
    createdAt:string;
    updatedAt:string;
    userName:string;
    userEmail:string;
    userRole:number;
    currentAssignedRoleId:number;
    initialAssignedRoleId:number;
    reason:string;
}

export interface IUser{
    id:string;
    name:string;
    email:string;
    role:number;
    token:string;
}