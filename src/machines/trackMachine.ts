import { createMachine } from "xstate";

export const trackMachine = createMachine({
  id: "track",
  types: {} as {
    context: {
      name: string;
    };
    input: {
      name: string;
    };
  },
  initial: "reading",
  context: ({ input }) => ({
    name: input.name,
  }),
  states: {
    reading: {},
  },
});
