import { Footer, Nav } from "./components/Nav";
import { Opening } from "./scenes/Opening";
import { Information } from "./scenes/Information";
import { Layer } from "./scenes/Layer";
import { Solutions } from "./scenes/Solutions";
import { DocumentAI } from "./scenes/DocumentAI";
import { WorkspaceScene } from "./scenes/WorkspaceScene";
import { Comparison } from "./scenes/Comparison";
import { People } from "./scenes/People";
import { Risk } from "./scenes/Risk";
import { Voice } from "./scenes/Voice";
import { Platform } from "./scenes/Platform";
import { Outro } from "./scenes/Outro";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Opening />
        <Information />
        <Layer />
        <Solutions />
        <DocumentAI />
        <WorkspaceScene />
        <Comparison />
        <People />
        <Risk />
        <Voice />
        <Platform />
        <Outro />
      </main>
      <Footer />
    </>
  );
}
