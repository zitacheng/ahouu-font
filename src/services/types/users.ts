export type User = {
  id: string
  email: string
  username: string
  picture?: string
  rooms: string[]
  token: string
};

export type RegisterInput = {
  email: string
  password: string
  username: string
  // picture?: File // TODO: handle File
};
