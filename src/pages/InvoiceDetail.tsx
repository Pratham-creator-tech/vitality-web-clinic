
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/layout/PageLayout";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Printer, 
  Calendar, 
  Loader2, 
  AlertCircle, 
  FileDown,
  ArrowLeftCircle
} from "lucide-react";
import { generateInvoicePDF, downloadPDF } from "@/utils/pdfService";

interface Invoice {
  id: string;
  invoice_number: string;
  patient_id: string;
  doctor_id: string;
  appointment_id: string | null;
  amount: number;
  tax: number;
  total_amount: number;
  payment_status: string;
  payment_date: string | null;
  invoice_date: string;
  due_date: string;
  services: any;
  patient: {
    full_name: string;
    email: string;
    address: string | null;
  };
  doctor: {
    full_name: string;
  };
}

const InvoiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to view this invoice.",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }

    if (!id) return;

    const fetchInvoiceData = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from("invoices")
          .select(`
            *,
            patient:patient_id (full_name, email, address),
            doctor:doctor_id (full_name)
          `)
          .eq("id", id)
          .single();

        if (error) throw error;
        setInvoice(data);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
        setError("Failed to load invoice data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoiceData();
  }, [id, user, navigate, toast]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleDownloadPDF = () => {
    if (!invoice) return;

    try {
      setIsGeneratingPDF(true);

      // Format invoice data for PDF generation
      const serviceItems = Array.isArray(invoice.services) 
        ? invoice.services 
        : typeof invoice.services === 'object' && invoice.services !== null
          ? [invoice.services]
          : [];
      
      const pdfData = {
        invoiceNumber: invoice.invoice_number,
        invoiceDate: formatDate(invoice.invoice_date),
        dueDate: formatDate(invoice.due_date),
        patientName: invoice.patient.full_name,
        patientEmail: invoice.patient.email,
        patientAddress: invoice.patient.address || undefined,
        doctorName: invoice.doctor.full_name,
        items: serviceItems.map((service: any) => ({
          description: service.name || service.description || 'Service',
          quantity: service.quantity || 1,
          unitPrice: service.price || service.unit_price || invoice.amount,
          total: service.total || (service.price ? service.price * (service.quantity || 1) : invoice.amount)
        })),
        subtotal: invoice.amount,
        tax: invoice.tax,
        total: invoice.total_amount,
        paymentStatus: invoice.payment_status
      };
      
      const pdfBlob = generateInvoicePDF(pdfData);
      downloadPDF(pdfBlob, `Invoice_${invoice.invoice_number}.pdf`);
      
      toast({
        title: "Success",
        description: "Invoice downloaded successfully!",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate invoice PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-vitality-500 mr-2" />
          <span>Loading invoice...</span>
        </div>
      </PageLayout>
    );
  }

  if (error || !invoice) {
    return (
      <PageLayout>
        <div className="container mx-auto py-16 text-center">
          <AlertCircle className="h-16 w-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error || "Invoice not found."}</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center mb-4 md:mb-0"
          >
            <ArrowLeftCircle className="mr-2 h-5 w-5" />
            Back
          </Button>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              onClick={handlePrint}
              className="flex items-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button 
              onClick={handleDownloadPDF}
              className="flex items-center gap-2"
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="print:shadow-none bg-white rounded-lg shadow-lg border p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/d4839bdf-5201-41d9-9549-0b1021009501.png" 
                alt="Physiocare Logo" 
                className="h-16 w-16 object-contain mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold text-vitality-600">PHYSIOCARE</h1>
                <p className="text-sm text-gray-600">Advanced Physiotherapy & Rehabilitation</p>
                <p className="text-sm text-gray-600">123 Health Street, Medical District</p>
                <p className="text-sm text-gray-600">info@physiocare.com | (123) 456-7890</p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">INVOICE</h2>
              <p className="text-gray-600">{`#${invoice.invoice_number}`}</p>
              <Badge className={getPaymentStatusColor(invoice.payment_status)}>
                {invoice.payment_status.toUpperCase()}
              </Badge>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Bill To:</h3>
              <p className="font-medium">{invoice.patient.full_name}</p>
              <p>{invoice.patient.email}</p>
              {invoice.patient.address && <p>{invoice.patient.address}</p>}
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">Invoice Date:</span>
                <span>{formatDate(invoice.invoice_date)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">Due Date:</span>
                <span>{formatDate(invoice.due_date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Physician:</span>
                <span>{invoice.doctor.full_name}</span>
              </div>
            </div>
          </div>
          
          <h3 className="font-semibold text-lg mb-4">Services</h3>
          
          <div className="overflow-x-auto mb-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell className="font-semibold">Description</TableCell>
                  <TableCell className="text-right font-semibold">Quantity</TableCell>
                  <TableCell className="text-right font-semibold">Unit Price</TableCell>
                  <TableCell className="text-right font-semibold">Total</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(invoice.services) ? (
                  invoice.services.map((service, index) => (
                    <TableRow key={index}>
                      <TableCell>{service.name || service.description || 'Service'}</TableCell>
                      <TableCell className="text-right">{service.quantity || 1}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(service.price || service.unit_price || 0)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(service.total || (service.price * (service.quantity || 1)))}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>{invoice.services?.name || invoice.services?.description || 'Physiotherapy Service'}</TableCell>
                    <TableCell className="text-right">{invoice.services?.quantity || 1}</TableCell>
                    <TableCell className="text-right">{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(invoice.amount)}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-end mb-8">
            <div className="w-full md:w-1/3">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Subtotal:</span>
                <span>{formatCurrency(invoice.amount)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Tax:</span>
                <span>{formatCurrency(invoice.tax)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{formatCurrency(invoice.total_amount)}</span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mt-10 border-t pt-6">
            <p className="mb-1"><strong>Payment Terms:</strong> Due by {formatDate(invoice.due_date)}</p>
            <p>Thank you for choosing Physiocare for your health needs. For questions regarding this invoice, please contact our billing department at billing@physiocare.com.</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default InvoiceDetail;
