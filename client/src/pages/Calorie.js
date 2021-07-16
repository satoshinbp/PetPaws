import Calculator from '../components/Calculator';
import CalculatorRegisteredUserIntro from '../components/intros/CalculatorRegisteredUser';

export default function Calorie(props) {
  return (
    <>
      <CalculatorRegisteredUserIntro />

      <div className="body">
        <div className="body__wrapper">
          <Calculator profile={props.petProfile} />
        </div>
      </div>
    </>
  );
}
