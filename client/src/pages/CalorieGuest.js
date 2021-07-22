import Calculator from '../components/Calculator';
import CalculatorGuestUserIntro from '../components/intros/CalculatorRegisteredUser';

export default function Calorie() {
  return (
    <>
      <CalculatorGuestUserIntro />

      <div className="body">
        <Calculator />
      </div>
    </>
  );
}
