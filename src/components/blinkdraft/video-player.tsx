import { cn } from '@/src/lib/utils';
import { urlFor } from '@/src/sanity/lib/image';
import MuxVideo from '@mux/mux-video-react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const VideoPlayer = ({
  videoId,
  className,
  poster,
}: {
  videoId: string;
  className?: string;
  poster?: SanityImageSource;
}) => {
  if (!videoId) {
    return null;
  }

  return (
    <MuxVideo
      playbackId={videoId}
      minResolution='1080p'
      preload='auto'
      poster={urlFor(poster as SanityImageSource).url()}
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
