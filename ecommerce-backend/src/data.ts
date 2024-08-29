interface User {
    id: number;
    name: string;
    email: string;
    password: string;
  }
  
  interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
  }
  
  export const users: User[] = [];
  export const products: Product[] = [];  