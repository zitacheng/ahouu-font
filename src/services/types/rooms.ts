export type Room = {
  id: string
  admin: string
  name: string
  max: number
  players: Player[]
  state: RoomState
  messages: Message[]
  private: boolean
};

export enum RoomState {
  LOBBY = 'lobby',
  STARTED = 'started',
  FINISHED = 'finished',
}

export type Player = {
  userId: string
  role: PlayerRole
  state: PlayerState
  won?: boolean
};

export enum PlayerState {
  WAITING_IN_LOBBY = 'waiting-in-lobby',
  AWAKE = 'awake',
  SLEEPING = 'sleeping',
  ROLE_BASED_ACTION = 'role-base-action',
  DEAD = 'dead',
}

export enum PlayerRole {
  NONE = 'none',
  VILLAGER = 'villager',
  WOLF = 'wolf',
  SEER = 'seer',
  WITCH = 'witch',
}

export type Message = {
  type: MessageType
  username?: string
  timestamp: number
  content: string
};

export enum MessageType {
  GENERALE = 'none',
  WOLF = 'none',
  EVENT = 'event',
}

export type RoomCreateInput = Pick<Room, 'name' | 'max'> & { password?: string };

export enum RoomEventsAction {
  JOIN = 'join',
  KICK_USER = 'kick-user',
  LEAVE = 'leave',
  SEND_MESSAGE = 'send-message',
  START = 'start',
  SEND_VOTE = 'send-vote',
  PERFORM_ROLE_BASED_ACTION = 'perform-role-based-action',
}

export enum RoomEventsListener {
  USER_JOINED = 'user-joined',
  USER_LEAVED = 'user-leaved',
  USER_KICKED = 'user-kicked',
  NEW_MESSAGE = 'new-message',
  GAME_STARTED = 'game-started',
  VILLAGE_SLEEPS = 'village-sleeps',
  VILLAGE_AWAKES = 'village-awakes',
  VILLAGE_VOTE = 'village-vote',
  ROLE_BASED_AWAKE = 'role-based-awake',
  ROLE_BASED_ACTION_RESULT = 'role-based-action-result',
  GAME_ENDED = 'game-ended',
}
