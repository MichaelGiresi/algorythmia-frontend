class OrderModel {
    id: number;
    orderTrackingNumber: number;
    totalPrice: number;
    totalQuantity: number;
    billingAddressId: number;
    customerId: number;
    shippingAddressId: number;
    status: boolean;
    dateCreated: Date;
    lastUpdated: Date;


    constructor (
        id: number,
        orderTrackingNumber: number,
        totalPrice: number,
        totalQuantity: number,
        billingAddressId: number,
        customerId: number,
        shippingAddressId: number,
        status: boolean,
        dateCreated: Date,
        lastUpdated: Date
    ) {
        this.id = id;
        this.orderTrackingNumber = orderTrackingNumber;
        this.totalPrice = totalPrice;
        this.totalQuantity = totalQuantity;
        this.billingAddressId = billingAddressId;
        this.customerId = customerId;
        this.shippingAddressId = shippingAddressId;
        this.status = status;
        this.dateCreated = dateCreated;
        this.lastUpdated = lastUpdated;

    }
}

export default OrderModel