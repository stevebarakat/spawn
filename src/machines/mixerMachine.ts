import { ActorRefFrom, createMachine, assign, stopChild } from "xstate";
import { trackMachine } from "./trackMachine";

const makeId = () => Math.random().toString(36).substring(7);

export const mixerMachine = createMachine({
  types: {} as {
    context: {
      newTrackName: string;
      tracks: ActorRefFrom<typeof trackMachine>[];
    };
    events:
      | {
          type: "TRACKS.ADD";
          name: string;
        }
      | {
          type: "TRACK.REMOVE";
          index: number;
        };
  },
  id: "tracks",
  context: {
    newTrackName: "",
    tracks: [],
  },
  on: {
    "TRACKS.ADD": {
      guard: ({ event }) => event.name.trim().length > 0,
      actions: assign({
        tracks: ({ context, event, spawn }) =>
          context.tracks.concat(
            spawn(trackMachine, {
              id: `track-${makeId()}`,
              input: {
                name: event.name,
              },
            })
          ),
      }),
    },
    "TRACK.REMOVE": {
      actions: [
        // Stop the track actor to unsubscribe
        stopChild(({ context, event }) => context.tracks[event.index]),
        // Remove the track from the list by index
        assign({
          tracks: ({ context, event }) =>
            context.tracks.filter((_, index) => index !== event.index),
        }),
      ],
    },
  },
});
