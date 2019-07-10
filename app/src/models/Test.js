import {types} from 'mobx-state-tree';

export const User = types.model({
    name: types.maybe(types.string),
    male: types.maybe(types.string),
    age: types.maybe(types.number),
})