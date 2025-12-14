import Hero from "./components/Hero";
import VideoSection from "./components/VideoSection";
import History from "./components/History";
import Missions from "./components/Missions";
import Actions from "./components/Actions";
import Benevole from "./components/Benevole";

export default async function Home() {


  return (
    <main>
      {" "}
      <Hero></Hero>
      {/* Notre histoire */}
      <History></History>
      <Missions></Missions>
      <Actions></Actions>
      {/* Adhérents & bénévoles */}
      <Benevole></Benevole>
      <VideoSection></VideoSection>
    </main>
  );
}
