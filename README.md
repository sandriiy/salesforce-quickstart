## Custom Lightning Web Components: Components

1. Lightning Modal Window | c-lightning-modal-window
   - Modal window with the ability to add your own content.
   
2. Lightning Record Layout | c-lightning-record-layout
   - LightningRecordLayoutController & LightningRecordLayoutControllerTest
   - Record details component with the ability to display information based on the existing 'Page Layout' or/and 'Field Set'. A fieldset is used to set the header layout, the first field in the fieldset will be used as the main field in the header. Uses Lightning Data Service responses respect CRUD access, field-level security settings, and sharing settings.
   - Please note that the LightningRecordLayout component does not have correct error handling, and the sections can only be displayed if they are available for the detail page ([see](https://trailhead.salesforce.com/trailblazer-community/feed/0D54S00000A7mu9SAB)).

## Custom Lightning Web Components: Configure

The `lwc` and `classes` folders contain components/classes that you can extract to your own project. See [Salesforce Project Structure](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models) in the _Development Models_ for details.

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
