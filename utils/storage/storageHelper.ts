import { deleteCookie, getCookie, setCookie } from "cookies-next";

export const clearAllCookies = () => {
    // clear all cookies
    const allCookies = document.cookie.split(";").map((c) => c.split("=")[0].trim());
    // allCookies.forEach((name) => {
    //     deleteCookie(name, { path: "/" });
    // });
};

export const clearLocalStorage = () => {
    localStorage.clear();
}

export const clearSessionStorage = () => {
    sessionStorage.clear();
}

export const clearAllStorage = () => {
    clearAllCookies();
    localStorage.clear();
    clearSessionStorage();
}

export const deleteStorage = (key: string) => {
    console.log("Deletin the key " + key + " value ")
    localStorage.removeItem(key);
}

export const getCookieByKey = (key: string) => {
    return getCookie(key);
}

export const deleteCookieByKey = (key: string) => {
    return deleteCookie(key);
}

export const getLocalStorageItem = (key: string): any => {
    return localStorage.getItem(key);
}

export const setLocalStorageItem = (key: string, value: string): any => {
    localStorage.setItem(key, value);
}


export const setToken = (token: string) => {
    const maxAge: number = Number(process.env.NEXT_PUBLIC_COOKIE_TOKEN_EXPIRE_TIME) || 60 * 60 * 24 * 30; //30 days
    setCookie("authToken", token, {
        maxAge,
        path: "/",
        secure: process.env.NEXT_PUBLIC_NODE_ENV == "prod",
        sameSite: "strict",
    });
    setLocalStorageItem("authToken", token);
};

export const getToken = () => {
    const token = getCookieByKey("authToken") || getLocalStorageItem("authToken");
    return token;
};

export const setRefreshToken = (token: string) => {
    const maxAge: number = Number(process.env.NEXT_PUBLIC_COOKIE_TOKEN_EXPIRE_TIME) || 60 * 60 * 24 * 60; //60 days
    setCookie("refreshToken", token, {
        maxAge,
        path: "/",
        secure: process.env.NEXT_PUBLIC_NODE_ENV == "prod",
        sameSite: "strict",
    });
    setLocalStorageItem("refreshToken", token);
};

export const getRefreshToken = () => {
    const token = getCookieByKey("refreshToken") || getLocalStorageItem("refreshToken");
    return token;
};

export const clearBothToken = () => {
    deleteCookie("authToken");
    deleteStorage("authToken");
    deleteCookie("refreshToken");
    deleteStorage("refreshToken");
}



export const clearIndexDB = async () => {
    if ("indexedDB" in window) {
        const databases = await indexedDB.databases?.();
        if (databases) {
            databases.forEach((db: any) => {
                if (db.name) indexedDB.deleteDatabase(db.name);
            });
        }
    }
}

export const clearChache = async () => {
    if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
    }
}


export const clearAllTypesOfStorage = async () => {
    clearAllStorage();
    clearChache();
    clearIndexDB();
};
