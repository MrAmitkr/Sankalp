import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrder extends Document {
  courseId: string;
  // _id:string;
  userId: string;
  payment_info: object;
  //  products: string[];
  //  totalPrice: number;
  //  createdAt: Date;
  //  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    payment_info: {
      type: Object,
      //required: true
    },
  },
  { timestamps: true }
);

const OrderModel: Model<IOrder> = mongoose.model("Order", OrderSchema);

// const OrderModel: Model<IOrder> = mongoose.model("Order", orderSchema);

export default OrderModel;
