import { environment } from "src/environments/environment";

const BASE_URL = environment.backendBaseUrl;

export const SIGN_IN = `${BASE_URL}/user/signin`;
export const REFRESH = `${BASE_URL}/user/refresh`;
export const LOGOUT = `${BASE_URL}/user/logout`;

export const GET_BILLS = `${BASE_URL}/bill`;
export const ADD_BILL = GET_BILLS;
export const UPLOAD_BILL = `${GET_BILLS}/upload`;
export const GET_BILL = (billId:string) => `${ADD_BILL}/${billId}`;
export const MANAGER_UPDATE = (billId:string) =>`${GET_BILL(billId)}/managerOperation`;
export const ADMIN_UPDATE = (billId:string) =>`${GET_BILL(billId)}/adminOperation`;



