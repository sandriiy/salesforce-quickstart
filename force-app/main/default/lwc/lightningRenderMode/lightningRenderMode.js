import { LightningElement } from 'lwc';

export default class LightningRenderMode extends LightningElement {
    static renderMode = 'light'; // the default is 'shadow'

    handleStyles(event) {
        let childComponent = this.refs.native;
        let nativeComponent = this.refs.native;
        console.log(nativeComponent);
        console.log(childComponent);

        //let childDiv = childComponent.closest("button");
    }
}