import SENDMAIL from "./MailService/mail-service.js";
import HTML_TEMPLATE from "./MailService/mail-template.js";
import cron from 'node-cron';
import connectDB from "./config/dbConnection.js";
import asyncHandler from "express-async-handler";
import POModel from "./models/purchase_order.js";
import LineItemModel from "./models/lineItem.js";
import moment from 'moment';

import {getLineItemsAndCreateAlertEntryForThisPO,
   getLineItemsAndCreateAlertEntry} from "./components/process_lineItems.js";

const getItemsWithoutPO = async () => {
  // const contacts = await MaterialAlertModel.find({ user_id: req.user.id });
  
  const allItems = await LineItemModel.distinct("item_code");  
  console.log("into getItemsWithoutPO..", allItems);
  
  const allItemsDistinct = await LineItemModel.aggregate([
    [
      {
        $group:          
          {
            _id: "$item_code",
            docs: {
              $first: "$$ROOT",
            },
          },
      },
      {
        $replaceRoot:
          /**
           * replacementDocument: A document or string.
           */
          {
            newRoot: "$docs", // Restore the original document structure
          },
      },
    ]
  ]);
  const allItemsDistinctWithoutPO = allItemsDistinct
  // .filter(item => !item.hasOwnProperty('purchase_order') || item.purchase_order === null)
  .map((item) => {
    // There can be "Partial" PO as well
    const hasNoPurchaseOrder = !item.hasOwnProperty('purchase_order') || item.purchase_order === null;
    const current_qty = item.qty + item.transit_qty + item.win_ms_stk;
    const lead_time_qty = item.lead_time * item.weekly_requirements_updated;
    console.log('hasNoPurchaseOrder:', hasNoPurchaseOrder, '-current_qty:', current_qty, "-lead_time_qty:", lead_time_qty)

    // if (hasNoPurchaseOrder && (current_qty < lead_time_qty)) {
    if (current_qty < lead_time_qty) {
      const { item_status,  ...restFields } = item;
      const modifiedItem = { ...restFields, current_qty, lead_time_qty, item_status: 'Raise PO Flag' };
      // return { ...item, current_qty, lead_time_qty  };

          console.log('sending mail to Sender For Low Lead Time for these line Items... ');
          const lead_time_item_alert_creation_header = "Low Stock for Item: " + item.item_code ;
          const lead_time_item_alert_creation_message = "Hi there, Alert for Low Stock for Item::" + item.item_code ;
          // sendMail(lead_time_item_alert_creation_message, lead_time_item_alert_creation_header);  
          itemLeadTimeAlert (item);  
          getLineItemsAndCreateAlertEntry(item);

      //  return modifiedItem;
    } 
    // else {
    //   return item;
    // }
  })
  .filter(item => item !== undefined);

  // console.log('allItemsDistinctWithoutPO: ',allItemsDistinctWithoutPO);
  // res.status(200).json(allItemsDistinctWithoutPO);
}

const fetchPOs = async () => {
    try {
      const format = 'YYYY-MM-DD';  
      const dateString = "25/05/2023"; // This should ideally be the current date

      const currentDate = moment(dateString, format).toDate();

      const allPOs = await POModel.find({});
      allPOs.map((po) => {
        console.log("allPOs - PO:", po);
        console.log("allPOs - po_number:", po.po_number);
        console.log("allPOs - po_date:", po.po_date);
        console.log("allPOs - po_creation_alert_flag:", po.po_creation_alert_flag);
        console.log("allPOs - lead_time:", po.lead_time);        
        console.log("allPOs - lead_time_alert_01_flag:", po.lead_time_alert_01_flag);

        const poDate = moment(po.po_date).toDate();
        const leadTimeDate = moment(po.po_date).add(po.lead_time, "days").toDate();

        if (!po.po_creation_alert_flag) {
          
          console.log('sending mail to Sender... ');
          const po_creation_header = "New PO Created : " + po.po_number ;
          const po_creation_message = "Hi there, New PO created. PO Number::" + po.po_number +  "and PO Date::" + poDate ;
          // sendMail(po_creation_message, po_creation_header);  
          poCreationAlertFlagUpdate (po);  
          getLineItemsAndCreateAlertEntryForThisPO(po);

        }

        // if (!po.lead_time_alert_01_flag && leadTimeDate.getTime().isSame(new Date(), 'day') ) {
        //   console.log("lead time alert to be sent for this PO");
        // }

        // if (poDate.getTime() < currentDate.getTime()) {
        //     console.log('poDate is earlier than currentDate');
        //   } else if (poDate.getTime() > currentDate.getTime()) {
        //     console.log('poDate is later than currentDate');
        //   } else {
        //     console.log('poDate is equal to currentDate');
        //     const po_creation_header = "New PO Created : " + po.po_number ;
        //     const po_creation_message = "Hi there, New PO created. PO Number::" + po.po_number +  "and PO Date::" + poDate ;
        //     sendMail(po_creation_message, po_creation_header);   
        //   }
      });

      
    } catch (error) {
      console.error("Error executing cron job:", error);
    }
  };
  const poCreationAlertFlagUpdate = async (po) => {
    //Update the alert_flag=true for this PO
    console.log("poCreationAlertFlagUpdate() - updating po_creation_alert_flag for PO: ", po.po_number);
    const doc = await POModel.findOneAndUpdate({po_number:po.po_number}, {po_creation_alert_flag:true}, {
      new: true
    });
  }

 

  const itemLeadTimeAlert = async (item) => {
    //Update the alert_flag=true for this PO
    const doc = await LineItemModel.findOneAndUpdate({item_code:item.item_code}, {po_creation_alert_flag:true}, {
      new: true
    });
  }

  const sendMail = (message,header) => {
    // const message = "Hi there, you were emailed me through nodemailer"
    console.log("message:", message, "header: ", header);

    const options = {
        from: "witturtest596@gmail.com", // sender address
        to: "testwittur@gmail.com", // receiver email
        // subject: "Send email in Node.JS with Nodemailer using Gmail account001", // Subject line
        subject:header,
        text: message,
        html: HTML_TEMPLATE(message,header),
    }

    SENDMAIL(options, (info) => {
        console.log("Email sent successfully");
        console.log("MESSAGE ID: ", info.messageId);
    });
  }
  
// below is for 9.30 PM 
// Minute: '30' (run at the 30th minute of the hour)
// Hour: '21' (run at the 21st hour, which corresponds to 9 PM in 24-hour format)
// Day of the month: '*' (run on any day of the month)
// Month: '*' (run in any month)
// Day of the week: '*' (run on any day of the week)
// cron.schedule('30 21 * * *', () => {

// Schedule a cron job to run every minute
const alertJob = cron.schedule('* * * * *', () => {

  console.log('Running a task every minute');

  //DB Connection
  connectDB();
  fetchPOs();  
  getItemsWithoutPO();

 }, {
    scheduled: true,
    // timezone: 'your_timezone' // Replace 'your_timezone' with the desired timezone
  });
  
  alertJob.start();
