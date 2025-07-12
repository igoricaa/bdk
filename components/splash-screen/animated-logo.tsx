import Bdk from './bdk';
import Divider from './divider';
import LawyersText from './lawyers-text';

const AnimatedLogo = () => {
  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
      <div className='logo-container flex items-center gap-8'>
        <style jsx>{`
          .logo-container {
            perspective: 1000px;
          }

          .divider {
            animation: dividerBlip 2s ease-in-out;
            transform-origin: center;
          }

          .bdk {
            opacity: 0;
            animation: slideFromRight 0.8s ease-out 2s forwards;
            transform: translateX(100px);
          }

          .lawyers-text {
            opacity: 0;
            animation: slideFromLeft 0.8s ease-out 2.5s forwards;
            transform: translateX(-100px);
          }

          @keyframes dividerBlip {
            0% {
              opacity: 0;
              transform: scale(0.5);
            }
            10% {
              opacity: 1;
              transform: scale(1.2);
            }
            20% {
              opacity: 0;
              transform: scale(0.8);
            }
            30% {
              opacity: 1;
              transform: scale(1.1);
            }
            40% {
              opacity: 0;
              transform: scale(0.9);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
            60% {
              opacity: 0;
              transform: scale(0.95);
            }
            70% {
              opacity: 1;
              transform: scale(1.02);
            }
            80% {
              opacity: 0;
              transform: scale(0.98);
            }
            90% {
              opacity: 1;
              transform: scale(1.01);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes slideFromRight {
            0% {
              opacity: 0;
              transform: translateX(100px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideFromLeft {
            0% {
              opacity: 0;
              transform: translateX(-100px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>

        <div className='bdk'>
          <Bdk />
        </div>

        <div className='divider'>
          <Divider />
        </div>

        <div className='lawyers-text'>
          <LawyersText />
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
