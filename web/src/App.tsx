import { useReveal } from "./hooks/useReveal";
import { Footer, Nav } from "./components/Nav";
import { Hero } from "./sections/Hero";
import { Industry } from "./sections/Industry";
import { Role } from "./sections/Role";
import { Solutions } from "./sections/Solutions";
import { DocumentAI } from "./sections/DocumentAI";
import { Workflow } from "./sections/Workflow";
import { Comparison } from "./sections/Comparison";
import { Value } from "./sections/Value";
import { Risk } from "./sections/Risk";
import { Voice } from "./sections/Voice";
import { Platform } from "./sections/Platform";
import { Talk } from "./sections/Talk";

export default function App() {
  useReveal();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Industry />
        <Role />
        <Solutions />
        <DocumentAI />
        <Workflow />
        <Comparison />
        <Value />
        <Risk />
        <Voice />
        <Platform />
        <Talk />
      </main>
      <Footer />
    </>
  );
}
