// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ProductService } from '../../../service/product/product.service';

// @Component({
//   selector: 'app-products',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './products.component.html',
//   styleUrl: './products.component.css'
// })
// export class ProductsComponent implements OnInit{
//   categoryList : any [] = [];
//   productsList : any [] = [];
//   isSidePanelVisible: boolean = false;
//   productObj: any = {
//     "productId": 0,
//     "productSku": "",
//     "productName": "",
//     "productprice": 0,
//     "productShortName": "",
//     "productDescription": "",
//     "createdDate": new Date(),
//     "deliveryTimeSpan": "",
//     "categoryId": 0,
//     "productImageUrl": "",
//     "userId": 0
//   };
//  constructor(private productSrv: ProductService){

//  }
//   ngOnInit(): void {
//     this.getProducts();
//     this.getAllCategory();
//   }
//   getProducts(){
//     this.productSrv.getProducts().subscribe((res:any)=>{
//       this.productsList = res.data;
//       console.log("39:", JSON.stringify(res.data, null, 2)); 
//     })
//   }

//   getAllCategory(){
//     this.productSrv.getCategory().subscribe((res:any)=>{
//       this.categoryList = res.data;
//     })
//   }
//   // onSave(){
//   //   this.productSrv.saveProduct(this.productObj).subscribe((res:any)=>{
//   //     debugger;
//   //     if(res.result){
//   //       alert("Product Created")
//   //       console.log("53:"+this.productsList)
//   //       this.getProducts();
//   //     }
//   //     else{
//   //       alert("swethaTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT:"+res.message)
//   //     }
//   //   })
//   // }
//   onSave() {
//     this.productSrv.saveProduct(this.productObj).subscribe((res: any) => {
//         if (res.result) {
//             alert("Product Created");
//             this.getProducts(); // Refresh the product list
//             console.log("66:", JSON.stringify(res.data, null, 2)); 
//             this.resetProductObj(); // Reset the product object
//         } else {
//             alert("Error: " + res.message);
//         }
//     });
// }

// resetProductObj() {
//     this.productObj = {
//         "productId": 0,
//         "productSku": "",
//         "productName": "",
//         "productprice": 0,
//         "productShortName": "",
//         "productDescription": "",
//         "createdDate": new Date(),
//         "deliveryTimeSpan": "",
//         "categoryId": 0,
//         "productImageUrl": "",
//         "userId": 0
//     };
// }
//   openSidePanel(){
//     this.isSidePanelVisible = true;
//    }
//   closeSidePanel(){
//     this.isSidePanelVisible = false;
//    }
// }
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../service/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  isSidePanelVisible: boolean = false;
  productObj: any = {
    "productId": 0,
    "productSku": "",
    "productName": "",
    "productPrice": 0,
    "productShortName": "",
    "productDescription": "",
    "createdDate": new Date(),
    "deliveryTimeSpan": "",
    "categoryId": 0,
    "productImageUrl": ""
  };
  categoryList: any[] = [];
  productsList: any[] = [];

  constructor(private productSrv: ProductService) {

  }

  ngOnInit(): void {
    this.getProducts();
    this.getAllCategory();
  }

  // getProducts() {
  //   this.productSrv.getProducts().subscribe((res:any) => {
  //     this.productsList = res.data;
  //   })
  // }
  getProducts() {
    this.productSrv.getProducts().subscribe(
        (res: any) => {
            const seenProductNames = new Set(); // To track unique product names
            this.productsList = res.data.filter((prod: any) => {
                // Check if productImageUrl is valid and starts with the specified URL
                const isValidImageUrl = prod.productImageUrl && prod.productImageUrl.startsWith('https://www.bigbasket.com');
                
                // Check for duplicate product names
                const isDuplicateName = seenProductNames.has(prod.productName);
                if (!isDuplicateName) {
                    seenProductNames.add(prod.productName); // Add the product name to the Set
                }

                // Return true if both conditions are met
                return isValidImageUrl && !isDuplicateName;
            });
        },
        (error) => {
            console.error('Error fetching products:', error);
            alert('Failed to load products. Please try again later.');
        }
    );
}

  getAllCategory() {
    this.productSrv.getCategory().subscribe((res:any) => {
      this.categoryList = res.data;
    })
  }

  onUpdate() {
    this.productSrv.updateProduct(this.productObj).subscribe((res:any) => {
      if (res.result) {
        alert('Product Edited');
        this.getProducts();
      } else (
        alert(res.message)
      )
    })
  }

  onSave() {
    this.productSrv.saveProduct(this.productObj).subscribe((res:any) => {
      debugger;
      if (res.result) {
        alert('Product Created');
        this.getProducts();
      } else (
        alert(res.message)
      )
    })
  }
  onEdit(item: any){
    this.productObj = item;
    this.openSidePanel();
  }
  // onDelete(item: any) {
  //   const isDelete = confirm('Are you sure you want to delete ?');
  //   this.productSrv.deleteProduct(item.productId).subscribe((res:any) => {
  //     debugger;
  //     if (isDelete) {
  //       alert('Product Deleted');
  //       this.getProducts();
  //     } else (
  //       alert(res.message)
  //     )
  //   })
  // }
  onDelete(item: any) {
    const isDelete = confirm('Are you sure you want to delete this product?');
    if (isDelete) {
        this.productSrv.deleteProduct(item.productId).subscribe(
            (res: any) => {
                // Check if the deletion was successful
                if (res.result) {
                    alert('Product Deleted');
                    this.getProducts(); // Refresh the product list
                } else {
                    alert(res.message); // Show the error message if deletion failed
                }
            },
            (error) => {
                console.error('Error deleting product:', error);
                alert('An error occurred while trying to delete the product. Please try again.'); // Handle any errors from the API
            }
        );
    }
}
  openSidePanel() {
    this.isSidePanelVisible = true
  }

  closeSidePanel() {
    this.isSidePanelVisible = false
  }
}