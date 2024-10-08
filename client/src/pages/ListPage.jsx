import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Filter from "../components/filter/Filter.jsx";
import Map from "../components/map/Map.jsx";
import Card from "../components/ui/Card.jsx";
import "../style/listpage.scss";

const ListPage = () => {
  const data = useLoaderData();
  console.log("🚀 ~ ListPage ~ data:", data.postResponse);

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default ListPage;
