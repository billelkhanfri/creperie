import React from "react";

function VideoSection() {
  return (
    <section id="video-section" className="py-16 px-6 lg:px-32 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12 text-primary">
        Découvrez notre association
      </h2>
      <div className="w-full max-w-4xl mx-auto aspect-video">
        <iframe
          className="w-full h-full rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/eNXCGCfYcVY"
          title="Présentation CAAA"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}

export default VideoSection;
