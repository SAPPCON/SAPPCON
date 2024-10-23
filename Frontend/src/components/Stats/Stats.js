import BudgetNav from "../Navigation/BudgetNav";
import BuildingNav from "../Navigation/BuildingNav";
import HomeNav from "../Navigation/HomeNav";
import ProfileNav from "../Navigation/ProfileNav";
import CustomerNav from "../Navigation/CustomerNav";
import ServiceNav from "../Navigation/ServiceNav";
import { Chart } from "react-google-charts";
import { useState, useEffect, Fragment } from "react";
import Loader from "../UI/Loader";

const Stats = (props) => {
  const [budgetStatus, setBudgetStatus] = useState([]);
  const [budgetStatusError, setBudgetStatusError] = useState("");
  const [budgetAmount, setBudgetAmount] = useState([]);
  const [budgetAmountError, setBudgetAmountError] = useState("");
  const [topServices, setTopServices] = useState([]);
  const [topServicesError, setTopServicesError] = useState("");
  const [servicesPerCategory, setServicesPerCategory] = useState([]);
  const [servicesPerCategoryError, setServicesPerCategoryError] = useState("");

  //Va a haber un solo Loading para todos
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async (url, setData, setError) => {
    try {
      const token = localStorage.getItem("token");
      setError("");

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw {
          message: responseData.message || "Error al cargar la imagen",
          messageinfo: responseData.messageinfo || "Detalles no disponibles",
        };
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      setError({
        message: error.message || "Error desconocido",
        messageinfo: error.messageinfo || "Detalles no disponibles",
      });
    }
  };

  useEffect(() => {
    const fetchAllStats = async () => {
      // Realizar todas las solicitudes en paralelo
      await Promise.all([
        fetchStats(
          process.env.NEXT_PUBLIC_BUDGETSTATUS_URL,
          setBudgetStatus,
          setBudgetStatusError
        ),
        fetchStats(
          process.env.NEXT_PUBLIC_BUDGETAMOUNT_URL,
          setBudgetAmount,
          setBudgetAmountError
        ),
        fetchStats(
          process.env.NEXT_PUBLIC_TOPSERVICES_URL,
          setTopServices,
          setTopServicesError
        ),
        fetchStats(
          process.env.NEXT_PUBLIC_SERVICESPERCATEGORY_URL,
          setServicesPerCategory,
          setServicesPerCategoryError
        ),
      ]);
      // Una vez que todas las solicitudes terminen, se deja de cargar
      setIsLoading(false);
    };

    fetchAllStats();
    console.log("BUDGESTATUS", budgetStatus);
    console.log("BUDGEAMOUNT", budgetAmount);
    console.log("TOPSERVICES", topServices);
    console.log("PERCATEGORY", servicesPerCategory);
  }, []);

  // Convertir los datos para gráficos una vez estén cargados
  const chartDataBudgetStatus = [
    ["Estado", "Cantidad"],
    ...(budgetStatus?.statusList || []).map((item) => [
      item.status,
      item.count,
    ]),
  ];

  const chartDataBudgetValues = [
    ["Categoria", "Valor"],
    ["Mínimo", budgetAmount.minAmount],
    ["Máximo", budgetAmount.maxAmount],
    ["Promedio", budgetAmount.avgAmount],
    ["Mediana", budgetAmount.medianAmount],
  ];

  const chartDataTopServices = [
    ["Servicio", "Cantidad"], // Encabezados
    ...topServices.map((item) => [item.serviceName, item.quantity]),
  ];

  const chartDataCategoryServices = [
    ["Servicio", "Cantidad"], // Encabezados
    ...servicesPerCategory.map((item) => [item.categoryName, item.count]),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-blackText font-sans min-w-[1200px]">
      {/* Barra de navegación superior */}
      <div className="flex bg-white h-20">
        <div className="mx-auto flex justify-between items-center w-4/6">
          <HomeNav />
          <div className="flex items-center space-x-4">
            <BudgetNav />
            <BuildingNav />
            <ServiceNav />
            <CustomerNav />
            <div className="rounded-md px-2 py-1 border-2 bg-darkblue border-white text-white cursor-default">
              Estadísticas
            </div>
            <ProfileNav />
          </div>
        </div>
      </div>

      <div className=" mx-auto justify-center items-center py-[14px]">
        {" "}
        <h1 className="mb-[8px] font-sans text-[28px] font-normal text-blackText">
          Estadísticas
        </h1>
      </div>

      {/* Grilla de gráficos */}
      <div className="grid grid-cols-2 gap-4 px-16 pb-16">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          {isLoading && (
            <div className="flex w-full h-full items-center justify-center">
              <Loader></Loader>
            </div>
          )}

          {budgetStatusError && (
            <div className="flex flex-col w-full h-full items-center justify-center">
              <h1 className="text-lg  text-red5 ">
                {budgetStatusError.message}
              </h1>
              <h2 className="  text-xs text-blackText ">
                {budgetStatusError.messageinfo}
              </h2>
            </div>
          )}

          {budgetStatus?.statusList?.every((item) => item.count === 0) && (
            <div className="w-full flex justify-center items-center">
              <h2 className="text-xs text-blackText">
                No hay información disponible aún.
              </h2>
            </div>
          )}

          {!isLoading &&
            !budgetStatusError &&
            !budgetStatus?.statusList?.every((item) => item.count === 0) && (
              <Fragment>
                {" "}
                <h1 className="text-center text-lg font-semibold mb-4">
                  Distribución del Estado del Presupuesto
                </h1>
                <Chart
                  chartType="BarChart"
                  data={chartDataBudgetStatus} // Ajusta a los datos correspondientes
                  width="100%"
                  height="400px"
                  options={{
                    title: "Cantidad de presupuestos por estado",
                    hAxis: { title: "Cantidad" },
                    vAxis: { title: "Estado" },
                  }}
                  legendToggle
                />{" "}
              </Fragment>
            )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          {isLoading && (
            <div className="flex w-full h-full items-center justify-center">
              <Loader></Loader>
            </div>
          )}

          {budgetStatusError && (
            <div className="flex flex-col w-full h-full items-center justify-center">
              <h1 className="text-lg  text-red5 ">
                {budgetStatusError.message}
              </h1>
              <h2 className="  text-xs text-blackText ">
                {budgetStatusError.messageinfo}
              </h2>
            </div>
          )}

          {budgetStatus?.statusList?.every((item) => item.count === 0) && (
            <div className="w-full flex justify-center items-center">
              <h2 className="text-xs text-blackText">
                No hay información disponible aún.
              </h2>
            </div>
          )}

          {!isLoading &&
            !budgetStatusError &&
            !budgetStatus?.statusList?.every((item) => item.count === 0) && (
              <Fragment>
                <h1 className="text-center text-lg font-semibold mb-4">
                  Distribución del Estado del Presupuesto
                </h1>
                <Chart
                  chartType="PieChart"
                  data={chartDataBudgetStatus}
                  width="100%"
                  height="400px"
                  options={{
                    title: "Cantidad de presupuestos por estado",
                    is3D: true,
                  }}
                />
              </Fragment>
            )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          {isLoading && (
            <div className="flex w-full h-full items-center justify-center">
              <Loader></Loader>
            </div>
          )}

          {topServicesError && (
            <div className="flex flex-col w-full h-full items-center justify-center">
              <h1 className="text-lg  text-red5 ">
                {topServicesError.message}
              </h1>
              <h2 className="  text-xs text-blackText ">
                {topServicesError.messageinfo}
              </h2>
            </div>
          )}

          {topServices.length == 0 && (
            <div className="w-full flex justify-center items-center">
              <h2 className="  text-xs text-blackText ">
                No hay información disponible aún.
              </h2>
            </div>
          )}

          {!isLoading && !topServicesError && topServices.length !== 0 && (
            <Fragment>
              <h1 className="text-center text-lg font-semibold mb-4">
                Top de Servicios
              </h1>
              <Chart
                chartType="BarChart"
                data={chartDataTopServices}
                width="100%"
                height="400px"
                options={{
                  title: "Servicios mas utilizados en total",
                  hAxis: { title: "Cantidad" },
                  vAxis: { title: "Servicio" },
                }}
              />
            </Fragment>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          {isLoading && (
            <div className="flex w-full h-full items-center justify-center">
              <Loader></Loader>
            </div>
          )}

          {topServicesError && (
            <div className="flex flex-col w-full h-full items-center justify-center">
              <h1 className="text-lg  text-red5 ">
                {topServicesError.message}
              </h1>
              <h2 className="  text-xs text-blackText ">
                {topServicesError.messageinfo}
              </h2>
            </div>
          )}

          {topServices.length == 0 && (
            <div className="w-full flex justify-center items-center">
              <h2 className="  text-xs text-blackText ">
                No hay información disponible aún.
              </h2>
            </div>
          )}

          {!isLoading && !topServicesError && topServices.length !== 0 && (
            <Fragment>
              <h1 className="text-center text-lg font-semibold mb-4">
                Top de Servicios
              </h1>
              <Chart
                chartType="PieChart"
                data={chartDataTopServices}
                width="100%"
                height="400px"
                options={{
                  title: "Servicios mas utilizados en total",
                  is3D: true,
                }}
              />
            </Fragment>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          {isLoading && (
            <div className="flex w-full h-full items-center justify-center">
              <Loader></Loader>
            </div>
          )}

          {servicesPerCategoryError && (
            <div className="flex flex-col w-full h-full items-center justify-center">
              <h1 className="text-lg  text-red5 ">
                {servicesPerCategoryError.message}
              </h1>
              <h2 className="  text-xs text-blackText ">
                {servicesPerCategoryError.messageinfo}
              </h2>
            </div>
          )}

          {servicesPerCategory.length == 0 && (
            <div className="w-full h-full flex justify-center items-center">
              <h2 className="  text-xs text-blackText ">
                No hay información disponible aún.
              </h2>
            </div>
          )}

          {!isLoading &&
            !servicesPerCategoryError &&
            servicesPerCategory.length !== 0 && (
              <Fragment>
                <h1 className="text-center text-lg font-semibold mb-4">
                  Servicios por cada Categoría
                </h1>
                <Chart
                  chartType="ColumnChart"
                  data={chartDataCategoryServices}
                  width="100%"
                  height="400px"
                  options={{
                    title: "Cantidad de servicios en cada categoría",
                    hAxis: { title: "Servicio" },
                    vAxis: { title: "Cantidad" },
                  }}
                />
              </Fragment>
            )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          {isLoading && (
            <div className="flex w-full h-full items-center justify-center">
              <Loader></Loader>
            </div>
          )}

          {budgetAmountError && (
            <div className="flex flex-col w-full h-full items-center justify-center">
              <h1 className="text-lg  text-red5 ">
                {budgetAmountError.message}
              </h1>
              <h2 className="  text-xs text-blackText ">
                {budgetAmountError.messageinfo}
              </h2>
            </div>
          )}

          {budgetAmount &&
            budgetAmount.minAmount === 0 &&
            budgetAmount.maxAmount === 0 &&
            budgetAmount.avgAmount === 0 &&
            budgetAmount.medianAmount === 0 && (
              <div className="w-full flex justify-center items-center">
                <h2 className="text-xs text-blackText">
                  No hay información disponible aún.
                </h2>
              </div>
            )}

          {!isLoading &&
            !budgetAmountError &&
            !(
              budgetAmount.minAmount === 0 &&
              budgetAmount.maxAmount === 0 &&
              budgetAmount.avgAmount === 0 &&
              budgetAmount.medianAmount === 0
            ) && (
              <Fragment>
                <h1 className="text-center text-lg font-semibold mb-4">
                  Análisis de Montos de Presupuesto
                </h1>
                <Chart
                  chartType="ColumnChart"
                  data={chartDataBudgetValues}
                  width="100%"
                  height="400px"
                  options={{
                    title: "Valores: mínimo, máximo,  promedio y mediana",
                    hAxis: { title: "Variable" },
                    vAxis: { title: "Valor ($)" },
                  }}
                />
              </Fragment>
            )}
        </div>
      </div>
    </div>
  );
};

export default Stats;
