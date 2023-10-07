import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CityContext";
function CityList() {
  const { city, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!city.length)
    return (
      <Message message="As there is no cities included so you can include by clicking on map." />
    );
  return (
    <ul className={styles.cityList}>
      {city.map((city) => (
        <CityItem city={city} />
      ))}
    </ul>
  );
}

export default CityList;
