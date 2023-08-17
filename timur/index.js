const squares = document.querySelector('.squares')
const wrapperMonths = document.querySelector('.months')

const renderMonths = (monthNames) => {
	wrapperMonths.innerHTML = ''
	monthNames.forEach((month) => {
		const li = document.createElement('li')
		li.innerHTML = month
		wrapperMonths.append(li)
	})
}

//render all days
const render = (newData) => {
	for (let key in newData) {
		let level = newData[key]

		const contributions =
			level !== 0 ? `${level} contributions` : 'No contributions'

		squares.insertAdjacentHTML(
			'beforeend',
			`<li style="background:${getColorsByContribution(level)};">
            <button>
            <div class="popup">
                    <p>${contributions}</p>
                    <span>${formatDate(key)}</span>
                </div>
            </button>
            </li>`,
		)
	}
}

const getDates = async () => {
	try {
		const respone = await fetch('https://dpg.gg/test/calendar.json')
		const result = await respone.json()
		const dates = getDatesContributions(result)
		const monthNames = getMonths(dates)
		render(dates)
		renderMonths(monthNames)

		wrapperMonths.style.cssText = `grid-area: months; display: grid;
        grid-template-columns:
            calc(var(--week-width) * 4)
            calc(var(--week-width) * 4)
            calc(var(--week-width) * 3)
            calc(var(--week-width) * 4)
            calc(var(--week-width) * 4)
            calc(var(--week-width) * 4)
            calc(var(--week-width) * 4)
            calc(var(--week-width) * 4)
            calc(var(--week-width) * 4)
            calc(var(--week-width) * 4)
            calc(var(--week-width) * 4)
            calc(var(--week-width) * 4)
            calc(var(--week-width) * 3);`
	} catch (error) {
		console.log(error)
	}
}
getDates()
