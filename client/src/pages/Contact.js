import ContactIntro from '../components/intros/Contact';
import ContactForm from '../components/forms/Contact';

export default function Contact() {
  return (
    <>
      <ContactIntro />

      <div className="body">
        <div className="body__wrapper">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
