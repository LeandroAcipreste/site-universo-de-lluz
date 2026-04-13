import SiteNav from "../../components/siteNav";
import OracleBackground from "./oracleBackground";

export default function Oracle() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <OracleBackground />
      <SiteNav />
      {/* Conteúdo da página virá aqui */}
    </section>
  );
}
