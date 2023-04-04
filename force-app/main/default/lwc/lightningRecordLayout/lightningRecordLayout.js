import { LightningElement, api, wire, track } from 'lwc';

// This controller contains layout and fieldset handling
import getLayoutFields from '@salesforce/apex/LightningRecordLayoutController.getPageLayoutDetails';
import getHeaderFields from '@salesforce/apex/LightningRecordLayoutController.getFieldSetByApiName';

// This module includes wire adapters to record data and get values
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
    #       max-section-height="600"
    #       is-section-opened="false"
    #       is-read-only="false">
    #   </c-lightning-record-layout>
    *   ...
    * </template>
    * 
    * @author https://github.com/sandriiy/Deserves-Acceptance
*/
export default class LightningRecordLayout extends LightningElement {
    @api recordId;
    @api apiObjectName;
    @api layoutPage;
    @api layoutHeader;
    @api maxSectionHeight;
    @api isSectionOpened;
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

    get activeSections() {
        if (this.isSectionOpened == true) {
            return (
                this.isEmptyObject(this.sectionsDetails)
                ? []
                : this.sectionsDetails.map(section => section.key)
            );
        } else {
            return [];
        }
    }

    get styleSections() {
        return (`max-height: ${this.maxSectionHeight}px;overflow-y: auto;overflow-x: hidden;width: 100%;`);
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