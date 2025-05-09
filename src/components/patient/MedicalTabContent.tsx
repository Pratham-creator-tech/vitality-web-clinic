
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, FileText } from "lucide-react";
import DiagnosesList from "@/components/patient/DiagnosesList";
import PrescriptionsList from "@/components/patient/PrescriptionsList";
import InvoicesList from "@/components/patient/InvoicesList";

interface MedicalTabContentProps {
  diagnoses: any[];
  prescriptions: any[];
  invoices: any[];
  formatDate: (date: string) => string;
}

const MedicalTabContent = ({ 
  diagnoses, 
  prescriptions, 
  invoices, 
  formatDate 
}: MedicalTabContentProps) => {
  return (
    <Tabs defaultValue="diagnoses">
      <TabsList className="mb-4">
        <TabsTrigger value="diagnoses" className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4" />
          Diagnoses
        </TabsTrigger>
        <TabsTrigger value="prescriptions" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Prescriptions
        </TabsTrigger>
        <TabsTrigger value="invoices" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Invoices
        </TabsTrigger>
      </TabsList>
      
      {/* Diagnoses Tab */}
      <TabsContent value="diagnoses">
        <DiagnosesList diagnoses={diagnoses} formatDate={formatDate} />
      </TabsContent>
      
      {/* Prescriptions Tab */}
      <TabsContent value="prescriptions">
        <PrescriptionsList prescriptions={prescriptions} formatDate={formatDate} />
      </TabsContent>
      
      {/* Invoices Tab */}
      <TabsContent value="invoices">
        <InvoicesList invoices={invoices} formatDate={formatDate} />
      </TabsContent>
    </Tabs>
  );
};

export default MedicalTabContent;
