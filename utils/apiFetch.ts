import { CustomError } from "./error.handler";
import { HttpStatus } from "./HttpStatus";

export async function apiFetch(api: string, headers: Record<string, string>): Promise<any> {
    try {
        const response = await fetch(api, {
            method: 'GET', 
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        new CustomError('API Error',"Error While Fetching Data", HttpStatus.BAD_REQUEST);
    }
}