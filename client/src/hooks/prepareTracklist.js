import { getCamelot } from "../helpers";
export async function prepareTracklist(playlistResponse, spotifyApi) {
  const trackIds = playlistResponse.body.tracks.items.map((t) => t.track.id);
  const analysisResponse = await spotifyApi.getAudioFeaturesForTracks(trackIds);

  const { body: playlistResponseBody } = playlistResponse;
  const { body: analysisResponseBody } = analysisResponse;
  const analysisData = analysisResponseBody.audio_features.map(
    ({ key, mode, ...rest }) => {
      const [rank, camelotKey] = getCamelot(key, mode).split(".");
      return { ...rest, key: camelotKey, sortKey: rank };
    },
  );

  const data = playlistResponseBody.tracks.items.map(
    ({ track, added_at, added_by }, index) => {
      const trackObject = {
        order: index,
        artists: track.artists,
        name: track.name,
        duration_ms: track.duration_ms,
        id: track.id,
        popularity: track.popularity,
        analysis: analysisData[index],
        uri: track.uri,
        added_at,
        ...(added_by?.id && { added_by: added_by?.id }),
      };
      delete trackObject.analysis.analysis_url;
      delete trackObject.analysis.id;
      delete trackObject.analysis.track_href;
      delete trackObject.analysis.uri;
      delete trackObject.analysis.type;
      return trackObject;
    },
  );
  playlistResponseBody.tracks.items = data;
  delete playlistResponseBody.href;
  delete playlistResponseBody.primary_color;
  delete playlistResponseBody.snapshot_id;
  delete playlistResponseBody.tracks.href;
  delete playlistResponseBody.tracks.limit;
  delete playlistResponseBody.tracks.next;
  delete playlistResponseBody.tracks.offset;
  delete playlistResponseBody.tracks.previous;
  if (playlistResponseBody.owner) {
    delete playlistResponseBody.owner.href;
    delete playlistResponseBody.owner.type;
  }
  delete playlistResponseBody.external_urls;
  return playlistResponseBody;
}
