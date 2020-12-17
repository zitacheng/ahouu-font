import { createStore, createTypedHooks, persist } from 'easy-peasy';
import user, { UserModel } from './Model/UserModel';

type Store = {
  user: UserModel
};

const store = createStore(persist({ user }));

const { useStoreActions, useStoreState, useStoreDispatch } = createTypedHooks<Store>();

export { useStoreActions, useStoreDispatch, useStoreState };

export default store;
