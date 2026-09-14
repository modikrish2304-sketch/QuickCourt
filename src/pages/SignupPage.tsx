import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { 
  Mail, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  Camera,
  Upload,
  RefreshCw,
  AlertCircle,
  X
} from 'lucide-react';

export interface SignupPageProps {
  onNavigate: (route: string) => void;
  redirectUrl?: string;
  onShowToast?: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({
  onNavigate,
  redirectUrl = '/venues',
  onShowToast,
}) => {
  const { initiateSignup } = useAuth();
  const [profilePic, setProfilePic] = useState<string>('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Camera states
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string>('');
  const [isCameraLoading, setIsCameraLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Stop camera helper
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraOpen(false);
    setCameraError('');
    setIsCameraLoading(false);
  };

  // Start camera stream
  const startCamera = async () => {
    setError('');
    setCameraError('');
    setIsCameraLoading(true);
    setIsCameraOpen(true);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 640 },
          facingMode: 'user',
        },
        audio: false,
      });

      setCameraStream(stream);
      setIsCameraLoading(false);
    } catch (err: any) {
      setIsCameraLoading(false);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera permission was denied. Please allow camera access in browser settings.');
      } else {
        setCameraError(err.message || 'Unable to access camera.');
      }
    }
  };

  // Attach stream to video tag whenever available
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
      videoRef.current.play().catch((e) => console.warn('Video play error:', e));
    }
  }, [cameraStream, isCameraOpen]);

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  // Capture photo from video stream
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    
    const canvas = document.createElement('canvas');
    const width = video.videoWidth || 480;
    const height = video.videoHeight || 480;
    
    // Create a square crop
    const size = Math.min(width, height);
    canvas.width = size;
    canvas.height = size;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Flip horizontal for mirrored selfie feel
    ctx.translate(size, 0);
    ctx.scale(-1, 1);

    const startX = (width - size) / 2;
    const startY = (height - size) / 2;

    ctx.drawImage(video, startX, startY, size, size, 0, 0, size, size);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setProfilePic(dataUrl);
    stopCamera();
  };

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, WebP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image file size should be less than 5MB.');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setProfilePic(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (fullName.trim().length < 2) {
      setError('Please provide your full name.');
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setIsLoading(true);
    try {
      await initiateSignup({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        role: 'player',
        avatar: profilePic || undefined,
      });

      if (onShowToast) {
        onShowToast('info', 'OTP Sent', `Verification code sent to ${email}`);
      }

      // Navigate to OTP verification page
      onNavigate(
        `/verify-otp?email=${encodeURIComponent(email)}&redirect=${encodeURIComponent(redirectUrl)}`
      );
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback initial avatar preview
  const defaultAvatar = fullName.trim()
    ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName.trim())}&backgroundColor=059669,10b981,047857`
    : email.trim()
    ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email.trim())}&backgroundColor=059669,10b981,047857`
    : '';

  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="flex items-center justify-center mb-3 group focus:outline-none"
            title="Go to Home"
          >
            <Logo size="lg" />
          </button>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-display text-center">
            Create Your Account
          </h2>
          <p className="text-xs text-slate-500 mt-1.5 text-center max-w-xs">
            Join QuickCourt to find and book courts in your city.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* Profile Picture Upload Section with Both Options */}
        <div className="flex flex-col items-center justify-center pt-1 pb-1">
          <div className="relative group rounded-full p-1 transition-all">
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-100 flex items-center justify-center shadow-inner relative cursor-pointer ${
                isDragging ? 'ring-4 ring-emerald-400 ring-offset-2' : 'hover:ring-4 hover:ring-slate-100 hover:ring-offset-1'
              }`}
              title="Click to choose a photo file"
            >
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : defaultAvatar ? (
                <img
                  src={defaultAvatar}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-colors">
                  <UserIcon className="w-10 h-10 stroke-[1.5]" />
                </div>
              )}

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-semibold">
                Change
              </div>
            </div>

            {/* Quick action camera badge */}
            <button
              type="button"
              className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md hover:bg-emerald-700 transition-colors border-2 border-white"
              onClick={startCamera}
              title="Open camera to capture a photo"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Both Options: Upload Photo & Use Camera */}
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              <span>Upload Photo</span>
            </button>

            <button
              type="button"
              onClick={startCamera}
              className="px-3.5 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-600" />
              <span>Use Camera</span>
            </button>
          </div>

          {profilePic && (
            <button
              type="button"
              onClick={() => setProfilePic('')}
              className="mt-2 text-[11px] text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" /> Remove Photo
            </button>
          )}
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="e.g. Rohan Patel"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            leftIcon={<UserIcon className="w-4 h-4" />}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            required
          />

          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-slate-400 hover:text-slate-600 focus:outline-none"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            required
          />

          <div className="pt-1 text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>We'll send a 6-digit OTP to verify your email address.</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full mt-2"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign Up
          </Button>
        </form>

        {/* Footer link to Login */}
        <div className="text-center pt-2 text-xs text-slate-500">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate(`/login?redirect=${encodeURIComponent(redirectUrl)}`)}
            className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors underline"
          >
            Log In
          </button>
        </div>
      </div>

      {/* Live Camera Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-slate-200 flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Take Profile Photo</h3>
                  <p className="text-[11px] text-slate-500">Position your face inside the circle</p>
                </div>
              </div>
              <button
                type="button"
                onClick={stopCamera}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video preview viewport */}
            <div className="mt-4 relative w-64 h-64 rounded-full overflow-hidden border-4 border-emerald-500 bg-slate-950 shadow-inner flex items-center justify-center">
              {isCameraLoading ? (
                <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                  <RefreshCw className="w-7 h-7 animate-spin text-emerald-500" />
                  <span className="text-xs">Connecting camera...</span>
                </div>
              ) : cameraError ? (
                <div className="p-4 text-center text-red-400 flex flex-col items-center gap-2">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                  <p className="text-xs leading-relaxed">{cameraError}</p>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover -scale-x-100"
                />
              )}
            </div>

            {/* Capture & Controls */}
            <div className="mt-5 w-full flex flex-col gap-2">
              {!cameraError ? (
                <button
                  type="button"
                  disabled={isCameraLoading}
                  onClick={capturePhoto}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 disabled:opacity-50"
                >
                  <Camera className="w-4 h-4" />
                  <span>Capture & Use Photo</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startCamera}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Camera</span>
                </button>
              )}

              <button
                type="button"
                onClick={stopCamera}
                className="w-full py-2 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-semibold text-center transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
