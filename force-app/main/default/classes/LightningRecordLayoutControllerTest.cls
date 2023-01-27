/**
* @author https://github.com/sandriiy/Deserves-Acceptance
*/
@IsTest
private with sharing class LightningRecordLayoutControllerTest {

    @IsTest
    private static void testGetFieldSetByApiNameFail() {
        String sobjectApiName = 'Account';
        String fieldSetName = 'FieldSetNameTest';

        Test.startTest();
            List<LightningRecordLayoutController.RecordHeaderFieldDto> fields = LightningRecordLayoutController.getFieldSetByApiName(sobjectApiName, fieldSetName);
            System.assertNotEquals(null, fields);
        Test.stopTest();
    }

    @IsTest
    private static void testGetPageLayoutDetailsByAccount() {
        String sobjectApiName = 'Account';
        String layoutName = 'Account Layout';

        Test.startTest();
            List<LightningRecordLayoutController.RecordLayoutFieldDto> fields = LightningRecordLayoutController.getPageLayoutDetails(sobjectApiName, layoutName);
            System.assertNotEquals(null, fields);
        Test.stopTest();
    }

    @IsTest
    private static void testGetPageLayoutDetailsByCase() {
        String sobjectApiName = 'Case';
        String layoutName = 'Case Layout';

        Test.startTest();
            List<LightningRecordLayoutController.RecordLayoutFieldDto> fields = LightningRecordLayoutController.getPageLayoutDetails(sobjectApiName, layoutName);
            System.assertNotEquals(null, fields);
        Test.stopTest();
    }

    @IsTest
    private static void testIsNotEmpty(){
        List<String> lines = new List<String>();
        List<Integer> digits = new List<Integer>{1};

        Test.startTest();
            Boolean isNotEmptyLines = LightningRecordLayoutController.isNotEmpty(lines);
            Boolean isNotEmptyDigits = LightningRecordLayoutController.isNotEmpty(digits);

            System.assertEquals(false, isNotEmptyLines);
            System.assertEquals(true, isNotEmptyDigits);
        Test.stopTest();
    }
}