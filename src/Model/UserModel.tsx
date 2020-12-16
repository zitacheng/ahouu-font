import { Action, action } from 'easy-peasy';
import { User } from '../services';

export interface UserModel {
  item?: User;
  setUser: Action<UserModel, User>;
}

const user: UserModel = {
  item: undefined,
  setUser: action((state, payload) => {
    // eslint-disable-next-line no-param-reassign
    state.item = payload;
  }),
};

export default user;
