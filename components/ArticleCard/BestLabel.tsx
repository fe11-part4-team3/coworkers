import BestMedal from '@/public/images/icon-medal.svg';

function BestLabel() {
  return (
    <div className="flex items-center">
      <BestMedal />
      <span className="ml-pr-4 text-16sb mo:text-14sb">Best</span>
    </div>
  );
}

export default BestLabel;
