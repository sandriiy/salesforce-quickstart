import { LightningElement, track } from 'lwc';

export default class LightningDocumentModel extends LightningElement {
    @track value;

    constructor() {
        super();
        console.log('LightningDocumentModel');
    }

    connectedCallback() {
        try {
            console.log('connectedCallback - start');
            console.log(this.template.querySelector(`[data-ref="parendCard"]`)); // return null
            console.log(this.refs.parentCard); // throw an error
        } catch(ex) {
            console.log('connectedCallback - fail');
        }
    }

    renderedCallback() {
        try {
            console.log('renderedCallback - start');
            console.log(this.template.querySelector(`[data-ref="parendCard"]`)); // works
            console.log(this.refs.parentCard); // works
        } catch(ex) {
            console.log('renderedCallback - fail');
        }
    }

    setTrueValue(event) {
        this.value = true;
    }

    setFalseValue(event) {
        this.value = false;
    }

    setUndefinedValue(event) {
        this.value = undefined;
    }

    get expression1() {
        return (this.value == true);
    }

    get expression2() {
        return (this.value == false);
    }
}