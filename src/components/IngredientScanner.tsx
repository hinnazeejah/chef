import React, { useState, useRef } from 'react';
import { CameraIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface IngredientScannerProps {
  onIngredientsDetected: (ingredients: string[]) => void;
  onError: (error: string) => void;
}

const IngredientScanner: React.FC<IngredientScannerProps> = ({ 
  onIngredientsDetected,
  onError 
}) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      
      // Try to find the front-facing camera
      const frontCamera = videoDevices.find(device => 
        device.label.toLowerCase().includes('facetime') || 
        device.label.toLowerCase().includes('front')
      );

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          deviceId: frontCamera ? { exact: frontCamera.deviceId } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
        streamRef.current = stream;
      }
      setIsCapturing(true);
    } catch (error) {
      console.error('Camera error:', error);
      onError('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCapturing(false);
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      const image = canvas.toDataURL('image/jpeg');
      setCapturedImage(image);
      stopCamera();
    }
  };

  const retake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const analyzeImage = async () => {
    if (!capturedImage) return;

    setIsProcessing(true);
    try {
      const response = await fetch('/api/analyze-ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: capturedImage })
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message);
      }

      if (data.ingredients.length === 0) {
        onError('No ingredients detected. Try taking a clearer photo.');
        return;
      }

      onIngredientsDetected(data.ingredients);
    } catch (error) {
      onError('Failed to analyze image. Please try again.');
    } finally {
      setIsProcessing(false);
      setCapturedImage(null);
    }
  };

  return (
    <div className="space-y-4">
      {!isCapturing && !capturedImage && (
        <button
          onClick={startCamera}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-food-orange/10 
            text-food-orange rounded-xl hover:bg-food-orange/20 transition-colors"
        >
          <CameraIcon className="w-5 h-5" />
          Scan Ingredients
        </button>
      )}

      {isCapturing && (
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full rounded-xl"
            style={{ 
              minHeight: '300px',
              transform: 'scaleX(-1)',
              backgroundColor: 'transparent'
            }}
          />
          <button
            onClick={captureImage}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 
              bg-food-orange text-white rounded-full shadow-lg"
          >
            Capture
          </button>
        </div>
      )}

      {capturedImage && (
        <div className="space-y-4">
          <img 
            src={capturedImage} 
            alt="Captured ingredients" 
            className="w-full rounded-xl"
          />
          <div className="flex gap-3">
            <button
              onClick={retake}
              className="flex-1 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 
                transition-colors flex items-center justify-center gap-2"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Retake
            </button>
            <button
              onClick={analyzeImage}
              disabled={isProcessing}
              className="flex-1 px-4 py-2 bg-food-orange text-white rounded-xl 
                hover:bg-food-orange/90 transition-colors disabled:opacity-50"
            >
              {isProcessing ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientScanner; 