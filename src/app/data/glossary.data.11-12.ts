import { GlossaryTerm } from '../models/glossary';

export const GLOSSARY_TERMS_11_12: GlossaryTerm[] = [
  {
    id: 'actively-absorbing',
    term: 'Actively Absorbing',
    definition:
      'Moving toward incoming contact only to protect yourself, not to hit back. This is a defensive reaction, not an attack or a counter-block.',
    relatedTerms: ['counter-block', 'forceful-contact'],
  },
  {
    id: 'ahead',
    term: 'Ahead',
    definition:
      'A Skater, line, or the Pack is "ahead" of another if it is closer in the counterclockwise direction (the direction skaters travel) around the track.',
    relatedTerms: ['behind'],
  },
  {
    id: 'alternate',
    term: 'Alternate',
    definition:
      'A person chosen by the Captain to help speak for the team, identified by a visible "A" on their uniform or body. The Alternate can be a teammate, coach, or manager. A team may only have one Alternate at a time, and the Captain can change who it is by telling the Head Referee.',
    relatedTerms: ['captain'],
  },
  {
    id: 'apex-jump',
    term: 'Apex Jump',
    definition:
      'Jumping over the inside track boundary at a curve to take a shorter path around the track. The Skater must land back In Bounds for the jump to be legal.',
    relatedTerms: ['in-bounds'],
  },
  {
    id: 'assist',
    term: 'Assist',
    definition:
      'Physically helping a teammate during play, such as giving them a push or a whip to help them gain speed or position.',
    relatedTerms: ['engaging', 'initiator'],
    ruleReferences: ['2.4'],
  },
  {
    id: 'behind',
    term: 'Behind',
    definition:
      'A Skater, line, or the Pack is "behind" another if it is closer in the clockwise direction (opposite to the direction of travel) around the track.',
    relatedTerms: ['ahead'],
  },
  {
    id: 'blocker',
    term: 'Blocker',
    definition:
      'A Skater who is part of the Pack. Each team can have up to four Blockers on the track per Jam, and one of those Blockers may be the Pivot.',
    relatedTerms: ['pack', 'pivot', 'jammer', 'role'],
    ruleReferences: ['2.2'],
  },
  {
    id: 'blocking-zones',
    term: 'Blocking Zones',
    definition:
      'The parts of a Skater\'s body that are allowed to be used to make contact with an opponent when performing a block.',
    relatedTerms: ['target-zones', 'forceful-contact'],
  },
  {
    id: 'captain',
    term: 'Captain',
    definition:
      'The Skater who speaks on the team\'s behalf, identified by a visible "C" on their body or clothing. If the Captain has not been chosen or has left the game, the team can pick a new one at any time by telling the Head Referee. A team must designate a Captain when one is needed, such as when a penalty needs to be assessed to a Captain.',
    relatedTerms: ['alternate'],
  },
  {
    id: 'ceding',
    term: 'Ceding',
    definition:
      'Giving back a position that was gained illegally. If a Skater enters the track from Out of Bounds and gains a position they shouldn\'t have, they can avoid a penalty by immediately going fully Out of Bounds before re-entering the track. Just straddling the boundary line is not enough to count as Ceding.',
    relatedTerms: ['out-of-bounds', 'out-of-bounds-fully', 'straddling'],
  },
  {
    id: 'counter-block',
    term: 'Counter-Block',
    definition:
      'Pushing back against an opponent who is blocking you, in order to resist their block. Counter-blocking follows the same rules as regular blocking. If you keep pushing after countering the initial block, that counts as a separate block and is judged on its own.',
    relatedTerms: ['actively-absorbing', 'initiator'],
  },
  {
    id: 'designated-chaperone',
    term: 'Designated Chaperone',
    definition:
      'An adult chosen to represent a team during the game. They are designated at the pre-game meeting and carry out duties described in the JRDA Sanctioning Policy.',
  },
  {
    id: 'down',
    term: 'Down',
    definition:
      'A Skater is Down when any part of their body or equipment, other than their skates, is touching the floor. Touching the floor with just one hand does not count as being Down. Once a Skater is Down, they stay Down until they are standing, stepping, or skating again.',
    relatedTerms: ['upright', 'standing', 'falling-small'],
  },
  {
    id: 'engagement-zone',
    term: 'Engagement Zone',
    definition:
      'The area around the Pack where Blockers are In Play and may legally block and be blocked. It extends 20 feet (6.10 m) behind the rearmost Pack Skater to 20 feet (6.10 m) in front of the foremost Pack Skater, between the inside and outside track boundaries.',
    relatedTerms: ['in-play', 'pack', 'pack-skater'],
  },
  {
    id: 'engaging',
    term: 'Engaging',
    definition:
      'Any interaction with another Skater on the track during a Jam, including both blocks and assists.',
    relatedTerms: ['assist', 'blocking-zones'],
    ruleReferences: ['2.4'],
  },
  {
    id: 'established-position',
    term: 'Established Position',
    definition:
      'The place on the track where a Skater currently is and has secured. This includes whether they are Upright, In Bounds, Down, Out of Bounds, In Play, or Out of Play.',
    relatedTerms: ['in-bounds', 'down', 'out-of-bounds', 'in-play', 'out-of-play'],
  },
  {
    id: 'exiting-the-track',
    term: 'Exiting the Track',
    definition:
      'Leaving the track to the outside in order to report to the Penalty Box to serve a penalty.',
  },
  {
    id: 'expulsion',
    term: 'Expulsion',
    definition:
      'When the Head Referee removes a Skater or Team Staff from the rest of the game for a serious illegal action, such as physical violence or any action that creates an extraordinary physical threat to others.',
    relatedTerms: ['fouling-out', 'head-referee'],
  },
  {
    id: 'falling-small',
    term: 'Falling Small',
    definition:
      'Falling with arms and legs controlled and tucked close to the body, rather than spread out or flailing. Falling small helps protect both you and the Skaters around you.',
    relatedTerms: ['down'],
  },
  {
    id: 'forceful-contact',
    term: 'Forceful Contact',
    definition:
      'A hard, sudden hit or strike, or any contact with enough strength and energy to potentially harm the other Skater or significantly change their position, balance, speed, or direction — whether or not it actually does.',
    relatedTerms: ['blocking-zones', 'target-zones'],
  },
  {
    id: 'fouling-out',
    term: 'Fouling Out',
    definition:
      'When a Skater is removed from the rest of the game by an Official for receiving seven penalties during that game.',
    relatedTerms: ['penalty', 'expulsion'],
  },
  {
    id: 'governing-body',
    term: 'Governing Body',
    definition:
      'The organisation responsible for sanctioning the game. In an unsanctioned game, this is the organisation responsible for setting the terms of the game, such as a tournament, league, or other group serving in that role.',
  },
  {
    id: 'grasping',
    term: 'Grasping',
    definition:
      'Actively gripping something, such as a teammate\'s uniform, helmet cover, or holding hands. The grasping Skater\'s arm from the hand up to (but not including) the shoulder is considered part of the grasp. The teammate is not part of the grasp unless they are also independently grasping.',
    relatedTerms: ['linking'],
  },
  {
    id: 'head-referee',
    term: 'Head Referee',
    definition:
      'The Referee designated as the ultimate authority of the game. The Head Referee has the final say on all decisions.',
    relatedTerms: ['expulsion'],
  },
  {
    id: 'hips',
    term: 'Hips',
    definition:
      'The widest part of the body between the waist and the thighs. The centre point of this area is what determines whether a Skater has passed another, regardless of which direction the Skater is facing.',
    relatedTerms: ['pass', 'skating-direction-of-travel'],
  },
  {
    id: 'illegal-procedure',
    term: 'Illegal Procedure',
    definition:
      'Any technical (non-contact) rule violation, such as lining up incorrectly or not following proper procedures.',
    relatedTerms: ['penalty'],
  },
  {
    id: 'immediately',
    term: 'Immediately',
    definition:
      'At the first safe and legal opportunity to complete the action.',
  },
  {
    id: 'impeding',
    term: 'Impeding',
    definition:
      'Actions that restrict an opponent\'s speed or change the direction they are travelling, in any direction on the track.',
    relatedTerms: ['positional-blocking'],
  },
  {
    id: 'impenetrable',
    term: 'Impenetrable',
    definition:
      'A wall of Skaters is impenetrable when an opponent would need to physically break bones or joints to pass through it. For example, two teammates skating with their arms around each other\'s backs create an impenetrable wall between them — an opponent cannot pass without breaking one of those arms.',
    relatedTerms: ['linking', 'grasping'],
  },
  {
    id: 'in-bounds',
    term: 'In Bounds',
    definition:
      'A Skater is In Bounds when the only parts of their body touching the floor are on or between the track boundary lines. Touching the floor outside the boundary with just one hand or arm still counts as In Bounds.',
    relatedTerms: ['out-of-bounds', 'straddling'],
  },
  {
    id: 'in-play',
    term: 'In Play',
    definition:
      'A Blocker is In Play when they are In Bounds, Upright, and within the Engagement Zone. Jammers who are In Bounds and Upright are always considered In Play.',
    relatedTerms: ['in-bounds', 'upright', 'engagement-zone', 'out-of-play'],
  },
  {
    id: 'in-position',
    term: 'In Position',
    definition:
      'A Skater is In Position when they are on the track, In Bounds, and in the correct starting area for their role when the Jam-Starting Whistle blows.',
    relatedTerms: ['in-bounds', 'role', 'jam'],
  },
  {
    id: 'in-queue',
    term: 'In Queue',
    definition:
      'Skating on the track while waiting to serve a penalty. This usually happens when the Penalty Box is full, or when the Skater is the only Blocker on the track for their team.',
    relatedTerms: ['penalty'],
  },
  {
    id: 'initiator',
    term: 'Initiator',
    definition:
      'The Skater responsible for causing contact to happen, whether it is a block on an opponent or an assist on a teammate. A Skater can also initiate by taking a whip off a teammate or counter-blocking in response to a block. The initiator is always responsible for making sure the contact is legal. If the counter-blocking Skater keeps engaging after the initial counter-block, that is treated as a new action with separate responsibility.',
    relatedTerms: ['assist', 'counter-block'],
  },
  {
    id: 'insubordination',
    term: 'Insubordination',
    definition:
      'Deliberately or carelessly refusing to follow an Official\'s instructions, or behaving improperly by intentionally disregarding the rules.',
  },
  {
    id: 'jam',
    term: 'Jam',
    definition:
      'The basic unit of play in roller derby. Each Jam can last up to two minutes.',
    relatedTerms: ['lineup-time'],
  },
  {
    id: 'jammer',
    term: 'Jammer',
    definition:
      'The point scorer for a team. The Jammer wears a helmet cover with two stars on it.',
    relatedTerms: ['blocker', 'pivot', 'role', 'the-star', 'lead-jammer'],
    ruleReferences: ['2.2'],
  },
  {
    id: 'lap-lapping',
    term: 'Lap / Lapping',
    definition:
      'A Skater has lapped an opponent when they pass that opponent twice in a row without the opponent passing them in between. If a Jammer passes an opponent for the second time but the pass was not "earned," they have still lapped the opponent and can re-pass them to score the missed point.',
    relatedTerms: ['pass', 're-pass'],
  },
  {
    id: 'lead-jammer',
    term: 'Lead Jammer',
    definition:
      'The first Jammer to establish a superior position to the foremost in-play Blocker, having already earned a pass on all Blockers except those ahead of the Engagement Zone. The Lead Jammer has the power to call off the Jam early.',
    relatedTerms: ['jammer', 'engagement-zone', 'pass'],
  },
  {
    id: 'linking',
    term: 'Linking',
    definition:
      'Hooking arms with a teammate by bending at the elbow. Both Skaters\' arms, up to but not including the shoulder, are considered part of the link.',
    relatedTerms: ['grasping', 'impenetrable'],
  },
  {
    id: 'lineup-time',
    term: 'Lineup Time',
    definition:
      'The time between Jams while the period clock keeps running. It lasts a maximum of 30 seconds, or until a timeout is called, whichever comes first. There can only be one Lineup Time between two Jams, and it cannot be restarted after a timeout.',
    relatedTerms: ['jam'],
  },
  {
    id: 'no-impact',
    term: 'No Impact',
    definition:
      'A rule violation that has limited impact on safety or gameplay — not serious enough to deserve a penalty.',
    relatedTerms: ['penalty'],
  },
  {
    id: 'no-pack',
    term: 'No Pack',
    definition:
      'When there is no single group of Blockers from both teams skating within 10 feet (3.05 m) of each other, or when two or more equally sized groups are too far apart from each other.',
    relatedTerms: ['pack'],
  },
  {
    id: 'not-on-the-track-point',
    term: 'Not-On-the-Track (NOTT) Point',
    definition:
      'A point awarded for each opponent who is not on the track (such as Skaters in the Penalty Box). The Jammer earns these points as soon as they earn a pass on any opposing Blocker during a trip through the Pack.',
    relatedTerms: ['trip-through-the-pack', 'pass', 'jammer'],
  },
  {
    id: 'out-of-bounds',
    term: 'Out of Bounds',
    definition:
      'A Skater is Out of Bounds when any part of their body or equipment touches the floor beyond the track boundary. However, touching outside with just one hand or arm does not make a Skater Out of Bounds.',
    relatedTerms: ['in-bounds', 'straddling', 'ceding', 'out-of-bounds-fully'],
  },
  {
    id: 'out-of-bounds-fully',
    term: 'Out of Bounds (Fully)',
    definition:
      'A Skater is fully Out of Bounds when they are Out of Bounds and no part of their body or equipment is touching the floor on or between the track boundary lines at all.',
    relatedTerms: ['out-of-bounds', 'in-bounds', 'straddling'],
  },
  {
    id: 'out-of-play',
    term: 'Out of Play',
    definition:
      'A Blocker who is In Bounds but positioned outside of the Engagement Zone. If no Pack is defined, all Blockers are Out of Play. A Jammer who is Out of Bounds is also considered Out of Play.',
    relatedTerms: ['in-play', 'engagement-zone', 'no-pack'],
  },
  {
    id: 'pack',
    term: 'Pack',
    definition:
      'The largest group of in-bounds Blockers from both teams skating or standing close together, within 10 feet (3.05 m) of each other. Jammers are not part of the Pack.',
    relatedTerms: ['blocker', 'no-pack', 'pack-skater', 'engagement-zone'],
  },
  {
    id: 'pack-skater',
    term: 'Pack Skater',
    definition: 'Any Blocker who is part of a legally defined Pack.',
    relatedTerms: ['pack', 'blocker'],
  },
  {
    id: 'pass',
    term: 'Pass',
    definition:
      'When a Skater moves their hips past an opponent\'s hips on the track. Jammers earn passes to score points (see Section 2.5).',
    relatedTerms: ['hips', 'lap-lapping', 're-pass', 'not-on-the-track-point'],
    ruleReferences: ['2.5'],
  },
  {
    id: 'passing-the-star',
    term: 'Passing the Star',
    definition:
      'When the Jammer hands their star helmet cover to the Pivot. This transfers Jammer status to the Pivot, making them the new Jammer for the rest of that Jam.',
    relatedTerms: ['the-star', 'jammer', 'pivot'],
  },
  {
    id: 'penalty',
    term: 'Penalty',
    definition:
      'A punishment for violating the rules. The Skater must leave the track and serve time in the Penalty Box.',
    relatedTerms: ['no-impact', 'fouling-out', 'expulsion'],
  },
  {
    id: 'pivot',
    term: 'Pivot',
    definition:
      'A Blocker with additional abilities, who wears a helmet cover with a stripe. The Pivot can become the Jammer if the Jammer passes the star to them (see Section 2.2.3).',
    relatedTerms: ['blocker', 'the-stripe', 'passing-the-star', 'role'],
    ruleReferences: ['2.2.3'],
  },
  {
    id: 'points-awarded-in-error',
    term: 'Points Awarded in Error',
    definition:
      'Points added to a team\'s score by mistake, when the Jammer did not legally earn them. This can happen due to an Official\'s error or a technology malfunction.',
    relatedTerms: ['points-denied-in-error'],
  },
  {
    id: 'points-denied-in-error',
    term: 'Points Denied in Error',
    definition:
      'Points that a Jammer did legally earn but were not added to the official score, due to a delay, an Official\'s error, or a technology malfunction.',
    relatedTerms: ['points-awarded-in-error'],
  },
  {
    id: 'positional-blocking',
    term: 'Positional Blocking',
    definition:
      'Blocking without making contact — positioning yourself in an opponent\'s path to impede their movement on the track. Positional blocking does not have to be intentional.',
    relatedTerms: ['impeding'],
  },
  {
    id: 'protective-gear',
    term: 'Protective Gear',
    definition:
      'Safety equipment that Skaters must wear: a helmet, mouthguard, wrist guards, elbow pads, and knee pads, as long as the gear provides additional protection and the Skater is physically able to wear it. Skaters will not be penalised if a piece of equipment does not provide them with extra protection.',
  },
  {
    id: 're-pass',
    term: 'Re-Pass',
    definition:
      'Passing an opponent who has already been passed during the current lap. This is most relevant when a Jammer ends up ahead of an opponent without earning the pass. The Jammer can re-pass that opponent — earning their second pass — to score the missed point.',
    relatedTerms: ['pass', 'lap-lapping'],
  },
  {
    id: 'relative-position',
    term: 'Relative Position',
    definition:
      'A Skater\'s location on the track compared to other Skaters, measured in the counterclockwise direction. Position is "gained" by moving ahead of others and "lost" by being knocked Down, going Out of Bounds, or falling Out of Play.',
    relatedTerms: ['in-bounds', 'upright', 'yielding'],
  },
  {
    id: 'role',
    term: 'Role',
    definition:
      'Each Skater has one of three roles: Jammer, Pivot, or Blocker. The Jammer role can be transferred to the Pivot once per Jam through a Star Pass. The Pivot role cannot be transferred during a Jam.',
    relatedTerms: ['jammer', 'pivot', 'blocker', 'passing-the-star'],
  },
  {
    id: 'roster',
    term: 'Roster',
    definition:
      'The list of all Skaters on a team, along with their identifying numbers, who are eligible to play in the game.',
  },
  {
    id: 'sitting',
    term: 'Sitting',
    definition:
      'A Skater whose buttocks are fully in contact with the seat of a chair or bench.',
    relatedTerms: ['standing', 'down'],
  },
  {
    id: 'skating-direction-of-travel',
    term: 'Skating - Direction of Travel',
    definition:
      'The direction a Skater is moving (counterclockwise, sideways, or clockwise), measured by watching the skates relative to a line perpendicular to the inside track boundary. If the skates are moving in opposite directions, direction of travel is determined by the hips.',
    relatedTerms: ['hips'],
  },
  {
    id: 'standing',
    term: 'Standing',
    definition:
      'A Skater who is holding their body weight on their skates, so they are clearly not Down and obviously not Sitting.',
    relatedTerms: ['down', 'sitting', 'upright'],
  },
  {
    id: 'stopped',
    term: 'Stopped',
    definition: 'A Skater who is not making any directional movement with their skates.',
  },
  {
    id: 'straddling',
    term: 'Straddling',
    definition:
      'When a Skater is touching the floor both on or between the track boundary lines and beyond the track boundary at the same time. Touching outside with just one hand or arm does not count as straddling. Straddling Skaters are considered Out of Bounds, except where the rules say otherwise.',
    relatedTerms: ['in-bounds', 'out-of-bounds'],
  },
  {
    id: 'substitution',
    term: 'Substitution',
    definition: 'Replacing a Skater on the track or in the Penalty Box with a teammate.',
  },
  {
    id: 'target-zones',
    term: 'Target Zones',
    definition:
      'The areas of an opponent\'s body that a Skater is allowed to make contact with when performing a block.',
    relatedTerms: ['blocking-zones', 'forceful-contact'],
  },
  {
    id: 'the-star',
    term: 'The Star',
    definition:
      'The Jammer\'s helmet cover, which has two stars on it, one on each side.',
    relatedTerms: ['jammer', 'passing-the-star', 'the-stripe'],
  },
  {
    id: 'the-stripe',
    term: 'The Stripe',
    definition:
      'The Pivot\'s helmet cover, which has one long stripe running down the middle.',
    relatedTerms: ['pivot', 'the-star'],
  },
  {
    id: 'trip-through-the-pack',
    term: 'Trip Through the Pack',
    definition:
      'Each time the Jammer skates through the Pack. Every trip is a chance to score points on opponents (see Section 3).',
    relatedTerms: ['jammer', 'pack', 'not-on-the-track-point'],
    ruleReferences: ['3'],
  },
  {
    id: 'upright',
    term: 'Upright',
    definition: 'Any Skater who is not considered Down.',
    relatedTerms: ['down', 'standing', 'in-play'],
  },
  {
    id: 'warning',
    term: 'Warning',
    definition:
      'A formal verbal notice from an Official that play is currently or about to be improper, giving the Skater a chance to correct the issue before receiving a penalty.',
  },
  {
    id: 'yielding',
    term: 'Yielding',
    definition:
      'When a Skater is required to yield, they must give nearby Skaters a fair chance to move into a superior position. As long as the Skater allows a reasonable amount of time for this, they have yielded — even if no one took the opportunity.',
    relatedTerms: ['relative-position'],
  },
];
