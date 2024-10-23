import Link from "next/link";

const BudgetNav = () => {
  return (
    <Link href="/budget">
      <div className="hover:bg-darkblue rounded-md px-2 py-1 transition-colors duration-200 hover:text-white border-2 border-white active:border-blue5 text-grayText">
        Presupuestos
      </div>
    </Link>
  );
};

export default BudgetNav;
