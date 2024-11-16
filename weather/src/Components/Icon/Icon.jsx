function Icon(icon){
    switch(icon){
        case '01d':
            return 'fa-solid fa-sun';
        case '01n':
            return 'fa-solid fa-moon';
        case '02d':
            return 'fa-solid fa-cloud-sun';
        case '02n':
            return 'fa-solid fa-cloud-moon';
        case '03d':
        case '03n':
            return 'fa-solid fa-cloud';
        case '04d':
        case '04n':
            return 'fa-solid fa-cloud-meatball';
        case '09d':
        case '09n':
            return 'fa-solid fa-cloud-showers-heavy';
        case '10d':
        case '10n':
            return 'fa-solid fa-cloud-rain';
        case '11d':
        case '11n':
            return 'fa-solid fa-cloud-bolt';
        case '13d':
        case '13n':
            return 'fa-solid fa-snowflake';
        case '50d':
        case '50n':
            return 'fa-solid fa-smog'
    }
}

export default Icon;