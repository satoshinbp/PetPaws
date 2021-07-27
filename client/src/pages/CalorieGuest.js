import Calculator from '../components/Calculator';
import CalculatorGuestUserIntro from '../components/intros/CalculatorGuestUser';

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
