import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import axios from "axios";
import "./App.css";

const schemaOptions = [
  { label: "First Name", value: "first_name", traits: "user" },
  { label: "Last Name", value: "last_name", traits: "user" },
  { label: "Gender", value: "gender", traits: "user" },
  { label: "Age", value: "age", traits: "user" },
  { label: "Account Name", value: "account_name", traits: "group" },
  { label: "City", value: "city", traits: "group" },
  { label: "State", value: "state", traits: "group" },
];

function App() {
  const [modal, setModal] = useState(false);
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);
  const [segmentName, setSegmentName] = useState("");
  const [selectedschemas, setSelectedschemas] = useState([]);
  const [current, setCurrent] = useState("");
  const savedata = async () => {
    const payload = {
      segment_name: segmentName,
      schema: selectedschemas.map((schema) => ({
        [schema.value]: schema.label,
      })),
    };
    const weburl = "http://localhost:5000/forward";


    console.log(payload);
    try {
      const res = await axios.post(weburl, payload);
      console.log("Response:", res);
    } catch (error) {
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      } else if (error.request) {
        console.log("Request made, no response received:", error.request);
      } else {
        console.log("Error", error.message);
      }
      
    }

    setAvailableSchemas(schemaOptions);

    setSelectedschemas([]);
    setModal(false);
    setCurrent("");
  };

  const handleaddschema = () => {
    if (current) {
      const schema = availableSchemas.find((s) => s.value === current);
      setSelectedschemas([...selectedschemas, schema]);
      setAvailableSchemas(
        availableSchemas.filter((sc) => sc.value !== current)
      );
      setCurrent("");
    }
  };

  const handleschemavalue = (i, event) => {
    const sc = [...selectedschemas];
    sc[i].value = event.target.value;
    setSelectedschemas(sc);
  };

  const removeschema = (index) => {
    const removedSchema = selectedschemas[index];
    const updatedSchemas = selectedschemas.filter((_, i) => i !== index);
    setSelectedschemas(updatedSchemas);

    setAvailableSchemas([...availableSchemas, removedSchema]);
  };

  return (
    <>
      <div className="container">
        <div className="btn-div">
          <button onClick={() => setModal(true)}>Save Segment</button>
        </div>
        {modal && (
          <div className="modal">
            <div className="heading">
              <div className="backicon" onClick={() => setModal(false)}>
                <IoIosArrowBack />
              </div>
              <h2>Saving Segment</h2>
            </div>
            <div className="input">
              <p className="input-text">Enter the name of the segment</p>
              <input
                className="input-box"
                value={segmentName}
                type="text"
                placeholder="Enter the name of the segment"
                onChange={(e) => setSegmentName(e.target.value)}
              />
            </div>
            <div>
              <p>
                To save your segments, you need to add schemas to build the
                query.
              </p>
            </div>
            <div className="usertraits">
              <div className="dot-container">
                <div className="dot group"></div>Group traits
              </div>
              <div className="dot-container">
                <div className="dot user"></div>User traits
              </div>
            </div>
            <div className="Schema-input">
              {selectedschemas.map((sc, index) => (
                <div key={index} className="Schema-input-box">
                  <div className={`dot ${sc.traits}`}></div>
                  <input
                    className="schema-input"
                    placeholder={sc.label}
                    value={sc.value}
                    onChange={(event) => handleschemavalue(index, event)}
                  />
                  <i className="removeicon" onClick={() => removeschema(index)}>
                    <IoIosRemoveCircleOutline />
                  </i>
                </div>
              ))}
            </div>
            <div className="addschema">
              <select
                className="schemas"
                id="schemas"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
              >
                <option value="" disabled>
                  Add schema to segment
                </option>
                {availableSchemas.map((schema) => (
                  <option key={schema.value} value={schema.value}>
                    {schema.label}
                  </option>
                ))}
              </select>
              <div>
                <button className="add-btn" onClick={handleaddschema}>
                  + Add new schema
                </button>
              </div>
            </div>
            <div>
              <button className="save-btn" onClick={() => savedata()}>
                Save the Segment
              </button>
              <button className="cancel-btn" onClick={() => setModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
