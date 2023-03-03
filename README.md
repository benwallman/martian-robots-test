This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

```bash
npm run test
```

# Overview

This project is an attempt at the Martian Robots test.

Most of the logic consists of smallish units in the `src/` directory, each of which should be unit tested.

The display, and the binding together of these bits of logic happens entirely in the Board, using React's internal state and utilising the video game concept of a `tick` (see below).

## Ticks

Ticks in video games, particularly strategy games, are useful for seeing each step that a simulation is making.

In this example, each move / rotation / decision counts as a tick. Mars is a large place, so to simulate the time taken between reaching co-ordinates the setInterval triggers a tick every 0.5 seconds.


## Next steps

Putting in more time, there's a few things I would do:

### Refactor the board

A lot of the boards functions are impure, brittle and repetitive. It would be great to make these more succint.

### E2E testing

Cypress (or similar) entering the whole sequence of commands and checking for the eventual output would be a fantastic way to test this simulation. This might involve being able to configure the interval, as no-one wants to arbitrarily wait for a simulation to complete during CI/CD.

### Animation

The whole concept of a tick was to allow the board to be visualised, and eventually animated. Currently the rover is represented as co-ordinates & direction as a string, but it should be fairly trival to change into an arrow that goes around.

## Design decisions

### Logic / library

Originally I intended on creating a library of functions which could be fully and easily composed into the board, and represent all the movements. I changed my mind due to not wanting to spend too long on this, and wanting to use React for managing state.

Had I continued with the library approach, I may have used a redux-esque way of creating an array of objects, each of which contains the boards state at that moment in time. This was somewhat translated into the concept of ticks (see above).
