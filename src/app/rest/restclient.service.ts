import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {GameServerStatus} from './response/GameServerStatus';
import {catchError, retry} from 'rxjs/operators';
import {GameServerTemplate} from './response/GameServerTemplate';

/**
 * This service connects to the backend's REST API and e. g. gathers information of a container or creates game servers.
 *
 */
@Injectable({
  providedIn: 'root'
})
export class RestclientService {

  constructor(private http: HttpClient) {
  }

  apiURL = environment.restApiURL;

  // Headers etc.
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  /**
   * Log and display error.
   * @param error the error that is thrown
   */
  private static handleError(error) {
    let message;

    if (error.error instanceof ErrorEvent) {
      message = error.error.message;
    } else {
      message = `Error Code: ${error.status}\nReason: ${error.error.message}`;
    }

    window.alert(message);
    return throwError(message);
  }


  /**
   * Return status of an existing container.
   * @param id of container
   */
  getStatus(id: string): Observable<GameServerStatus> {
    return this.http.get<GameServerStatus>(this.apiURL + '/api/?id=' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(RestclientService.handleError)
      );
  }

  /**
   * Create a game server container with desired game.
   * @param serverTemplate for desired game server
   */
  createServer(serverTemplate: GameServerTemplate): Observable<GameServerStatus> {
    return this.http.post<GameServerStatus>(this.apiURL + '/api/deploy', serverTemplate, this.httpOptions)
      .pipe(
        retry(1),
        catchError(RestclientService.handleError)
      );
  }

  /**
   * Delete existing container.
   * @param id of server to be deleted
   */
  deleteServer(id: string): Observable<GameServerStatus> {
    return this.http.delete<GameServerStatus>(this.apiURL + '/api/destroy/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(RestclientService.handleError)
      );
  }
}
