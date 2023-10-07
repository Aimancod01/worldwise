import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CityContext";
function CountryList() {
  const { city, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!city.length)
    return (
      <Message message="As there is no cities included so you can include by clicking on map." />
    );
  const countries = city.reduce((arr, citi) => {
    if (!arr.map((el) => el.country).includes(citi.country))
      return [...arr, { country: citi.country, emoji: citi.emoji }];
    else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
