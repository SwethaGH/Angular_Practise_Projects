// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Video } from './video'; // make sure you import your Video interface/model

// @Injectable({
//   providedIn: 'root'
// })
// export class VideoService {
//   private _getUrl = 'http://localhost:3000/api/videos/';
//   private _postUrl = 'http://localhost:3000/api/video/';
//   private _putUrl = 'http://localhost:3000/api/video/';
//   private _deleteUrl = 'http://localhost:3000/api/video/';

//   constructor(private _http: HttpClient) {}

//   getVideos(): Observable<Video[]> {
//     return this._http.get<Video[]>(this._getUrl);
//   }

//   addVideo(video: Video): Observable<Video> {
//     return this._http.post<Video>(this._postUrl, video);
//   }

//   updateVideo(video: Video): Observable<Video> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     return this._http.put<Video>(`${this._putUrl}${video._id}`, video, { headers });
//   }
//   deleteVideo(video: Video): Observable<Video> {
//     return this._http.delete<Video>(`${this._deleteUrl}${video._id}`);
//   }
// }
import { Injectable } from '@angular/core'; // Import Injectable decorator for service
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient and HttpHeaders for HTTP requests
import { Observable } from 'rxjs'; // Import Observable for reactive programming
import { Video } from './video'; // Import Video interface/model

@Injectable({
  providedIn: 'root' // Register service at root level
})
export class VideoService {
  private _getUrl = 'http://localhost:3000/api/videos/'; // URL for fetching videos
  private _postUrl = 'http://localhost:3000/api/video/'; // URL for adding a video
  private _putUrl = 'http://localhost:3000/api/video/'; // URL for updating a video
  private _deleteUrl = 'http://localhost:3000/api/video/'; // URL for deleting a video

  constructor(private _http: HttpClient) {} // Inject HttpClient for HTTP requests

  getVideos(): Observable<Video[]> { // Fetch all videos from API
    return this._http.get<Video[]>(this._getUrl);
  }

  addVideo(video: Video): Observable<Video> { // Add a new video via API
    return this._http.post<Video>(this._postUrl, video);
  }

  updateVideo(video: Video): Observable<Video> { // Update a video by ID via API
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Set JSON content type
    return this._http.put<Video>(`${this._putUrl}${video._id}`, video, { headers });
  }

  deleteVideo(video: Video): Observable<Video> { // Delete a video by ID via API
    return this._http.delete<Video>(`${this._deleteUrl}${video._id}`);
  }
}