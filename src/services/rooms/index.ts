import axios from '../axios';
import { Room, RoomCreateInput, User } from '../types';

/**
 * ### Verifies user's token
 *
 * ---
 *
 * @example
 * ```typescript
 *  try {
 *    const user = await services.rooms.create({
 *      name: 'room-name',
 *      max: 8,
 *      password: 'azerty'
 *    });
 *  } catch (e) {
 *    switch (e.message) {
 *       case 'auth/invalid-token':
 *        // Redirect to login page
 *        break;
 *      case 'rooms/invalid-body':
 *      case 'rooms/invalid-max':
 *      case 'rooms/invalid-password':
 *        // Wrong user input
 *        break;
 *      case 'rooms/name-already-in-use':
 *        // Name already used
 *        break;
 *      default:
 *        break;
 *    }
 *  }
 * ```
 *
 * ---
 *
 * @error **auth/invalid-token** - Thrown if the given token has expired
 * * All requests will result in a "auth/invalid-token" error
 * * The token must be refreshed
 * * The user must immediately be redirected to the login page
 * @error **rooms/invalid-body** - Thrown if the body is missing or empty
 * @error **rooms/invalid-max** - Thrown if the given max number of players is below 6 or above 12
 * @error **rooms/invalid-password** - Thrown if the password strength is not sufficient
 * (letters and/or numbers only, at least 6 characters)
 * @error **rooms/name-already-in-use** - Thrown if the given room name is already used
 * @error **generic/server-error** - Thrown if the no response was received from the server
 * @error **generic/network-error** - Thrown if the any other error occurred
 * (i.e: network error, server unreachable, ...)
 */
// eslint-disable-next-line import/prefer-default-export
export const create = async (current: User, input: RoomCreateInput): Promise<Room> => {
  const res = await axios.post('/rooms/create', input, { user: current });

  const { room } = res.data as { room: Room };
  return room;
};
