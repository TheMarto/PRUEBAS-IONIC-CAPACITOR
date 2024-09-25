import { User } from "./user"
import { QuantityProduct } from "./quantity-product";
export class Order{
    _id?: string;
    user: User;
    products: QuantityProduct[];
    address?: string;
}