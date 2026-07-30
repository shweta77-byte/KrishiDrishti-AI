import { jsPDF } from "jspdf";

export function generateReport(result, diseaseInfo) {

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    let y = 20;

    const disease = result.class.replace(/_/g, " ");
    const confidence = Math.round(result.confidence);
    const severity = diseaseInfo.severity || "Unknown";

    const isHealthy =
        disease.toLowerCase().includes("healthy");

    function checkPage(space = 20){

        if(y + space > pageHeight - 20){

            doc.addPage();

            y = 20;

        }

    }

    function addTitle(title){

        checkPage(15);

        doc.setFillColor(34,139,34);

        doc.rect(15,y-5,180,8,"F");

        doc.setTextColor(255);

        doc.setFont("helvetica","bold");

        doc.setFontSize(13);

        doc.text(title,18,y);

        doc.setTextColor(0);

        y += 12;

    }

    function addList(items){

        if(!items || items.length===0)
            return;

        doc.setFont("helvetica","normal");

        doc.setFontSize(11);

        items.forEach(item=>{

            checkPage(8);

            const lines =
                doc.splitTextToSize(
                    "• "+item,
                    165
                );

            doc.text(lines,20,y);

            y += lines.length*6+2;

        });

        y += 4;

    }

    //==============================
    // HEADER
    //==============================

    doc.setFillColor(22,101,52);

    doc.rect(0,0,pageWidth,30,"F");

    doc.setTextColor(255);

    doc.setFont("helvetica","bold");

    doc.setFontSize(22);

    doc.text("KRISHIDRISHTI AI",15,15);

    doc.setFontSize(11);

    doc.setFont("helvetica","normal");

    doc.text(
        "Plant Disease Diagnosis Report",
        15,
        23
    );

    doc.setTextColor(0);

    y = 42;

    //==============================
    // SUMMARY BOX
    //==============================

    doc.roundedRect(
        15,
        y,
        180,
        40,
        3,
        3
    );

    doc.setFont("helvetica","bold");

    doc.setFontSize(11);

    doc.text("Disease",20,y+8);

    doc.text("Confidence",20,y+18);

    doc.text("Severity",20,y+28);

    doc.text("Status",110,y+8);

    doc.setFont("helvetica","normal");

    doc.text(disease,55,y+8);

    doc.text(confidence+"%",55,y+18);

    doc.text(severity,55,y+28);

    doc.setFillColor(
        isHealthy ? 210 : 255,
        isHealthy ? 245 : 220,
        isHealthy ? 220 : 220
    );

    doc.roundedRect(
        135,
        y+2,
        45,
        10,
        2,
        2,
        "F"
    );

    doc.setFont("helvetica","bold");

    doc.text(
        isHealthy
        ? "HEALTHY"
        : "DISEASED",
        143,
        y+9
    );

    y += 52;

        //==============================
    // DESCRIPTION
    //==============================

    addTitle("Description");

    doc.setFont("helvetica","normal");

    doc.setFontSize(11);

    const desc =
        doc.splitTextToSize(
            diseaseInfo.description ||
            "No description available.",
            170
        );

    doc.text(desc,15,y);

    y += desc.length * 6 + 8;

    //==============================
    // SYMPTOMS
    //==============================
if (diseaseInfo.symptoms?.length) {

    addTitle("Symptoms");

    addList(
        diseaseInfo.symptoms
    );

}

    //==============================
    // CAUSES
    //==============================

   if (diseaseInfo.causes?.length) {

    addTitle("Possible Causes");

    addList(
        diseaseInfo.causes
    );

}

    //==============================
    // TREATMENT
    //==============================

   

    //==============================
    // MEDICINES
    //==============================

    if(
        diseaseInfo.medicine &&
        diseaseInfo.medicine.length
    ){

        addTitle(
            "Recommended Medicines"
        );

        addList(
            diseaseInfo.medicine
        );

    }

    //==============================
    // ORGANIC SOLUTION
    //==============================

    if(
        diseaseInfo.organicSolution &&
        diseaseInfo.organicSolution.length
    ){

        addTitle(
            "Organic Solution"
        );

        addList(
            diseaseInfo.organicSolution
        );

    }

    //==============================
    // WATERING
    //==============================

    if(
        diseaseInfo.watering
    ){

        addTitle(
            "Watering Advice"
        );

        doc.setFont(
            "helvetica",
            "normal"
        );

        const water =
            doc.splitTextToSize(
                diseaseInfo.watering,
                170
            );

        doc.text(
            water,
            15,
            y
        );

        y += water.length * 6 + 8;

    }

    //==============================
    // PREVENTION
    //==============================

   if (diseaseInfo.prevention?.length) {

    addTitle("Preventive Measures");

    addList(
        diseaseInfo.prevention
    );

}
    addList(
        diseaseInfo.prevention
    );

        //==============================
    // EXPERT ADVICE
    //==============================

    if (diseaseInfo.expertAdvice) {

        addTitle("Expert Advice");

        doc.setFont("helvetica", "normal");

        const advice = doc.splitTextToSize(
            diseaseInfo.expertAdvice,
            170
        );

        doc.text(advice, 15, y);

        y += advice.length * 6 + 8;
    }

    //==============================
    // EXPECTED RECOVERY
    //==============================

    if (diseaseInfo.expectedRecovery) {

        addTitle("Expected Recovery");

        doc.setFont("helvetica", "normal");

        doc.text(
            diseaseInfo.expectedRecovery,
            15,
            y
        );

        y += 10;
    }

    //==============================
    // DISCLAIMER
    //==============================

    checkPage(35);

    doc.setFillColor(245, 245, 245);

    doc.roundedRect(
        15,
        y,
        180,
        25,
        3,
        3,
        "F"
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);

    doc.text(
        "AI Disclaimer",
        20,
        y + 8
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    const disclaimer = doc.splitTextToSize(
        "This report is generated using Artificial Intelligence. Please verify the diagnosis with an agricultural expert before applying any treatment in the field.",
        165
    );

    doc.text(
        disclaimer,
        20,
        y + 15
    );

    //==============================
    // FOOTER
    //==============================

    const footerY = pageHeight - 10;

    doc.setDrawColor(180);

    doc.line(
        15,
        footerY - 4,
        195,
        footerY - 4
    );

    doc.setFontSize(8);

    doc.setTextColor(120);

    doc.text(
        "Generated by KrishiDrishti AI",
        15,
        footerY
    );

    doc.text(
        new Date().toLocaleString(),
        145,
        footerY
    );

    //==============================
    // SAVE REPORT
    //==============================

    doc.save("KrishiDrishti_AI_Report.pdf");

}