import { useEffect, useState } from 'react';

function NetworkStatusAlert() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className='fixed top-0 left-0 right-0 bg-red-500 text-white p-2 text-center z-50'>
        ❌ Internet aloqasi yo‘q. Iltimos, qayta ulanib ko‘ring.
      </div>
    );
  }

  return null;
}

export default NetworkStatusAlert;
