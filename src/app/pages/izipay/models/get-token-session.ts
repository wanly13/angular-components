export async function GetTokenSession(transactionId, {
    amount = '100.01',
    currency = 'PEN',
    datosReserva = {
        idhorario: "2",
        fechacita: "2023-07-25T21:45:00.000+00:00",
        duracionpromedio: 15,
        duracionreal: 15,
        idpaciente: 2219324,
        idmedico: 1580012,
        idespecialidad: 23,
        email: "YEISONAMADO811@GMAIL.COM",
        pertipoparentesco: "2219324"
    }
}) {
console.log({
    datosReserva,
    currency,
    amount,
})
    //llamado al backend interno de esta app
    const response = await fetch('http://localhost:9000/erp/cita/pagos/izipaytoken', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            datosReserva,
            currency,
            amount
        }),
    });
    return await response.json();
}
