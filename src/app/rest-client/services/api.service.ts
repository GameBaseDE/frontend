/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { GameServerConfigurationTemplate } from '../models/game-server-configuration-template';
import { GameServerDeployTemplate } from '../models/game-server-deploy-template';
import { GameServerImages } from '../models/game-server-images';
import { GameServerStatus } from '../models/game-server-status';


/**
 * REST API v1
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getStatus
   */
  static readonly GetStatusPath = '/api';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStatus()` instead.
   *
   * This method doesn't expect any response body
   */
  getStatus$Response(params: {

    /**
     * ID of the desired container
     */
    id: string;

  }): Observable<StrictHttpResponse<Array<GameServerStatus>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.GetStatusPath, 'get');
    if (params) {

      rb.query('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<GameServerStatus>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getStatus$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  getStatus(params: {

    /**
     * ID of the desired container
     */
    id: string;

  }): Observable<Array<GameServerStatus>> {

    return this.getStatus$Response(params).pipe(
      map((r: StrictHttpResponse<Array<GameServerStatus>>) => r.body as Array<GameServerStatus>)
    );
  }

  /**
   * Path part for operation startContainer
   */
  static readonly StartContainerPath = '/api/start/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `startContainer()` instead.
   *
   * This method doesn't expect any response body
   */
  startContainer$Response(params: {

    /**
     * ID of game server to start
     */
    id: string;

  }): Observable<StrictHttpResponse<Array<GameServerStatus>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.StartContainerPath, 'get');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<GameServerStatus>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `startContainer$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  startContainer(params: {

    /**
     * ID of game server to start
     */
    id: string;

  }): Observable<Array<GameServerStatus>> {

    return this.startContainer$Response(params).pipe(
      map((r: StrictHttpResponse<Array<GameServerStatus>>) => r.body as Array<GameServerStatus>)
    );
  }

  /**
   * Path part for operation stopContainer
   */
  static readonly StopContainerPath = '/api/stop/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `stopContainer()` instead.
   *
   * This method doesn't expect any response body
   */
  stopContainer$Response(params: {

    /**
     * ID of game server to stop
     */
    id: string;

  }): Observable<StrictHttpResponse<Array<GameServerStatus>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.StopContainerPath, 'get');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<GameServerStatus>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `stopContainer$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  stopContainer(params: {

    /**
     * ID of game server to stop
     */
    id: string;

  }): Observable<Array<GameServerStatus>> {

    return this.stopContainer$Response(params).pipe(
      map((r: StrictHttpResponse<Array<GameServerStatus>>) => r.body as Array<GameServerStatus>)
    );
  }

  /**
   * Path part for operation restartContainer
   */
  static readonly RestartContainerPath = '/api/restart/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `restartContainer()` instead.
   *
   * This method doesn't expect any response body
   */
  restartContainer$Response(params: {

    /**
     * ID of game server to restart
     */
    id: string;

  }): Observable<StrictHttpResponse<Array<GameServerStatus>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.RestartContainerPath, 'get');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<GameServerStatus>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `restartContainer$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  restartContainer(params: {

    /**
     * ID of game server to restart
     */
    id: string;

  }): Observable<Array<GameServerStatus>> {

    return this.restartContainer$Response(params).pipe(
      map((r: StrictHttpResponse<Array<GameServerStatus>>) => r.body as Array<GameServerStatus>)
    );
  }

  /**
   * Path part for operation deployContainer
   */
  static readonly DeployContainerPath = '/api/deploy';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deployContainer()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  deployContainer$Response(params: {

  
  /**
   * Game server template which will be used for server creation
   */
  body: GameServerDeployTemplate
  }): Observable<StrictHttpResponse<Array<GameServerStatus>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeployContainerPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<GameServerStatus>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deployContainer$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  deployContainer(params: {

  
  /**
   * Game server template which will be used for server creation
   */
  body: GameServerDeployTemplate
  }): Observable<Array<GameServerStatus>> {

    return this.deployContainer$Response(params).pipe(
      map((r: StrictHttpResponse<Array<GameServerStatus>>) => r.body as Array<GameServerStatus>)
    );
  }

  /**
   * Path part for operation configureContainer
   */
  static readonly ConfigureContainerPath = '/api/configure';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `configureContainer()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  configureContainer$Response(params: {

  
  /**
   * Configuration for game server
   */
  body: GameServerConfigurationTemplate
  }): Observable<StrictHttpResponse<Array<GameServerStatus>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.ConfigureContainerPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<GameServerStatus>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `configureContainer$Response()` instead.
   *
   * This method sends `application/json` and handles response body of type `application/json`
   */
  configureContainer(params: {

  
  /**
   * Configuration for game server
   */
  body: GameServerConfigurationTemplate
  }): Observable<Array<GameServerStatus>> {

    return this.configureContainer$Response(params).pipe(
      map((r: StrictHttpResponse<Array<GameServerStatus>>) => r.body as Array<GameServerStatus>)
    );
  }

  /**
   * Path part for operation deleteContainer
   */
  static readonly DeleteContainerPath = '/api/destroy/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteContainer()` instead.
   *
   * This method doesn't expect any response body
   */
  deleteContainer$Response(params: {

    /**
     * ID of game server to delete
     */
    id: string;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteContainerPath, 'delete');
    if (params) {

      rb.path('id', params.id);

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteContainer$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  deleteContainer(params: {

    /**
     * ID of game server to delete
     */
    id: string;

  }): Observable<void> {

    return this.deleteContainer$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation listImages
   */
  static readonly ListImagesPath = '/api/listimages';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listImages()` instead.
   *
   * This method doesn't expect any response body
   */
  listImages$Response(params?: {

  }): Observable<StrictHttpResponse<Array<GameServerImages>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.ListImagesPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<GameServerImages>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listImages$Response()` instead.
   *
   * This method doesn't expect any response body
   */
  listImages(params?: {

  }): Observable<Array<GameServerImages>> {

    return this.listImages$Response(params).pipe(
      map((r: StrictHttpResponse<Array<GameServerImages>>) => r.body as Array<GameServerImages>)
    );
  }

}
