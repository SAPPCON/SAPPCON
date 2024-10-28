import reporter from "../utils/reporter.js";
import Budget from '../models/budget.js';
import Building from "../models/building.js";

function formatDateTime (){
  const date = new Date(); 
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString();
  const hour = date.getHours().toString();
  const minutes = date.getMinutes().toString();

  return year + month + day + "_" + hour + minutes;
}

export const BudgetReport = async (req, res) => {
    // User exists
    if (!req.user || !req.user.id) {
        return res.status(401).json({
        message: "Usuario no autorizado.",
        messageinfo: "No se ha proporcionado un token válido para un usuario.",
        });
    }

    const budget = await Budget.findById(req.params.id);
    const building = await Building.findById(budget.building_id);
    const dateString = formatDateTime();
    const reportName =
      (budget.customer_name + "-" + building.name + "-" + dateString)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9-_]/g, "") + ".pdf";

    const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${reportName}`,
    });
    reporter.generateReport(req.params.id, res);
}
