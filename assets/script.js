$(function () {
  //Function to save user input in local storage
  function saveEvent() {
    //Get id of the time-block containing save button
    var timeBlockId = $(this).closest(".time-block").attr("id");

    //Get user input from textarea
    var eventDescription = $(this).siblings(".description").val();

    //Save event in local storage using time block id as the key
    localStorage.setItem(timeBlockId, eventDescription);
  }

  //Add click event listener to all buttons
  $(".saveBtn").on("click", saveEvent);

  //Function to update time-block classes based on current hour
  function updateClasses() {
    //Get current hour using Day
    var currentHour = dayjs().format("H");

    //Loop through each time block
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");

      //Remove any previous classes
      $(this).removeClass("past present future");

      //Compare time block with current hour
      if (timeBlockId < currentHour) {
        $(this).addClass("past");
      } else if (timeBlockId === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  //Update time-block classes page load
  updateClasses();

  //Function load events from local storage
  function loadEvents() {
    //Loop through each time block
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");

      //get saved event from local storage
      var savedEvent = localStorage.getItem(timeBlockId);

      //Set value of textarea to saved event
      $(this).find(".description").val(savedEvent);
    });
  }

  //Load events from local storage
  loadEvents();

  //display current date in header
  function displayDate() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }

  //show current date on page load
  displayDate();
});
