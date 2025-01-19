export interface CarData {
  id?: string;
  name: string;
  model: string;
  year: number;
  description: string;
  fault: string;
  used: boolean;
  status: string;
  purchaseprice: number;
  sellprice: number;
  soldon?: Date;
  image: string | null;
}


interface Invoice {
    
}