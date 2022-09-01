import { useEffect, useState } from 'react';
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
      <select className="mb-4 select select-bordered" value={selected} onChange={(e) => setSelected(e.target.value)}>
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

  return (
    <div className="carousel rounded-box w-full h-72 md:h-80 bg-base-200">
      {pictures.map((p) => (
        <div key={p.large} className="carousel-item">
          <img className="" src={p.large} />
        </div>
      ))}
    </div>
  );
}
