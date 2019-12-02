export enum Status {
  RUNNING,
  RESTARTING,
  STOPPED,
  ERROR
}

export class GameServerStatus {
  id: string;
  image: string;
  status: Status;
  ports: number[];
  slots: number;
}
