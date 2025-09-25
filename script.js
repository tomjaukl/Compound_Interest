let investmentChart = null;

function FetchInputValues(){
    const P = parseFloat(document.getElementById('investment-amount').value);
    const r = parseFloat(document.getElementById('annual-rate').value) / 100;
    const C = parseFloat(document.getElementById('regular-contribution').value);
    const t = parseInt(document.getElementById('years').value);

    EachYearContribution(P, r, C, t);
}

function EachYearContribution(P, r, C, t){
    let invested = [];
    let profit = [];
    let labels = [];

    for (let year = 1; year <= t; year++){
        // hodnota původního vkladu po uplynulém roce
        const base = P * Math.pow(1 + r/12, 12 * year);
        // hodnota pravidelných měsíčních příspěvků
        const contrib = C * ((Math.pow(1 + r/12, 12 * year) - 1) / (r/12));
        const total = base + contrib;

        invested.push((P + C*12*year).toFixed(0)); // kolik jsme celkem vložili
        profit.push((total - (P + C*12*year)).toFixed(0)); // úroky
        labels.push(`Year ${year}`);
    }

    DrawChart(invested, profit, labels);
}

function DrawChart(invested, profit, labels){
    const ctx = document.getElementById('myChart').getContext('2d');

    if(investmentChart !== null){
        investmentChart.destroy(); // odstraní předchozí chart při novém výpočtu
    }

    investmentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Amount Invested',
                    data: invested,
                    backgroundColor: 'blue'
                },
                {
                    label: 'Profit (Interest)',
                    data: profit,
                    backgroundColor: 'green'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Compound Investment Growth (Stacked Bar)'
                },
            },
            scales: {
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true, title: { display: true, text: 'Amount ($)' } }
            }
        }
    });
}
