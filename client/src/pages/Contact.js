import ContactIntro from '../components/intros/Contact';
import ContactForm from '../components/forms/Contact';
import Header from '../components/Header';

export default function Contact() {
  return (
    <>
      <Header />
      <ContactIntro />

      <div className="body">
        <ContactForm />
      </div>
    </>
  );
}
