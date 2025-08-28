
import React, { useState, useRef, useEffect } from 'react';

const Polaroid = () => {
  const [photoDataURL, setPhotoDataURL] = useState('');
  const [inCameraMode, setInCameraMode] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [activeFilter, setActiveFilter] = useState('none');
  const [activeLeak, setActiveLeak] = useState('none');
  const [grainLevel, setGrainLevel] = useState(0);
  const [caption, setCaption] = useState('Your text');

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const polaroidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update CSS variable for preview in chips
    document.documentElement.style.setProperty('--preview-url', photoDataURL ? `url('${photoDataURL}')` : 'url(\'\')');
  }, [photoDataURL]);

  const resetUI = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setInCameraMode(false);
    setCaptured(false);
    setPhotoDataURL('');
    setActiveFilter('none');
    setActiveLeak('none');
    setGrainLevel(0);
    setCaption('Your text');
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoDataURL(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: false 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setInCameraMode(true);
      setCaptured(false);
    } catch (error) {
      alert('Camera permission denied or unavailable.');
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !stream) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/png');
      setPhotoDataURL(dataURL);
      setCaptured(true);
    }
  };

  const handleRetake = async () => {
    if (!inCameraMode) return;
    setCaptured(false);
    if (!stream) {
      await handleCamera();
    }
  };

  const handleUse = () => {
    if (!captured && !photoDataURL) return;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setInCameraMode(false);
  };

  const handleSave = async () => {
    if (!polaroidRef.current) return;
    
    // Use html2canvas if available
    if (window.html2canvas) {
      // Temporarily remove shadows and rounded corners for clean capture
      const originalStyle = polaroidRef.current.style.cssText;
      polaroidRef.current.style.boxShadow = 'none';
      polaroidRef.current.style.borderRadius = '0';
      
      const canvas = await window.html2canvas(polaroidRef.current, { 
        useCORS: true, 
        backgroundColor: '#ffffff',
        scale: 3, // Higher scale for better quality
        removeContainer: true
      });
      
      // Restore original styling
      polaroidRef.current.style.cssText = originalStyle;
      
      const link = document.createElement('a');
      link.download = 'polaroid.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else {
      alert('Save functionality requires html2canvas library');
    }
  };

  const getFilterStyle = () => {
    switch (activeFilter) {
      case 'light': return { filter: 'brightness(1.2)' };
      case 'dark': return { filter: 'grayscale(1) contrast(1.25)' };
      default: return {};
    }
  };

  const getLeakClass = () => {
    return activeLeak !== 'none' ? `leak-${activeLeak}` : '';
  };

  const getGrainOpacity = () => {
    const map: { [key: number]: number } = { 0: 0, 1: 0.2, 2: 0.4, 3: 0.6 };
    return map[grainLevel] ?? 0;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Polaroid Frame - Left Side */}
          <div 
            ref={polaroidRef}
            className="w-[360px] bg-white rounded-xl p-3.5 shadow-lg relative flex-shrink-0"
            style={{
              '--frame-width': '360px',
              '--img-height': '300px',
              '--frame-pad': '14px',
              '--label-height': '72px',
              '--preview-url': photoDataURL ? `url('${photoDataURL}')` : 'url(\'\')'
            } as React.CSSProperties}
          >
            <div className="relative w-full h-[300px] rounded-lg overflow-hidden bg-gray-100">
              {inCameraMode && !captured && (
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  playsInline
                  autoPlay
                />
              )}
              {photoDataURL && (
                <img
                  src={photoDataURL}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={getFilterStyle()}
                />
              )}
              <div className={`absolute inset-0 pointer-events-none rounded-lg ${getLeakClass()}`} />
              <div 
                className="absolute inset-0 pointer-events-none rounded-lg grain"
                style={{ 
                  opacity: getGrainOpacity(),
                  background: "url('https://i.ibb.co/k4F2Ktt/grain.png')",
                  backgroundSize: 'cover',
                  mixBlendMode: 'overlay'
                }}
              />
            </div>
            <div className="h-[72px] flex items-end justify-end pt-2">
              <div 
                className="w-full text-right pt-2 text-xl text-gray-800 select-none"
                style={{ fontFamily: 'Permanent Marker, system-ui' }}
              >
                {caption}
              </div>
            </div>
          </div>

          {/* Editing Controls - Right Side */}
          <div className="w-full lg:w-[420px] bg-white rounded-xl shadow-sm p-6 grid grid-cols-2 gap-4 max-h-fit">
            <h3 className="col-span-2 text-sm font-bold text-gray-600 uppercase tracking-wide mb-1">Image Source</h3>
            
            <button 
              onClick={handleUpload}
              className="bg-gray-100 text-gray-900 px-3 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              Upload
            </button>
            <button 
              onClick={handleCamera}
              className="bg-gray-100 text-gray-900 px-3 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              Take Photo
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {inCameraMode && (
              <div className="col-span-2 flex gap-2.5">
                <button 
                  onClick={handleCapture}
                  className="bg-gray-900 text-white px-3 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-700 transition-colors"
                >
                  Capture
                </button>
                <button 
                  onClick={handleRetake}
                  className="bg-gray-100 text-gray-900 px-3 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors"
                >
                  Retake
                </button>
                <button 
                  onClick={handleUse}
                  className="bg-gray-900 text-white px-3 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-700 transition-colors"
                >
                  Use
                </button>
              </div>
            )}

            <h3 className="col-span-2 text-sm font-bold text-gray-600 uppercase tracking-wide mb-1 mt-2">Filters</h3>
            <div className="col-span-2 flex gap-2.5 flex-wrap">
              {[
                { key: 'none', label: 'None' },
                { key: 'light', label: 'Light' },
                { key: 'dark', label: 'Dark' }
              ].map(filter => (
                <div 
                  key={filter.key}
                  className={`flex flex-col items-center gap-1.5 cursor-pointer ${activeFilter === filter.key ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.key)}
                >
                  <div 
                    className={`w-9 h-9 rounded-full border overflow-hidden bg-gray-100 ${
                      activeFilter === filter.key ? 'ring-2 ring-gray-900 ring-offset-1' : 'border-gray-300'
                    }`}
                    style={{
                      backgroundImage: photoDataURL ? `url('${photoDataURL}')` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: filter.key === 'light' ? 'brightness(1.2)' : filter.key === 'dark' ? 'grayscale(1) contrast(1.25)' : undefined
                    }}
                  />
                  <label className="text-xs text-gray-600">{filter.label}</label>
                </div>
              ))}
            </div>

            <h3 className="col-span-2 text-sm font-bold text-gray-600 uppercase tracking-wide mb-1 mt-2">Light Leaks</h3>
            <div className="col-span-2 flex gap-2.5 flex-wrap">
              {[
                { key: 'none', label: 'None' },
                { key: '1', label: '01' },
                { key: '2', label: '02' },
                { key: '3', label: '03' },
                { key: '4', label: '04' },
                { key: '5', label: '05' }
              ].map(leak => (
                <div 
                  key={leak.key}
                  className={`flex flex-col items-center gap-1.5 cursor-pointer ${activeLeak === leak.key ? 'active' : ''}`}
                  onClick={() => setActiveLeak(leak.key)}
                >
                  <div 
                    className={`w-9 h-9 rounded-full border overflow-hidden relative ${
                      activeLeak === leak.key ? 'ring-2 ring-gray-900 ring-offset-1' : 'border-gray-300'
                    }`}
                    style={{
                      backgroundImage: photoDataURL && leak.key !== 'none' ? `url('${photoDataURL}')` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundColor: leak.key === 'none' ? '#f0f1f4' : '#eee'
                    }}
                  >
                    {leak.key !== 'none' && photoDataURL && (
                      <div 
                        className="absolute inset-0 rounded-full"
                        style={{
                          mixBlendMode: 'screen',
                          background: leak.key === '1' ? 'radial-gradient(40px 24px at 12% 80%, rgba(255,80,0,.6), transparent 60%)' :
                                    leak.key === '2' ? 'radial-gradient(44px 28px at 82% 18%, rgba(255,220,0,.5), transparent 60%)' :
                                    leak.key === '3' ? 'linear-gradient(270deg, rgba(255,120,0,.45), transparent 55%)' :
                                    leak.key === '4' ? 'radial-gradient(60px 40px at 0% 50%, rgba(255,0,150,.45), transparent 70%)' :
                                    leak.key === '5' ? 'radial-gradient(48px 36px at 50% 100%, rgba(0,180,255,.45), transparent 65%)' : undefined
                        }}
                      />
                    )}
                  </div>
                  <label className="text-xs text-gray-600">{leak.label}</label>
                </div>
              ))}
            </div>

            <h3 className="col-span-2 text-sm font-bold text-gray-600 uppercase tracking-wide mb-1 mt-2">Film Grain</h3>
            <div className="col-span-2">
              <input
                type="range"
                min="0"
                max="3"
                step="1"
                value={grainLevel}
                onChange={(e) => setGrainLevel(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <h3 className="col-span-2 text-sm font-bold text-gray-600 uppercase tracking-wide mb-1 mt-2">Caption</h3>
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Type here"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 text-sm"
              />
            </div>

            <button 
              onClick={handleSave}
              className="bg-gray-900 text-white px-3 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-700 transition-colors"
            >
              Save as PNG
            </button>
            <button 
              onClick={resetUI}
              className="bg-gray-100 text-gray-900 px-3 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              Restart
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .leak-1 { 
          background: radial-gradient(120px 80px at 8% 90%, rgba(255,80,0,0.45), transparent 60%), linear-gradient(90deg, rgba(255,0,0,0.12), transparent 40%); 
          mix-blend-mode: screen; 
        }
        .leak-2 { 
          background: radial-gradient(160px 100px at 92% 12%, rgba(255,200,0,0.35), transparent 60%), linear-gradient(180deg, rgba(255,255,0,0.12), transparent 50%); 
          mix-blend-mode: screen; 
        }
        .leak-3 { 
          background: linear-gradient(270deg, rgba(255,120,0,0.35), transparent 55%), radial-gradient(180px 120px at 10% 10%, rgba(255,0,150,0.25), transparent 60%); 
          mix-blend-mode: screen; 
        }
        .leak-4 { 
          background: radial-gradient(220px 160px at 0% 50%, rgba(255,0,150,0.35), transparent 70%), linear-gradient(0deg, rgba(255,50,50,0.12), transparent 50%); 
          mix-blend-mode: screen; 
        }
        .leak-5 { 
          background: radial-gradient(200px 120px at 50% 100%, rgba(0,180,255,0.25), transparent 65%), linear-gradient(90deg, rgba(255,160,0,0.2), transparent 55%); 
          mix-blend-mode: screen; 
        }
        .grain {
          background: url('https://i.ibb.co/k4F2Ktt/grain.png');
          background-size: cover;
          mix-blend-mode: overlay;
        }
      `}</style>
    </div>
  );
};

// Add type declaration for html2canvas
declare global {
  interface Window {
    html2canvas: any;
  }
}

export default Polaroid;
