# sol

A command-line, keyboard-centric solitaire game written in TypeScript.

```
  f1 f2 f3 f4
  __ __ __ __

  [##] {__}

  t1  t2  t3  t4  t5  t6  t7
  8♦  ##  ##  ##  ##  ##  ##
      A♥  ##  ##  ##  ##  ##
          K♦  ##  ##  ##  ##
              8♣  ##  ##  ##
                  2♦  ##  ##
                      K♥  ##
                          3♣
```

Foundation rows are labeled `f1`, `f2`, `f3`, `f4`.

Tableau columns are labeled `t1`, `t2`, ..., `t7`.

`[##]` indicates the stock, which can be drawn from.

`{__}` indicates the waste, which is the last drawn card from the stock. Empty
at the start of the game.

### Controls

Press `Ctrl+C` to exit. Press `Escape` to clear the command buffer.

Moving cards implements the following syntax:

`[counter][from][to]`

Where:

- `counter` is the number of cards to move (default is 1)
- `from` is the source row (tableau, foundation, waste)
- `to` is the destination row (tableau, foundation)

`from` and `to` can be:

- `t1`, `t2`, ..., `t7` for tableau columns 1 to 7
- `f1`, `f2`, ..., `f4` for moving `from` foundation
- `f` for foundation (only for moving `to` a suitable foundation)
- `w` for waste (only for moving `from` waste)

#### Examples

`1t1t2` -- move 1 card from tableau 1 to tableau 2

`t1t2` -- the same as above (the counter is optional and always defaults to 1)

`3t1t2` -- move 3 cards from tableau 1 to tableau 2

`t5f` -- move 1 card from tableau 5 to a suitable foundation

`f1t2` -- move 1 card from foundation 1 to tableau 2

#### Drawing cards from the stock

Drawing cards is continuous. When there are no more cards in the stock, the next
drawing move will trigger stock restart.

`1d` -- draw 1 card from stock to waste

`d` -- the same as above (the counter is optional)

`3d` -- draw 3 cards from stock to waste

#### Moving cards from the waste

`wt1` -- move 1 card from waste to tableau 1

#### Moving cards to a foundation

Moving to foundation is handled automatically, meaning any suitable or free
foundation slot will be occupied by the card you are moving.

`t5f` -- move 1 card from tableau 5 to a suitable or free foundation

`wf` -- move 1 card from the waste to a suitable or free foundation

#### Colon commands

`:q` -- quit the game

`:u` -- undo the last move

### Notes

- The initial game state is generated randomly, so the game is different every
  time you start it.
- Win is registered when all tableau cards are flipped.

### Dev. Notes

- The game is implemented in TypeScript and uses Deno for execution.
- To run the game, use `deno run main.ts`

### Other

- The game is a work in progress, and some features may not be fully
  implemented.
- The initial code was an 8-hour exercise.

### TODO

- [ ] Implement a proper game state saving and loading mechanism.
- [ ] Add redo functionality.
- [ ] Add restart functionality.
- [ ] Add "start new game" functionality.
- [ ] Add more tests for edge cases.
