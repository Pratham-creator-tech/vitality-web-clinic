
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    initializeMedia();
    return () => {
      cleanup();
    };
  }, []);

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      toast({
        title: "Camera and microphone ready",
        description: "You can now start your meeting",
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
      description: "Thank you for using our video calling service",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Vitality Meeting</h1>
            <p className="text-gray-400">Meeting ID: {meetingId}</p>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>{participants.length} participant(s)</span>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Local Video */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-300">
                {userName} (You)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gray-700 rounded-lg overflow-hidden">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {!isVideoEnabled && (
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <VideoOff className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 flex gap-1">
                  {!isAudioEnabled && (
                    <div className="bg-red-600 rounded-full p-1">
                      <MicOff className="h-3 w-3" />
                    </div>
                  )}
                  {isScreenSharing && (
                    <div className="bg-blue-600 rounded-full p-1">
                      <Monitor className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Remote Video */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-300">
                Waiting for participants...
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gray-700 rounded-lg overflow-hidden">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4">
          <Button
            variant={isAudioEnabled ? "default" : "destructive"}
            size="lg"
            onClick={toggleAudio}
            className="rounded-full h-12 w-12 p-0"
          >
            {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>

          <Button
            variant={isVideoEnabled ? "default" : "destructive"}
            size="lg"
            onClick={toggleVideo}
            className="rounded-full h-12 w-12 p-0"
          >
            {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>

          <Button
            variant={isScreenSharing ? "secondary" : "outline"}
            size="lg"
            onClick={isScreenSharing ? stopScreenShare : startScreenShare}
            className="rounded-full h-12 w-12 p-0"
          >
            <Monitor className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full h-12 w-12 p-0"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full h-12 w-12 p-0"
          >
            <Settings className="h-5 w-5" />
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
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Share this meeting ID with participants: <span className="text-white font-mono">{meetingId}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
