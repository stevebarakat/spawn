import { useMachine } from "@xstate/react";
import { mixerMachine } from "./machines/mixerMachine";
import Track from "./Track";

function Mixer() {
  const [state, send] = useMachine(mixerMachine);

  return (
    <div className="app">
      <h2>Tracks</h2>
      <div className="tracksTable">
        {state.context.tracks.map((track, index) => {
          return (
            <Track
              key={track.id}
              track={track}
              onRemove={() => send({ type: "TRACK.REMOVE", index })}
            />
          );
        })}
      </div>

      <select
        onChange={(e) => {
          send({
            type: "TRACKS.ADD",
            name: e.currentTarget.value,
          });
        }}
      >
        <option value="">Add Track:</option>
        <option value="delay">Delay</option>
        <option value="pitchShift">Pitch Shift</option>
      </select>
    </div>
  );
}

export default Mixer;
