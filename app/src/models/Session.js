import { types } from "mobx-state-tree";

export const Session = types.model({
  session: types.maybe(types.identifier)
});
