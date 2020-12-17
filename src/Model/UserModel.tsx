import { Action, action } from 'easy-peasy';

interface UserInterface {
  pseudo: string;
  card?: number;
  isWolf?: boolean;
  id: number;
  dead?: boolean;
  email?: string;
}

export interface UserModel {
  item?: UserInterface;
  setUser: Action<UserModel, UserInterface>;
}

const user: UserModel = {
  item: undefined,
  setUser: action((state, payload) => {
    // TODO copy || justifier
    state.item = payload; // eslint-disable-line no-param-reassign
  }),
};

export default user;
