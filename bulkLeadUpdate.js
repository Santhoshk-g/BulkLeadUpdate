import { LightningElement, track, api, wire } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import csvFileRead from '@salesforce/apex/CSVLeadInsertCntrl.csvFileRead';
import myresources from '@salesforce/resourceUrl/LeadInsertFormet';

const columnsAccount = [
    { label: 'Name', fieldName: 'LastName'}, 
    { label: 'City', fieldName: 'CITY_Name__c' },
    { label: 'Property Name', fieldName:'Property_Name__c'}, 
    { label: 'Company', fieldName: 'Company'}, 
    { label: 'Address', fieldName: 'LS_Address__c'},
    { label: 'Lead Owner', fieldName: 'Owner_Name__c'}
];


export default class BulkLeadUpdate  extends LightningElement {
    @api recordId;
    @track error;
    @track columnsAccount = columnsAccount;
    @track data;
    @api templatefile = myresources;
    // accepted parameters
    get acceptedCSVFormats() {
        return ['.csv'];
    }
    
    uploadFileHandler(event) {
        // Get the list of records from the uploaded files
        const uploadedFiles = event.detail.files;

        // calling apex class csvFileread method
        csvFileRead({contentDocumentId : uploadedFiles[0].documentId})
        .then(result => {
            window.console.log('result ===> '+result);
            this.data = result;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success!!',
                    message: 'Accounts are created according to the CSV file upload!!!',
                    variant: 'Success',
                }),
            );
        })
        .catch(error => {
            this.error = error.body.message;
                 
        })

    }
    
}
