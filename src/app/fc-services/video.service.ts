import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class VideoService {

  constructor(private http: Http) { }

  getVideos() {
    return this.http.get('/foo/bar/videos')
      .map(res => res.json().data);
  }
}
