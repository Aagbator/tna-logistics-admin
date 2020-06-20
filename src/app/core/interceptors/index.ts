/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptor} from './auth-interceptor.service';
import {CachingInterceptor} from './caching-interceptor.service';
import {LoggingInterceptor} from './logging-interceptor.service';
import {UploadInterceptor} from './upload-interceptor.service';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UploadInterceptor, multi: true }
  // { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },

];
