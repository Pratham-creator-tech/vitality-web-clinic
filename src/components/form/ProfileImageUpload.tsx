
import React, { useState } from "react";
import { User, Upload, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface ProfileImageUploadProps {
  initialImageUrl?: string | null;
  onImageUploaded: (url: string) => void;
  isRequired?: boolean;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ 
  initialImageUrl,
  onImageUploaded,
  isRequired = false
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `profile-images/${fileName}`;
      
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("Image size must be less than 2MB");
      }
      
      // Check file type
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("File type not supported. Please upload a JPEG, PNG, or GIF image.");
      }
      
      // Upload file to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
      
      if (urlData) {
        setImageUrl(urlData.publicUrl);
        onImageUploaded(urlData.publicUrl);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImageUrl(null);
    onImageUploaded("");
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`
          w-32 h-32 rounded-full overflow-hidden mb-4 flex items-center justify-center
          bg-gray-100 border-2 border-dashed
          ${isRequired && !imageUrl ? 'border-red-300' : 'border-gray-300'}
        `}
      >
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="h-16 w-16 text-gray-400" />
        )}
      </div>
      
      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}
      
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          className="flex items-center gap-1"
          onClick={() => document.getElementById('profileImageInput')?.click()}
        >
          {uploading ? 'Uploading...' : 
            <>
              <Upload className="h-4 w-4" />
              {imageUrl ? 'Change' : 'Upload'}
            </>
          }
        </Button>
        
        {imageUrl && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="flex items-center gap-1"
            onClick={removeImage}
          >
            <Trash className="h-4 w-4" />
            Remove
          </Button>
        )}
      </div>
      
      {isRequired && !imageUrl && (
        <p className="text-red-500 text-xs mt-2">Profile photo is required</p>
      )}
      
      <Input
        id="profileImageInput"
        type="file"
        accept="image/*"
        onChange={uploadImage}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImageUpload;
