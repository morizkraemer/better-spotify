import express from "express";

import SpotifyWebApi from "spotify-web-api-node";
import cors from "cors";
import morgan from "morgan";

const PORT = 8080;
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.CLIENT_URL;

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

const spotifyWebApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri,
});

app.post("/login", async (req, res) => {
  const { code } = req.body;
  if (!code) return;
  try {
    const data = await spotifyWebApi.authorizationCodeGrant(code);
    res.json(data.body);
  } catch (error) {
    // console.log(error);
    res.sendStatus(450);
  }
});

app.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  spotifyWebApi.setRefreshToken(refreshToken);
  const data = await spotifyWebApi.refreshAccessToken();
  res.json({
    accessToken: data.body.access_token,
    expiresIn: data.body.expires_in,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
