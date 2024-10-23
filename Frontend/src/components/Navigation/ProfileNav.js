import Link from "next/link";

const ProfileNav = () => {
  return (
    <Link href="/profile" className="">
      <div className="hover:bg-darkblue rounded-md px-2 py-1 transition-colors duration-200 hover:text-white border-2 border-white active:border-blue5 text-grayText">
        Perfil
      </div>
    </Link>
  );
};

export default ProfileNav;
