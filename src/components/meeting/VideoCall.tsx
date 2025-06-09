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
  MoreVertical,
  VolumeX
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import MeetingTranscription from './MeetingTranscription';

interface VideoCallProps {
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
}

const VideoCall = ({ meetingId, userName, onEndCall }: VideoCallProps) => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [activeTab, setActiveTab] = useState('meeting');
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [isVolumeEnabled, setIsVolumeEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteVideoContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    initializeMedia();
    // Simulate connection and participant joining
    setTimeout(() => {
      setConnectionStatus('connected');
      // Simulate a participant joining after 3 seconds
      setTimeout(() => {
        const newParticipant: Participant = {
          id: 'participant-1',
          name: 'Dr. Sarah Wilson',
          isVideoEnabled: true,
          isAudioEnabled: true,
          joinedAt: new Date()
        };
        setParticipants([newParticipant]);
        toast({
          title: "Participant joined",
          description: `${newParticipant.name} has joined the meeting`,
        });
      }, 3000);
    }, 1500);
    
    return () => {
      cleanup();
    };
  }, []);

  // Keep video stream active when switching tabs
  useEffect(() => {
    if (localStreamRef.current && localVideoRef.current && activeTab === 'meeting') {
      localVideoRef.current.srcObject = localStreamRef.current;
    }
  }, [activeTab]);

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

  const toggleVolume = () => {
    setIsVolumeEnabled(!isVolumeEnabled);
    if (remoteVideoRef.current) {
      remoteVideoRef.current.muted = isVolumeEnabled;
    }
    toast({
      title: isVolumeEnabled ? "Volume muted" : "Volume enabled",
      description: isVolumeEnabled ? "Remote audio is now muted" : "Remote audio is now enabled",
    });
  };

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        if (remoteVideoContainerRef.current?.requestFullscreen) {
          await remoteVideoContainerRef.current.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
      toast({
        title: "Fullscreen error",
        description: "Could not toggle fullscreen mode",
        variant: "destructive",
      });
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
    toast({
      title: showChat ? "Chat closed" : "Chat opened",
      description: showChat ? "Chat panel is now hidden" : "Chat panel is now visible",
    });
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    toast({
      title: showSettings ? "Settings closed" : "Settings opened",
      description: showSettings ? "Settings panel is now hidden" : "Settings panel is now visible",
    });
  };

  const showMoreOptions = () => {
    toast({
      title: "More options",
      description: "Additional meeting options coming soon",
    });
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto p-4 h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Vitality Meeting</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant={connectionStatus === 'connected' ? 'default' : 'secondary'}
                  className={connectionStatus === 'connected' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'}
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    connectionStatus === 'connected' ? 'bg-green-500' : 'bg-yellow-500'
                  } ${connectionStatus === 'connecting' ? 'animate-pulse' : ''}`}></div>
                  {connectionStatus}
                </Badge>
                <span className="text-gray-500 text-sm">ID: {meetingId}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="h-5 w-5" />
              <span>{participants.length + 1} participant(s)</span>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-gray-100/80">
                <TabsTrigger value="meeting" className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900">
                  <Camera className="h-4 w-4 mr-2" />
                  Meeting
                </TabsTrigger>
                <TabsTrigger value="transcription" className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900">
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
                <Card className="bg-white/80 backdrop-blur-sm border-gray-200 h-full shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-800 flex items-center gap-2">
                        {isDoctor && <Badge className="bg-blue-100 text-blue-800 border-blue-200">Doctor</Badge>}
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
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                            <Monitor className="h-3 w-3 mr-1" />
                            Sharing
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 flex-1">
                    <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden h-full">
                      <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      {!isVideoEnabled && (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <div className="text-center">
                            <VideoOff className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600">Camera off</p>
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={toggleVolume}
                          className="h-8 w-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 border border-gray-200"
                        >
                          {isVolumeEnabled ? (
                            <Volume2 className="h-4 w-4 text-gray-700" />
                          ) : (
                            <VolumeX className="h-4 w-4 text-gray-700" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={toggleFullscreen}
                          className="h-8 w-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 border border-gray-200"
                        >
                          <Maximize className="h-4 w-4 text-gray-700" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Remote Video */}
                <Card className="bg-white/80 backdrop-blur-sm border-gray-200 h-full shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-gray-800">
                      {participants.length > 0 ? participants[0].name : 'Waiting for participants...'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1">
                    <div 
                      ref={remoteVideoContainerRef}
                      className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden h-full"
                    >
                      <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        muted={!isVolumeEnabled}
                        className="w-full h-full object-cover"
                      />
                      {participants.length === 0 ? (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="text-center">
                            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-2">Waiting for others to join</p>
                            <p className="text-gray-500 text-sm">Share meeting ID: {meetingId}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                              <User className="h-10 w-10 text-blue-600" />
                            </div>
                            <p className="text-gray-700 font-medium">{participants[0].name}</p>
                            <p className="text-gray-500 text-sm">Connected</p>
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={toggleVolume}
                          className="h-8 w-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 border border-gray-200"
                        >
                          {isVolumeEnabled ? (
                            <Volume2 className="h-4 w-4 text-gray-700" />
                          ) : (
                            <VolumeX className="h-4 w-4 text-gray-700" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={toggleFullscreen}
                          className="h-8 w-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 border border-gray-200"
                        >
                          <Maximize className="h-4 w-4 text-gray-700" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="transcription" className="h-full">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 h-full overflow-auto border border-gray-200 shadow-sm">
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
        <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex justify-center items-center gap-4">
            <Button
              variant={isAudioEnabled ? "secondary" : "destructive"}
              size="lg"
              onClick={toggleAudio}
              className="rounded-full h-12 w-12 p-0 bg-white/80 hover:bg-white/90 border border-gray-200"
            >
              {isAudioEnabled ? <Mic className="h-5 w-5 text-gray-700" /> : <MicOff className="h-5 w-5" />}
            </Button>

            <Button
              variant={isVideoEnabled ? "secondary" : "destructive"}
              size="lg"
              onClick={toggleVideo}
              className="rounded-full h-12 w-12 p-0 bg-white/80 hover:bg-white/90 border border-gray-200"
            >
              {isVideoEnabled ? <Video className="h-5 w-5 text-gray-700" /> : <VideoOff className="h-5 w-5" />}
            </Button>

            <Button
              variant={isScreenSharing ? "default" : "secondary"}
              size="lg"
              onClick={isScreenSharing ? stopScreenShare : startScreenShare}
              className="rounded-full h-12 w-12 p-0 bg-white/80 hover:bg-white/90 border border-gray-200"
            >
              <Monitor className="h-5 w-5 text-gray-700" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={toggleChat}
              className={`rounded-full h-12 w-12 p-0 border border-gray-200 ${
                showChat ? 'bg-blue-100 hover:bg-blue-200' : 'bg-white/80 hover:bg-white/90'
              }`}
            >
              <MessageSquare className="h-5 w-5 text-gray-700" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={toggleSettings}
              className={`rounded-full h-12 w-12 p-0 border border-gray-200 ${
                showSettings ? 'bg-blue-100 hover:bg-blue-200' : 'bg-white/80 hover:bg-white/90'
              }`}
            >
              <Settings className="h-5 w-5 text-gray-700" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={showMoreOptions}
              className="rounded-full h-12 w-12 p-0 bg-white/80 hover:bg-white/90 border border-gray-200"
            >
              <MoreVertical className="h-5 w-5 text-gray-700" />
            </Button>

            {!isCallStarted ? (
              <Button
                onClick={startCall}
                size="lg"
                className="bg-green-500 hover:bg-green-600 rounded-full h-12 w-12 p-0 border border-green-300"
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
            <p className="text-gray-600 text-sm">
              Meeting in progress • Share ID: <span className="text-gray-800 font-mono font-medium">{meetingId}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
