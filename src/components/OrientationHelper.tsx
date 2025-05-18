import { useState, useEffect } from 'react';
import '../styles/OrientationHelper.css';

const OrientationHelper = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if on mobile device
    const checkDevice = () => {
      // Simple check for mobile devices - can be enhanced
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      
      // Check orientation
      if (mobile) {
        const portrait = window.innerHeight > window.innerWidth;
        setIsPortrait(portrait);
      }
    };

    // Initial check
    checkDevice();

    // Listen for orientation/resize changes
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  if (!isMobile || !isPortrait) {
    return null;
  }

  return (
    <div className="orientation-overlay">
      <div className="orientation-card">
        <div className="rotate-icon">📱↻</div>
        <h2>Rotate Your Device!</h2>
        <p>The periodic table is too wide to display properly in portrait mode.</p>
        <p className="rotate-note">For the best experience, please turn your device sideways.</p>
        <div className="device-animation">
          <div className="phone-outline">
            <div className="phone-screen">
              <div className="table-mini"></div>
            </div>
          </div>
          <div className="rotate-arrow">⟳</div>
        </div>
      </div>
    </div>
  );
};

export default OrientationHelper; 