import { useState, useEffect } from "react";
import axios from "axios";
export function useAuth(code) {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);

  const apiURL = import.meta.env.VITE_API_URL;

  const authServerAxios = axios.create({
    baseURL: apiURL,
    timeout: 3000,
  });

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        if (code) {
          window.history.pushState({}, null, "/");
          const response = await authServerAxios.post("/login", {
            code,
          });
          setAccessToken(response.data.access_token);
          setRefreshToken(response.data.refresh_token);
          setExpiresIn(response.data.expires_in);
        }
      } catch (err) {
        console.log(err);
        window.location = "/";
      }
    };

    fetchTokens();
  }, [code]);

  useEffect(() => {
    const refreshTokens = async () => {
      if (!refreshToken || !expiresIn) return;
      try {
        const response = await authServerAxios.post("/refresh", {
          refreshToken,
        });
        setAccessToken(response.data.access_token);
        setExpiresIn(response.data.expires_in);
      } catch {}
    };
    const interval = setInterval(
      () => {
        refreshTokens();
      },
      (expiresIn - 60) * 1000,
    );
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
