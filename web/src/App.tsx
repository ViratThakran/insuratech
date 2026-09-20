import { Bridge } from "./components/kit";
import { Footer, Nav } from "./components/Nav";
import { Opening } from "./scenes/Opening";
import { Breath } from "./scenes/Breath";
import { Field } from "./scenes/Field";
import { Layer } from "./scenes/Layer";
import { Solutions } from "./scenes/Solutions";
import { DocumentAI } from "./scenes/DocumentAI";
import { WorkspaceScene } from "./scenes/WorkspaceScene";
import { Comparison } from "./scenes/Comparison";
import { Decision } from "./scenes/Decision";
import { Brokers } from "./scenes/Brokers";
import { Risk } from "./scenes/Risk";
import { Voice } from "./scenes/Voice";
import { Platform } from "./scenes/Platform";
import { Outro } from "./scenes/Outro";

/**
 * The running order is built on contrast, not on a system:
 *
 *   dark opening → a quiet bone breath → a dense paper collage →
 *   dark system → three disciplines → the document, close enough to touch →
 *   inside the product → a dark comparison → an unexpected black interlude →
 *   the human desk → the risk field → a bone conversation → convergence →
 *   one last signal.
 *
 * Bridges carry the same cobalt-and-copper marks across the seams so no scene
 * simply ends before the next begins.
 */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Opening />
        <Breath />
        <Field />

        <Bridge phase="doc-grid" label="Documents become data" tone="dark" from="paper" to="dark" />
        <Layer />

        <Solutions />
        <DocumentAI />
        <WorkspaceScene />
        <Comparison />

        {/* the interlude that does not look like a section */}
        <Decision />

        <Brokers />

        <Bridge phase="grid-signal" label="Data becomes signal" tone="charcoal" from="bone" to="charcoal" />
        <Risk />

        <Bridge phase="signal-wave" label="Signal becomes conversation" tone="bone" from="charcoal" to="bone" />
        <Voice />

        <Bridge phase="wave-point" label="Everything becomes one layer" tone="dark" from="bone" to="dark" />
        <Platform />

        <Outro />
      </main>
      <Footer />
    </>
  );
}
