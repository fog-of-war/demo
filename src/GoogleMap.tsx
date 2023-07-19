import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import seoulData from "./data/seoul.json";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 37.566826,
  lng: 126.9786567,
};

const options: { [key: string]: { point: number } } = {
  Gangdong: { point: 0 },
  Songpa: { point: 1100 },
  Gangnam: { point: 2200 },
  Seocho: { point: 0 },
  Gwanak: { point: 5000 },
  Dongjak: { point: 0 },
  Yeongdeungpo: { point: 0 },
  Geumcheon: { point: 2300 },
  Guro: { point: 0 },
  Gangseo: { point: 0 },
  Yangcheon: { point: 3300 },
  Mapo: { point: 0 },
  Seodaemun: { point: 0 },
  Eunpyeong: { point: 0 },
  Nowon: { point: 0 },
  Dobong: { point: 500 },
  Gangbuk: { point: 1300 },
  Seongbuk: { point: 0 },
  Jungnang: { point: 0 },
  Dongdaemun: { point: 0 },
  Gwangjin: { point: 0 },
  Seongdong: { point: 0 },
  Yongsan: { point: 0 },
  Jung: { point: 0 },
  Jongno: { point: 4500 },
};

function Map() {
  const [polygons, setPolygons] = useState<
    {
      name: string;
      name_eng: string;
      path: { lat: number; lng: number }[];
      options: {};
    }[]
  >([]);

  useEffect(() => {
    const data = seoulData.features.map((feature) => {
      const name = feature.properties.name;
      const name_eng = feature.properties.name_eng;
      const path = feature.geometry.coordinates[0].map(([lng, lat]) => ({
        lat,
        lng,
      }));

      console.log(feature.properties.name_eng);
      return { name, name_eng, path, options: {} };
    });

    setPolygons(data);

    return () => setPolygons([]);
  }, []);

  if (polygons.length === 0) return <>Loading...</>;

  console.log(polygons);
  return (
    <LoadScript googleMapsApiKey="AIzaSyB3ixB-V1mYdr7uNucQaUs_z3lOlVc4XzA">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        options={{ draggable: false }}
      >
        {polygons.map((polygon, index) => {
          const name_eng = polygon.name_eng.slice(0, -3);
          const point = options[name_eng].point;
          let opacity =
            point < 1000 ? 0.9 : point < 2000 ? 0.7 : point < 3000 ? 0.5 : 0.3;
          return (
            <Polygon
              key={index}
              paths={polygon.path}
              options={{
                fillColor: "#222",
                fillOpacity: opacity,
                strokeColor: "#555",
                strokeOpacity: 1,
                strokeWeight: 1,
              }}
              onClick={() => alert("바보")}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
