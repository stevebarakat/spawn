import { createMachine } from "xstate";

export const machine = createMachine(
  {
    id: "fx",
    context: ({ input }) => ({
      name: input.name,
      ef: input.ef,
    }),
    initial: "active",
    states: {
      active: {
        on: {
          "TOGGLE.BYPASS": {
            target: "bypassed",
          },
        },
      },
      bypassed: {
        on: {
          "TOGGLE.BYPASS": {
            target: "active",
          },
        },
      },
    },
    types: { events: {} as { type: "TOGGLE.BYPASS" } },
  },
  {
    actions: {},
    actors: {},
    guards: {},
    delays: {},
  }
);
