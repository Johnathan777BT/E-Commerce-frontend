import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
 
 let authReq = req.clone({
    setHeaders: {
     'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json',  
    }
  });


  let url = environment.urlApi+"api/productos/upload";

  if(req.url ==  url){
    authReq = req.clone({
      setHeaders: {
      }
    });

  }

  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};
