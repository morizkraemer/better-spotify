import React, { createContext, useContext, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useAuth } from "../hooks/useAuth";

const spotifyApi = new SpotifyWebApi({
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
});

const SpotifyApiContext = createContext(spotifyApi);

export const useSpotifyApi = () => useContext(SpotifyApiContext);

export const SpotifyApiProvider = ({ children, code }) => {
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAuth(code);

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      setIsLoading(false);
    }
  }, [accessToken]);

  if (isLoading) {
    return <div>is Loading...</div>;
  }
  return (
    <SpotifyApiContext.Provider value={{ spotifyApi, accessToken }}>
      {children}
    </SpotifyApiContext.Provider>
  );
};
