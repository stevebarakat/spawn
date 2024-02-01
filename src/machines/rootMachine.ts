import { createActorContext } from "@xstate/react";
import { createMachine, assign, fromPromise, createActor } from "xstate";

export const toggleMachine = createMachine({
  initial: "inactive",
  states: {
    inactive: {
      on: {
        toggle: {
          target: "active",
        },
      },
    },
    active: {
      on: {
        toggle: {
          target: "inactive",
        },
      },
    },
  },
});

export const rootMachine = createMachine(
  {
    initial: "first",
    entry: assign({
      ref: ({ spawn }) => spawn(createMachine(toggleMachine)),
    }),
    states: {
      first: {},
    },
    types: { events: {} as { type: "next" } },
  },
  {
    actions: {},
    actors: {},
    guards: {},
    delays: {},
  }
);

export const rootMachineContext = createActorContext(rootMachine);
