export type TproductColumnProps = {
   uuid: string;
   name: string;
   category: string;
   image: string;
   subCategory: string[];
   shortDescription: string[];
   longDescription: string[];
   isFeatured: boolean;
   isArchived: boolean;
   topBrands: boolean;
};

export type TcategoriesProps = {
   uuid: string;
   name: string;
};

export type TsubcategoriesProps = {
   uuid: string;
   name: string;
};