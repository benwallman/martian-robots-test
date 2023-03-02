import { useState } from "react";
import Board from '../src/components/Board'

const exampleInstructions = `3 7
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
`

export default function Home() {
  const [instructionsUnformatted, setInstructionsUnformatted] = useState('');
  const [submitted, setSubmitted] = useState(false);
  // return (
  //   <Board
  //     instructions={exampleInstructions}
  //   />
  // )
  if (submitted) {
    return (
      <Board instructions={instructionsUnformatted} />
    )
  }

  return (
    <main>
      <h1>
        Welcome to my demo
      </h1>
      <span>
        Please paste in the instructions below, and click submit
      </span>
      <br />
      <br />
      <textarea value={instructionsUnformatted} onChange={e => setInstructionsUnformatted(e.currentTarget.value)} />
      <br />
      <br />
      <button
        disabled={Boolean(!instructionsUnformatted)}
        onClick={() => setSubmitted(true)}
      >
        Submit
      </button>

      <br />
      <br />
      <span>
        Example instructions:
      </span>
      <br />
      <br />
      <pre>{exampleInstructions}</pre>
    </main>
  )
}
