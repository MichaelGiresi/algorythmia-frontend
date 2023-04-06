class ProductModel {
    id: number;
    productCategory: string;
    sku: string;
    name: string;
    sizeId: number;
    sizeSmall: number;
    sizeMedium: number;
    sizeLarge: number;
    sizeExtraLarge: number;
    sizeExtraExtraLarge: number;
    description: string;
    unitPrice: number;
    imageUrl: string;
    active: boolean;
    // unitsInStock: number;
    dateCreated: Date;
    lastUpdated: Date;

    constructor ( 
        id: number,
        productCategory: string,
        sku: string,
        name: string,
        sizeId: number,
        sizeSmall: number,
        sizeMedium: number,
        sizeLarge: number,
        sizeExtraLarge: number,
        sizeExtraExtraLarge: number,
        description: string,
        unitPrice: number,
        imageUrl: string,
        active: boolean,
        // unitsInStock: number,
        dateCreated: Date,
        lastUpdated: Date

    ) {
        this.id = id;
        this.productCategory = productCategory;
        this.sku = sku;
        this.name = name;
        this.sizeId = sizeId;
        this.sizeSmall = sizeSmall;
        this.sizeMedium = sizeMedium;
        this.sizeLarge = sizeLarge;
        this.sizeExtraLarge = sizeExtraLarge;
        this.sizeExtraExtraLarge = sizeExtraExtraLarge;
        this.description = description;
        this.unitPrice = unitPrice;
        this.imageUrl = imageUrl;
        this.active = active;
        // this.unitsInStock = unitsInStock;
        this.dateCreated = dateCreated;
        this.lastUpdated = lastUpdated;
    }
}

export default ProductModel