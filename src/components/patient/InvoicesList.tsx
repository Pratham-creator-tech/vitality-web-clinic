
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Invoice {
  id: string;
  invoice_number: string;
  patient_id: string;
  doctor_id: string;
  doctor: {
    full_name: string;
  };
  amount: number;
  total_amount: number;
  payment_status: string;
  invoice_date: string;
  due_date: string;
}

interface InvoicesListProps {
  invoices: Invoice[];
  formatDate: (date: string) => string;
}

const InvoicesList = ({ invoices, formatDate }: InvoicesListProps) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
      </CardHeader>
      <CardContent>
        {invoices.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No invoices have been recorded for this patient.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">Invoice #{invoice.invoice_number}</h3>
                    <p className="text-sm text-gray-500">
                      Doctor: {invoice.doctor?.full_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={invoice.payment_status === "paid" ? "default" : "destructive"}>
                      {invoice.payment_status === "paid" ? "Paid" : "Unpaid"}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">
                      Date: {formatDate(invoice.invoice_date)}
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span>Amount:</span>
                    <span className="font-medium">${invoice.total_amount}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2"
                    onClick={() => navigate(`/invoices/${invoice.id}/download`)}
                  >
                    Download PDF
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/invoices/${invoice.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvoicesList;
