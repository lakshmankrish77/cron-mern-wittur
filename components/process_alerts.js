import AlertLineItemModels from "../models/alertLineItem.js";


 export const alertEntryCreateForPO = async (po, lineItem) => {
    console.log("alertEntryCreateForPO() - po_number:", po.po_number, "itemc_code:", lineItem.item_code)  ;

      const createdAlertForLineItem = await AlertLineItemModels.create({
        item_code:lineItem.item_code,
        po_number: po.po_number,
        action:"PO Creation Alert",
        action_type:"system-alert",
        action_date: new Date(),
        attachments: ""
      });
    
}

export const alertEntryCreateForLineItemLowStock = async (lineItem) => {
  console.log("alertEntryCreateForLineItemLowStock() -itemc_code:", lineItem.item_code)  ;

    const createdAlertForLineItem = await AlertLineItemModels.create({
      item_code:lineItem.item_code,     
      action:"Low Stock Alert",
      action_type:"system-alert",
      action_date: new Date(),
      attachments: ""
    });
  
}

// export default {alertEntryCreateForPO, alertEntryCreateForLineItemLowStock};