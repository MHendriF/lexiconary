import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
import { colorPlayer } from "@/utils/colorPlayer";

export default function VoicePlayer({ ...props }: any) {
  const { word, trackList } = props;
  console.log("🚀 ~ VoicePlayer ~ trackList:", trackList);
  console.log("🚀 ~ VoicePlayer ~ word:", word);

  return (
    <div className="mt-4">
      {trackList.length > 0 ? (
        <>
          <h1 className="text-black">{word}</h1>
          <Player
            includeTags={false}
            includeSearch={false}
            showPlaylist={false}
            sortTracks={false}
            autoPlayNextTrack={false}
            trackList={trackList}
            customColorScheme={colorPlayer}
          />
        </>
      ) : (
        <h1 className="text-black">No Track List</h1>
      )}
    </div>
  );
}
