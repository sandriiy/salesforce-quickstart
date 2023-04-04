import { LightningElement, wire } from 'lwc';

import { registerRefreshHandler, unregisterRefreshHandler } from 'lightning/refresh';

import getRecordByController from '@salesforce/apex/LightningController.getRecordFieldValues'
import { getRecord } from 'lightning/uiRecordApi';
import { gql, graphql } from 'lightning/uiGraphQLApi';

const fields = ['Account.Description', 'Account.CreatedDate'];

export default class LightningReceivingValues extends LightningElement {
    refreshHandlerID;

    constructor() {
        super();
        console.log('LightningReceivingValues');
    }

    connectedCallback() {
        this.refreshHandlerID = registerRefreshHandler(this, this.refreshHandler);
    }

    disconnectedCallback() {
        unregisterRefreshHandler(this.refreshHandlerID);
    }

    @wire(getRecordByController, { recordId: '001B000001SpN0yIAF', fields: fields })
    getRecordByController({ error, data }) {
        if (data) {
            console.log('getRecord - Controller');
        } else if (error) {
            console.error(error);
        }
    }

    @wire(getRecord, { recordId: '001B000001SpN0yIAF', fields: fields })
    getRecordByRecordApi({ error, data }) {
        if (data) {
            console.log('getRecord - uiRecordApi');
        } else if (error) {
            console.error(error);
        }
    }

    @wire(graphql, {
        query: gql`
            query getAccounts {
                accounts {
                    description
                    createdDate
                }
            }`
    }) getRecordByGraphQL({ data, errors }) {
        if (data) {
            console.log('getRecordByGraphQL');
        } else if (errors) {
            console.error(errors);
        }
    }

    refreshHandler() {
        // The promise.resolve() method in JS returns a Promise object that is resolved with a given value. 
        return new Promise((resolve) => {
            console.log('resolving');
            // functions
            resolve(true);
        });
    }
}