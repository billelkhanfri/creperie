// components/Hero.js
"use client";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-400 text-white">
      {/* Overlay décoratif */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-500 to-blue-300 opacity-70"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center lg:text-left lg:flex lg:items-center lg:justify-between">
        {/* Texte */}
        <div className="lg:w-1/2">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Bienvenue sur <span className="text-yellow-400"><span className="text-blue-400">C</span>AAA</span>
          </h1>
          <div className="flex justify-center lg:justify-start">
                <p className=" text-xl font-light mb-6 text-gray-200 max-w-xl leading-relaxed">
            Le CAAA-Coeur de Ville-UDV est une association de bénévoles, active depuis 49 ans dans le centre-ville de Toulon.<br></br> Notre mission : l’alphabétisation, l’apprentissage du Français Langue Étrangère et l’accompagnement à la scolarité des enfants du Centre Ancien. Découvrez notre action et rejoignez-nous pour soutenir nos projets.
          </p>
</div>
          <div className="flex justify-center lg:justify-start gap-4 flex-wrap">
            <a
              href="mailto:caaa.asso@gmail.com"
              className="px-6 py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg shadow-lg hover:bg-yellow-300 transition"
            >
                Nous contacter
            </a>
            
          </div>
        </div>

        {/* Vidéo plus grande */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center lg:justify-end">
          <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <video
              src="https://avoxnypnpmblaitcgplp.supabase.co/storage/v1/object/public/video/dcc3502b-dba3-4f2f-804f-48a6d53bb000.MP4"
              controls
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Background shapes décoratifs */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-800 to-transparent pointer-events-none"></div>
    </section>
  );
}
