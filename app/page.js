

import History from "./components/History";
import Missions from "./components/Missions";
import Actions from "./components/Actions";
import Benevole from "./components/Benevole";
import LayoutContent from "./components/LayoutContent";
import HeroVideo from "./components/HeroVideo";
export default async function Home() {


  return (
    <main >
  


      {/* Notre histoire */}
      <History></History>
      <Missions></Missions>
      <Actions></Actions>
      {/* Adhérents & bénévoles */}
      <Benevole></Benevole>
     
    </main>
  );
}
