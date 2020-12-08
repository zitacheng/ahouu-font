import { createStore, createTypedHooks } from 'easy-peasy';
import user, { UserModel } from './Model/UserModel';

const store = createStore(user, {
  name: 'store',
});

const { useStoreActions, useStoreState, useStoreDispatch } = createTypedHooks<UserModel>();

export { useStoreActions, useStoreDispatch, useStoreState };

export default store;
