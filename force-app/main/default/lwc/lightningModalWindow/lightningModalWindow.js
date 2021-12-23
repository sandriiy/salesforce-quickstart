import { LightningElement, track, api } from 'lwc';

/*
    * Custom Lightning Web Components.
    * Custom component that represents the ability to display content in a modal window.
    * 
    @markup
    * <template>
    *   ...
    #   <c-lightning-modal-window> 
    #       <div slot = "content"> Basic Content... </div>
    #       <div slot = "footer"> Content in the footer... </div>
    #   </c-lightning-modal-window>
    *   ...
    * </template>
    *
    @javascript
    #   this.template.querySelector('c-lightning-modal-window').openWindow(); // Call from the parent component to open the modal window
    #   this.template.querySelector('c-lightning-modal-window').closeWindow(); // Call from the parent component to close the modal window
*/
export default class LightningModalWindow extends LightningElement {
    /** 
        * Determining whether the window is currently open or not.
        * Used as a checkbox for "if:true=" in markup
    **/
    @track isModalOpen = false; 

    /**
        * Public function for displaying the modal window.
        * Used by components that contain this component (child/inner).
    **/
    @api openWindow() { 
        this.isModalOpen = true;
    }

    /**
        * Public function for closing the modal window.
        * Used by components that contain this component (child/inner).
    **/
    @api closeWindow() {
        this.isModalOpen = false;

        this.event();
    }
}