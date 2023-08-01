import mongoose from "mongoose";

const alertLineItemSchema = mongoose.Schema(
  {
    item_code: {
      type: String,
      required: [false, "This alert attached to a Line Item"],      
    },

    po_number: {
      type: String,
      required: [false, "This alert attached to a PO"],      
    },

    action: {
      type: String,
      required: [true, "Please enter Action Description"],      
    },
    action_type: {
      type: String,
      required: [true, "Please enter Action Type"],      
    },
    action_date: {
      type: String,
      required: [true, "Please enter Date of Action Taken"],      
    },
    attachments: {
      type: String,
      required: [false, "Please enter Attachments for this Action"],      
    },

    },
  {
    timestamps: true,
  }
);

export default mongoose.model("AlertLineItemModel", alertLineItemSchema, "alert-lineitems");
