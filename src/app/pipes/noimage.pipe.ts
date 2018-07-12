import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform( image: any ): string {

    if ( !image ) {
      return 'assets/img/sinimagen.jpg';
    }

    if ( image.length > 0) {
      return image;
    } else {
      return 'assets/img/sinimagen.jpg';
    }
  }

}
