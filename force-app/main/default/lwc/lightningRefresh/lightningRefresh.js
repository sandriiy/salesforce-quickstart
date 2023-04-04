import { LightningElement, wire, track } from 'lwc';

import getAllAccounts from '@salesforce/apex/LightningController.getAllAccounts'
import { RefreshEvent } from 'lightning/refresh';

// getRecordNotifyChange() -> notifyRecordUpdateAvailable()
export default class LightningRefresh extends LightningElement {
    accounts;
    @track columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Description', fieldName: 'Description' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' }
    ];

    @wire(getAllAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            console.log(error);
        }
    }

    connectedCallback() {
        console.log('connectedCallback!');
    }

    renderedCallback() {
        console.log('renderedCallback');
    }

    // There is also work in progress to eventually update other standards components to handle the refresh event as well.
    fireRefreshEvent(event) {
        console.log('fireRefreshEvent');
        this.dispatchEvent(new RefreshEvent());
    }
}