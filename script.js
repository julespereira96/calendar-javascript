const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const createDate = (year, month) => {
  //new Date() creates a new date object with the current date
  const date = new Date(year, month, 0); // 0-index month(0-11)
 // The getDay() method returns the day of the week for the specified date according to local time, where 0 represents Sunday.
  const firstDay = new Date(year, month).getDay(); //0-index day of week(0-6)
  //The getDate() method returns the day of a date as a number (1-31):
  const totalDays = new Date(year, month + 1, 0).getDate();
  //The toLocaleString() method converts a Date object to a string, using locale settings.
  const prettyName = date.toLocaleDateString("en-US", {
    timeZone: "UTC",
  });

  return {
    firstDay,
    totalDays,
    prettyName,
  };
};

const isSelected = (isSelected) => {
  // condition ? exprIfTrue : exprIfFalse
  return isSelected ? "selected" : "";
};

const isChecked = (isChecked) => {
  // condition ? exprIfTrue : exprIfFalse
  return isChecked ? "selected" : "";
};

// set date format to YYYY-M-D (leading 0's create UTC format)
// const formattedStartDate = (startDate) => new Date(startDate);

const formattedStartDate = (StartDate) => new Date(StartDate);

const TODAY = new Date();
class Calendar {
  constructor(startDate) {
    this.startDate = startDate ? formattedStartDate(startDate) : new Date();
    this.calendar = document.createElement("div");
    this.calendar.id = `calendar-${this.selector}`;
    this.calendar.classList.add("calendar");
    this.selectedMonth = this.startDate.getMonth(); // 0-indexed month
    this.selectedYear = this.startDate.getFullYear();
    this.selectedDay = this.startDate.getDate();
    this.calendar.innerHTML = `
      <form class='title'></form>
      <div class='dow-container'></div>
      <div class='grid'></div>
      `;
    this.grid = this.calendar.querySelector(".grid");
    this.dow = this.calendar.querySelector(".dow-container");
    this.title = this.calendar.querySelector(".title");

    document.body.appendChild(this.calendar);
    this.createTitle();
    this.setDate();
  }

  createTitle() {
    for (let i = 0; i < 7; i++) {
      const dow = document.createElement("div");
      dow.classList.add("dow");
      dow.innerHTML = daysOfWeek[i];
      this.dow.appendChild(dow);
    }

    const monthsSelect = months.reduce((accumulator, currentValue, index) => {
      return (
        accumulator +
        `<option value="${index}" ${isSelected(
          index === this.selectedMonth
        )}>${currentValue}</option>`
      );
    }, 0);

    let yearsSelect = "";
    for (let i = TODAY.getFullYear() - 50; i < TODAY.getFullYear() + 10; i++) {
      yearsSelect += `<option value="${i}" ${isSelected(
        i === this.selectedYear
      )}>${i}</option>`;
    }

    this.title.innerHTML = `
      <select name="months">${monthsSelect}</select>
      <select name="years">${yearsSelect}</select>
    `;

    this.title.addEventListener("change", (event) => {
      const { name, value } = event.target;
      if (name === "months") {
        this.selectedMonth = value;
      } else {
        this.selectedYear = value;
      }
      this.setDate();
    });
  }

  setDate(
    selectedYear = this.selectedYear,
    selectedMonth = this.selectedMonth,
    selectedDay = this.selectedDay
  ) {
    if (!this.grid) {
      return;
    }
    this.grid.innerHTML = "";
    this.date = createDate(selectedYear, selectedMonth);

    for (let i = 0; i < this.date.totalDays; i++) {
      const day = this.createDayTile(i, i === selectedDay - 1);
      this.grid.appendChild(day);
    }
  }

  createDayTile(dayNum, checked) {
    const day = document.createElement("div");
    day.classList = "day";
    if (dayNum === 0) {
      day.style["grid-column-start"] = this.date.firstDay + 1; // 1-indexed
    }
    day.innerHTML = `
      <input type='radio' ${isChecked(checked)} id='${this.selector}-${
      dayNum + 1
    }' name='${this.selector}-dates' />
      <label for='${this.selector}-${dayNum + 1}'>${dayNum + 1}</label>
    `;
    day.addEventListener("click", (event) => {
      this.selectedDay = event.currentTarget.textContent;
    });
    return day;
  }
}

(function () {
  const cal2 = new Calendar("2021-07-9");
})();



// References

// //
// https://codepen.io/TravisL12/pen/dypJPzZ