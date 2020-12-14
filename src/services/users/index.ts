import axios from '../axios';
import { RegisterInput, User } from '../types';

/**
 * ### Creates and authenticates a user
 *
 * ---
 *
 * @example
 * ```typescript
 *  try {
 *    const { user, token } = await services.users.register({
 *      email: `test@mail.com`,
 *      username: 'test-user',
 *      password: 'azerty',
 *    });
 *  } catch (e) {
 *    switch (e.message) {
 *      case 'auth/invalid-body':
 *        break;
 *      case 'auth/invalid-email':
 *        break;
 *      case 'auth/invalid-password':
 *        break;
 *      case 'auth/user-already-in-use':
 *        break;
 *      default:
 *        break;
 *    }
 *  }
 * ```
 *
 * ---
 *
 * @error **auth/invalid-body** - Thrown if the body is missing or empty
 * @error **auth/invalid-email** - Thrown if the email is missing or empty
 * @error **auth/invalid-password** - Thrown if the password is missing or empty
 * @error **auth/user-already-in-use** - Thrown if the given email or username is already used
 * @error **generic/server-error** - Thrown if the no response was received from the server
 * @error **generic/network-error** - Thrown if the any other error occurred
 * (i.e: network error, server unreachable, ...)
 */
export const register = async (input: RegisterInput) => {
  const { data: { user } } = await axios.post('/register', input);

  return user as User;
};

/**
 * ### Authenticates a user
 *
 * ---
 *
 * @example
 * ```typescript
 *  try {
 *    const user = await services.users.signIn('test@mail.com', 'azerty');
 *  } catch (e) {
 *    console.log(e);
 *    switch (e.message) {
 *      case 'auth/invalid-body':
 *        break;
 *      case 'auth/invalid-email':
 *        break;
 *      case 'auth/invalid-password':
 *        break;
 *      case 'auth/user-not-found':
 *        break;
 *      default:
 *        break;
 *    }
 *  }
 * ```
 *
 * ---
 *
 * @error **auth/invalid-body** - Thrown if the body is missing or empty
 * @error **auth/invalid-email** - Thrown if the email is missing or empty
 * @error **auth/invalid-password** - Thrown if the password is missing or empty
 * @error **auth/user-not-found** - Thrown if the given email does not exists
 * @error **generic/server-error** - Thrown if the no response was received from the server
 * @error **generic/network-error** - Thrown if the any other error occurred
 * (i.e: network error, server unreachable, ...)
 */
export const signIn = async (email: string, password: string) => {
  const { data: { user } } = await axios.post('/login', { email, password });

  return user as User;
};
