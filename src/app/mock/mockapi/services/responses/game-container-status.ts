import {GameContainerStatus, RestartBehavior, Status} from '../../../../rest-client/models';

export class ResponseMocks {
  public static GameContainerStatus = (): Array<GameContainerStatus> => {
    return [
      {
        id: 'string',
        status: Status.Unknown,
        configuration: {
          details: {
            serverName: 'string',
            ownerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            description: 'string'
          },
          resources: {
            templatePath: 'string',
            ports: {
              tcp: [
                0
              ],
              udp: [
                0
              ]
            },
            memory: 0,
            startupArgs: 'string',
            restartBehavior: RestartBehavior.None,
            environmentVars: {
              additionalProp1: 'string',
              additionalProp2: 'string',
              additionalProp3: 'string'
            }
          }
        },
        gameServerDetails: {
          additionalProp1: 'string',
          additionalProp2: 'string',
          additionalProp3: 'string'
        }
      },
    ]
  }
}
