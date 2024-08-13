import "../../style/listpage.scss";
import { ListData } from "../lib/DummyData";

const ListPage = () => {
  const data = ListData;
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          {/* Filter component */}
          {/* Card component */}
        </div>
      </div>
      <div className="mapContainer">{/* Map component */}</div>
    </div>
  );
};

export default ListPage;
