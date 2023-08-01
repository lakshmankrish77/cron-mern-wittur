import LineItemModel from "../models/lineItem.js";
import {alertEntryCreateForPO, alertEntryCreateForLineItemLowStock} from "./process_alerts.js";

export const getLineItemsAndCreateAlertEntryForThisPO = async (po) => {
    //Update the alert_flag=true for this PO
    console.log("poCreationAlertFlagUpdate() - updating po_creation_alert_flag for PO: ", po.po_number);
    const lineItems = await LineItemModel.find({purchase_order:po.po_number});
    // return lineItems;
    const create = lineItems.map((lineItem) => {
        console.log("getLineItemsAndCreateAlertEntryForThisPO() - itemCode:" , lineItem.item_code);
        alertEntryCreateForPO(po, lineItem);
      })
  }

  export  const getLineItemsAndCreateAlertEntry = async (lineItem) => {
    //Update the alert_flag=true for this PO
    console.log("getLineItemsAndCreateAlertEntry() - updating lineItem_leadTime_creation_alert_flag for lineItem: ", lineItem);
    // const lineItems = await LineItemModel.find({purchase_order:po.po_number});
    // return lineItems;
    // const create = lineItems.map((lineItem) => {
        // console.log("getLineItemsAndCreateAlertEntry() - itemCode:" , lineItem.item_code);
        alertEntryCreateForLineItemLowStock(lineItem);
    //   })
  }

//   export default {getLineItemsAndCreateAlertEntryForThisPO, getLineItemsAndCreateAlertEntry};
  