import Link from "next/link";
//import { useContext } from "react";
//import ProfileContext from "@/store/profile-context";

const StatsNav = () => {
  //const profileCtx = useContext(ProfileContext);
  return (
    <Link href="/stats" className="">
      <div className="hover:bg-darkblue rounded-md px-2 py-1 transition-colors duration-200 hover:text-white border-2 border-white active:border-blue5 text-grayText">
        Estadísticas
      </div>
    </Link>
  );
};

export default StatsNav;
