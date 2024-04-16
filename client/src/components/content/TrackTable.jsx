import { Fragment } from "react";
import {
  Table,
  Header,
  HeaderCell,
  HeaderRow,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table";
import {
  useSort,
  HeaderCellSort,
} from "@table-library/react-table-library/sort";
import { roundBpm, msToMS, formatDate } from "../../helpers";
import { usePlayerStore } from "../../stores/playerStore";
import useContextMenuStore from "../../stores/contextMenuStore";
import PlayButton from "../reusedComponents/PlayButton";
import useTabsStore from "../../stores/tabStore";
import { resize, theme } from "./trackTableTheme";

export default function TrackTable({
  playlistData,
  search = "",
  type,
  allTracksLoaded = true,
  fetchArtistData,
}) {
  const { showContextMenu } = useContextMenuStore((state) => state);
  const { playingTrack, setPlayingTrack } = usePlayerStore((state) => state);
  const { onOpenTab } = useTabsStore((state) => state);

  const nodes = playlistData.tracks.items;

  const data = {
    nodes: nodes.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    ),
  };

  const sort = useSort(
    data,
    {},
    {
      sortFns: {
        NUMBER: (array) => array.sort((a, b) => b.order - a.order),
        TITLE: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        DURATION: (array) =>
          array.sort((a, b) => b.duration_ms - a.duration_ms),
        TEMPO: (array) =>
          array.sort((a, b) => b.analysis.tempo - a.analysis.tempo),
        KEY: (array) =>
          array.sort((a, b) => b.analysis.sortKey - a.analysis.sortKey),
      },
    },
  );

  return (
    <div className="flex flex-col gap-9">
      <Table
        data={data}
        sort={sort}
        theme={theme(type)}
        layout={{ custom: true }}
      >
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                {type === "playlist" && (
                  <HeaderCellSort resize={resize} sortKey="NUMBER">
                    #
                  </HeaderCellSort>
                )}
                <HeaderCell></HeaderCell>
                <HeaderCellSort resize={resize} sortKey="TITLE">
                  Title
                </HeaderCellSort>
                {type === "playlist" && (
                  <HeaderCellSort resize={resize}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" />
                      <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                      <path d="M15 3v4" />
                      <path d="M7 3v4" />
                      <path d="M3 11h16" />
                      <path d="M18 16.496v1.504l1 1" />
                    </svg>
                  </HeaderCellSort>
                )}
                <HeaderCellSort resize={resize} sortKey="DURATION">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 7v5l2 2" />
                    <path d="M17 22l5 -3l-5 -3z" />
                    <path d="M13.017 20.943a9 9 0 1 1 7.831 -7.292" />
                  </svg>
                </HeaderCellSort>
                <HeaderCellSort resize={resize} sortKey="TEMPO">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14.153 8.188l-.72 -3.236a2.493 2.493 0 0 0 -4.867 0l-3.025 13.614a2 2 0 0 0 1.952 2.434h7.014a2 2 0 0 0 1.952 -2.434l-.524 -2.357m-4.935 1.791l9 -13" />
                    <path d="M20 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  </svg>
                </HeaderCellSort>
                <HeaderCellSort resize={resize} sortKey="KEY">
                  <div className="flex border text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                      <path d="M9 19v-6" />
                      <path d="M8 5v8h2v-8" />
                      <path d="M15 19v-6" />
                      <path d="M14 5v8h2v-8" />
                    </svg>
                  </div>
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((track) => (
                <Row
                  item={track}
                  key={track.id}
                  onDoubleClick={() => setPlayingTrack(track.uri)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    showContextMenu(e.pageX, e.pageY, [
                      { name: "add to queue" },
                      { name: "remove from playlist" },
                      { name: "like" },
                    ]);
                  }}
                >
                  {type === "playlist" && <Cell>{track.order}</Cell>}
                  <Cell>
                    <PlayButton uri={track.uri} />
                  </Cell>
                  <Cell>
                    <div className="my-2">
                      <div
                        className={`px-1 text-lg font-medium  ${playingTrack === track.uri ? "text-sgreen" : "text-white"}`}
                      >
                        {track.name}
                      </div>
                      <div className="px-1 text-neutral-400 text-sm">
                        {track.artists.map((artist, index) => {
                          return (
                            <Fragment key={artist.id}>
                              <a
                                key={artist.id}
                                className="hover:text-neutral-200 hover:cursor-pointer hover:underline"
                                onClick={() => {
                                  onOpenTab({
                                    type: "artist",
                                    artistId: artist.id,
                                    name: artist.name,
                                  });
                                }}
                              >
                                {artist.name}
                              </a>
                              {index < track.artists.length - 1 ? ", " : ""}
                            </Fragment>
                          );
                        })}
                      </div>
                    </div>
                  </Cell>
                  {type === "playlist" && (
                    <Cell>{formatDate(track.added_at)}</Cell>
                  )}
                  <Cell>
                    <div className="">{msToMS(track.duration_ms)}</div>
                  </Cell>
                  <Cell>
                    <div className="">{roundBpm(track.analysis.tempo)}</div>
                  </Cell>
                  <Cell>
                    <div className="">{track.analysis.key}</div>
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
      {!allTracksLoaded && (
        <div
          className="flex items-center justify-center bg-sgreen rounded-lg w-32 h-12 mr-auto ml-auto cursor-pointer"
          onClick={fetchArtistData}
        >
          <div className="text-neutral-900 text-lg">Load More</div>
        </div>
      )}
    </div>
  );
}
