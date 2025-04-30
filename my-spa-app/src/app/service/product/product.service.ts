// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// // import { Constant } from '../constant/constant';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {

//   constructor(private http: HttpClient) { }
//   getProducts(){
//     // return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY)
//     return this.http.get('/api/api/BigBasket/GetAllProducts')
//   }
//   getCategory(){
//     // return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_PRODUCTS)
//     return this.http.get('/api/api/BigBasket/GetAllCategory')
//   }
//   saveProduct(obj: any) {
//     // return this.http.post(Constant.API_END_POINT + Constant.METHODS.CREATE_PRODUCT , obj)
//     return this.http.post('/api/api/BigBasket/CreateProduct',obj)
//   }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  searchProducts(searchTerm: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {}

  getCategory() {
    return this.http.get('/api/api/BigBasket/GetAllCategory');
  }
  // getProductsByCategory(id: number) {
  //   return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_PRODUCT_BY_CATEGORY + id);
  // }
  getProducts() {
    return this.http.get('/api/api/BigBasket/GetAllProducts');
  }
  saveProduct(obj: any) {
    return this.http.post('/api/api/BigBasket/CreateProduct', obj);
  }
  updateProduct(obj: any) {
    return this.http.post('/api/api/BigBasket/UpdateProduct', obj);
  }
  deleteProduct(id: any) {
    const productId = parseInt(id, 10);
    return this.http.get(`/api/api/BigBasket/DeleteProductById?id=${productId}`);
}
}