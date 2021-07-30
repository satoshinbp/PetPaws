import Calculator from '../components/Calculator';
import CalculatorGuestUserIntro from '../components/intros/CalculatorGuestUser';
import Header from '../components/Header';

export default function Calorie() {
  return (
    <>
      <Header />
      <CalculatorGuestUserIntro />

      <div className="body">
        <Calculator />
      </div>
    </>
  );
}
