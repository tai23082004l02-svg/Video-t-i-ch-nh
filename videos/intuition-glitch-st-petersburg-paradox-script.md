# An Infinite Average. A Finite Wallet. — The St. Petersburg Paradox

## Model

Independent fair coin tosses until the first head. If the first head is on toss n, gross payout is 2^n US dollars. Ideal model has no payout limit and a solvent payer; entry fee is paid once. A separate capped-payout variant pays min(2^n, 1024) dollars.

## Narration

How much would you pay to play a game with an infinite expected payout? Ten dollars? A hundred? Your life savings?

Before you answer, let me show you the game. The rules fit on a single coin.

We flip a fair coin until the first heads. Each toss is independent.

Heads on the first toss pays two dollars. Tails, then heads, pays four.

Two tails, then heads, pays eight. Every extra tails doubles the prize.

The entry fee is separate. This is the prize you receive before subtracting what you paid to play.

Now match each prize with its probability. Two dollars has a one-in-two chance.

Four dollars has a one-in-four chance. Eight dollars has a one-in-eight chance.

Multiply each prize by its probability. Each possible stopping point contributes exactly one dollar to the expected payout.

One dollar, plus one dollar, plus one dollar. With no limit on the number of tosses, the sum never stops growing.

The expected payout is infinite. This is the Saint Petersburg paradox.

But infinite expectation does not mean an infinite prize. The game ends with a finite payout with probability one.

Half the time, you get just two dollars. Three quarters of the time, you get four dollars or less.

And seven out of eight times, the prize is eight dollars or less.

So what is pulling the average upward? Extremely rare prizes that are even more enormous.

A first heads on toss twenty pays over a million dollars. Its probability is about one in a million.

That outcome still adds exactly one dollar to the expected payout, just like the first toss.

Your hesitation is not a failure of arithmetic. You have a finite wallet, and you only get to play once.

Losing money you need can matter far more than the same number of dollars added to an already huge fortune.

Expected utility models that difference. It values outcomes through your wealth and preferences, rather than dollars alone.

And a real organizer cannot promise unlimited money. Put a ceiling on the payout, and you have changed the game.

For example, cap every prize at one thousand twenty-four dollars. Now the expected payout is just eleven dollars, before the entry fee.

That ceiling removes the endless chain of larger and larger prizes that made the original expectation infinite.

There is no single ticket price everyone must accept. A mathematical expectation and a personal decision answer different questions.

The average can be infinite. Your wallet, and your willingness to risk it, are not.

## Shared outro

Smarter choices. A better future. Follow for more.

## Mathematical checks and scope

For the first head on toss n, P(N=n)=2^(-n), and gross payout X=2^n. Every term in E[X] is 1 dollar, so the nonnegative series diverges. This is not a promise of an infinite individual prize: P(N>n)=2^(-n) tends to zero.

P(X≤2)=1/2, P(X≤4)=3/4, P(X≤8)=7/8. Toss 20 pays $1,048,576 with probability 1/1,048,576.

Capped variant: Xc=min(2^N,1024). First heads on tosses 1–9 contribute $9 in total. First head on toss 10 or later has probability 1/512 and pays $1,024, contributing $2. Thus E[Xc]=$11 before the fee. Equivalent: ten one-dollar terms plus the capped tail probability 1/1024 times $1,024.

The ideal game assumes independent fair tosses, unlimited prizes and a payer able to pay every possible prize. Entry fee is separate. Expected utility depends on wealth and preferences; the concave curve shown is illustrative, not a universal preference or a claimed complete resolution for every utility function. No unique price is prescribed to all viewers. A real payout cap changes the original mathematical model.
