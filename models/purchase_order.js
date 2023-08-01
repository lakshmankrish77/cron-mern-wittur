import mongoose from "mongoose";

const purchaseOrderSchema = mongoose.Schema(
  {
    // po_line_items: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "LineItemModel",
    //   },
    po_number: {
        type: String,
        required: [true, "Please add PO Number"],
        unique: true,
      },

    po_description: {
      type: String,
      required: [false, "Please enter PO Description"],
    },

    po_date: {
      type: Date,
      required: [true, "Please add BP Code"],
    },

    po_raised_by: {
        type: String,
        required: [true, "Please add User code"],
      },
    
    supplier: {
      type: String,
      required: [true, "Please add Supplier"],
    },
    po_creation_alert_flag: {
      type: Boolean,
      required: [true, "Please add Alert Flag"],
      default: false,
    },
    lead_time_alert_02_flag: {
      type: Boolean,
      required: [false, "Please add Alert Flag"],
      default: false,
    },
    lead_time_alert_01_flag: {
      type: Boolean,
      required: [false, "Please add Alert Flag"],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("POModel", purchaseOrderSchema, 'purchase_orders');
