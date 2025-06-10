
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, VideoOff, Mic, MicOff, Settings, Clock, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

interface MeetingLobbyProps {
  meetingId: string;
  onJoinMeeting: (userName: string) => void;
  defaultUserName?: string;
}

interface JoinRequest {
  id: string;
  userName: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'denied';
}

// Global store for join requests
const joinRequestsStore = new Map<string, JoinRequest[]>();

const MeetingLobby = ({ meetingId, onJoinMeeting, defaultUserName = '' }: MeetingLobbyProps) => {
  const [userName, setUserName] = useState(defaultUserName);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [mediaReady, setMediaReady] = useState(false);
  const [joinRequestSent, setJoinRequestSent] = useState(false);
  const [joinRequestStatus, setJoinRequestStatus] = useState<'pending' | 'approved' | 'denied'>('pending');
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    initializePreview();
    
    // Check for join request status updates
    const interval = setInterval(() => {
      if (currentRequestId) {
        checkJoinRequestStatus();
      }
    }, 1000);
    
    return () => {
      cleanup();
      clearInterval(interval);
    };
  }, [currentRequestId]);

  const checkJoinRequestStatus = () => {
    const requests = joinRequestsStore.get(meetingId) || [];
    const request = requests.find(r => r.id === currentRequestId);
    
    if (request && request.status !== joinRequestStatus) {
      setJoinRequestStatus(request.status);
      
      if (request.status === 'approved') {
        toast({
          title: "Approved!",
          description: "You have been admitted to the meeting",
        });
        cleanup();
        onJoinMeeting(userName.trim());
      } else if (request.status === 'denied') {
        toast({
          title: "Request denied",
          description: "The host has denied your request to join",
          variant: "destructive",
        });
        setJoinRequestSent(false);
        setCurrentRequestId(null);
      }
    }
  };

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

  const sendJoinRequest = () => {
    if (!userName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to request to join",
        variant: "destructive",
      });
      return;
    }

    const requestId = `${userName}-${Date.now()}`;
    const newRequest: JoinRequest = {
      id: requestId,
      userName: userName.trim(),
      timestamp: new Date(),
      status: 'pending'
    };

    // Add to global store
    const existingRequests = joinRequestsStore.get(meetingId) || [];
    joinRequestsStore.set(meetingId, [...existingRequests, newRequest]);

    setCurrentRequestId(requestId);
    setJoinRequestSent(true);
    
    toast({
      title: "Join request sent",
      description: "Waiting for host approval...",
    });
  };

  if (joinRequestSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-25 via-white to-green-25 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <Clock className="h-5 w-5" />
              Waiting for Approval
            </CardTitle>
            <CardDescription>
              Meeting ID: <span className="font-mono">{meetingId}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="animate-pulse flex items-center justify-center gap-2 text-blue-600">
                <Users className="h-5 w-5" />
                <span>Requesting to join as <strong>{userName}</strong></span>
              </div>
            </div>
            
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
              {joinRequestStatus === 'pending' ? 'Pending approval...' : joinRequestStatus}
            </Badge>
            
            <p className="text-gray-600 text-sm">
              The meeting host will review your request to join. Please wait while they approve your entry.
            </p>
            
            <Button
              variant="outline"
              onClick={() => {
                setJoinRequestSent(false);
                setCurrentRequestId(null);
              }}
              className="w-full"
            >
              Cancel Request
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-25 via-white to-green-25 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
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
                variant={isAudioEnabled ? "secondary" : "destructive"}
                size="sm"
                onClick={toggleAudio}
                className="rounded-full h-10 w-10 p-0"
              >
                {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>
              
              <Button
                variant={isVideoEnabled ? "secondary" : "destructive"}
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

          {/* Request to Join Button */}
          <Button
            onClick={sendJoinRequest}
            disabled={!mediaReady || !userName.trim()}
            className="w-full bg-blue-500 hover:bg-blue-600"
            size="lg"
          >
            Ask to Join
          </Button>
          
          <p className="text-center text-sm text-gray-500">
            The meeting host will review your request before admitting you to the meeting.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingLobby;
