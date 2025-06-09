
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, VideoOff, Mic, MicOff, Settings, Monitor } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface MeetingLobbyProps {
  meetingId: string;
  onJoinMeeting: (userName: string) => void;
  defaultUserName?: string;
}

const MeetingLobby = ({ meetingId, onJoinMeeting, defaultUserName = '' }: MeetingLobbyProps) => {
  const [userName, setUserName] = useState(defaultUserName);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [mediaReady, setMediaReady] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    initializePreview();
    return () => {
      cleanup();
    };
  }, []);

  const initializePreview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setMediaReady(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      toast({
        title: "Media access required",
        description: "Please allow camera and microphone access to join the meeting",
        variant: "destructive",
      });
    }
  };

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const handleJoinMeeting = () => {
    if (!userName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to join the meeting",
        variant: "destructive",
      });
      return;
    }
    
    cleanup();
    onJoinMeeting(userName.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitality-50 to-vitality-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-vitality-700">
            Join Vitality Meeting
          </CardTitle>
          <CardDescription>
            Meeting ID: <span className="font-mono">{meetingId}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Video Preview */}
          <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
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
            
            {/* Controls Overlay */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <Button
                variant={isAudioEnabled ? "default" : "destructive"}
                size="sm"
                onClick={toggleAudio}
                className="rounded-full h-10 w-10 p-0"
              >
                {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>
              
              <Button
                variant={isVideoEnabled ? "default" : "destructive"}
                size="sm"
                onClick={toggleVideo}
                className="rounded-full h-10 w-10 p-0"
              >
                {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="rounded-full h-10 w-10 p-0"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Status Indicators */}
            <div className="absolute top-4 left-4 flex gap-1">
              {!isAudioEnabled && (
                <div className="bg-red-600 rounded-full p-1">
                  <MicOff className="h-3 w-3 text-white" />
                </div>
              )}
              {!mediaReady && (
                <div className="bg-yellow-600 rounded-full px-2 py-1">
                  <span className="text-xs text-white">Setting up...</span>
                </div>
              )}
            </div>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="userName">Your Name</Label>
            <Input
              id="userName"
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="text-lg"
            />
          </div>

          {/* Device Status */}
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              {isAudioEnabled ? (
                <Mic className="h-4 w-4 text-green-600" />
              ) : (
                <MicOff className="h-4 w-4 text-red-600" />
              )}
              <span>Microphone {isAudioEnabled ? 'On' : 'Off'}</span>
            </div>
            <div className="flex items-center gap-1">
              {isVideoEnabled ? (
                <Video className="h-4 w-4 text-green-600" />
              ) : (
                <VideoOff className="h-4 w-4 text-red-600" />
              )}
              <span>Camera {isVideoEnabled ? 'On' : 'Off'}</span>
            </div>
          </div>

          {/* Join Button */}
          <Button
            onClick={handleJoinMeeting}
            disabled={!mediaReady || !userName.trim()}
            className="w-full bg-vitality-500 hover:bg-vitality-600"
            size="lg"
          >
            Join Meeting
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingLobby;
