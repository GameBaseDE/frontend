/* tslint:disable */
export interface GameServerDeployTemplate  {

  /**
   * Docker image of game server
   */
  image?: string;

  /**
   * UUID of owner whom this server belongs to
   */
  ownerId?: string;
}
