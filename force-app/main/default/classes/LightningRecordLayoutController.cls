public with sharing class LightningRecordLayoutController {
    private class RecordLayoutFieldDto {
        @AuraEnabled
        public String apiFieldName;
        @AuraEnabled
        public String parentSectionName;
        @AuraEnabled
        public Boolean isOneColumnSection;
        @AuraEnabled
        public Boolean isTwoColumnSection;
    }

    private class RecordHeaderFieldDto {
        @AuraEnabled
        public Boolean isDefaultField; 
        @AuraEnabled
        public String labelFieldName;
        @AuraEnabled
        public String apiFieldName;
    }

    @AuraEnabled(cacheable=true)
    public static List<RecordLayoutFieldDto> getPageLayoutDetails(String sobjectApiName, String layoutName) {
        List<RecordLayoutFieldDto> fields = new List<RecordLayoutFieldDto>();

        String fullLayoutPath = sobjectApiName.trim() + '-' + layoutName;
        List<Metadata.Metadata> layouts = Metadata.Operations.retrieve(Metadata.MetadataType.Layout, new List<String>{fullLayoutPath});
        if (isNotEmpty(layouts)) {
            Metadata.Layout desiredLayout = (Metadata.Layout) layouts.get(0);
            for (Metadata.LayoutSection section : desiredLayout.layoutSections) {
                String sectionName = section.label;

                for (Metadata.LayoutColumn column : section.layoutColumns) {
                    if (isNotEmpty(column.layoutItems)) {
                        for (Metadata.LayoutItem item : column.layoutItems) {
                            RecordLayoutFieldDto field = new RecordLayoutFieldDto();
                            field.apiFieldName = item.field;
                            field.parentSectionName = sectionName;
                            field.isOneColumnSection = isOneColumnLayoutSection(section);
                            field.isTwoColumnSection = isTwoColumnLayoutSection(section);
                            fields.add(field);
                        }
                    }
                }
            }
        }

        return fields;
    }

    @AuraEnabled(cacheable=true)
    public static List<RecordHeaderFieldDto> getFieldSetByApiName(String sobjectApiName, String fieldSetName) {
        List<RecordHeaderFieldDto> fields = new List<RecordHeaderFieldDto>();

        Schema.DescribeSObjectResult sobjectDescribeSchema =  Schema.getGlobalDescribe().get(sobjectApiName).getDescribe();
        Schema.FieldSet desiredFieldSet = sobjectDescribeSchema.fieldsets.getMap().get(fieldSetName);
        if (desiredFieldSet != null && !desiredFieldSet.getFields().isEmpty()) {
            List<RecordHeaderFieldDto> headerFields = new List<RecordHeaderFieldDto>();
            for (Integer i = 0; i < desiredFieldSet.getFields().size(); i++) {
                RecordHeaderFieldDto headerField = new RecordHeaderFieldDto();
                headerField.labelFieldName = String.valueOf(desiredFieldSet.getFields()[i].getLabel());
                headerField.apiFieldName = String.valueOf(desiredFieldSet.getFields()[i].getSObjectField());

                if (i == 0) {
                    headerField.isDefaultField = true;
                } else {
                    headerField.isDefaultField = false;
                }

                fields.add(headerField);
            }
        }

        return fields;
    }

    private static Boolean isNotEmpty(List<Object> entities) {
        return (entities != null && !entities.isEmpty());
    }

    private static Boolean isOneColumnLayoutSection(Metadata.LayoutSection section) {
        String sectionPositionStyle = section != null ? String.valueOf(section.style).toLowerCase() : '';
        return (!String.isBlank(sectionPositionStyle) && sectionPositionStyle.contains('onecolumn'));
    }

    private static Boolean isTwoColumnLayoutSection(Metadata.LayoutSection section) {
        String sectionPositionStyle = section != null ? String.valueOf(section.style).toLowerCase() : '';
        return (!String.isBlank(sectionPositionStyle) && sectionPositionStyle.contains('twocolumn'));
    }
}