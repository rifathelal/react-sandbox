import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TicTacToe from "./TicTacToe";

describe("tictactoe", () => {
  beforeEach(() => {
    render(<TicTacToe />)
  })
  
  it("should render a grid of 9 boxes", () => {
    const boxes = screen.getAllByRole("listitem");
    expect(boxes.length == 9)
    boxes.forEach(box => {
      expect(box.querySelector("button"))
    })
  })

  it("should allow players to make a move", async () => {
    const box = screen.getAllByRole("listitem")[0];
    (box.querySelector("button") as HTMLButtonElement).click();
    expect(box.querySelector("svg"))
  })

  it("should switch players after making a move", async () => {
    let player = await screen.findByTitle("currentPlayerX");
    expect(player);
    
    const box = screen.getAllByRole("listitem")[0];
    (box.querySelector("button")! as HTMLButtonElement).click();
    
    player = await screen.findByTitle("currentPlayerO");
    expect(player);
  })
  
  it("should properly update board as players make moves", async () => {
    const boxes = screen.getAllByRole("listitem");
    const buttons = boxes.map((elem) => elem.querySelector("button")! as HTMLButtonElement);
    
    const user = userEvent.setup();
    await user.click(buttons[0])
    expect(await screen.findByTitle("1X"));
    await user.click(buttons[1]);
    expect(await screen.findByTitle("2O"));
    await user.click(buttons[2])
    expect(await screen.findByTitle("3X"));
    await user.click(buttons[3])
    expect(await screen.findByTitle("4O"));
  })

  it("should declare correct winner when player X wins", async () => {
    const boxes = screen.getAllByRole("listitem");
    const buttons = boxes.map((elem) => elem.querySelector("button")! as HTMLButtonElement);
    const user = userEvent.setup();

    await user.click(buttons[0]) // click on box 1 for X
    await user.click(buttons[1]) // click on box 2 for O
    await user.click(buttons[3]) // click on box 4 for X
    await user.click(buttons[2]) // click on box 3 for O
    await user.click(buttons[6]) // click on box 7 for X

    expect(await screen.findByTitle("winnerX"));
  })

  it("should declare correct winner when player O wins", async () => {
    const boxes = screen.getAllByRole("listitem");
    const buttons = boxes.map((elem) => elem.querySelector("button")! as HTMLButtonElement);
    const user = userEvent.setup();

    await user.click(buttons[0]) // click on box 1 for X
    await user.click(buttons[1]) // click on box 2 for O
    await user.click(buttons[2]) // click on box 3 for X
    await user.click(buttons[4]) // click on box 5 for O
    await user.click(buttons[3]) // click on box 4 for X
    await user.click(buttons[7]) // click on box 8 for O

    expect(await screen.findByTitle("winnerO"));
  })

  it("should declare draw when it is a draw", async () => {
    const boxes = screen.getAllByRole("listitem");
    const buttons = boxes.map((elem) => elem.querySelector("button")! as HTMLButtonElement);
    const user = userEvent.setup();

    await user.click(buttons[4]) // click on box 5 for X
    await user.click(buttons[0]) // click on box 1 for O
    await user.click(buttons[8]) // click on box 9 for X
    await user.click(buttons[6]) // click on box 7 for O
    await user.click(buttons[3]) // click on box 4 for X
    await user.click(buttons[5]) // click on box 6 for O
    await user.click(buttons[1]) // click on box 2 for X
    await user.click(buttons[7]) // click on box 8 for O
    await user.click(buttons[2]) // click on box 3 for X

    expect(await screen.findByText("Draw"));
  })

  it("should allow user to restart game", async () => {
    const user = userEvent.setup();
    let boxes = screen.getAllByRole("listitem");
    let buttons = boxes.map((elem) => elem.querySelector("button")! as HTMLButtonElement);

    await user.click(buttons[0]) // click on box 1 for X
    await user.click(buttons[1]) // click on box 2 for O
    await user.click(buttons[3]) // click on box 4 for X
    await user.click(buttons[2]) // click on box 3 for O
    await user.click(buttons[6]) // click on box 7 for X

    const restartBtn = await screen.findByText("Restart");
    expect(restartBtn);
    await user.click(restartBtn)

    boxes = screen.getAllByRole("listitem");
    boxes.forEach(box => expect(box.querySelector("button")));
    expect(await screen.findByTitle("currentPlayerX"))
  })

  afterEach(cleanup)
})