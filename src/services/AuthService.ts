import { AxiosError } from "axios";
import { config } from "../configs";
import { AxiosClient } from "../interceptors/AxiosClient";
import { LoginData, RegisterData } from "../interfaces";

export class AuthService {

    async signup(data: RegisterData) {
        console.log(data)
        // const response = await AxiosClient.post('/auth/signup', data);
    }

    login(data: LoginData) {
        console.log(data);
    }

    async connectWGoogle(accessToken: string) {
        try {
            const response = await AxiosClient.get(`/google-auth/connect?access_token=${accessToken}`);
    
            this.setLocalSessionToken(response.data.data.token);
            
            return Promise.resolve(response.data.msg);
        } catch (error) {
            if (error instanceof AxiosError) {
                return Promise.reject(error.message);
            }
            return Promise.reject((error as any));
        }
    }

    setLocalSessionToken(token: string) {
        localStorage.setItem(config.SESSION_TOKEN_NAME, token);
    }

    getLocalSessionToken() {
        let token = localStorage.getItem(config.SESSION_TOKEN_NAME);
        
        if (!token) return null;
        if (token.startsWith('\"') && token.endsWith('\"')) {
            token = token.replace(/"/g, '');
        }
        return token;
    }

    removeLocalSessionToken() {
        localStorage.clear();
    }
}