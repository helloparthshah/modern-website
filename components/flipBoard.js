export default function FlipBoard({ text }) {
  return (
    <>
      <div className="flip-board">
        {text.split(" ").map((word, index) => {
          return (
            <div key={index} className="flip-board-word">
              {word.split("").map((char, index) => {
                return (
                  <div
                    key={index}
                    className={"flip-board-char"}
                    char={char}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
