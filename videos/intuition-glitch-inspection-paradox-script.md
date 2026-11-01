# Why You Wait Longer Than You Think — The Inspection Paradox

## Model and scope

Illustrative repeating service: alternating 2-minute and 18-minute gaps. Passenger arrival is uniform in time and independent of the service. No boarding delay; next bus always boards. Ignore finite observation-window edges.

## Narration

The buses come every ten minutes, on average. So if you show up at a random time, how long should you wait?

Five minutes? That answer feels obvious. And it can be wrong.

If a bus arrives exactly every ten minutes, you are right.

Arrive just before a bus, and you barely wait. Arrive just after one, and you wait almost ten minutes.

For arrivals spread evenly across time, those waits average five minutes.

But now keep the same average and change the pattern.

One gap is two minutes. The next is eighteen. Then the pattern repeats.

Two plus eighteen, divided by two. The average gap is still ten minutes.

Here is the trap: you are not choosing a gap at random. You are choosing a moment in time.

An eighteen-minute gap gives you nine times as much time to land in it as a two-minute gap.

Imagine twenty people arriving, one per minute, halfway through each minute of this cycle.

Two land in the short gap. Eighteen land in the long one.

Half the gaps are long. But ninety percent of these passengers experience a long gap.

Inside the short gap, the average wait is one minute.

Inside the long gap, it is nine minutes.

Weight those waits by where people actually arrive: ten percent times one, plus ninety percent times nine.

The result is eight point two minutes. Not five. Same average bus gap. A very different average wait.

You can see why on this graph. Right after a bus leaves, your wait for the next one is at its highest.

As the next bus approaches, the remaining wait falls to zero.

A longer gap makes the triangle wider and taller. That adds much more waiting time.

This is the inspection paradox. When you inspect a process at a random time, longer intervals are more likely to be the ones you find.

It does not mean every bus is late. Our example is a simplified repeating pattern, with passengers arriving independently of the schedule.

If you time your arrival using a timetable or a live tracker, that is a different way of sampling.

The lesson is bigger than buses: before trusting an average, ask what is being averaged, and how your experience is selected.

The timetable counts gaps. Your day samples time.

## Shared outro

Smarter choices. A better future. Follow for more.

## Mathematical check

Mean gap: (2 + 18) / 2 = 10 minutes.

Uniform-time arrivals: P(short) = 2/20 = 0.1; P(long) = 18/20 = 0.9.

Mean residual wait: 0.1 × (2/2) + 0.9 × (18/2) = 8.2 minutes.

Equivalent area calculation: [(2²/2) + (18²/2)] / 20 = 8.2 minutes.

General stationary renewal formula, when applicable with finite second moment: E[W] = E[H²] / (2 E[H]). The exact repeating example here also follows directly by integrating over one cycle; it does not require independent successive gaps.

This is an illustrative model, not an empirical claim about any transit operator. Arrivals coordinated with a timetable/live tracker need a different sampling model.
