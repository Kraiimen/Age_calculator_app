//INPUT FIELD
const day_label = document.querySelector(".day-label");
const day_input = document.getElementById("day-input");
const day_required = document.querySelector(".day-required");
const day_invalid = document.querySelector(".day-invalid");

const month_label = document.querySelector(".month-label");
const month_input = document.getElementById("month-input");
const month_required = document.querySelector(".month-required");
const month_invalid = document.querySelector(".month-invalid");

const year_label = document.querySelector(".year-label");
const year_input = document.getElementById("year-input");
const year_required = document.querySelector(".year-required");
const year_invalid = document.querySelector(".year-invalid");

const invalid_date_text = document.querySelector(".invalid-date");

//SUBMIT BUTTON
const arrow = document.querySelector(".arrow-svg-container");

//
var dayValue = 0, monthValue  = 0, yearValue = 0, monthLength = 0;
var invalid_day = false, invalid_month = false, invalid_year = false, invalid_date = false;;
const regularYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const leapYear    = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//COLORS | LIGHT_RED FOR ERROR | SMOKEY_GREY FOR NORMAL
const light_red = "hsl(0, 100%, 67%)";
const smokey_grey = "hsl(0, 1%, 44%)";

arrow.addEventListener('click', () => {
    //DAY CHECK
    if(day_input.value == ""){
        invalid_day = false;
        invalidLightRedOFF(day_label, day_input, day_invalid);
        requiredLightRedON(day_label, day_input, day_required);
    }
    else{
        requiredLightRedOFF(day_label, day_input, day_required);
        checkDays(day_input.value);
    }

    //MONTH CHECK
    if(month_input.value == ""){
        invalid_month = false;
        invalidLightRedOFF(month_label, month_input, month_invalid);
        requiredLightRedON(month_label, month_input, month_required);
    }
    else{
        requiredLightRedOFF(month_label, month_input, month_required);
        checkMonth(month_input.value, year_input.value);
    }

    //YEAR CHECK
    if(year_input.value == ""){
        invalid_year = false;
        invalidLightRedOFF(year_label, year_input, year_invalid);
        requiredLightRedON(year_label, year_input, year_required);
    }
    else {
        requiredLightRedOFF(year_label, year_input, year_required);
        checkYear(year_input.value);
    }


    if(invalid_day == true) invalidLightRedON(day_label, day_input, day_invalid)
    else invalidLightRedOFF(day_label, day_input, day_invalid);

    if(invalid_month == true) invalidLightRedON(month_label, month_input, month_invalid)
    else invalidLightRedOFF(month_label, month_input, month_invalid);

    if(invalid_year == true) invalidLightRedON(year_label, year_input, year_invalid);
    else invalidLightRedOFF(year_label, year_input, year_invalid);

    if(invalid_day == true && invalid_month == false && invalid_year == false){
        invalid_day = false;
        invalidLightRedOFF(day_label, day_input, day_invalid);
        invalidDateRedON();
    }
    else invalidDateRedOFF();

    const age = ageCalculator(dayValue, monthValue, yearValue);
    if(dayValue != 0 && monthValue != 0 && yearValue != 0){
        document.querySelector(".days span").innerHTML = age.days;
        document.querySelector(".months span").innerHTML = age.months;
        document.querySelector(".years span").innerHTML = age.years;
        
        //Add the animation
        document.querySelector(".days span").classList.add("number-animation");
        document.querySelector(".months span").classList.add("number-animation");
        document.querySelector(".years span").classList.add("number-animation");

        //Remove the class of the animation when it's finished
        setTimeout(() => {
            document.querySelector(".days span").classList.remove("number-animation");
            document.querySelector(".months span").classList.remove("number-animation");
            document.querySelector(".years span").classList.remove("number-animation");
        }, 800);

    }
});

function getMonthLength(m, y){
    var days = 0;

    //If is leap year
    if(y.value % 2 == 0) days = leapYear[m.value - 1];
    //If is regular year
    else days = regularYear[m.value - 1];

    return days;
}

function checkDays(d){
    monthLength = getMonthLength(month_input, year_input);

    //If is not a valid day
    if(!(d > 0 && d <= 31)){
        invalid_day = true;
    }
    else{
        invalid_day = false;
        dayValue = d;
    }
    
    //If is not between 0 and number of days in the month
    if(!(d > 0 && d <= monthLength) && (year_input.value != "") && (month_input.value != "")) {
        invalid_day = true;
    }
    else{
        invalid_day = false;
        dayValue = d;
    }
}

function checkMonth(m, y){
    //If is current year
    if(y == new Date().getFullYear()){
        //If is not between 0 and the current year
        if(!(m > 0 && m <= new Date().getMonth() +1)){
            invalid_month = true;
        }
        //Therefore reset
        else {
            invalid_month = false;
            monthValue = m;
        }
    }
    //If is not current year
    else{
        //If is not between 0 and 12 (number of months)
        if(!(m > 0 && m <= 12)){
            invalid_month = true;
        }
        //Therefore reset
        else {
           invalid_month = false;
           monthValue = m;
        }
    }
}

function checkYear(y){
    //If the year is in the future
    if(y > new Date().getFullYear()){
        invalid_year = true;
    }
    //If the year is in the past/present
    else{
        invalid_year = false;
        yearValue = y;
    }
}

function invalidDateRedON(){
    day_label.style.color = light_red;
    day_input.style.borderColor = light_red;

    month_label.style.color = light_red;
    month_input.style.borderColor = light_red;

    year_label.style.color = light_red;
    year_input.style.borderColor = light_red;

    invalid_date_text.style.display = "block";
}

function invalidDateRedOFF(){
    day_label.style.color = smokey_grey;
    day_input.style.borderColor = smokey_grey;

    month_label.style.color = smokey_grey;
    month_input.style.borderColor = smokey_grey;

    year_label.style.color = smokey_grey;
    year_input.style.borderColor = smokey_grey;

    invalid_date_text.style.display = "none";
}

function invalidLightRedON(label, input, invalid){
    label.style.color = light_red;
    input.style.borderColor = light_red;
    invalid.style.display = "block";
}

function invalidLightRedOFF(label, input, invalid){
    label.style.color = smokey_grey;
    input.style.borderColor = smokey_grey;
    invalid.style.display = "none";
}

function requiredLightRedON(label, input, required){
    label.style.color = light_red;
    input.style.borderColor = light_red;
    required.style.display = "block";
}

function requiredLightRedOFF(label, input, required){
    label.style.color = smokey_grey;
    input.style.borderColor = smokey_grey;
    required.style.display = "none";
}

function ageCalculator(d, m, y){
    const givenDate = new Date(y, m-1, d);
    const currentDate = new Date();

    // Calculate the difference in years, months, and days
    let years = currentDate.getFullYear() - givenDate.getFullYear();
    let months = currentDate.getMonth() - givenDate.getMonth();
    let days = currentDate.getDate() - givenDate.getDate();

    // Adjust months and years if necessary
    if (days < 0) {
        months -= 1;
        // Get the number of days in the previous month
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += previousMonth.getDate();
    }

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return {years, months, days};
}