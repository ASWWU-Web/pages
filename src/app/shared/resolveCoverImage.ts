import { environment } from '../../environments/environment';
import { MEDIA_URI } from '../config';

export function resolveCoverImage(cover_image_URI:string, media_link:string = MEDIA_URI) {
  if (environment.production) {
    return (MEDIA_URI + '/' + cover_image_URI);
  } else {
    if(cover_image_URI){
      var image = cover_image_URI.replace("cms", "");
      return (environment.SERVER_URL + "/pages/media/static" + image);
    }
  }
}
