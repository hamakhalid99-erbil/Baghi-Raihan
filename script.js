let btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    let text = document.getElementById("getText").value;

    fetch('https://api.covid19api.com/summary')
        .then((covidData) => {
            return covidData.json();
        })
        .then((getData) => {
            console.log(getData);
            var content = document.querySelector(".data");

            var box = content.lastElementChild;
            while (box) {
                content.removeChild(box);
                box = content.lastElementChild;
            }
            let data = document.querySelector(".data");

            var index = 0;
            var found = false;
            for (var i = 0; i < 185; i++) {
                if (getData.Countries[i].Country.toLowerCase() == text.toLowerCase()) {
                    index = i;
                    found = true;
                    break;
                }
            }
            if (found) {
                data.innerHTML = `<div class="box">
                <div class="head">
                    <span>Covid-19 Cases in ${getData.Countries[index].Country}</span>
                </div>
                <div class="total">
                    <div><p>Total Confirmed</p> ${getData.Countries[index].TotalConfirmed}</div>
                    <div><p>Total Deaths</p> ${getData.Countries[index].TotalDeaths}</div>
                    <div><p>Total Recovered</p> ${getData.Countries[index].TotalRecovered}</div>
                </div>
                <div class="new">
                    <div><p>New Confirmed</p> ${getData.Countries[index].NewConfirmed}</div>
                    <div><p>New Deaths</p> ${getData.Countries[index].NewDeaths}</div>
                    <div><p>New Recovered</p> ${getData.Countries[index].NewRecovered}</div>
                    </div>
                </div>`;
            } else {
                data.innerHTML = `<div class="unfoundTitle">Can't find the meaning of <span>"${text}"</span>. Please, try to search for another word.</div>`

            }


        })
})