import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useAuth } from "../hooks/useAuth";

const spotifyApi = new SpotifyWebApi({
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID as string,
});

type SpotifyApiContextType = typeof spotifyApi & { accessToken: string | null };

const SpotifyApiContext = createContext<SpotifyApiContextType | null>(null);

export const useSpotifyApi = (): SpotifyApiContextType => {
  const context = useContext(SpotifyApiContext);
  if (!context) {
    throw new Error("useSpotifyApi must be used within a SpotifyApiProvider");
  }
  return context;
};

type SpotifyApiProviderProps = {
  children: ReactNode;
  code: string;
};

export const SpotifyApiProvider: React.FC<SpotifyApiProviderProps> = ({
  children,
  code,
}) => {
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
  } else {
    return (
      <SpotifyApiContext.Provider value={{ ...spotifyApi, accessToken }}>
        {children}
      </SpotifyApiContext.Provider>
    );
  }
};
