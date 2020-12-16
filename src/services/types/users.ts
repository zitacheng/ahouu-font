export type User = {
  id: string
  email: string
  username: string
  picture?: string
  rooms: string[]
  token: string
};

export type UserRegisterInput = {
  email: string
  password: string
  username: string
  picture?: File
};

export type UserUpdateInput = {
  email: string
  password: string
  username: string
  picture?: File
};
