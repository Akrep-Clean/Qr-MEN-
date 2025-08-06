// components/QrCodeCard.js
import { useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';

export default function QrCodeCard({ siteUrl }) {
  const qrRef = useRef();

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'turkoglu-qr-kod.png';
    link.click();
  };

  return (
    <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-6 text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Menüye Ulaşın</h2>

      <div ref={qrRef} className="inline-block mb-4 p-2 bg-blue-50 rounded-lg">
        <QRCode
          value={siteUrl}
          size={200}
          qrStyle="dots"
          eyeRadius={[
            [5, 5, 0, 5],
            [5, 5, 5, 0], 
            [5, 0, 5, 5]  
          ]}
          fgColor="#1e40af" 
          bgColor="#f8fafc"  
          eyeColor="#1e3a8a" 
          logoImage="/logo.png"
          logoWidth={36}
          logoHeight={36}
          logoOpacity={0.9}
        />
      </div>

      <p className="text-sm text-blue-600 mb-4 font-medium">Menüyü Görüntülemek İçin Tara</p>
      
      <div className="text-xs text-blue-400 bg-blue-50 p-2 rounded-lg mb-4 break-all">
        {siteUrl}
      </div>

      <button
        onClick={handleDownload}
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg 
                  transition-all duration-200 shadow-md hover:shadow-lg"
      >
        QR Kodunu Kaydet
      </button>
    </div>
  );
}