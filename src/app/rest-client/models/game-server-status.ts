/* tslint:disable */
export interface GameServerStatus  {

  /**
   * Indentifier of game
   */
  gameTag: string;

  /**
   * ID of container
   */
  id: string;

  /**
   * Image used in Docker
   */
  image: string;
  map?: string;
  mapRotation?: Array<string>;
  message: any;

  /**
   * Current players on server
   */
  playerCount?: number;

  /**
   * Ports used by game server
   */
  ports: Array<number>;

  /**
   * Max. players allowed
   */
  slots?: number;
  state: Array<'running' | 'restarting' | 'stopped' | 'error' | 'unknown'>;
}
