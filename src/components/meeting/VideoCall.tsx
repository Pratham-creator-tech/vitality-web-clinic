
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  MoreVertical
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import MeetingTranscription from './MeetingTranscription';

interface VideoCallProps {
  meetingId: string;
  userName: string;
  onEndCall: () => void;
}

const VideoCall = ({ meetingId, userName, onEndCall }: VideoCallProps) => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [participants, setParticipants] = useState<string[]>([userName]);
  const [activeTab, setActiveTab] = useState('meeting');
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    initializeMedia();
    // Simulate connection
    setTimeout(() => setConnectionStatus('connected'), 1500);
    return () => {
      cleanup();
    };
  }, []);

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: { echoCancellation: true, noiseSuppression: true }
      });
      
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      toast({
        title: "Media ready",
        description: "Camera and microphone connected successfully",
      });
    } catch (error) {
      console.error('Error accessing media devices:', error);
      toast({
        title: "Media access error",
        description: "Please allow camera and microphone access",
        variant: "destructive",
      });
    }
  };

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }
      
      setIsScreenSharing(true);
      
      screenStream.getVideoTracks()[0].addEventListener('ended', () => {
        setIsScreenSharing(false);
        initializeMedia();
      });
      
      toast({
        title: "Screen sharing started",
        description: "Your screen is now being shared",
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
    setIsScreenSharing(false);
    initializeMedia();
  };

  const startCall = () => {
    setIsCallStarted(true);
    toast({
      title: "Meeting started",
      description: `Meeting ID: ${meetingId}`,
    });
  };

  const endCall = () => {
    cleanup();
    setIsCallStarted(false);
    onEndCall();
    toast({
      title: "Meeting ended",
      description: "Thank you for using Vitality Meeting",
    });
  };

  const isDoctor = userName.toLowerCase().includes('dr.') || userName.toLowerCase().includes('doctor');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto p-4 h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Vitality Meeting</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant={connectionStatus === 'connected' ? 'default' : 'secondary'}
                  className={connectionStatus === 'connected' ? 'bg-green-600' : 'bg-yellow-600'}
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    connectionStatus === 'connected' ? 'bg-green-300' : 'bg-yellow-300'
                  } ${connectionStatus === 'connecting' ? 'animate-pulse' : ''}`}></div>
                  {connectionStatus}
                </Badge>
                <span className="text-gray-300 text-sm">ID: {meetingId}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white">
              <Users className="h-5 w-5" />
              <span>{participants.length} participant(s)</span>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-white/20">
                <TabsTrigger value="meeting" className="text-white data-[state=active]:bg-white data-[state=active]:text-gray-900">
                  <Camera className="h-4 w-4 mr-2" />
                  Meeting
                </TabsTrigger>
                <TabsTrigger value="transcription" className="text-white data-[state=active]:bg-white data-[state=active]:text-gray-900">
                  <FileText className="h-4 w-4 mr-2" />
                  Notes
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsContent value="meeting" className="h-full">
              {/* Video Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full mb-6">
                {/* Local Video */}
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        {isDoctor && <Badge className="bg-blue-600">Doctor</Badge>}
                        {userName} (You)
                      </CardTitle>
                      <div className="flex gap-1">
                        {!isAudioEnabled && (
                          <Badge variant="destructive" className="text-xs">
                            <MicOff className="h-3 w-3 mr-1" />
                            Muted
                          </Badge>
                        )}
                        {isScreenSharing && (
                          <Badge className="bg-blue-600 text-xs">
                            <Monitor className="h-3 w-3 mr-1" />
                            Sharing
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 flex-1">
                    <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden h-full">
                      <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      {!isVideoEnabled && (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                          <div className="text-center">
                            <VideoOff className="h-16 w-16 text-white/50 mx-auto mb-2" />
                            <p className="text-white/70">Camera off</p>
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                        >
                          <Volume2 className="h-4 w-4 text-white" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                        >
                          <Maximize className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Remote Video */}
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white">
                      Waiting for participants...
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1">
                    <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden h-full">
                      <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <div className="text-center">
                          <Users className="h-16 w-16 text-white/50 mx-auto mb-4" />
                          <p className="text-white/70 mb-2">Waiting for others to join</p>
                          <p className="text-white/50 text-sm">Share meeting ID: {meetingId}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="transcription" className="h-full">
              <div className="bg-white rounded-lg p-6 h-full overflow-auto">
                <MeetingTranscription 
                  meetingId={meetingId} 
                  userName={userName}
                  isDoctor={isDoctor}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Controls - Fixed at bottom */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex justify-center items-center gap-4">
            <Button
              variant={isAudioEnabled ? "secondary" : "destructive"}
              size="lg"
              onClick={toggleAudio}
              className="rounded-full h-12 w-12 p-0 bg-white/20 hover:bg-white/30"
            >
              {isAudioEnabled ? <Mic className="h-5 w-5 text-white" /> : <MicOff className="h-5 w-5" />}
            </Button>

            <Button
              variant={isVideoEnabled ? "secondary" : "destructive"}
              size="lg"
              onClick={toggleVideo}
              className="rounded-full h-12 w-12 p-0 bg-white/20 hover:bg-white/30"
            >
              {isVideoEnabled ? <Video className="h-5 w-5 text-white" /> : <VideoOff className="h-5 w-5" />}
            </Button>

            <Button
              variant={isScreenSharing ? "default" : "secondary"}
              size="lg"
              onClick={isScreenSharing ? stopScreenShare : startScreenShare}
              className="rounded-full h-12 w-12 p-0 bg-white/20 hover:bg-white/30"
            >
              <Monitor className="h-5 w-5 text-white" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="rounded-full h-12 w-12 p-0 bg-white/20 hover:bg-white/30"
            >
              <MessageSquare className="h-5 w-5 text-white" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="rounded-full h-12 w-12 p-0 bg-white/20 hover:bg-white/30"
            >
              <Settings className="h-5 w-5 text-white" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="rounded-full h-12 w-12 p-0 bg-white/20 hover:bg-white/30"
            >
              <MoreVertical className="h-5 w-5 text-white" />
            </Button>

            {!isCallStarted ? (
              <Button
                onClick={startCall}
                size="lg"
                className="bg-green-600 hover:bg-green-700 rounded-full h-12 w-12 p-0"
              >
                <Phone className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                onClick={endCall}
                size="lg"
                variant="destructive"
                className="rounded-full h-12 w-12 p-0"
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Meeting Info */}
          <div className="mt-4 text-center">
            <p className="text-white/70 text-sm">
              Meeting in progress • Share ID: <span className="text-white font-mono">{meetingId}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
