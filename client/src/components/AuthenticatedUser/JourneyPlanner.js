import React, { useState } from "react";
import shortid from "shortid";
import axios from "axios";

//Imports for Date/Time Rendering and Formatting
import Moment from "react-moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

// Custom Styles
import "../styles/JourneyPlanner.css";

function JourneyPlanner(props) {
  const [journeyData, setJourneyData] = useState({
    origin: "",
    destination: "",
    date: "",
    formattedDate: "",
    journeys: [],
    error: false,
    loading: false,
  });

  const {
    origin,
    destination,
    date,
    formattedDate,
    journeys,
    error,
    loading,
  } = journeyData;

  const searchJourneys = (e) => {
    setJourneyData({ loading: true });
    e.preventDefault();
    axios
      .get(
        `https://api.tfl.gov.uk/Journey/JourneyResults/${origin}/to/${destination}?date=${formattedDate}`
      )
      .then((res) =>
        setJourneyData({
          journeys: res.data.journeys,
          error: false,
          loading: false,
        })
      )
      .catch((err) => {
        setJourneyData({
          error: true,
          loading: false,
        });
      });
  };

  //Format Queried Date to make readable by API
  //Regex removes dashes to make date form = YYYYMMDD
  const formatSearchDate = (date) => {
    const newDate = moment(date).format("YYYY-MM-DD");
    const regexDate = newDate.replace(/-/g, "");
    setJourneyData({ ...journeyData, formattedDate: regexDate, date });
  };

  const handleChange = (name) => (event) => {
    setJourneyData({ ...journeyData, [name]: event.target.value });
  };

  const showError = () => (
    <div
      className="bg-red-100 text-center border border-red-400 text-red-700 px-4 py-3 rounded"
      role="alert"
    >
      <strong className="font-bold">
        Sorry
        <span aria-label="sad emoji" role="img">
          😢
        </span>
      </strong>
      <p>
        We couldn't find any connecting journeys for those locations on that
        date.
      </p>
    </div>
  );

  return (
    <>
      <div className="flex justify-center">
        <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 mt-6 border-2 border-gray-400">
          <p className="text-center mb-4">
            This journey search menu will only work for journeys made to or from
            London.
          </p>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            From:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={origin}
            onChange={handleChange("origin")}
            placeholder="Enter Postcode Here"
            type="text"
            required
          />
          <br />
          <br />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            To:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange("destination")}
            value={destination}
            placeholder="Enter Postcode Here"
            type="text"
            required
          />
          <br />
          <br />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date:
          </label>
          <div className="customDatePickerWidth">
            <DatePicker
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(newDate) => formatSearchDate(newDate)}
              format={"yyyy-MM-dd"}
              placeholderText="Date"
              selected={date}
              style={{ width: "5000px !important" }}
              required
            />
          </div>
          <br />

          <div className=" flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
              onClick={searchJourneys}
            >
              {loading ? <i className="fas fa-spinner fa-spin"></i> : "Search"}
            </button>
          </div>
          {error && showError()}
          {loading && (
            <img
              alt="Loading..."
              src="https://miro.medium.com/max/6684/1*F_5AEXIfr1AXuShXhYT4zg.gif"
            />
          )}
        </form>
      </div>
      <div className="flex justify-center" key={shortid.generate()}>
        <p>{/* Journeys from {origin} to {destination} on {date} */}</p>
        {journeys &&
          journeys.map((j, index) => (
            <div
              key={shortid.generate()}
              className="border-2 w-1/3 border-blue-500 text-center max-w-sm p-5 m-4 rounded shadow-lg"
            >
              <h3 className="justify-center underline" key={shortid.generate()}>
                Total Duration: {j.duration} minutes
              </h3>
              {j.legs.map((l, index) => (
                <>
                  <p key={shortid.generate()} className="font-medium">
                    Depart:
                  </p>
                  <Moment
                    key={shortid.generate()}
                    format="Do MMMM YYYY - HH:mm"
                  >
                    {l.departureTime}
                  </Moment>
                  <br />
                  <br />
                  <p key={shortid.generate()}>
                    {l.instruction.summary ? l.instruction.summary : ""}
                  </p>
                  <br />
                  <p key={shortid.generate()}>
                    {l.mode.name === "walking" ? (
                      <i
                        key={shortid.generate()}
                        className="fas fa-walking"
                      ></i>
                    ) : (
                      ""
                    )}
                    {l.mode.name === "bus" ? (
                      <i key={shortid.generate()} className="fas fa-bus"></i>
                    ) : (
                      ""
                    )}
                    {l.mode.name === "tube" ? (
                      <i key={shortid.generate()} className="fas fa-train"></i>
                    ) : (
                      ""
                    )}
                  </p>
                  <br />
                  <p key={shortid.generate()} className="font-medium">
                    Arrive:
                  </p>
                  <Moment
                    key={shortid.generate()}
                    format="Do MMMM YYYY - HH:mm"
                  >
                    {l.arrivalTime}
                  </Moment>
                  <hr />
                  <br />
                </>
              ))}
            </div>
          ))}
      </div>
    </>
  );
}

export default JourneyPlanner;
