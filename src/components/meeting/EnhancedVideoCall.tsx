import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  PhoneOff, 
  Monitor, 
  Users,
  Settings,
  MessageSquare,
  FileText,
  Camera,
  Volume2,
  Maximize,
  MoreVertical,
  VolumeX,
  User,
  UserCheck,
  UserX,
  Bell,
  Files,
  Send,
  Download,
  Upload,
  Share2,
  ScreenShare,
  ScreenShareOff,
  StopCircle,
  Clipboard,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  RefreshCw,
  Settings2,
  Zap,
  Wifi,
  WifiOff,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Circle
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { meetingHosts } from './MeetingLobby';

interface EnhancedVideoCallProps {
  meetingId: string;
  userName: string;
  onEndCall: () => void;
}

interface Participant {
  id: string;
  name: string;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  joinedAt: Date;
  isHost?: boolean;
  connectionQuality: 'excellent' | 'good' | 'poor';
  isPresenting?: boolean;
  deviceType: 'desktop' | 'mobile' | 'tablet';
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'file' | 'system';
  fileData?: {
    name: string;
    size: number;
    type: string;
  };
}

interface SharedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedBy: string;
  uploadedAt: Date;
  url: string;
}

interface MeetingSettings {
  videoQuality: 'low' | 'medium' | 'high';
  audioQuality: 'low' | 'medium' | 'high';
  autoRecord: boolean;
  allowParticipantMute: boolean;
  allowScreenShare: boolean;
  enableChat: boolean;
  enableFileSharing: boolean;
  maxParticipants: number;
  waitingRoomEnabled: boolean;
}

const EnhancedVideoCall = ({ meetingId, userName, onEndCall }: EnhancedVideoCallProps) => {
  // Core states
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [activeTab, setActiveTab] = useState('meeting');
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  
  // UI states
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVolumeEnabled, setIsVolumeEnabled] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentUser, setCurrentUser] = useState<Participant | null>(null);
  const [isHost, setIsHost] = useState(false);
  
  // Chat states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [unreadMessages, setUnreadMessages] = useState(0);
  
  // File sharing states
  const [sharedFiles, setSharedFiles] = useState<SharedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // Meeting settings
  const [meetingSettings, setMeetingSettings] = useState<MeetingSettings>({
    videoQuality: 'high',
    audioQuality: 'high',
    autoRecord: false,
    allowParticipantMute: true,
    allowScreenShare: true,
    enableChat: true,
    enableFileSharing: true,
    maxParticipants: 50,
    waitingRoomEnabled: false
  });
  
  // Advanced states
  const [networkQuality, setNetworkQuality] = useState<'excellent' | 'good' | 'poor'>('excellent');
  const [speakingParticipant, setSpeakingParticipant] = useState<string | null>(null);
  const [dominantSpeaker, setDominantSpeaker] = useState<string | null>(null);
  const [meetingDuration, setMeetingDuration] = useState(0);
  const [pinnedParticipant, setPinnedParticipant] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<'grid' | 'speaker' | 'presentation'>('grid');
  
  // Refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoContainerRef = useRef<HTMLDivElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Initialize meeting
  useEffect(() => {
    initializeMeeting();
    startMeetingTimer();
    simulateNetworkMonitoring();
    
    return () => {
      cleanup();
    };
  }, [meetingId, userName]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Update unread messages
  useEffect(() => {
    if (activeTab !== 'chat' && chatMessages.length > 0) {
      const lastMessage = chatMessages[chatMessages.length - 1];
      if (lastMessage.senderId !== currentUser?.id) {
        setUnreadMessages(prev => prev + 1);
      }
    } else {
      setUnreadMessages(0);
    }
  }, [chatMessages, activeTab, currentUser?.id]);

  const initializeMeeting = async () => {
    try {
      setConnectionStatus('connecting');
      
      // Initialize media devices
      await initializeMedia();
      
      // Set up participant
      const designatedHost = meetingHosts.get(meetingId);
      const shouldBeHost = designatedHost === userName;
      
      const newParticipant: Participant = {
        id: `${userName}-${Date.now()}`,
        name: userName,
        isVideoEnabled: true,
        isAudioEnabled: true,
        joinedAt: new Date(),
        isHost: shouldBeHost,
        connectionQuality: 'excellent',
        deviceType: 'desktop' // Detect actual device type
      };
      
      setCurrentUser(newParticipant);
      setIsHost(shouldBeHost);
      setParticipants([newParticipant]);
      
      // Add initial system message
      addSystemMessage(`${userName} joined the meeting`);
      
      // Simulate connection
      setTimeout(() => {
        setConnectionStatus('connected');
        toast({
          title: "Connected to meeting",
          description: "Meeting is ready to start",
        });
      }, 1500);
      
    } catch (error) {
      console.error('Error initializing meeting:', error);
      setConnectionStatus('disconnected');
      toast({
        title: "Connection failed",
        description: "Unable to join the meeting",
        variant: "destructive",
      });
    }
  };

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1920, max: 1920 },
          height: { ideal: 1080, max: 1080 },
          frameRate: { ideal: 30, max: 30 }
        },
        audio: { 
          echoCancellation: true, 
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000
        }
      });
      
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      // Set up audio level detection
      setupAudioLevelDetection(stream);
      
    } catch (error) {
      console.error('Error accessing media devices:', error);
      toast({
        title: "Media access error",
        description: "Please allow camera and microphone access",
        variant: "destructive",
      });
    }
  };

  const setupAudioLevelDetection = (stream: MediaStream) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    microphone.connect(analyser);
    analyser.fftSize = 256;

    const checkAudioLevel = () => {
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      
      if (average > 30) { // Threshold for speaking
        setSpeakingParticipant(currentUser?.id || null);
        setTimeout(() => setSpeakingParticipant(null), 1000);
      }
      
      requestAnimationFrame(checkAudioLevel);
    };
    
    checkAudioLevel();
  };

  const startMeetingTimer = () => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      setMeetingDuration(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    
    return () => clearInterval(timer);
  };

  const simulateNetworkMonitoring = () => {
    const checkNetwork = () => {
      // Simulate network quality detection
      const qualities = ['excellent', 'good', 'poor'] as const;
      const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];
      setNetworkQuality(randomQuality);
    };
    
    const interval = setInterval(checkNetwork, 10000);
    return () => clearInterval(interval);
  };

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Media controls
  const toggleVideo = useCallback(() => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
        
        addSystemMessage(`${userName} ${videoTrack.enabled ? 'turned on' : 'turned off'} their camera`);
      }
    }
  }, [userName]);

  const toggleAudio = useCallback(() => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
        
        addSystemMessage(`${userName} ${audioTrack.enabled ? 'unmuted' : 'muted'} their microphone`);
      }
    }
  }, [userName]);

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          frameRate: { ideal: 30, max: 30 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true
        }
      });
      
      screenStreamRef.current = screenStream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }
      
      setIsScreenSharing(true);
      setLayoutMode('presentation');
      addSystemMessage(`${userName} started screen sharing`);
      
      screenStream.getVideoTracks()[0].addEventListener('ended', () => {
        stopScreenShare();
      });
      
    } catch (error) {
      console.error('Error starting screen share:', error);
      toast({
        title: "Screen share error",
        description: "Could not start screen sharing",
        variant: "destructive",
      });
    }
  };

  const stopScreenShare = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
      screenStreamRef.current = null;
    }
    
    setIsScreenSharing(false);
    setLayoutMode('grid');
    addSystemMessage(`${userName} stopped screen sharing`);
    initializeMedia(); // Switch back to camera
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    const action = !isRecording ? 'started' : 'stopped';
    addSystemMessage(`Meeting recording ${action}`);
    
    toast({
      title: `Recording ${action}`,
      description: `Meeting recording has been ${action}`,
    });
  };

  // Chat functions
  const addSystemMessage = (message: string) => {
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'system',
      senderName: 'System',
      message,
      timestamp: new Date(),
      type: 'system'
    };
    setChatMessages(prev => [...prev, systemMessage]);
  };

  const sendMessage = () => {
    if (newMessage.trim() && currentUser) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        senderName: currentUser.name,
        message: newMessage.trim(),
        timestamp: new Date(),
        type: 'text'
      };
      
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // File sharing functions
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        uploadFile(file);
      });
    }
  };

  const uploadFile = (file: File) => {
    // Simulate file upload
    const sharedFile: SharedFile = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedBy: userName,
      uploadedAt: new Date(),
      url: URL.createObjectURL(file) // In real app, this would be actual upload URL
    };
    
    setSharedFiles(prev => [...prev, sharedFile]);
    
    const fileMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUser?.id || '',
      senderName: userName,
      message: `Shared file: ${file.name}`,
      timestamp: new Date(),
      type: 'file',
      fileData: {
        name: file.name,
        size: file.size,
        type: file.type
      }
    };
    
    setChatMessages(prev => [...prev, fileMessage]);
    
    toast({
      title: "File uploaded",
      description: `${file.name} has been shared with participants`,
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Layout functions
  const getConnectionIcon = (quality: string) => {
    switch (quality) {
      case 'excellent': return <Wifi className="h-4 w-4 text-green-500" />;
      case 'good': return <Wifi className="h-4 w-4 text-yellow-500" />;
      case 'poor': return <WifiOff className="h-4 w-4 text-red-500" />;
      default: return <Wifi className="h-4 w-4 text-gray-500" />;
    }
  };

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const endCall = () => {
    cleanup();
    addSystemMessage(`${userName} left the meeting`);
    onEndCall();
    
    toast({
      title: "Meeting ended",
      description: "Thank you for using our meeting platform",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-4 h-screen flex flex-col">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center mb-6 card-enhanced p-4 bg-white/95 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Advanced Meeting Platform
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <Badge 
                  variant={connectionStatus === 'connected' ? 'default' : 'secondary'}
                  className={`${
                    connectionStatus === 'connected' 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                  } flex items-center gap-2`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    connectionStatus === 'connected' ? 'bg-green-500' : 'bg-yellow-500'
                  } ${connectionStatus === 'connecting' ? 'animate-pulse' : ''}`}></div>
                  {connectionStatus}
                </Badge>
                
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDuration(meetingDuration)}
                </Badge>
                
                <Badge variant="outline" className="flex items-center gap-1">
                  {getConnectionIcon(networkQuality)}
                  {networkQuality}
                </Badge>
                
                {isHost && <Badge className="bg-blue-100 text-blue-800 border-blue-200">Host</Badge>}
                {isRecording && (
                  <Badge className="bg-red-100 text-red-800 border-red-200 animate-pulse">
                    <Circle className="h-3 w-3 mr-1 fill-current" />
                    Recording
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Users className="h-5 w-5" />
              <span>{participants.length} participant(s)</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowParticipants(!showParticipants)}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Participants
              {showParticipants ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-6">
          {/* Video Area */}
          <div className="flex-1 flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="bg-white/80 backdrop-blur-md mb-4">
                <TabsTrigger value="meeting" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Meeting
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Chat
                  {unreadMessages > 0 && (
                    <Badge variant="destructive" className="ml-1 h-5 w-5 text-xs p-0 flex items-center justify-center">
                      {unreadMessages}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="files" className="flex items-center gap-2">
                  <Files className="h-4 w-4" />
                  Files ({sharedFiles.length})
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings2 className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Meeting Tab */}
              <TabsContent value="meeting" className="flex-1 flex flex-col">
                <div className="flex-1 card-enhanced bg-black/95 rounded-2xl overflow-hidden relative">
                  {/* Main Video Area */}
                  <div className="relative h-full flex items-center justify-center">
                    <video
                      ref={localVideoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Video Overlays */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <Badge className="glass text-white border-white/30">
                        {userName} {isHost && '(Host)'}
                      </Badge>
                      {speakingParticipant === currentUser?.id && (
                        <Badge className="bg-green-500/80 text-white animate-pulse">
                          Speaking
                        </Badge>
                      )}
                    </div>
                    
                    {!isVideoEnabled && (
                      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <User className="h-12 w-12 text-gray-300" />
                          </div>
                          <p className="text-white text-lg font-medium">{userName}</p>
                          <p className="text-gray-400">Camera is off</p>
                        </div>
                      </div>
                    )}
                    
                    {isScreenSharing && (
                      <Badge className="absolute top-4 left-4 bg-blue-500/80 text-white">
                        <ScreenShare className="h-4 w-4 mr-2" />
                        Screen Sharing
                      </Badge>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Chat Tab */}
              <TabsContent value="chat" className="flex-1 flex flex-col">
                <Card className="flex-1 flex flex-col">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Meeting Chat</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-0">
                    <div 
                      ref={chatContainerRef}
                      className="flex-1 overflow-y-auto p-4 space-y-3 max-h-96"
                    >
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${
                            message.senderId === currentUser?.id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          {message.type === 'system' ? (
                            <div className="text-center w-full">
                              <Badge variant="secondary" className="text-xs">
                                {message.message}
                              </Badge>
                            </div>
                          ) : (
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                                message.senderId === currentUser?.id
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-100 dark:bg-gray-800'
                              }`}
                            >
                              {message.senderId !== currentUser?.id && (
                                <p className="text-xs font-medium mb-1 opacity-70">
                                  {message.senderName}
                                </p>
                              )}
                              <p className="text-sm">{message.message}</p>
                              {message.fileData && (
                                <div className="mt-2 p-2 bg-white/10 rounded-lg">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    <span className="text-xs">{message.fileData.name}</span>
                                  </div>
                                </div>
                              )}
                              <p className="text-xs mt-1 opacity-50">
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="p-4">
                      <div className="flex gap-2">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type a message..."
                          className="flex-1"
                        />
                        <Button onClick={sendMessage} size="sm" disabled={!newMessage.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button 
                          onClick={() => fileInputRef.current?.click()} 
                          variant="outline" 
                          size="sm"
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Files Tab */}
              <TabsContent value="files" className="flex-1">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Files className="h-5 w-5" />
                      Shared Files
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sharedFiles.length === 0 ? (
                        <div className="text-center py-12">
                          <Files className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No files shared yet</p>
                          <Button 
                            onClick={() => fileInputRef.current?.click()} 
                            className="mt-4"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload File
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {sharedFiles.map((file) => (
                            <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <FileText className="h-8 w-8 text-blue-500" />
                                <div>
                                  <p className="font-medium">{file.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {formatFileSize(file.size)} • {file.uploadedBy} • {file.uploadedAt.toLocaleTimeString()}
                                  </p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="flex-1">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Settings2 className="h-5 w-5" />
                      Meeting Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Video & Audio</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Video Quality</span>
                            <select 
                              value={meetingSettings.videoQuality}
                              onChange={(e) => setMeetingSettings(prev => ({
                                ...prev, 
                                videoQuality: e.target.value as any
                              }))}
                              className="text-sm border rounded px-2 py-1"
                            >
                              <option value="low">Low (360p)</option>
                              <option value="medium">Medium (720p)</option>
                              <option value="high">High (1080p)</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Audio Quality</span>
                            <select 
                              value={meetingSettings.audioQuality}
                              onChange={(e) => setMeetingSettings(prev => ({
                                ...prev, 
                                audioQuality: e.target.value as any
                              }))}
                              className="text-sm border rounded px-2 py-1"
                            >
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold">Meeting Controls</h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              checked={meetingSettings.autoRecord}
                              onChange={(e) => setMeetingSettings(prev => ({
                                ...prev, 
                                autoRecord: e.target.checked
                              }))}
                            />
                            <span className="text-sm">Auto-record meetings</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              checked={meetingSettings.allowScreenShare}
                              onChange={(e) => setMeetingSettings(prev => ({
                                ...prev, 
                                allowScreenShare: e.target.checked
                              }))}
                            />
                            <span className="text-sm">Allow screen sharing</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              checked={meetingSettings.enableChat}
                              onChange={(e) => setMeetingSettings(prev => ({
                                ...prev, 
                                enableChat: e.target.checked
                              }))}
                            />
                            <span className="text-sm">Enable chat</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Participants Panel */}
          {showParticipants && (
            <Card className="w-80 flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Participants ({participants.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <div className="space-y-3">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-600" />
                          </div>
                          {speakingParticipant === participant.id && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{participant.name}</p>
                          <div className="flex items-center gap-2">
                            {participant.isHost && <Badge variant="secondary" className="text-xs">Host</Badge>}
                            {getConnectionIcon(participant.connectionQuality)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {participant.isVideoEnabled ? (
                          <Video className="h-4 w-4 text-green-500" />
                        ) : (
                          <VideoOff className="h-4 w-4 text-red-500" />
                        )}
                        {participant.isAudioEnabled ? (
                          <Mic className="h-4 w-4 text-green-500" />
                        ) : (
                          <MicOff className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Enhanced Controls */}
        <div className="mt-6 card-enhanced p-4 bg-white/95 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                onClick={toggleAudio}
                variant={isAudioEnabled ? "default" : "destructive"}
                size="lg"
                className="rounded-full w-14 h-14 p-0"
              >
                {isAudioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
              </Button>
              
              <Button
                onClick={toggleVideo}
                variant={isVideoEnabled ? "default" : "destructive"}
                size="lg"
                className="rounded-full w-14 h-14 p-0"
              >
                {isVideoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
              </Button>
              
              <Button
                onClick={isScreenSharing ? stopScreenShare : startScreenShare}
                variant={isScreenSharing ? "default" : "outline"}
                size="lg"
                className="rounded-full w-14 h-14 p-0"
                disabled={!meetingSettings.allowScreenShare}
              >
                {isScreenSharing ? <ScreenShareOff className="h-6 w-6" /> : <ScreenShare className="h-6 w-6" />}
              </Button>
              
              {isHost && (
                <Button
                  onClick={toggleRecording}
                  variant={isRecording ? "destructive" : "outline"}
                  size="lg"
                  className="rounded-full w-14 h-14 p-0"
                >
                  {isRecording ? <StopCircle className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Share File
              </Button>
              
              <Button variant="outline" onClick={() => {
                navigator.clipboard.writeText(meetingId);
                toast({ title: "Meeting ID copied", description: meetingId });
              }}>
                <Clipboard className="h-4 w-4 mr-2" />
                Copy ID
              </Button>
              
              <Button
                onClick={endCall}
                variant="destructive"
                size="lg"
                className="rounded-full px-8"
              >
                <PhoneOff className="h-5 w-5 mr-2" />
                End Call
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileUpload}
        className="hidden"
        accept="*/*"
      />
    </div>
  );
};

export default EnhancedVideoCall;