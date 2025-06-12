
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Download, 
  File, 
  Image, 
  FileText, 
  Video,
  Trash2,
  Eye,
  X
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SharedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedBy: string;
  uploadedAt: Date;
  url: string;
}

interface MeetingFileSharingProps {
  meetingId: string;
  userName: string;
  isDoctor: boolean;
}

const MeetingFileSharing = ({ meetingId, userName, isDoctor }: MeetingFileSharingProps) => {
  const [sharedFiles, setSharedFiles] = useState<SharedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (type.startsWith('video/')) return <Video className="h-4 w-4" />;
    if (type.includes('pdf') || type.includes('document')) return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (files: File[]) => {
    setIsUploading(true);
    
    for (const file of files) {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB`,
          variant: "destructive",
        });
        continue;
      }

      try {
        // Simulate file upload - in real implementation, upload to storage
        const fileUrl = URL.createObjectURL(file);
        
        const newFile: SharedFile = {
          id: `${Date.now()}-${Math.random()}`,
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedBy: userName,
          uploadedAt: new Date(),
          url: fileUrl
        };

        setSharedFiles(prev => [...prev, newFile]);

        toast({
          title: "File uploaded",
          description: `${file.name} has been shared with the meeting`,
        });
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload failed",
          description: `Failed to upload ${file.name}`,
          variant: "destructive",
        });
      }
    }
    
    setIsUploading(false);
  };

  const downloadFile = (file: SharedFile) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download started",
      description: `Downloading ${file.name}`,
    });
  };

  const removeFile = (fileId: string) => {
    setSharedFiles(prev => prev.filter(f => f.id !== fileId));
    toast({
      title: "File removed",
      description: "File has been removed from the meeting",
    });
  };

  const openFilePreview = (file: SharedFile) => {
    if (file.type.startsWith('image/') || file.type === 'application/pdf') {
      window.open(file.url, '_blank');
    } else {
      downloadFile(file);
    }
  };

  return (
    <Card className="h-full bg-white/90 backdrop-blur-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-800 flex items-center gap-2">
          <File className="h-5 w-5" />
          Shared Files ({sharedFiles.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 mb-2">
            Drag and drop files here, or 
            <Button
              variant="link"
              className="p-0 ml-1 h-auto text-blue-600"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              browse
            </Button>
          </p>
          <p className="text-sm text-gray-500">Max file size: 10MB</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInput}
            disabled={isUploading}
          />
        </div>

        {isUploading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Uploading...</p>
          </div>
        )}

        {/* Files List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {sharedFiles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <File className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <p>No files shared yet</p>
            </div>
          ) : (
            sharedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getFileIcon(file.type)}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{formatFileSize(file.size)}</span>
                      <span>•</span>
                      <span>by {file.uploadedBy}</span>
                      {isDoctor && file.uploadedBy !== userName && (
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                          Patient
                        </Badge>
                      )}
                      {!isDoctor && file.uploadedBy !== userName && (
                        <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                          Doctor
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openFilePreview(file)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => downloadFile(file)}
                    className="h-8 w-8 p-0"
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                  {file.uploadedBy === userName && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(file.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingFileSharing;
