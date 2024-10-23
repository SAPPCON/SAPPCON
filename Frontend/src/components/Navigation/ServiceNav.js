import Link from "next/link";

const ServiceNav = () => {
  return (
    <Link href="/service" className="">
      <div className="hover:bg-darkblue rounded-md px-2 py-1 transition-colors duration-200 hover:text-white border-2 border-white active:border-blue5 text-grayText">
        Servicios
      </div>
    </Link>
  );
};

export default ServiceNav;
