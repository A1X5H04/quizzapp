import ReactConfetti from "react-confetti";

export default function WooHoo() {
  return (
    <div className="woohoo-background">
      <ReactConfetti />
      <div className="woohoo">
        <img src="./src/assets/congratulation.png" alt="" />
        <h1>Right On Bro!!</h1>
      </div>
    </div>
  );
}
