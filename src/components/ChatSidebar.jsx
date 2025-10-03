import { useState } from "react";
import "../styles/searchstaff.css";
export default function SearchStaff({ setSer, ser }) {
  return (
    <div className="search-user">
      <form>
        <label>
          <input
            type="search"
            placeholder="search mate..."
            onClick={(e) => setSer(e.target.value)}
          />
        </label>

        {/* <label>
          <input type="submit" value={">"} />
        </label> */}
        {console.log(ser)}
      </form>
    </div>
  );
}
