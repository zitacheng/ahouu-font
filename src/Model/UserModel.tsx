import { Action, action } from 'easy-peasy';
import { User } from '../services';

export interface UserModel {
  item?: User;
  setUser: Action<UserModel, User | undefined>;
}

const user: UserModel = {
  item: undefined,
  setUser: action((state, payload) => {
    // TODO copy || justifier
    state.item = payload; // eslint-disable-line no-param-reassign
  }),
};

export default user;
