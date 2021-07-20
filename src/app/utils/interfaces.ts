export interface IBill{
    id:string;
    name:string;
    description:string;
    amount:number;
    fileId?:string;
    userId:string;
    managerAccepted:boolean;
    adminAccepted:boolean;
    managerPending:boolean;
    adminPending:boolean;
    managerRejectionReason:string;
    adminRejectionReason:string;
    userData:IUser;
    createdAt:string;
    updatedAt:string;
}

export interface IUser{
    id:string;
    name:string;
    email:string;
    role:string;
    token:string;
}