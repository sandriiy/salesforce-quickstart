import { LightningElement, api, wire, track } from 'lwc';

import getLayoutFields from '@salesforce/apex/LightningRecordLayoutController.getPageLayoutDetails';
import getHeaderFields from '@salesforce/apex/LightningRecordLayoutController.getFieldSetByApiName';

import { getRecord } from 'lightning/uiRecordApi';

/*
    * Custom Lightning Web Components.
    * Custom component that represents information about a record based on an existing layout (and/or fieldset - header).
    * 
    * @markup
    * <template>
    *   ...
    #   <c-lightning-record-layout 
    #       record-id="00109000009deyhAAA" 
    #       api-object-name="Account" 
    #       layout-page="Account Layout"
    #       layout-header="FieldSetName"
    #       is-read-only="false">
    #   </c-lightning-record-layout>
    *   ...
    * </template>
*/
export default class LightningRecordLayout extends LightningElement {
    @api recordId;
    @api apiObjectName;
    @api layoutPage;
    @api layoutHeader;
    @api isReadOnly;

    @track sectionsDetails;
    @track headerDetails;
    @track headerFieldPaths;
    @track defaultHeaderValue;

    @wire(getLayoutFields, { sobjectApiName: '$apiObjectName', layoutName: '$layoutPage' })
    getLayoutFields({ error, data }) {
        if (data) {
            this.sectionsDetails = this.getFullDetailsOfSections(data);
        } else if (error) {
            console.error(error);
        }
    }

    @wire(getHeaderFields, { sobjectApiName: '$apiObjectName', fieldSetName: '$layoutHeader' })
    getHeaderFields({ error, data }) {
        if (data) {
            this.headerDetails = data;
            this.headerFieldPaths = this.getFieldPaths(data);
        } else if (error) {
            console.error(error);
        }
    }

    @wire(getRecord, { recordId: '$recordId', fields: '$headerFieldPaths' })
    getHeaderFieldValues({ error, data }) {
        if (data) {
            this.setHeaderFieldValues(data);
        } else if (error) {
            console.error(error);
        }
    }

    getFullDetailsOfSections(fieldsDto) {
        let sectionToFields = [];
        fieldsDto.forEach(fieldDto => {
            let sectionToField = sectionToFields.find(element => element.key == fieldDto.parentSectionName);

            if (sectionToField != undefined) {
                sectionToField.fields.push(fieldDto.apiFieldName);
            } else {
                sectionToFields.push(
                    {
                        key: fieldDto.parentSectionName,
                        fields: [fieldDto.apiFieldName],
                        columns: fieldDto.isOneColumnSection ? 1 : 2,
                        mode: this.isReadOnly ? 'readonly' : 'view'
                    }
                );
            }
        });

        return sectionToFields;
    }

    getFieldPaths(fields) {
        let fieldPaths = [];
        fields.forEach(field => {
            let fieldPath = this.apiObjectName + '.' + field.apiFieldName;
            fieldPaths.push(fieldPath);
        });

        return fieldPaths;
    }

    getCopiedObject(object) {
        return object != undefined ? JSON.parse(JSON.stringify(object)) : undefined;
    }

    setHeaderFieldValues(record) {
        let headerDetails = this.getCopiedObject(this.headerDetails);
        if (headerDetails != undefined) {
            headerDetails.forEach(headerDetail => {
                let recordFieldValue = record.fields[headerDetail.apiFieldName];
                if (recordFieldValue != undefined) {
                    headerDetail.fieldValue = recordFieldValue.value != null ? recordFieldValue.value : '';
    
                    if (headerDetail.isDefaultField == true) {
                        this.defaultHeaderValue = headerDetail.fieldValue;
                        headerDetails.shift();
                    }
                }
            });
        }

        this.headerDetails = this.isEmptyObject(headerDetails) ? undefined : headerDetails;
    }

    isEmptyObject(object) {
        return object == undefined || object == null || object.length == 0;
    }
}