import Filter from "../components/filter/Filter.jsx";
import { ListData } from "../components/lib/DummyData";
import Map from "../components/map/Map.jsx";
import Card from "../components/ui/Card.jsx";
import "../style/listpage.scss";

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
