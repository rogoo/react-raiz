import { useRecoilState } from "recoil";
import {
  tempCelsiusConverterSelector,
  tempFahrenheitState,
} from "../store/store";

const Temperatura = () => {
  const [tempFarenheit, setTempFahrenheit] =
    useRecoilState(tempFahrenheitState);
  const [tempCelsius, setTempCelsius] = useRecoilState(
    tempCelsiusConverterSelector,
  );
  return (
    <div>
      Temperatura Farenheit: {tempFarenheit}°F
      <br />
      Temperatura Celsius: {tempCelsius}°C
      <br />
      <button onClick={() => setTempFahrenheit(tempFarenheit + 10)}>
        Aumentar 10°F
      </button>
      <button onClick={() => setTempFahrenheit(tempFarenheit - 10)}>
        Disminuir 10°F
      </button>
      <br />
      <button onClick={() => setTempCelsius(tempCelsius + 10)}>
        Aumentar 10°C
      </button>
      <button onClick={() => setTempCelsius(tempCelsius - 10)}>
        Disminuir 10°C
      </button>
    </div>
  );
};

export default Temperatura;
