import ReactConfetti from "react-confetti";

export default function WooHoo() {
  return (
    <div className="modal-background">
      <ReactConfetti />
      <div className="woohoo">
        <img src="./src/assets/congratulation.png" alt="" />
        <h1>Bullseye!</h1>
      </div>
    </div>
  );
}
