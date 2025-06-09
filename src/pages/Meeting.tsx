
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import VideoCall from '@/components/meeting/VideoCall';
import MeetingLobby from '@/components/meeting/MeetingLobby';
import { useToast } from '@/components/ui/use-toast';

const Meeting = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isInLobby, setIsInLobby] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (!meetingId) {
      toast({
        title: "Invalid meeting",
        description: "Meeting ID is required",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
  }, [meetingId, navigate]);

  const handleJoinMeeting = (name: string) => {
    setUserName(name);
    setIsInLobby(false);
  };

  const handleEndCall = () => {
    navigate('/');
  };

  if (!meetingId) {
    return null;
  }

  const defaultUserName = user?.email?.split('@')[0] || '';

  return (
    <>
      {isInLobby ? (
        <MeetingLobby
          meetingId={meetingId}
          onJoinMeeting={handleJoinMeeting}
          defaultUserName={defaultUserName}
        />
      ) : (
        <VideoCall
          meetingId={meetingId}
          userName={userName}
          onEndCall={handleEndCall}
        />
      )}
    </>
  );
};

export default Meeting;
