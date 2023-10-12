import { useState, useEffect } from "react";
import axios from "axios";

function Select(props) {
  const [authors, SetAuthors] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:8080/authors`,
      data: null,
    })
      .then((response) => {
        console.log(response.data);
        SetAuthors(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { label, onChange, error, name, value, ...otherProps } = props;
  return (
    <div>
      <label>
        <span>{label}</span>
        <select value={value} onChange={onChange} name={name} {...otherProps}>
          <option disabled value="">
            -- Select an option
          </option>
          {authors.map((item) => (
            <option key={item.username} value={item.username}>
              {item.username}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Select;
