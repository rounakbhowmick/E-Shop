import { Category } from 'src/app/models/category';
export interface Products {
  _id: string;
  name: string;
  price: number;
  category: Category;
  productImage: string;
}
