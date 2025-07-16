import { cn } from '@/src/lib/utils';
import MuxVideo from '@mux/mux-video-react';

const VideoPlayer = ({
  videoId,
  className,
}: {
  videoId: string;
  className?: string;
}) => {
  if (!videoId) {
    return null;
  }

  return (
    <MuxVideo
      playbackId={videoId}
      minResolution='1080p'
      preload='metadata'
      //   poster={project.image?.url || ''}
      playsInline
      disablePictureInPicture
      metadata={{
        video_id: videoId,
        video_title: 'Blinkdraft Demo Video',
      }}
      controls
      className={cn(`h-full w-full cursor-pointer ${className}`)}
    />
  );
};

export default VideoPlayer;
