import React, { useState, useEffect } from "react";
import axios from "axios";
import shortid from "shortid";

function Pollution(props) {
  const [data, setData] = useState({
    forecastUrl: "",
    disclaimer: "",
    forecast: [],
  });

  useEffect(() => {
    axios.get("https://api.tfl.gov.uk/AirQuality").then((res) =>
      setData({
        forecastUrl: res.data.forecastURL,
        disclaimer: res.data.disclaimerText,
        forecast: res.data.currentForecast,
      })
    );
  });

  return (
    <>
      <div
        key={shortid.generate()}
        className="flex content-center justify-center"
      >
        <h1 key={shortid.generate()} className="text-center">
          Pollution Levels
        </h1>
      </div>
      <div
        key={shortid.generate()}
        className="flex items-center justify-center py-4 "
      >
        <div
          key={shortid.generate()}
          className=" rounded overflow-hidden shadow-lg hover:shadow-2xl"
        >
          <div key={shortid.generate()} className="px-6 py-4">
            <p
              key={shortid.generate()}
              className="text-blue-700 text-center hover:underline text-base"
            >
              <a
                key={shortid.generate()}
                href={data.forecastUrl}
                target="blank"
              >
                More Info
              </a>
            </p>
            {data.forecast
              ? data.forecast.slice(1).map((info) => (
                  <>
                    <p
                      key={shortid.generate()}
                      className="flex text-center justify-center"
                    >
                      Todays Forecast: {info.forecastSummary}
                    </p>
                    <br key={shortid.generate()} />
                    <table key={shortid.generate()} className="table-fixed">
                      <thead key={shortid.generate()}>
                        <tr key={shortid.generate()}>
                          <th key={shortid.generate()} className="px-4 py-2">
                            Gas
                          </th>
                          <th key={shortid.generate()} className="px-4 py-2">
                            Level
                          </th>
                          <th key={shortid.generate()} className="px-4 py-2">
                            Information
                          </th>
                        </tr>
                      </thead>
                      <tbody key={shortid.generate()}>
                        <tr key={shortid.generate()}>
                          <td
                            key={shortid.generate()}
                            className="border px-4 py-2"
                          >
                            Nitrogen Dioxide (NO
                            <sub key={shortid.generate()}>2</sub>)
                          </td>
                          <td
                            key={shortid.generate()}
                            className="border px-4 py-2"
                          >
                            {info.nO2Band}
                          </td>

                          <td
                            key={shortid.generate()}
                            className=" w-11/12 border px-4 py-2  text-justify w-56 border bg-red-100 px-4 py-3 text-red-700"
                          >
                            <div key={shortid.generate()} role="alert">
                              NO2 forms when fossil fuels are burned at high
                              temperatures. It is one of six widespread air
                              pollutants that have national air quality
                              standards to limit them in the outdoor air. It
                              affects the lungs by causing lung inflamation,
                              coughing and leads to increased rates of asthma
                              attacks in susceptable individuals.
                            </div>
                          </td>
                        </tr>

                        <tr key={shortid.generate()}>
                          <td
                            key={shortid.generate()}
                            className="border px-4 py-2"
                          >
                            Ozone (O<sub key={shortid.generate()}>3</sub>)
                          </td>
                          <td
                            key={shortid.generate()}
                            className="border px-4 py-2"
                          >
                            {info.o3Band}
                          </td>
                          <td
                            key={shortid.generate()}
                            className=" w-11/12 border px-4 py-2  text-justify w-56 border bg-red-100 px-4 py-3 text-red-700"
                          >
                            <div key={shortid.generate()} role="alert">
                              O<sub key={shortid.generate()}>3</sub> is a pale
                              blue gas with a distinctive smell. It has many
                              industrial applications but causes damage to
                              mucous and respiratory tissues in people when at
                              high concentrations near ground level. However, a
                              higher concentration in the ozone layer is
                              beneficial, preventing damaging UV light from
                              reaching the Earth's surface.
                            </div>
                          </td>
                        </tr>

                        <tr key={shortid.generate()}>
                          <td
                            key={shortid.generate()}
                            className="border px-4 py-2"
                          >
                            SO<sub key={shortid.generate()}>2</sub>
                          </td>
                          <td
                            key={shortid.generate()}
                            className="border px-4 py-2"
                          >
                            {info.sO2Band}
                          </td>
                          <td
                            key={shortid.generate()}
                            className=" w-11/12 border px-4 py-2  text-justify w-56 border bg-red-100 px-4 py-3 text-red-700"
                          >
                            <div key={shortid.generate()} role="alert">
                              SO<sub key={shortid.generate()}>2</sub> is an
                              extremely toxic gas responsible for the smell of
                              burnt matches. It is released naturally by
                              volcanic activity and is produced as a by-product
                              of copper extraction and the burning of fossil
                              fuels contaminated with sulfur compounds. In
                              humans it causes respiratory and digestion issues.
                            </div>
                          </td>
                        </tr>

                        <tr key={shortid.generate()}>
                          <td
                            key={shortid.generate()}
                            className="border px-4 py-2"
                          >
                            PM10 Band
                          </td>
                          <td
                            key={shortid.generate()}
                            className="border px-4 py-2"
                          >
                            {info.pM10Band}
                          </td>
                          <td
                            key={shortid.generate()}
                            className=" w-11/12 border px-4 py-2  text-justify w-56 border bg-red-100 px-4 py-3 text-red-700"
                          >
                            <div role="alert" key={shortid.generate()}>
                              PM10 is particulate matter 10 micrometers or less
                              in diameter.
                            </div>
                          </td>
                        </tr>

                        <tr key={shortid.generate()}>
                          <td
                            key={shortid.generate()}
                            className="border px-4 py-2"
                          >
                            PM25 Band
                          </td>
                          <td
                            key={shortid.generate()}
                            className="border px-4 py-2"
                          >
                            {info.pM25Band}
                          </td>
                          <td
                            key={shortid.generate()}
                            className=" w-11/12  px-4 py-2  text-justify w-56 border bg-red-100 px-4 py-3 text-red-700"
                          >
                            <div key={shortid.generate()} role="alert">
                              PM25 is particulate matter 25 micrometers or less
                              in diameter.
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}

export default Pollution;
