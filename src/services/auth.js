export const TOKEN_KEY = "@vacine-token";
export const TOKEN_REFRESH_KEY = "@vacine-token_refresh";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;


export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(TOKEN_REFRESH_KEY);

export const login = (token, refreshToken) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_REFRESH_KEY, refreshToken);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const setSession = (token, refreshToken) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_REFRESH_KEY, refreshToken);
}