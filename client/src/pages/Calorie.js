import Calculator from '../components/Calculator';
import CalculatorRegisteredUserIntro from '../components/intros/CalculatorRegisteredUser';
import Header from '../components/Header';

export default function Calorie(props) {
  return (
    <>
      <Header />
      <CalculatorRegisteredUserIntro />
      <div className="body">
        <Calculator profile={props.petProfile} />
      </div>
    </>
  );
}
