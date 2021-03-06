import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "./App.css";

export default function Detail() {
  let [person, updatePerson] = useState([]);
  const params = useParams();

  useEffect(() => {
    const callApi2 = async () => {
      const data2 = await Axios(
        "https://forbes400.herokuapp.com/api/forbes400?limit=100"
      );

      updatePerson(data2.data);
    };
    callApi2();
  }, []);

  return (
    <div className="detail-big-container">
      {person
        .filter((individual) => individual.personName === params.name)
        .map((data) => (
          <>
            <div className="detail-information">
              <div className="detail-container">
                <img
                  className="image-detail"
                  key={data.personName}
                  src={`https://${data.person.squareImage}`}
                  alt={data.personName}
                />
              </div>

              <div className="information">
                <div className="rank">
                  <h2>Rank: #{data.rank}</h2>
                </div>
                <h2>Name: {data.personName}</h2>
                <h2>
                  Net Worth: $
                  {`${Math.round(Number(data.finalWorth / 1000) * 100) / 100}B`}
                </h2>
                <h2>Source of Wealth: {data.source}</h2>
                <h2>Industry: {data.industries}</h2>
              </div>
            </div>

            <div className="extra-info-container">
              <div className="within-container">
                <div className="first-h2">
                  <>
                    {/* Check to see if data.state exists within data first */}
                    {data.state ? (
                      <>
                        <div className="residence">
                          <h2 className="h2-residence">Residence:</h2>

                          <ul>
                            <li className="li">
                              {" "}
                              {data.city}, {data.state},{" "}
                              {data.countryOfCitizenship}
                            </li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <div className="no-state-residence">
                        <h2>Residence:</h2>

                        <ul>
                          <li className="li">
                            {data.city}, {data.countryOfCitizenship}
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                </div>

                <div className="second-h2">
                  <>
                    {data.abouts ? (
                      <>
                        <div className="abouts">
                          <h2 className="additional">
                            Additional Information:
                          </h2>
                          <>
                            <ul>
                              {data.abouts.map((about) => (
                                <li className="more">{about}</li>
                              ))}
                            </ul>
                          </>
                        </div>
                      </>
                    ) : (
                      <div className="no-data">
                        <h2>Additional Information:</h2>
                        <p>The data is not available.</p>
                      </div>
                    )}
                  </>
                  <div className="interesting">
                    <h2 class="interesting-facts">Interesting Facts:</h2>{" "}
                    <>
                      <ul>
                        {data.bios.map((bio) => (
                          <li className="bio">{bio}</li>
                        ))}
                      </ul>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  );
}
