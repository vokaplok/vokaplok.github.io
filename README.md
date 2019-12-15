
Description:
1.Field values:
1.1.  Banana => BAN (2pts)
1.2.  Bell => BELL (2pts)
1.3.  Cherries => CHER (3pts)
1.4.  Joker => JOK (3pts)
1.5.  Money Bag => BAG (4pts)
1.6.  Orange => ORG (4pts)
1.7.  Cards => CRD (5pts)
1.8.  Rocket => RCT (6pts)
1.9.  Any of values => ANY


User presses “Add 100 pts” button => the balance should be increased +100 pts
User presses “Start” button => the balance should be decreased -20 pts, and the round starts (each column rotates random amount of times) (implement animation)

Combinations: (For instance: 2BAG(s) means that you win 2 * 4 = 8 pts)
a.	2ANY => 2 * ANY
b.	2ANY1 + 2ANY2 => 2*ANY1 + 2*ANY2
c.	3ANY1 + 2ANY2 => 3*(ANY1 + 1) + 2*ANY2
d.	4ANY => 4*(ANY * ANY)
e.	5BAN => 50pts
f.	5BELL => 70pts
g.	5CHER => 90pts
h.	5JOK => 110pts
i.	5BAG => 130pts
j.	5ORG => 150pts
k.	5CRD => 170pts
l.	5RCT => 250pts

The score should be updated after each round dependently on combination value
