import { Injectable } from '@angular/core';
import {GameserverService} from '../../../rest-client/services';
import {ApiConfiguration} from '../../../rest-client/api-configuration';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StrictHttpResponse} from '../../../rest-client/strict-http-response';
import {GameContainerConfiguration, GameContainerDeployment, GameContainerStatus} from '../../../rest-client/models';

@Injectable({
  providedIn: 'root'
})
export class GameserverMockService extends GameserverService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  getStatus$Response(params?: {}): Observable<StrictHttpResponse<Array<GameContainerStatus>>> {
    return super.getStatus$Response(params);
  }

  getStatus(params?: {}): Observable<Array<GameContainerStatus>> {
    return super.getStatus(params);
  }

  startContainer$Response(params: { id: string }): Observable<StrictHttpResponse<void>> {
    return super.startContainer$Response(params);
  }

  startContainer(params: { id: string }): Observable<void> {
    return super.startContainer(params);
  }

  stopContainer$Response(params: { id: string }): Observable<StrictHttpResponse<void>> {
    return super.stopContainer$Response(params);
  }

  stopContainer(params: { id: string }): Observable<void> {
    return super.stopContainer(params);
  }

  restartContainer$Response(params: { id: string }): Observable<StrictHttpResponse<void>> {
    return super.restartContainer$Response(params);
  }

  restartContainer(params: { id: string }): Observable<void> {
    return super.restartContainer(params);
  }

  deployContainer$Response(params: { body: GameContainerDeployment }): Observable<StrictHttpResponse<void>> {
    return super.deployContainer$Response(params);
  }

  deployContainer(params: { body: GameContainerDeployment }): Observable<void> {
    return super.deployContainer(params);
  }

  configureContainer$Response(params: { id: string; body: GameContainerConfiguration }): Observable<StrictHttpResponse<void>> {
    return super.configureContainer$Response(params);
  }

  configureContainer(params: { id: string; body: GameContainerConfiguration }): Observable<void> {
    return super.configureContainer(params);
  }

  deleteContainer$Response(params: { id: string }): Observable<StrictHttpResponse<void>> {
    return super.deleteContainer$Response(params);
  }

  deleteContainer(params: { id: string }): Observable<void> {
    return super.deleteContainer(params);
  }

  listTemplates$Response(params?: {}): Observable<StrictHttpResponse<Array<string>>> {
    return super.listTemplates$Response(params);
  }

  listTemplates(params?: {}): Observable<Array<string>> {
    return super.listTemplates(params);
  }
}
