import { AxiosError } from "axios";
import { config } from "../configs";
import { AxiosClient } from "../interceptors/AxiosClient";
import { LoginData, RegisterData, UserInfo } from "../interfaces";
import { initializeDB, Stores } from "../lib/db";

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

    async getUserInfo() {
        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.UserInfo, 'readonly');
            const store = tx.objectStore(Stores.UserInfo);

            const userInfo = await store.getAll();

            await tx.done;

            return userInfo.length > 0 ? userInfo[0] : null;
        } catch (error) {
            console.error(error);
        }
    }

    async saveUserInfo(userInfo: UserInfo) {
        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.UserInfo, 'readwrite');
            const store = tx.objectStore(Stores.UserInfo);

            const userInfoFound = await store.get(userInfo.id);

            if (!userInfoFound) {
                await store.add(userInfo);
            }

            await store.put(userInfo);
            await tx.done;
        } catch (error) {
            console.error(error);
        }
    }

    async removeUserInfo() {
        try {
            const db = await initializeDB();
            const tx = db.transaction(Stores.UserInfo, 'readwrite');
            const store = tx.objectStore(Stores.UserInfo);

            await store.clear();

            await tx.done;
        } catch (error) {
            console.error(error);
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