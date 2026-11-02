# Why Not Switch Forever? — The Two-Envelope Paradox

## Model

Two envelopes, one with twice as much money as the other, picked uniformly at random. First discuss a fixed $10/$20 pair. Then use an explicit finite prior: organizer chooses $10/$20 or $20/$40 with equal probability, and the participant picks either envelope with equal probability independently. No switching costs. All expected values finite.

## Narration

Two envelopes. One holds twice as much money as the other. You pick one. Should you switch?

Here is an argument that makes switching sound irresistible. Call the amount in your envelope A.

The other envelope could contain twice A, or half A. Give each possibility a fifty percent chance.

Then its expected value is half of twice A, plus half of half A. That is one point two five A.

A twenty-five percent bonus, just for switching? But now apply the same argument to the envelope you switched to.

It says switch back. Then switch again. You have created an endless money machine without changing either envelope.

Let us pin down the money. Suppose the envelopes contain ten dollars and twenty dollars.

If you picked ten, switching gains ten. If you picked twenty, switching loses ten.

With a random initial choice, those equally likely gains and losses cancel. Either envelope starts with an expected value of fifteen dollars.

Notice that A was ten in the first case, but twenty in the second. It was not one fixed number across both cases.

If you instead fix A to an amount you have actually seen, you must ask a different question: how likely are the two possibilities given that amount?

That depends on how the money was put into the envelopes. Two possible amounts do not automatically mean equal probabilities.

For a concrete example, suppose the organizer chooses one of two pairs with equal probability: ten and twenty dollars, or twenty and forty.

You pick an envelope at random, open it, and find twenty dollars.

Here, the other amount really is equally likely to be ten or forty. Switching has an expected payout of twenty-five dollars.

So the original calculation can be right for a particular amount, under a particular model.

But what if you open your envelope and find forty dollars? In this same model, the other envelope must contain twenty.

Eighty dollars is not possible. The fifty-fifty assumption has vanished, and switching would lose money.

Before opening, either randomly selected envelope has the same expected value: twenty-two dollars and fifty cents.

After opening, the amount you see can give you useful information. That does not make every possible switch an improvement.

The glitch was not in multiplication. It was in treating an unknown amount and a fixed observed amount as if they came with the same probabilities.

Before trusting an expected value, ask: what is random, what is fixed, and what information am I using?

## Shared outro

Smarter choices. A better future. Follow for more.

## Exact checks and scope

Fixed pair $10/$20, random choice: E[A]=E[B]=$15; switching gain is +$10 or −$10 equally often. A differs across the two cases.

Finite prior: organizer chooses $10/$20 or $20/$40 with probability 1/2 each, then participant picks either envelope uniformly and independently. The four (chosen, other) outcomes are (10,20), (20,10), (20,40), (40,20), each with probability 1/4. Both unconditional expectations are $22.50.

Conditioning on observing $20 leaves two equally likely rows: other=$10 or $40, so E[B|A=20]=$25. Conditioning on $40 leaves only other=$20; probability of $80 is zero. Conditioning on $10 gives other=$20 with probability 1. Thus the 50/50 weights can be valid for one observed amount and invalid for another.

The argument separates an unobserved random amount from conditioning on an observed fixed amount. Unknown initial contents do not justify a universal 50/50 posterior at every amount. A generation model is needed. All models used here have finite expectations, avoiding additional infinite-expectation subtleties. The example does not claim switching is always wrong; opening can provide useful information.
