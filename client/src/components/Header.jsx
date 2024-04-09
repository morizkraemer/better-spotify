import React, { useEffect, useState } from "react";
import { useSpotifyApi } from "../context/SpotifyApiContext";

export default function Header() {
  const { spotifyApi } = useSpotifyApi();
  const [userObject, setUserObject] = useState("");
  const spotifyAccessToken = spotifyApi.getAccessToken();
  const beatportAccessToken = false; //for now, no beatport integration

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const me = await spotifyApi.getMe();
        setUserObject(me.body);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [spotifyApi]);

  return (
    <div className="flex items-center justify-between p-2">
      <h1 className="text-2xl font-bold">Dotify???</h1>
      <div className="flex items-center">
        <div className="flex items-center mx-9 gap-5">
          <svg
            fill="#000000"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={beatportAccessToken ? "fill-bblue" : "fill-neutral-500"}
          >
            <path d="M14.668 24c-3.857 0-6.935-3.039-6.935-6.974a6.98 6.98 0 0 1 1.812-4.714l-4.714 4.714-2.474-2.474 5.319-5.26c.72-.72 1.09-1.656 1.09-2.688V0h3.487v6.604c0 2.026-.72 3.74-2.123 5.143l-.156.156a6.945 6.945 0 0 1 4.694-1.812c3.955 0 6.975 3.136 6.975 6.935A6.943 6.943 0 0 1 14.668 24zm0-10.714c-2.123 0-3.779 1.753-3.779 3.74 0 2.045 1.675 3.78 3.78 3.78a3.804 3.804 0 0 0 3.818-3.78c0-2.065-1.715-3.74-3.819-3.74z" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={spotifyAccessToken ? "fill-sgreen" : "fill-neutral-500"}
            width="24"
            height="24"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </div>
        {userObject.display_name}
        {userObject.images?.length > 0 && (
          <img
            src={userObject.images[0].url}
            alt="User profile"
            className="rounded-full mx-3"
          />
        )}
      </div>
    </div>
  );
}
