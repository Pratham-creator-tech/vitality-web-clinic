
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Save, 
  Mic, 
  MicOff,
  Bot,
  User,
  Stethoscope,
  Pill
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface TranscriptionEntry {
  id: string;
  speaker: 'doctor' | 'patient';
  text: string;
  timestamp: Date;
}

interface MeetingTranscriptionProps {
  meetingId: string;
  userName: string;
  isDoctor?: boolean;
}

const MeetingTranscription = ({ meetingId, userName, isDoctor = false }: MeetingTranscriptionProps) => {
  const [transcription, setTranscription] = useState<TranscriptionEntry[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [notes, setNotes] = useState('');
  const [prescription, setPrescription] = useState('');
  const [isGeneratingPrescription, setIsGeneratingPrescription] = useState(false);
  const { toast } = useToast();

  const addTranscriptionEntry = (speaker: 'doctor' | 'patient', text: string) => {
    const entry: TranscriptionEntry = {
      id: Date.now().toString(),
      speaker,
      text,
      timestamp: new Date()
    };
    setTranscription(prev => [...prev, entry]);
  };

  const startRecording = () => {
    setIsRecording(true);
    // Simulate recording - in real implementation, this would use Web Speech API
    toast({
      title: "Recording started",
      description: "Conversation is being transcribed",
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    toast({
      title: "Recording stopped",
      description: "Transcription paused",
    });
  };

  const generatePrescription = () => {
    setIsGeneratingPrescription(true);
    
    // Simulate AI prescription generation based on transcription
    setTimeout(() => {
      const symptoms = transcription
        .filter(entry => entry.text.toLowerCase().includes('pain') || 
                        entry.text.toLowerCase().includes('ache') ||
                        entry.text.toLowerCase().includes('hurt'))
        .map(entry => entry.text)
        .join('. ');

      const generatedPrescription = `
PRESCRIPTION

Patient: ${userName}
Date: ${new Date().toLocaleDateString()}
Meeting ID: ${meetingId}

SYMPTOMS DISCUSSED:
${symptoms || 'General consultation'}

RECOMMENDATIONS:
1. Continue with physiotherapy exercises as demonstrated
2. Apply ice pack for 15-20 minutes, 2-3 times daily
3. Gentle stretching exercises twice daily
4. Follow-up appointment in 2 weeks

MEDICATIONS:
- Ibuprofen 400mg as needed for pain relief
- Topical anti-inflammatory gel twice daily

NOTES:
${notes}

Dr. [Doctor Name]
Licensed Physiotherapist
      `.trim();

      setPrescription(generatedPrescription);
      setIsGeneratingPrescription(false);
      
      toast({
        title: "Prescription generated",
        description: "Based on conversation analysis",
      });
    }, 2000);
  };

  const downloadTranscription = () => {
    const content = transcription
      .map(entry => `[${entry.timestamp.toLocaleTimeString()}] ${entry.speaker.toUpperCase()}: ${entry.text}`)
      .join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-transcription-${meetingId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPrescription = () => {
    const blob = new Blob([prescription], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prescription-${meetingId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Simulate some sample transcription entries for demo
  useEffect(() => {
    const sampleEntries = [
      { id: '1', speaker: 'doctor' as const, text: 'Good morning! How are you feeling today?', timestamp: new Date() },
      { id: '2', speaker: 'patient' as const, text: 'I have been experiencing some back pain lately.', timestamp: new Date() },
      { id: '3', speaker: 'doctor' as const, text: 'Can you describe the pain? Is it sharp or dull?', timestamp: new Date() },
    ];
    setTranscription(sampleEntries);
  }, []);

  return (
    <div className="space-y-4">
      {/* Recording Controls */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Meeting Transcription
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant={isRecording ? "destructive" : "default"}
                size="sm"
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isRecording ? 'Stop' : 'Start'} Recording
              </Button>
              <Button variant="outline" size="sm" onClick={downloadTranscription}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          {isRecording && (
            <Badge variant="destructive" className="w-fit">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
              Recording...
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-40">
            <div className="space-y-2">
              {transcription.map((entry) => (
                <div key={entry.id} className="flex gap-2 p-2 rounded-lg bg-gray-50">
                  <div className="flex-shrink-0">
                    {entry.speaker === 'doctor' ? (
                      <Stethoscope className="h-4 w-4 text-blue-600 mt-1" />
                    ) : (
                      <User className="h-4 w-4 text-green-600 mt-1" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={entry.speaker === 'doctor' ? 'default' : 'secondary'} className="text-xs">
                        {entry.speaker === 'doctor' ? 'Doctor' : 'Patient'}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {entry.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{entry.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Notes Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Doctor's Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add your notes about the consultation..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-20"
          />
        </CardContent>
      </Card>

      {/* Prescription Generation */}
      {isDoctor && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Pill className="h-5 w-5" />
                AI Prescription Generator
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  onClick={generatePrescription}
                  disabled={isGeneratingPrescription || transcription.length === 0}
                  size="sm"
                >
                  {isGeneratingPrescription ? (
                    <>
                      <Bot className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Bot className="h-4 w-4 mr-2" />
                      Generate Prescription
                    </>
                  )}
                </Button>
                {prescription && (
                  <Button variant="outline" size="sm" onClick={downloadPrescription}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          {prescription && (
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap font-mono">{prescription}</pre>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
};

export default MeetingTranscription;
