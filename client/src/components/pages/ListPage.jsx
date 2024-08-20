import "../../style/listpage.scss";
import Filter from "../filter/Filter";
import { ListData } from "../lib/DummyData";
import Map from "../map/Map";
import Card from "../ui/Card";

const ListPage = () => {
  const data = ListData;
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          {/* Filter component */}
          <Filter />
          {/* Card component */}
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={data} />
      </div>
    </div>
  );
};

export default ListPage;
