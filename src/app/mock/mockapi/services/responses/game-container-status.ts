import {GameContainerStatus, Protocol, RestartBehavior, Status} from '../../../../rest-client/models';

export class ResponseMocks {
  static GameContainerStatus = (): Array<GameContainerStatus> => {
    return [
      {
        id: 'string',
        status: Status.Unknown,
        configuration: {
          details: {
            serverName: 'string',
            description: 'string'
          },
          resources: {
            templatePath: 'string',
            ports: [
              {
                protocol: Protocol.Tcp,
                nodePort: 0,
                containerPort: 0
              }, {
                protocol: Protocol.Udp,
                nodePort: 1,
                containerPort: 1
              }
            ],
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

  static TemplatesList(): Array<string> {
    return ['minecraft:latest', 'my/custom/template', 'my/custom/template2']
  }
}
