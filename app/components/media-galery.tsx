import { useEffect, useState } from 'react';
import ReactImageGallery from 'react-image-gallery';
import ReactPlayer from 'react-player';

import { Node } from '~/contracts/mal';

export function VideoGallery({ videos = [] }: Pick<Node, 'videos'>) {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState(videos[0]?.url);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <select className="mb-4 select select-primary" value={selected} onChange={(e) => setSelected(e.target.value)}>
        {videos.map((v) => (
          <option key={v.id} value={v.url}>
            {v.title}
          </option>
        ))}
      </select>
      {mounted && (
        <div className="aspect-video">
          <ReactPlayer width="100%" height="100%" controls url={selected} />
        </div>
      )}
    </div>
  );
}

export function ImageGallery({ pictures = [] }: Pick<Node, 'pictures'>) {
  if (!pictures.length) {
    return null;
  }

  const mappedImages = pictures.map((p) => ({
    original: p.large,
    thumbnail: p.medium,
    type: 'image',
  }));

  return <ReactImageGallery showPlayButton={false} items={mappedImages} lazyLoad />;
}
