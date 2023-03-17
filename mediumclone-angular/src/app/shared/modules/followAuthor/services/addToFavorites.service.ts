import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProfileInterface } from 'src/app/shared/types/profile.interface';
import { GetUserProfileResponseInterface } from 'src/app/userProfile/types/getUserProfileResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class FollowAuthorService {

  constructor(private http: HttpClient){}

  followAuthor(slug: string): Observable<ProfileInterface> {
    const url = this.getUrl(slug);
    return this.http.post(url, {}).pipe(map(this.getProfile));
  }

  unfollowAuthor(slug: string): Observable<ProfileInterface> {
    const url = this.getUrl(slug);
    return this.http.delete(url, {}).pipe(map(this.getProfile));
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/profiles/${slug}/follow`;
  }

  getProfile(response: GetUserProfileResponseInterface): ProfileInterface {
    return response.profile;

  }
}
