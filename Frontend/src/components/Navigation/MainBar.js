import ProfileNav from "./ProfileNav";
import BudgetNav from "./BudgetNav";
import BuildingNav from "./BuildingNav";
import CustomerNav from "./CustomerNav";
import ServiceNav from "./ServiceNav";
import StatsNav from "./StatsNav";
import HomeNav from "./HomeNav";
import Link from "next/link";

const MainBar = (props) => {
  return (
    <div className=" min-h-screen flex flex-col  bg-gray-100 text-black font-sans min-w-[1200px] ">
      <div className="flex bg-white h-20 ">
        <div className="mx-auto flex justify-between items-center w-4/6 ">
          <HomeNav></HomeNav>
          <div className="flex items-center space-x-4 ">
            <BudgetNav></BudgetNav>
            <BuildingNav></BuildingNav>
            <ServiceNav></ServiceNav>
            <CustomerNav></CustomerNav>
            <StatsNav></StatsNav>
            <ProfileNav></ProfileNav>
          </div>
        </div>
      </div>

      {/* Si el contenedor padre (div principal) no es flex, este div al ponerle my-auto no genera margen esto es porque si el padre no es flex, los elementos dentro por defecto se apilan uno tras otro, al ser flex se cambia esta forma de alineacion y tiene en cuenta el espacio restante. Y el max-w es para que no se estire todo el largo*/}
      <div className="flex flex-col items-center justify-center rounded-[8px] border border-solid border-gray-300 px-10 py-10 font-sans text-gray-700 max-w-fit mx-auto my-auto">
        <p className="text-2xl font-bold text-gray-800">
          Facilita tu trabajo con SAPPCON
        </p>
        <p className="text-base">
          ¡Registra clientes, presupuestos, obras y mucho más!
        </p>
      </div>
    </div>
  );
};

export default MainBar;
