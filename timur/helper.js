function getDayName(dayIndex) {
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	]
	return days[dayIndex]
}

function getMonthName(monthIndex) {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]
	return months[monthIndex]
}

const formatDate = (date) => {
	const dateObject = new Date(date)
	const formattedDate =
		getDayName(dateObject.getDay()) +
		' ' +
		getMonthName(dateObject.getMonth()) +
		' ' +
		dateObject.getDate() +
		', ' +
		dateObject.getFullYear()

	return formattedDate
}

const getColorsByContribution = (level) => {
	if (level > 1 && level < 10) {
		return 'var(--level-1)'
	} else if (level >= 10 && level < 20) {
		return 'var(--level-2)'
	} else if (level >= 20 && level < 30) {
		return 'var(--level-3)'
	} else if (level >= 30) {
		return 'var(--level-4)'
	}
}

// get dates and contributions
const getDatesContributions = (data) => {
	const allDates = Object.keys(data)
	const startDate = new Date(allDates[0])
	const endDate = new Date(allDates[allDates.length - 1])
	const newData = {}
	for (
		let currentDate = new Date(startDate);
		currentDate <= endDate;
		currentDate.setDate(currentDate.getDate() + 1)
	) {
		const formattedDate = currentDate.toISOString().split('T')[0]
		newData[formattedDate] = data[formattedDate] || 0
	}
	return newData
}

//get months
const getMonths = (data) => {
	const uniqueMonths = []
	for (const date in data) {
		const month = date.substring(0, 7) // Получаем год и месяц (например, "2022-05")
		if (!uniqueMonths.includes(month)) {
			uniqueMonths.push(month)
		}
	}
	return uniqueMonths.map((month) => {
		const [year, monthNum] = month.split('-')
		const monthName = new Date(
			year,
			parseInt(monthNum) - 1,
		).toLocaleDateString('en-US', { month: 'long' })
		return monthName
	})
}
