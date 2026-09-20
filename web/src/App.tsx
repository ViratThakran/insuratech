import { Footer, Nav } from "./components/Nav";
import { World } from "./scenes/World";
import { Information } from "./scenes/Information";
import { DocumentAI } from "./scenes/DocumentAI";
import { Changed } from "./scenes/Changed";
import { Risk } from "./scenes/Risk";
import { Intelligence } from "./scenes/Intelligence";
import { Decision } from "./scenes/Decision";
import { useRefreshOnLoad, useSmoothScroll } from "./lib/motion";

/**
 * Seven scenes, each given enough room to be one idea.
 *
 *   01 THE WORLD      the physical world of business risk, sheared into data
 *   02 INFORMATION    a renewal file, scattered, then ordered — then silence
 *   03 DOCUMENT AI    a policy read clause by clause, becoming the product
 *   04 SEE WHAT       two pages, and the differences that matter
 *   05 RISK           three signals over time, and one that crosses
 *   06 INTELLIGENCE   structure, signal and conversation converging
 *   07 HUMAN DECISION back to the desk, and the person who decides
 *
 * There are no bridges and no scene counters. The transitions are inside the
 * scenes: each one ends in the material the next one begins with.
 */
export default function App() {
  useSmoothScroll();
  useRefreshOnLoad();

  return (
    <>
      <Nav />
      <main>
        <World />
        <Information />
        <DocumentAI />
        <Changed />
        <Risk />
        <Intelligence />
        <Decision />
      </main>
      <Footer />
    </>
  );
}
