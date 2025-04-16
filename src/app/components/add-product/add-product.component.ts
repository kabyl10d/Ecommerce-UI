import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {
  name = '';
  price = 0;
  stock = 0;
  category = 1;
  imageUrl = '';
  categories: any[] = []; 


  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Category fetch error', err)
    });
  }
  selectedFile: File | null = null;
previewUrl: string = '';
 

onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

uploadAndSetImage(): void {
  if (!this.selectedFile) return;

  this.productService.uploadImage(this.selectedFile).subscribe({
    next: (res) => {
      this.imageUrl = res.imageUrl;
      console.log('Image uploaded:', this.imageUrl);
    },
    error: (err) => console.error('Image upload failed:', err)
  });
}


  
addProduct(): void {
   if (this.imageUrl) {
    this.submitProduct();
    return;
  }

   if (this.selectedFile) {
    this.productService.uploadImage(this.selectedFile).subscribe({
      next: (res) => {
        this.imageUrl = res.imageUrl;
        console.log('Image uploaded:', this.imageUrl);
        this.submitProduct();
      },
      error: (err) => {
        console.error('Image upload failed:', err);
      }
    });
  } else {
    this.submitProduct();
  }
}

  
submitProduct(): void {
  const product = {
    name: this.name,
    price: this.price,
    stock: this.stock,
    category: this.category,
    imageUrl: this.imageUrl
  };

  this.productService.addProduct(product).subscribe({
    next: () => this.router.navigate(['/']),
    error: (err) => console.error('Add product failed:', err)
  });
}
}
  
  
 

