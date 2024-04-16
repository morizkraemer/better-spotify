import { useEffect, useState, Fragment } from "react";
import { useSpotifyApi } from "../../context/SpotifyApiContext";
import ArtistView from "./ArtistView";
import { prepareTracklist } from "../../hooks/prepareTracklist";

export default function ArtistDataFetcher({ artistId }) {
  const { spotifyApi } = useSpotifyApi();
  const [artist, setArtist] = useState(null);
  const [allTracksLoaded, setAllTracksLoaded] = useState(false);
  const limit = 20;
  const [offset, setOffset] = useState(0);

  async function fetchArtistData() {
    if (allTracksLoaded) return;
    try {
      const artistResponse = await spotifyApi.getArtist(artistId);
      const { body: artistResponseBody } = artistResponse;
      const artistName = artistResponse.body.name;
      const songsResponse = await spotifyApi.searchTracks(
        `artist:${artistName}`,
        { limit, offset },
      );
      setOffset((prev) => (prev += limit));
      songsResponse.body.tracks.items = songsResponse.body.tracks.items.map(
        (t) => {
          return {
            track: t,
          };
        },
      );
      const preparedTracklist = await prepareTracklist(
        songsResponse,
        spotifyApi,
      );
      if (!artist?.tracks) {
        artistResponseBody.tracks = preparedTracklist;
      } else {
        artistResponseBody.tracks = {
          tracks: {
            items: [
              ...artist.tracks.tracks.items,
              ...preparedTracklist.tracks.items,
            ],
          },
        };
      }
      if (offset + limit >= songsResponse.body.tracks.total) {
        setAllTracksLoaded(true);
      }
      setArtist(artistResponseBody);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchArtistData();
  }, [artistId]);

  return (
    artist && (
      <ArtistView
        artist={artist}
        allTracksLoaded={allTracksLoaded}
        fetchArtistData={fetchArtistData}
      />
    )
  );
}
