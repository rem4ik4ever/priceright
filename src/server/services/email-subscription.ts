import {GoogleSpreadsheet} from 'google-spreadsheet'

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

export const addSubscriptionEmail = async (email:string) => {
  try {
    if(!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error('Missing google spreadsheet ENVs')
      return false
    }
    
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    });
    
    await doc.loadInfo(); // loads document properties and worksheets
    
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    if(!sheet) {
      console.log("Google document has no sheets")
      return false;
    }
    await sheet.addRow({ email });
    return true
  } catch (error) {
    console.error("Google error", error)
    return false;    
  }
}
