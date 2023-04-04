public with sharing class LightningController {
    @AuraEnabled(cacheable=true)
    public static String getRecordFieldValues(String recordId, List<String> fields) {
        return 'result';
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts() {
        return [SELECT Id, Name, OwnerId, Description, Phone FROM Account];
    }
}