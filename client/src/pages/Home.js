import Team from '../components/Team';
import HomeIntro from '../components/intros/Home';
import Features from '../components/Features';
import Header from '../components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <HomeIntro />

      <div className="body">
        <Features />
        <Team />
      </div>
    </>
  );
}
