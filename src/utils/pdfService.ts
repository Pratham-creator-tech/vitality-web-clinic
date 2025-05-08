
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  patientName: string;
  patientEmail: string;
  patientAddress?: string;
  doctorName: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  paymentStatus: string;
}

interface PrescriptionData {
  prescriptionDate: string;
  patientName: string;
  patientAge: string;
  doctorName: string;
  doctorSpecialty?: string;
  instructions?: string;
  medicines?: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  treatments?: {
    name: string;
    instructions: string;
    frequency: string;
    duration: string;
  }[];
  notes?: string;
}

// Function to generate an invoice PDF
export const generateInvoicePDF = (data: InvoiceData): Blob => {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Set document properties
  doc.setProperties({
    title: `Invoice #${data.invoiceNumber}`,
    author: 'Physiocare Clinic',
    subject: 'Invoice',
    keywords: 'invoice, payment, physiocare',
  });

  // Add logo
  const logoUrl = '/lovable-uploads/d4839bdf-5201-41d9-9549-0b1021009501.png';
  try {
    doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30);
  } catch (error) {
    console.error('Error adding logo to PDF:', error);
  }
  
  // Add clinic info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('PHYSIOCARE', 45, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Advanced Physiotherapy & Rehabilitation Center', 45, 27);
  doc.text('123 Health Street, Medical District', 45, 32);
  doc.text('Phone: (123) 456-7890 | Email: billing@physiocare.com', 45, 37);

  // Add invoice header
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', 10, 55);
  
  // Add invoice details
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Invoice Number: #${data.invoiceNumber}`, 10, 65);
  doc.text(`Date: ${data.invoiceDate}`, 10, 70);
  doc.text(`Due Date: ${data.dueDate}`, 10, 75);
  doc.text(`Status: ${data.paymentStatus.toUpperCase()}`, 10, 80);
  
  // Add patient info
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To:', 120, 65);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(data.patientName, 120, 70);
  doc.text(data.patientEmail, 120, 75);
  if (data.patientAddress) {
    doc.text(data.patientAddress, 120, 80);
  }

  // Add doctor info
  doc.text(`Attending Physician: ${data.doctorName}`, 10, 90);
  
  // Add items table
  (doc as any).autoTable({
    startY: 100,
    head: [['Description', 'Quantity', 'Unit Price', 'Total']],
    body: data.items.map(item => [
      item.description,
      item.quantity,
      `$${item.unitPrice.toFixed(2)}`,
      `$${item.total.toFixed(2)}`
    ]),
    foot: [
      ['Subtotal', '', '', `$${data.subtotal.toFixed(2)}`],
      ['Tax', '', '', `$${data.tax.toFixed(2)}`],
      ['Total', '', '', `$${data.total.toFixed(2)}`]
    ],
    theme: 'striped',
    headStyles: {
      fillColor: [100, 150, 100],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    footStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [245, 250, 245]
    }
  });
  
  // Add footer
  const finalY = (doc as any).lastAutoTable.finalY + 20;
  
  doc.setFontSize(10);
  doc.text('Thank you for choosing Physiocare for your health needs.', 10, finalY);
  doc.text('Payment is due by the due date above.', 10, finalY + 5);
  
  doc.text('For questions regarding this invoice, please contact our billing department.', 10, finalY + 15);
  doc.text('Phone: (123) 456-7890 | Email: billing@physiocare.com', 10, finalY + 20);
  
  // Add page number
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
  }
  
  // Save the PDF and return as blob
  return doc.output('blob');
};

// Function to generate a prescription PDF
export const generatePrescriptionPDF = (data: PrescriptionData): Blob => {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Set document properties
  doc.setProperties({
    title: `Prescription for ${data.patientName}`,
    author: 'Physiocare Clinic',
    subject: 'Medical Prescription',
    keywords: 'prescription, medicine, physiotherapy, treatment',
  });

  // Add logo
  const logoUrl = '/lovable-uploads/d4839bdf-5201-41d9-9549-0b1021009501.png';
  try {
    doc.addImage(logoUrl, 'PNG', 10, 10, 25, 25);
  } catch (error) {
    console.error('Error adding logo to PDF:', error);
  }
  
  // Add clinic info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('PHYSIOCARE', 40, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Advanced Physiotherapy & Rehabilitation Center', 40, 25);
  doc.text('123 Health Street, Medical District', 40, 30);

  // Add prescription title
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PRESCRIPTION', 80, 45);
  
  // Horizontal line
  doc.setLineWidth(0.5);
  doc.line(10, 50, 200, 50);
  
  // Add prescription details
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  // Left column - patient info
  doc.text(`Patient: ${data.patientName}`, 10, 60);
  doc.text(`Age: ${data.patientAge}`, 10, 65);
  doc.text(`Date: ${data.prescriptionDate}`, 10, 70);
  
  // Right column - doctor info
  doc.text(`Doctor: ${data.doctorName}`, 120, 60);
  if (data.doctorSpecialty) {
    doc.text(`Specialty: ${data.doctorSpecialty}`, 120, 65);
  }
  
  // Rx symbol
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Rx', 10, 85);
  
  // Horizontal line
  doc.setLineWidth(0.3);
  doc.line(10, 90, 200, 90);
  
  let yPosition = 100;
  
  // Add medications if available
  if (data.medicines && data.medicines.length > 0) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Medications', 10, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    data.medicines.forEach((medicine, index) => {
      doc.text(`${index + 1}. ${medicine.name}`, 15, yPosition);
      yPosition += 5;
      doc.text(`   Dosage: ${medicine.dosage}`, 15, yPosition);
      yPosition += 5;
      doc.text(`   Frequency: ${medicine.frequency}`, 15, yPosition);
      yPosition += 5;
      doc.text(`   Duration: ${medicine.duration}`, 15, yPosition);
      yPosition += 10;
    });
  }
  
  // Check if we need a new page for treatments
  if (yPosition > 230 && data.treatments && data.treatments.length > 0) {
    doc.addPage();
    yPosition = 20;
  }
  
  // Add treatments if available
  if (data.treatments && data.treatments.length > 0) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Physiotherapy Treatments', 10, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    data.treatments.forEach((treatment, index) => {
      doc.text(`${index + 1}. ${treatment.name}`, 15, yPosition);
      yPosition += 5;
      doc.text(`   Instructions: ${treatment.instructions}`, 15, yPosition);
      yPosition += 5;
      doc.text(`   Frequency: ${treatment.frequency}`, 15, yPosition);
      yPosition += 5;
      doc.text(`   Duration: ${treatment.duration}`, 15, yPosition);
      yPosition += 10;
    });
  }
  
  // Check if we need a new page for instructions
  if (yPosition > 230 && data.instructions) {
    doc.addPage();
    yPosition = 20;
  }
  
  // Add additional instructions if available
  if (data.instructions) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Instructions', 10, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(data.instructions, 15, yPosition, { maxWidth: 180 });
    
    // Update yPosition based on the text height
    const textLines = doc.splitTextToSize(data.instructions, 180);
    yPosition += textLines.length * 5 + 10;
  }
  
  // Check if we need a new page for notes
  if (yPosition > 230 && data.notes) {
    doc.addPage();
    yPosition = 20;
  }
  
  // Add notes if available
  if (data.notes) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Additional Notes', 10, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(data.notes, 15, yPosition, { maxWidth: 180 });
  }
  
  // Add signature section
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  // Get to the last page
  doc.setPage(doc.getNumberOfPages());
  
  // Add signature line at the bottom
  const pageHeight = doc.internal.pageSize.height;
  doc.line(120, pageHeight - 40, 190, pageHeight - 40);
  doc.text("Doctor's Signature", 145, pageHeight - 35);
  
  // Add page number
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
  }
  
  // Save the PDF and return as blob
  return doc.output('blob');
};

// Function to download a PDF file
export const downloadPDF = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
