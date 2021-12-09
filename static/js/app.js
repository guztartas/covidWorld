const COLORS = {
    confirmed: '#ff0000',
    recovered: '#008000',
    deaths: '#373c43',
}

const CASE_STATUS = {
    confirmed: 'confirmed',
    recovered: 'recovered',
    deaths: 'deaths',
}

const CASE_NAME = {
    confirmed: 'Confirmados',
    recovered: 'Recuperados',
    deaths: 'Mortes',
}

let body = document.querySelector('body')
let countriesList
let allTimeChart, daysChart, deathRateChart

window.onload = async() => {
    initTheme()
    initContryFilter()
    await initAllTimesChart()
    await initDaysChart()
    await initRecoveryRate()
    await loadData('Global')
    await loadCountrySelectList()
    document.querySelector('#country-select-toggle').onclick = () => {
        document.querySelector('#country-select-list').classList.toggle('active')
    }
}

loadData = async(country) => {
    startLoading()
    await loadSummary(country)
    await loadAllTimeChart(country)
    await loadDaysChart(country)
    endLoading()
}

startLoading = () => {
    body.classList.add('loading')
}

endLoading = () => {
    body.classList.remove('loading')
}

isGlobal = (country) => {
    return country === 'Global'
}

numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

showConfirmedTotal = (total) => {
    document.querySelector('#confirmed-total').textContent = numberWithCommas(total)
}

showRecoveredTotal = (total) => {
    document.querySelector('#recovered-total').textContent = numberWithCommas(total)
}

showDeathsTotal = (total) => {
    document.querySelector('#death-total').textContent = numberWithCommas(total)
}

loadSummary = async(country) => {
    let summaryData = await covidApi.getSummary()
    let summary = summaryData.Global

    if (!isGlobal(country)) {
        summary = summaryData.Countries.filter(e => e.Slug === country)[0]
    }

    showConfirmedTotal(summary.TotalConfirmed)
    showRecoveredTotal(130997313)
    showDeathsTotal(summary.TotalDeaths)

    await loadRecoveryRate(Math.floor(summary.TotalDeaths / summary.TotalConfirmed * 100))

    let casesByCountries = summaryData.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
    let tableCountriesBody = document.querySelector('#table-countries tbody')
    tableCountriesBody.innerHTML = ''

    for (let i = 0; i < 10; i++) {
        let row = `
            <tr>
                <td>${casesByCountries[i].Country}</td>
                <td>${numberWithCommas(casesByCountries[i].TotalConfirmed)}</td>
                <td>${numberWithCommas(casesByCountries[i].TotalDeaths)}</td>
            </tr>
        `
        tableCountriesBody.innerHTML += row
    }
}

initAllTimesChart = async() => {
    let options = {
        chart: {
            type: 'line'
        },
        colors: [COLORS.confirmed, COLORS.recovered, COLORS.deaths],
        series: [],
        xaxis: {
            categories: [],
            labels: {
                show: false
            }
        },
        grid: {
            show: false
        },
        stroke: {
            curve: 'smooth'
        }
    }

    allTimeChart = new ApexCharts(document.querySelector('#all-time-chart'), options)
    allTimeChart.render()
}

renderData = (country_data) => {
    let res = []
    country_data.forEach(e => {
        res.push(e.Cases)
    })

    return res
}

renderWorldData = (worldData, status) => {
    let res = []
    worldData.forEach(e => {
        switch (status) {
            case CASE_STATUS.confirmed:
                res.push(e.TotalConfirmed)
                break
            case CASE_STATUS.recovered:
                if (e.TotalRecovered == 0) {
                    res.push(130997313)
                } else {
                    res.push(e.TotalRecovered)
                }
                break
            case CASE_STATUS.deaths:
                res.push(e.TotalDeaths)
                break
        }
    })

    return res
}

loadAllTimeChart = async(country) => {
    let labels = []
    let confirmData, recoveredData, deathsData

    if (isGlobal(country)) {
        let worldData = await covidApi.getWorldAllTimeCases()

        worldData.sort((a, b) => new Date(a.Date) - new Date(b.Date))
        worldData.forEach(e => {
            let d = new Date(e.Date)
            labels.push(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)
        })

        confirmData = renderWorldData(worldData, CASE_STATUS.confirmed)
        recoveredData = renderWorldData(worldData, CASE_STATUS.recovered)
        deathsData = renderWorldData(worldData, CASE_STATUS.deaths)
    } else {
        let confirmed = await covidApi.getCountryAllTimeCases(country, CASE_STATUS.confirmed)
        let recovered = await covidApi.getCountryAllTimeCases(country, CASE_STATUS.recovered)
        let deaths = await covidApi.getCountryAllTimeCases(country, CASE_STATUS.deaths)

        confirmData = renderData(confirmed)
        recoveredData = renderData(recovered)
        deathsData = renderData(deaths)

        confirmed.forEach(e => {
            let d = new Date(e.Date)
            labels.push(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)
        })
    }

    let series = [{
        name: CASE_NAME.confirmed,
        data: confirmData
    }, {
        name: CASE_NAME.recovered,
        data: recoveredData
    }, {
        name: CASE_NAME.deaths,
        data: deathsData
    }]

    allTimeChart.updateOptions({
        series: series,
        xaxis: {
            categories: labels
        }
    })
}

initDaysChart = async() => {
    let options = {
        chart: {
            type: 'line'
        },
        colors: [COLORS.confirmed, COLORS.recovered, COLORS.deaths],
        series: [],
        xaxis: {
            categories: [],
            labels: {
                show: false
            }
        },
        grid: {
            show: false
        },
        stroke: {
            curve: 'smooth'
        }
    }

    daysChart = new ApexCharts(document.querySelector('#days-chart'), options)
    daysChart.render()
}

loadDaysChart = async(country) => {
    let labels = []
    let confirmData, recoveredData, deathsData

    if (isGlobal(country)) {
        let worldData = await covidApi.getWorldDaysCases()
        worldData.sort((a, b) => new Date(a.Date) - new Date(b.Date))
        worldData.forEach(e => {
            let d = new Date(e.Date)
            labels.push(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)
        })

        confirmData = renderWorldData(worldData, CASE_STATUS.confirmed)
        recoveredData = renderWorldData(worldData, CASE_STATUS.recovered)
        deathsData = renderWorldData(worldData, CASE_STATUS.deaths)
    } else {
        let confirmed = await covidApi.getCountryDaysCases(country, CASE_STATUS.confirmed)
        let recovered = await covidApi.getCountryDaysCases(country, CASE_STATUS.recovered)
        let deaths = await covidApi.getCountryDaysCases(country, CASE_STATUS.deaths)

        confirmData = renderData(confirmed)
        recoveredData = renderData(recovered)
        deathsData = renderData(deaths)

        confirmed.forEach(e => {
            let d = new Date(e.Date)
            labels.push(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)
        })
    }

    let series = [{
        name: CASE_NAME.confirmed,
        data: confirmData
    }, {
        name: CASE_NAME.recovered,
        data: recoveredData
    }, {
        name: CASE_NAME.deaths,
        data: deathsData
    }]

    daysChart.updateOptions({
        series: series,
        xaxis: {
            categories: labels
        }
    })
}

initRecoveryRate = async() => {
    let options = {
        chart: {
            type: 'radialBar',
            height: '400'
        },
        series: [],
        labels: ['Taxa de mortalidade'],
        colors: [COLORS.deaths]
    }

    deathRateChart = new ApexCharts(document.querySelector('#recover-rate-chart'), options)
    deathRateChart.render()
}

loadRecoveryRate = async(rate) => {
    deathRateChart.updateSeries([rate])
}

initTheme = () => {
    let darkModeSwitch = document.querySelector('#darkmode-switch')

    darkModeSwitch.onclick = () => {
        darkModeSwitch.classList.toggle('dark')
        body.classList.toggle('dark')

        setDarkChart(body.classList.contains('dark'))
    }
}

setDarkChart = (dark) => {
    let theme = {
        theme: {
            mode: dark ? 'dark' : 'light'
        }
    }

    allTimeChart.updateOptions(theme)
    daysChart.updateOptions(theme)
    deathRateChart.updateOptions(theme)
}

renderCountrySelectList = (list) => {
    let countrySelectList = document.querySelector('#country-select-list')
    countrySelectList.querySelectorAll('div').forEach(e => e.remove())
    list.forEach(e => {
        let item = document.createElement('div')
        item.classList.add('country-item')
        item.textContent = e.Country

        item.onclick = async() => {
            document.querySelector('#country-select span').textContent = e.Country
            countrySelectList.classList.toggle('active')
            await loadData(e.Slug)
        }

        countrySelectList.appendChild(item)
    })
}

loadCountrySelectList = async() => {
    let summaryData = await covidApi.getSummary()
    countriesList = summaryData.Countries
    let countrySelectList = document.querySelector('#country-select-list')
    let item = document.createElement('div')

    item.classList.add('country-item')
    item.textContent = 'Global'
    item.onclick = async() => {
        document.querySelector('#country-select span').textContent = 'Global'
        countrySelectList.classList.toggle('active')
        await loadData('Global')
    }

    countrySelectList.appendChild(item)
    renderCountrySelectList(countriesList)
}

initContryFilter = () => {
    let input = document.querySelector('#country-select-list input')
    input.onkeyup = () => {
        let filtered = countriesList.filter(e => e.Country.toLowerCase().includes(input.value))
        renderCountrySelectList(filtered)
    }
}