# 🃏 The Daily Nuts

**A daily poker puzzle. One gauntlet of boards, the same for everyone on Earth. Can you find the nuts?**

**Play it: [daily-nuts.vercel.app](https://daily-nuts.vercel.app)**

---

## The game

Every day at local midnight, three new five-card community boards appear — identical for every player in the world. On each board, somewhere in the remaining 47 cards, live the **two hole cards that make the strongest possible hand**. Poker players call that hand *the nuts*. You have **three attempts per board** to find it.

- **The gauntlet escalates:** ♠ Gentle → ♠♠ Tricky → ♠♠♠ Devilish.
- **Board one carries your streak.** Crack it and the streak lives; the other two boards are for the clean sweep.
- **Every miss teaches.** Wrong guesses get a reading lesson, not just a red X — first a nudge about the board's texture, then the target hand's category. Losses reveal *the read you missed*.
- **Any tie wins.** If your two cards make a hand equal in strength to the nuts, it counts — all sixteen Ace-Ten combos win on a broadway board.
- **The clock only times bragging rights.** It counts up, and pauses whenever you're reading results.
- Share your result as a Wordle-style emoji grid: 🟩 found the nuts · 🟨 right kind of hand · 🟥 a bigger hand was possible.

There's also an unlimited **practice table** that never touches your streak, a hand-ranking ladder for newcomers, and Wordle-style stats (streak, best, sweeps, attempt distribution).

## How it works

The entire game is **one self-contained HTML file**. No framework, no build step, no backend, no database, no cron jobs.

- **Deterministic daily boards** — the local date string is hashed (xmur3) into a seeded PRNG (mulberry32). Same date → same shuffle → same boards for everyone, with no API call.
- **Client-side solver** — for each board, the engine tests all C(47,2) = 1,081 possible hole-card pairs with a best-five-of-seven evaluator (~23,000 hand evaluations, done in milliseconds) to find the nuts and every holding that ties it.
- **Difficulty curation** — candidate boards are deterministically rerolled until they pass the rules: the board must never *be* the nuts itself, the nuts must be a straight or better, and the board must match its round's difficulty class. Difficulty is judged by deceptiveness — paired boards (quads) are gentle; three-suited boards (nut flush) are tricky; gapped straights and straight-flushes-hiding-behind-a-flush are devilish.
- **State** lives in `localStorage` (streaks, guesses, active play time), hardened against corruption and private-browsing modes. A tab left open past midnight reloads itself into the new gauntlet.

## Run it locally

```
open index.html
```

That's it. Any browser, no server needed.

## Deploy

Hosted on [Vercel](https://vercel.com) as a static file:

```
npx vercel deploy --prod --yes
```

## Roadmap

- [ ] Small-screen polish for the final summary
- [ ] "Second nuts" bonus round for regulars
- [ ] Real leaderboard (needs a small backend — today the group chat *is* the leaderboard)

---

*Not real-money poker — just the read.*
