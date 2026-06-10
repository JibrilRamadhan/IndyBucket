import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-200 tracking-widest">404</h1>
        <div className="bg-pink-500 px-2 text-sm rounded rotate-12 absolute text-white shadow-lg">
          Halaman Tidak Ditemukan
        </div>
      </div>
      
      <div className="mt-8 text-center max-w-md">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Oops! Tersesat ya?
        </h3>
        <p className="text-gray-600 mb-8">
          Halaman yang Anda cari mungkin telah dihapus, diubah namanya, atau tidak pernah ada.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={18} />
            Kembali
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all w-full sm:w-auto justify-center"
          >
            <Home size={18} />
            Beranda
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
