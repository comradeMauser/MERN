import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectID,
            require: true,
            ref: "User"
        },
        orderItems: [
            {
                name: {type: String, require: true},
                quantity: {type: Number, require: true},
                image: {type: String, require: true},
                price: {type: Number, require: true},
                proguct: {
                    type: mongoose.Schema.Types.ObjectID,
                    require: true,
                    ref: "Product"
                },
            }
        ],
        shippingAddress: {
            address: {type: String, require: true},
            postalCode: {type: String, require: true},
            country: {type: String, require: true},
            city: {type: String, require: true},
        },
        paymentResult: {
            id: {type: String},
            status: {type: String},
            _update: {type: String},
            _payerEmail: {type: String},
        },
        taxPrice: {
            type: String,
            require: true,
            default: 0.0
        },
        shippingPrice: {
            type: String,
            require: true,
            default: 0.0
        },
        totalPrice: {
            type: String,
            require: true,
            default: 0.0
        },
        isPaid: {
            type: Boolean,
            require: true,
            default: false
        },
        paidDate: {
            type: Date
        },
        isDelivered: {
            type: Boolean,
            require: true,
            default: false
        },
        deliveredDate: {
            type: Date
        },
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order