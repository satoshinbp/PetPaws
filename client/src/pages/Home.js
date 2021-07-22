import Team from '../components/Team';
import HomeIntro from '../components/intros/Home';
import Features from '../components/Features';

export default function Home() {
  return (
    <>
      <HomeIntro />

      <div className="body">
        <Features />
        <Team />
      </div>
    </>
  );
}
