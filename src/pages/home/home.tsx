import dynamic from "next/dynamic";
import Nav from "../components/nav";
import { useState } from "react";
import AccountCard from "../components/cards"
const DynamicChartContainer = dynamic(
  () => import("../components/dataAnalitic"),
  {
    ssr: false,
  }
);

export default function Home() {
  const colors = {
    sidebar: "bg-gradient-to-r from-gray-900 to-pink-900", // Gradiente lineal rosa a morado
    container: "bg-gray-900", // Gradiente lineal rosa a morado
    text: "text-gray-800", // Color del texto
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <>
      <Nav  />
      <div className={`p-4 sm:ml-60 ${colors.text}`} onClick={closeSidebar}>
        <div
          className={`p-2 border-2 ${colors.container} border-dashed rounded-lg dark:border-${colors.text}`}
        >
<AccountCard/>

          <DynamicChartContainer />

        </div>
      </div>
    </>
  );
}
