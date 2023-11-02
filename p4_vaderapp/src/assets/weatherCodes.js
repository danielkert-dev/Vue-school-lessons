const weatherCodes = {
    '0': 'Clear sky',
    '1': 'Mainly clear',
    '2': 'Partly cloudy',
    '3': 'Overcast',
    '45': 'Fog',
    '48': 'Depositing rime fog',
    '51': 'Drizzle',
    '53': 'Drizzle',
    '55': 'Drizzle',
    '56': 'Freezing Drizzle',
    '57': 'Freezing Drizzle',
    '61': 'Rain',
    '63': 'Rain',
    '65': 'Rain',
    '66': 'Freezing Rain',
    '67': 'Freezing Rain',
    '71': 'Snow fall',
    '73': 'Snow fall',
    '75': 'Snow fall',
    '77': 'Snow grains',
    '80': 'Rain showers',
    '81': 'Rain showers',
    '82': 'Rain showers',
    '85': 'Snow showers',
    '86': 'Snow showers',
    '95': 'Thunderstorm',
    '96': 'Thunderstorm',
    '99': 'Thunderstorm'
}

export default weatherCodes

// 0	Clear sky
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail