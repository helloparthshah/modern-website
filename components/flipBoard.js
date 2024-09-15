export default function FlipBoard({ text }) {
  return (
    <div className="flip-board-container">
      <div className="flip-board">
        {text.split(" ").map((word, index) => {
          return (
            <div key={index} className={"flip-board-word word-" + index}>
              {word.split("").map((char, letter_index) => {
                return (
                  <div
                    key={letter_index}
                    className={"flip-board-char"}
                    char={char.toUpperCase()}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
