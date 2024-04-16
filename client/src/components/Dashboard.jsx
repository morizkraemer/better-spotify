import Header from "./Header";
import SideBar from "./sideBar/SideBar";
import Player from "./Player";
import ContentView from "./content/ContentView";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen p-1 border-sgreen border-2">
      <Header className="flex-grow-0" />
      <div className="flex flex-grow overflow-hidden gap-2 border p-2">
        <div className="w-[18%]">
          <SideBar />
        </div>
        <div className="w-[82%]">
          <ContentView />
        </div>
      </div>
      <Player className="flex-grow-0" />
    </div>
  );
}
