import mongoose from "mongoose";

const lineItemSchema = mongoose.Schema(
  {
    // purchase_order: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "POModel",
    // },

    purchase_order: {
      type: String,
      required: true,      
    },
    item_code: {
      type: String,
      required: [true, "Please enter Item Code"],      
    },
    item_description: {
      type: String,
      required: [true, "Please enter Item Description"],
    },

    bp_code: {
      type: String,
      required: [true, "Please add BP Code"],
    },
    
   

    lead_time: {
      type: Number,
      required: [true, "Please add Lead Time"],
    },
    weekly_requirements_updated: {
      type: Number,
      required: [false, "Please add 'Weekly Requirements updated'"],
    },
    win_ms_stk: {
      type: Number,
      required: [false, "Please add WIN MS STK"],
    },
    transit_qty: {
      type: Number,
      required: [false, "Please add Transit Quantity"],
    },
    qty: {
      type: Number,
      required: [false, "Please add Quantity"],
    },    
    invoice_number: {
      type: String,
      required: [true, "Please add Invoice Number"],
    },
    etd: {
      type: Date,
      required: [false, "Please add ETD"],
    },
    eta: {
      type: Date,
      required: [false, "Please add ETA"],
    },
    open_order_quantity: {
      type: Number,
      required: [false, "Please add Open Order Quantity"],
    },
    approx_qty: {
      type: Number,
      required: [false, "Please add Approximate Quantity"],
    },
    approx_po_number: {
      type: String,
      required: [false, "Please add Approximate PO Number"],
    },
    approx_po_date: {
      type: String,
      required: [false, "Please add Approximate PO Date"],
    },
    approx_etd: {
      type: String,
      required: [false, "Please add Approximate ETD"],
    },
    approx_eta: {
      type: String,
      required: [false, "Please add Approximate ETA"],
    },
  },
  {
    timestamps: true,
  }
);
lineItemSchema.index({
  purchase_order: 1,
  item_code: 1,
  invoice_number: 1,
}, {
  unique: true,
});
export default mongoose.model("LineItemModel", lineItemSchema, 'line_items');
