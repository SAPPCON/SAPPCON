import Budget from '../models/budget.js';
import BudgetLine from '../models/budgetLine.js';
import Building from '../models/building.js';
import Customer from '../models/customer.js';
import User from '../models/user.js';
import PDFKit from 'pdfkit';

export async function generateReport(budget_id, res) {
    // Fetch data from the database
    const dataHeader = await Budget.findById(budget_id);
    if (!dataHeader) {
        return res.status(404).json({
        message: "Presupuesto no encontrado.",
        messageinfo:
            "No se ha encontrado ningún presupuesto con el ID proporcionado.",
        });
    }
    var dataUser = await User.findById(dataHeader.user_id);
    var dataLines = await BudgetLine.find({ budget_id });
    var dataCustomer = await Customer.findById(dataHeader.customer_id);
    var dataBuilding = await Building.findById(dataHeader.building_id);
    const doc = new PDFKit({ size: "A4", margin: 50, bufferPages: true });

    generateHeader(doc, dataUser);
    generateCustomerInformation(doc, dataCustomer);
    generateBuildingInformation(doc, dataBuilding);
    generateInvoiceTable(doc, dataLines);
    generateFooter(doc);
    generatePageNumbers(doc);

    doc.end();
    doc.pipe(res);
}

function generateHeader(doc, dataUser) {
    doc
        // .image("logo.png", 50, 45, { width: 50 })
        .fillColor("#444444")
        .fontSize(30)
        .font("Courier-Bold")
        .text(dataUser.alias, 70, 50)
        .fontSize(10)
        .font("Helvetica-Bold")
        .text(dataUser.alias, 200, 50, { align: "right" })
        .text(dataUser.name + " " + dataUser.surname, 200, 65, { align: "right" })
        .text(dataUser.address, 200, 80, { align: "right" })
        .text(dataUser.email, 200, 95, { align: "right" })
        .moveDown();

    doc.fillColor("#444444").fontSize(20).text("Presupuesto de Obra", 50, 125);
}

function generateCustomerInformation(doc, dataCustomer) {
    generateHr(doc, 150, 0.5);
    const customerInformationTop = 155;
    doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("Cliente: ", 50, customerInformationTop)
        .font("Helvetica")
        .text(dataCustomer.name + " " + dataCustomer.surname, 150, customerInformationTop)
        .font("Helvetica-Bold")
        .text("Dirección: ", 50, customerInformationTop + 15)
        .font("Helvetica")
        .text(dataCustomer.address, 150, customerInformationTop + 15)
        .font("Helvetica-Bold")
        .text("Teléfono: ", 50, customerInformationTop + 30)
        .font("Helvetica")
        .text(dataCustomer.phone, 150, customerInformationTop + 30)
        .font("Helvetica-Bold")
        .text("Email: ", 50, customerInformationTop + 45)
        .font("Helvetica")
        .text(dataCustomer.email, 150, customerInformationTop + 45)
        .moveDown();

    generateHr(doc, customerInformationTop + 60, 1);
}


function generateBuildingInformation(doc, dataBuilding) {
    generateHr(doc, 150, 0.5);
    const buildingInformationTop = 220;
    doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("Obra: ", 50, buildingInformationTop)
        .font("Helvetica")
        .text(dataBuilding.name, 150, buildingInformationTop)
        .font("Helvetica-Bold")
        .text("Dirección: ", 50, buildingInformationTop + 15)
        .font("Helvetica")
        .text(dataBuilding.address, 150, buildingInformationTop + 15)
        .font("Helvetica-Bold")
        .text("Descripción: ", 50, buildingInformationTop + 30)
        .font("Helvetica")
        .text(dataBuilding.description, 150, buildingInformationTop + 30)
        .moveDown();

    generateHr(doc, buildingInformationTop + 45, 1);
}

function generateInvoiceTable(doc, dataLines) {
    const invoiceTableTop = 300;
    var totalBudget = 0;
    const pageHeight = doc.page.height - 20;
    const margin = 50;
    var lineHeight = 20;

    doc.font("Helvetica-Bold");
    generateTableRow(doc, invoiceTableTop, "Nº Linea", "Servicio", "Unidad Medida", "Cantidad", "Precio Unitario", "Total Linea", 10);
    generateHr(doc, invoiceTableTop + 15, 1);
    doc.font("Helvetica");
    var i = 0;
    let position = invoiceTableTop + lineHeight;;
        dataLines.forEach(line => {
            // Check if there is enough space for a new line
            if (position + lineHeight > pageHeight - margin) {
            doc.addPage();
            position = margin;
            }

            // Generate the line
            generateTableRow(doc, position, line.line_no, line.service_name, line.measure_unit_name, line.quantity, formatCurrency(line.price), formatCurrency(line.amount), 10);
            
            // Calculate the position for the next line
            lineHeight = Math.max(
              doc.heightOfString(line.service_name, { width: 105 }),
              doc.heightOfString(line.measure_unit_name, { width: 65 })
            );
            position += lineHeight;
            generateHr(doc, position, 1);
            position += 5;

            // Accumulate total budget
            totalBudget += line.amount;
    });

    // Total
    const subtotalPosition = position + lineHeight + 5;
    doc.font("Helvetica-Bold").fontSize(40);
    generateTableRow(
        doc,
        subtotalPosition,
        "",
        "",
        "",
        "Total",
        "",
        formatCurrency(totalBudget),
        12
    );
    doc.font("Helvetica");
}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text("_________________________", 50, 760, { align: "left", width: 500 })
        .text("Firma",100,780,{ align: "left", width: 500 }
        );
}

function generatePageNumbers(doc){
    const range = doc.bufferedPageRange();
    const totalPages = range.count;
    for (let i = 0; i < totalPages; i++) {
        doc.switchToPage(i);
        doc.fontSize(10).text('Página ' + (i + 1) + ' de ' + totalPages, 50, 780, { align: "right" });
    }
}

function generateTableRow(doc, y, lineNo, serviceName, measureUnit, quantity, price, amount, fontSize) {
    doc
        .fontSize(fontSize)
        .text(lineNo, 50, y, { width: 50, align: "center" })
        .text(serviceName, 100, y, { width: 115, align: "left" })
        .text(measureUnit, 225, y, { width: 75, align: "center" })
        .text(quantity, 300, y, { width: 75, align: "center" })
        .text(price, 380, y, { width: 75, align: "right" })
        .text(amount, 450, y, { width: 90, align: "right" });
}

function generateHr(doc, y, lineWidth) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(lineWidth)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function formatCurrency(amount) {
    return "$ " + amount.toFixed(2);
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return year + "/" + month + "/" + day;
}

export default { generateReport };