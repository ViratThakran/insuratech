import { Bridge } from "./components/kit";
import { Footer, Nav } from "./components/Nav";
import { Opening } from "./scenes/Opening";
import { Information } from "./scenes/Information";
import { Layer } from "./scenes/Layer";
import { Solutions } from "./scenes/Solutions";
import { DocumentAI } from "./scenes/DocumentAI";
import { WorkspaceScene } from "./scenes/WorkspaceScene";
import { Comparison } from "./scenes/Comparison";
import { Brokers } from "./scenes/Brokers";
import { Risk } from "./scenes/Risk";
import { Voice } from "./scenes/Voice";
import { Platform } from "./scenes/Platform";
import { Outro } from "./scenes/Outro";

/**
 * The page is one continuous film. Bridges carry a single family of marks
 * between scenes — document rules become a data grid, the grid loosens into
 * a risk signal, the signal becomes voice, the wave collapses to one point —
 * so no scene simply "ends" before the next one starts.
 */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Opening />
        <Information />

        {/* documents resolve into structured data, handing over to the layer */}
        <Bridge phase="doc-grid" label="Documents become data" tone="dark" from="bone" to="dark" />
        <Layer />

        <Solutions />
        <DocumentAI />
        <WorkspaceScene />
        <Comparison />
        <Brokers />

        {/* the measured grid loosens into a moving signal, entering risk */}
        <Bridge phase="grid-signal" label="Data becomes signal" tone="charcoal" from="bone" to="charcoal" />
        <Risk />

        {/* the signal becomes a conversation */}
        <Bridge phase="signal-wave" label="Signal becomes conversation" tone="bone" from="charcoal" to="bone" />
        <Voice />

        {/* and the conversation collapses into one Aurevia point */}
        <Bridge phase="wave-point" label="Everything becomes one layer" tone="dark" from="bone" to="dark" />
        <Platform />

        <Outro />
      </main>
      <Footer />
    </>
  );
}
