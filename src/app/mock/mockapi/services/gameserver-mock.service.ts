import { Injectable } from '@angular/core';
import {GameserverService} from '../../../rest-client/services';
import {Observable, of} from 'rxjs';
import {StrictHttpResponse} from '../../../rest-client/strict-http-response';
import {
  GameContainerConfiguration,
  GameContainerDeployment,
  GameContainerStatus
} from '../../../rest-client/models';
import {ResponseMocks} from './responses/game-container-status';

@Injectable({
  providedIn: 'root'
})
export class GameserverMockService extends GameserverService {
  private static readonly errorTexts = {
    doNotUse: 'Please use the other corresponding function instead!'
  }

  /**
   * Skip HttpClient and ApiConfiguration as we mock everything thus are not needed.
   */
  constructor() {
    super(null, null);
  }

  getStatus$Response(params?: {}): Observable<StrictHttpResponse<Array<GameContainerStatus>>> {
    throw new Error(GameserverMockService.errorTexts.doNotUse);
  }

  getStatus(params?: {}): Observable<Array<GameContainerStatus>> {
    return of(ResponseMocks.GameContainerStatus());
  }

  startContainer$Response(params: { id: string }): Observable<StrictHttpResponse<void>> {
    throw new Error(GameserverMockService.errorTexts.doNotUse);
  }

  startContainer(params: { id: string }): Observable<void> {
    return super.startContainer(params);
  }

  stopContainer$Response(params: { id: string }): Observable<StrictHttpResponse<void>> {
    throw new Error(GameserverMockService.errorTexts.doNotUse);
  }

  stopContainer(params: { id: string }): Observable<void> {
    return super.stopContainer(params);
  }

  restartContainer$Response(params: { id: string }): Observable<StrictHttpResponse<void>> {
    throw new Error(GameserverMockService.errorTexts.doNotUse);
  }

  restartContainer(params: { id: string }): Observable<void> {
    return super.restartContainer(params);
  }

  deployContainer$Response(params: { body: GameContainerDeployment }): Observable<StrictHttpResponse<void>> {
    throw new Error(GameserverMockService.errorTexts.doNotUse);
  }

  deployContainer(params: { body: GameContainerDeployment }): Observable<void> {
    return super.deployContainer(params);
  }

  configureContainer$Response(params: { id: string; body: GameContainerConfiguration }): Observable<StrictHttpResponse<void>> {
    throw new Error(GameserverMockService.errorTexts.doNotUse);
  }

  configureContainer(params: { id: string; body: GameContainerConfiguration }): Observable<void> {
    return super.configureContainer(params);
  }

  deleteContainer$Response(params: { id: string }): Observable<StrictHttpResponse<void>> {
    throw new Error(GameserverMockService.errorTexts.doNotUse);
  }

  deleteContainer(params: { id: string }): Observable<void> {
    return super.deleteContainer(params);
  }

  listTemplates$Response(params?: {}): Observable<StrictHttpResponse<Array<string>>> {
    throw new Error(GameserverMockService.errorTexts.doNotUse);
  }

  listTemplates(params?: {}): Observable<Array<string>> {
    return super.listTemplates(params);
  }
}
