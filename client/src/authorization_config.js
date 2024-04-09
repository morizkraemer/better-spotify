const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const scopes = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "app-remote-control",
  "streaming",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-follow-modify",
  "user-follow-read",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "user-library-modify",
  "user-read-email",
  "user-read-private",
  "user-library-read",
].join("%20");

const redirect_uri = import.meta.env.VITE_CLIENT_URL;
const state = "some-random-shit";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scopes}&state=${state}`;

export { AUTH_URL };
