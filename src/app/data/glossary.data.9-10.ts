import { GlossaryTerm } from '../models/glossary';

export const GLOSSARY_TERMS_9_10: GlossaryTerm[] = [
  {
    id: 'actively-absorbing',
    term: 'Actively Absorbing',
    definition:
      'Moving toward incoming contact only to protect yourself, not to hit back. It is a defensive move, not an attack.',
    relatedTerms: ['counter-block', 'forceful-contact'],
  },
  {
    id: 'ahead',
    term: 'Ahead',
    definition:
      'Closer in the counterclockwise direction around the track. A skater, line, or the Pack is "ahead" of something else if it is nearer going counterclockwise.',
    relatedTerms: ['behind'],
  },
  {
    id: 'alternate',
    term: 'Alternate',
    definition:
      'A person the Captain chooses to help speak for the team. They wear a visible "A" on their uniform or body. The Alternate can be a teammate, coach, or manager. A team can only have one Alternate at a time, and the Captain can change who it is by telling the Head Referee.',
    relatedTerms: ['captain'],
  },
  {
    id: 'apex-jump',
    term: 'Apex Jump',
    definition:
      'Jumping over the inside track boundary at a curve to take a shorter path. The skater must land back In Bounds for it to be legal.',
    relatedTerms: ['in-bounds'],
  },
  {
    id: 'assist',
    term: 'Assist',
    definition:
      'Physically helping a teammate, such as giving them a push or a whip to help them move faster.',
    relatedTerms: ['engaging', 'initiator'],
    ruleReferences: ['2.4'],
  },
  {
    id: 'behind',
    term: 'Behind',
    definition:
      'Closer in the clockwise direction around the track. A skater, line, or the Pack is "behind" something else if it is nearer going clockwise.',
    relatedTerms: ['ahead'],
  },
  {
    id: 'blocker',
    term: 'Blocker',
    definition:
      'A skater who is part of the Pack. Each team can have up to four Blockers on the track per Jam. One of those Blockers may be the Pivot.',
    relatedTerms: ['pack', 'pivot', 'jammer', 'role'],
    ruleReferences: ['2.2'],
  },
  {
    id: 'blocking-zones',
    term: 'Blocking Zones',
    definition:
      'The parts of a skater\'s body that are allowed to be used to hit an opponent during a block.',
    relatedTerms: ['target-zones', 'forceful-contact'],
  },
  {
    id: 'captain',
    term: 'Captain',
    definition:
      'The skater who speaks on the team\'s behalf, identified by a visible "C" on their body or clothing. If the Captain has not been chosen or has left the game, the team can pick one at any time by telling the Head Referee.',
    relatedTerms: ['alternate'],
  },
  {
    id: 'ceding',
    term: 'Ceding',
    definition:
      'Giving back a position that was gained illegally. If a skater enters the track from Out of Bounds and gains position they should not have, they can avoid a penalty by going fully Out of Bounds right away before re-entering the track. Just straddling the line is not enough.',
    relatedTerms: ['out-of-bounds', 'out-of-bounds-fully', 'straddling'],
  },
  {
    id: 'counter-block',
    term: 'Counter-Block',
    definition:
      'Pushing back against an opponent who is blocking you, to resist their block. Counter-blocking follows the same rules as blocking. If a skater keeps pushing after countering the first block, that counts as a new, separate block.',
    relatedTerms: ['actively-absorbing', 'initiator'],
  },
  {
    id: 'designated-chaperone',
    term: 'Designated Chaperone',
    definition:
      'An adult chosen to represent a team during the game. They are picked at the pre-game meeting and follow the duties set out in the JRDA Sanctioning Policy.',
  },
  {
    id: 'down',
    term: 'Down',
    definition:
      'A skater is Down when any part of their body or equipment, other than their skates, is touching the floor. Touching with just one hand does not count as Down. Once a skater is Down, they stay Down until they are standing, stepping, or skating again.',
    relatedTerms: ['upright', 'standing', 'falling-small'],
  },
  {
    id: 'engagement-zone',
    term: 'Engagement Zone',
    definition:
      'The area around the Pack where Blockers can legally block and be blocked. It stretches 20 feet (6.10 m) behind the rearmost Pack Skater to 20 feet (6.10 m) in front of the foremost Pack Skater, between the track boundaries.',
    relatedTerms: ['in-play', 'pack', 'pack-skater'],
  },
  {
    id: 'engaging',
    term: 'Engaging',
    definition:
      'Any interaction with another skater on the track during a Jam, including blocks and assists.',
    relatedTerms: ['assist', 'blocking-zones'],
    ruleReferences: ['2.4'],
  },
  {
    id: 'established-position',
    term: 'Established Position',
    definition:
      'The place on the track where a skater currently is. This includes whether they are upright, In Bounds, Down, Out of Bounds, In Play, or Out of Play.',
    relatedTerms: ['in-bounds', 'down', 'out-of-bounds', 'in-play', 'out-of-play'],
  },
  {
    id: 'exiting-the-track',
    term: 'Exiting the Track',
    definition:
      'Leaving the track to the outside in order to go to the Penalty Box to serve a penalty.',
  },
  {
    id: 'expulsion',
    term: 'Expulsion',
    definition:
      'When the Head Referee removes a skater or team staff from the rest of the game for a serious illegal action, such as physical violence or anything that puts others in serious danger.',
    relatedTerms: ['fouling-out', 'head-referee'],
  },
  {
    id: 'falling-small',
    term: 'Falling Small',
    definition:
      'Falling with arms and legs controlled and tucked close to the body, not spread out or flailing. This helps keep other skaters safe.',
    relatedTerms: ['down'],
  },
  {
    id: 'forceful-contact',
    term: 'Forceful Contact',
    definition:
      'A hard, sudden hit or strike, or any contact that could hurt someone or significantly change their position, balance, speed, or direction, whether or not it actually does.',
    relatedTerms: ['blocking-zones', 'target-zones'],
  },
  {
    id: 'fouling-out',
    term: 'Fouling Out',
    definition:
      'When a skater is removed from the rest of the game by an Official for receiving seven penalties during that game.',
    relatedTerms: ['penalty', 'expulsion'],
  },
  {
    id: 'governing-body',
    term: 'Governing Body',
    definition:
      'The organisation in charge of running and approving the game. This could be a league, a tournament organiser, or another group responsible for setting the game\'s terms.',
  },
  {
    id: 'grasping',
    term: 'Grasping',
    definition:
      'Actively gripping something, such as a teammate\'s uniform, helmet cover, or holding hands. The grasping skater\'s arm from hand to shoulder is considered part of the grasp. The teammate is not part of the grasp unless they are also grasping.',
    relatedTerms: ['linking'],
  },
  {
    id: 'head-referee',
    term: 'Head Referee',
    definition:
      'The referee in charge of the whole game. The Head Referee has the final say on all decisions.',
    relatedTerms: ['expulsion'],
  },
  {
    id: 'hips',
    term: 'Hips',
    definition:
      'The widest part of the body between the waist and the thighs. The centre of this area is used to decide whether a skater has passed another skater, no matter which way the skater is facing.',
    relatedTerms: ['pass', 'skating-direction-of-travel'],
  },
  {
    id: 'illegal-procedure',
    term: 'Illegal Procedure',
    definition:
      'Any rule break that is not about contact. It is a technical infraction, like lining up in the wrong place.',
    relatedTerms: ['penalty'],
  },
  {
    id: 'immediately',
    term: 'Immediately',
    definition: 'At the first safe and legal chance to do something.',
  },
  {
    id: 'impeding',
    term: 'Impeding',
    definition:
      'Actions that slow down an opponent or change the direction they are travelling, in any direction on the track.',
    relatedTerms: ['positional-blocking'],
  },
  {
    id: 'impenetrable',
    term: 'Impenetrable',
    definition:
      'A wall of skaters that cannot be passed through without breaking someone\'s bones or joints. For example, two teammates skating with their arms around each other\'s backs create an impenetrable wall between them.',
    relatedTerms: ['linking', 'grasping'],
  },
  {
    id: 'in-bounds',
    term: 'In Bounds',
    definition:
      'A skater is In Bounds when the only parts of their body touching the floor are on or between the track boundary lines. Touching the floor outside the line with just one hand or arm still counts as In Bounds.',
    relatedTerms: ['out-of-bounds', 'straddling'],
  },
  {
    id: 'in-play',
    term: 'In Play',
    definition:
      'A Blocker is In Play when they are In Bounds, Upright, and inside the Engagement Zone. Jammers who are In Bounds and Upright are always In Play.',
    relatedTerms: ['in-bounds', 'upright', 'engagement-zone', 'out-of-play'],
  },
  {
    id: 'in-position',
    term: 'In Position',
    definition:
      'A skater is In Position when they are on the track, In Bounds, and in the correct starting area for their role when the Jam-Starting Whistle blows.',
    relatedTerms: ['in-bounds', 'role', 'jam'],
  },
  {
    id: 'in-queue',
    term: 'In Queue',
    definition:
      'Skating on the track while waiting to serve a penalty. This usually happens when the Penalty Box is full, or when the skater is the only Blocker left on the track for their team.',
    relatedTerms: ['penalty'],
  },
  {
    id: 'initiator',
    term: 'Initiator',
    definition:
      'The skater who causes contact to happen, whether it is a block on an opponent or an assist on a teammate. A skater can also initiate a whip off a teammate or a counter-block in response to being blocked. The initiator is always responsible for making sure the contact is legal.',
    relatedTerms: ['assist', 'counter-block'],
  },
  {
    id: 'insubordination',
    term: 'Insubordination',
    definition:
      'Deliberately refusing to follow an Official\'s instructions, or behaving badly by intentionally ignoring the rules.',
  },
  {
    id: 'jam',
    term: 'Jam',
    definition:
      'A single round of play in a roller derby game. Each Jam can last up to two minutes.',
    relatedTerms: ['lineup-time'],
  },
  {
    id: 'jammer',
    term: 'Jammer',
    definition:
      'The skater who scores points for their team. The Jammer wears a helmet cover with two stars on it.',
    relatedTerms: ['blocker', 'pivot', 'role', 'the-star', 'lead-jammer'],
    ruleReferences: ['2.2'],
  },
  {
    id: 'lap-lapping',
    term: 'Lap / Lapping',
    definition:
      'A skater has lapped an opponent when they pass that opponent twice in a row without the opponent passing them in between. If the second pass was not earned, the Jammer can do a re-pass to score the missed point.',
    relatedTerms: ['pass', 're-pass'],
  },
  {
    id: 'lead-jammer',
    term: 'Lead Jammer',
    definition:
      'The first Jammer to get past all the in-play Blockers and out the front of the Pack. The Lead Jammer has the power to call off the Jam early.',
    relatedTerms: ['jammer', 'engagement-zone', 'pass'],
  },
  {
    id: 'linking',
    term: 'Linking',
    definition:
      'Hooking arms with a teammate by bending at the elbow. Both skaters\' arms, up to but not including the shoulder, are part of the link.',
    relatedTerms: ['grasping', 'impenetrable'],
  },
  {
    id: 'lineup-time',
    term: 'Lineup Time',
    definition:
      'The break between Jams while the period clock keeps running. It lasts up to 30 seconds, or until a timeout is called. There can only be one Lineup Time between two Jams, and it cannot be restarted after a timeout.',
    relatedTerms: ['jam'],
  },
  {
    id: 'no-impact',
    term: 'No Impact',
    definition:
      'A rule break that has very little effect on safety or gameplay. It is not serious enough to be given a penalty.',
    relatedTerms: ['penalty'],
  },
  {
    id: 'no-pack',
    term: 'No Pack',
    definition:
      'When there is no single group of Blockers from both teams skating within 10 feet (3.05 m) of each other. This also happens when two or more equal-sized groups are too far apart.',
    relatedTerms: ['pack'],
  },
  {
    id: 'not-on-the-track-point',
    term: 'Not-On-the-Track (NOTT) Point',
    definition:
      'A point earned for each opponent who is not on the track, such as skaters in the Penalty Box. The Jammer earns these points as soon as they pass any opposing Blocker during a trip through the Pack.',
    relatedTerms: ['trip-through-the-pack', 'pass', 'jammer'],
  },
  {
    id: 'out-of-bounds',
    term: 'Out of Bounds',
    definition:
      'A skater is Out of Bounds when any part of their body or equipment touches the floor outside the track boundary. However, touching outside with just one hand or arm does not make a skater Out of Bounds.',
    relatedTerms: ['in-bounds', 'straddling', 'ceding', 'out-of-bounds-fully'],
  },
  {
    id: 'out-of-bounds-fully',
    term: 'Out of Bounds (Fully)',
    definition:
      'A skater is fully Out of Bounds when they are Out of Bounds and no part of their body or equipment is touching the track or the area between the track lines at all.',
    relatedTerms: ['out-of-bounds', 'in-bounds', 'straddling'],
  },
  {
    id: 'out-of-play',
    term: 'Out of Play',
    definition:
      'A Blocker who is In Bounds but outside the Engagement Zone. They are too far from the Pack to legally block or be blocked. If there is no Pack, all Blockers are Out of Play. A Jammer who is Out of Bounds is also Out of Play.',
    relatedTerms: ['in-play', 'engagement-zone', 'no-pack'],
  },
  {
    id: 'pack',
    term: 'Pack',
    definition:
      'The largest group of in-bounds Blockers from both teams skating close together, within 10 feet (3.05 m) of each other. Jammers are not part of the Pack.',
    relatedTerms: ['blocker', 'no-pack', 'pack-skater', 'engagement-zone'],
  },
  {
    id: 'pack-skater',
    term: 'Pack Skater',
    definition: 'Any Blocker who is part of the Pack.',
    relatedTerms: ['pack', 'blocker'],
  },
  {
    id: 'pass',
    term: 'Pass',
    definition:
      'When a skater moves their hips past an opponent\'s hips on the track. Jammers earn passes to score points (see Section 2.5).',
    relatedTerms: ['hips', 'lap-lapping', 're-pass', 'not-on-the-track-point'],
    ruleReferences: ['2.5'],
  },
  {
    id: 'passing-the-star',
    term: 'Passing the Star',
    definition:
      'When the Jammer hands their star helmet cover to the Pivot. This transfers the Jammer role, making the Pivot the new Jammer.',
    relatedTerms: ['the-star', 'jammer', 'pivot'],
  },
  {
    id: 'penalty',
    term: 'Penalty',
    definition:
      'A punishment for breaking a rule. The skater must leave the track and sit in the Penalty Box to serve time.',
    relatedTerms: ['no-impact', 'fouling-out', 'expulsion'],
  },
  {
    id: 'pivot',
    term: 'Pivot',
    definition:
      'A special Blocker with extra abilities, who wears a helmet cover with a stripe. The Pivot can become the Jammer if the star is passed to them (see Section 2.2.3).',
    relatedTerms: ['blocker', 'the-stripe', 'passing-the-star', 'role'],
    ruleReferences: ['2.2.3'],
  },
  {
    id: 'points-awarded-in-error',
    term: 'Points Awarded in Error',
    definition:
      'Points added to a team\'s score by mistake, when the Jammer did not actually earn them. This can happen because of an Official\'s error or a technology problem.',
    relatedTerms: ['points-denied-in-error'],
  },
  {
    id: 'points-denied-in-error',
    term: 'Points Denied in Error',
    definition:
      'Points that a Jammer did earn, but were not added to the score because of a delay, an Official\'s error, or a technology problem.',
    relatedTerms: ['points-awarded-in-error'],
  },
  {
    id: 'positional-blocking',
    term: 'Positional Blocking',
    definition:
      'Blocking without making contact. The skater moves their body into an opponent\'s path to stop them getting past. This does not have to be done on purpose.',
    relatedTerms: ['impeding'],
  },
  {
    id: 'protective-gear',
    term: 'Protective Gear',
    definition:
      'Safety equipment that skaters must wear: a helmet, mouthguard, wrist guards, elbow pads, and knee pads. Skaters will not be penalised if a piece of gear does not provide them with extra protection.',
  },
  {
    id: 're-pass',
    term: 'Re-Pass',
    definition:
      'Passing an opponent who has already been passed on the same lap. This is useful when a Jammer ends up ahead of an opponent without earning the pass. The Jammer can re-pass them to score the missed point.',
    relatedTerms: ['pass', 'lap-lapping'],
  },
  {
    id: 'relative-position',
    term: 'Relative Position',
    definition:
      'Where a skater is compared to other skaters on the track, measured in the counterclockwise direction. Position is "gained" by moving ahead and "lost" by being knocked down, going Out of Bounds, or falling Out of Play.',
    relatedTerms: ['in-bounds', 'upright', 'yielding'],
  },
  {
    id: 'role',
    term: 'Role',
    definition:
      'Each skater has one of three roles: Jammer, Pivot, or Blocker. The Jammer role can be transferred to the Pivot once per Jam through a Star Pass. The Pivot role cannot be transferred during a Jam.',
    relatedTerms: ['jammer', 'pivot', 'blocker', 'passing-the-star'],
  },
  {
    id: 'roster',
    term: 'Roster',
    definition:
      'The list of all skaters on a team, along with their numbers, who are allowed to play in the game.',
  },
  {
    id: 'sitting',
    term: 'Sitting',
    definition: 'A skater who is fully seated on a chair or bench.',
    relatedTerms: ['standing', 'down'],
  },
  {
    id: 'skating-direction-of-travel',
    term: 'Skating - Direction of Travel',
    definition:
      'The direction a skater is moving, such as counterclockwise, sideways, or clockwise. It is measured by watching the skater\'s feet. If the feet are moving in different directions, direction of travel is decided by the hips.',
    relatedTerms: ['hips'],
  },
  {
    id: 'standing',
    term: 'Standing',
    definition:
      'A skater who is holding their weight on their skates, so they are clearly not Down and not Sitting.',
    relatedTerms: ['down', 'sitting', 'upright'],
  },
  {
    id: 'stopped',
    term: 'Stopped',
    definition: 'A skater who is not moving in any direction on their skates.',
  },
  {
    id: 'straddling',
    term: 'Straddling',
    definition:
      'When a skater is touching the floor both on or between the track lines and outside the track boundary at the same time. Touching outside with just one hand or arm does not count as straddling. A straddling skater is considered Out of Bounds.',
    relatedTerms: ['in-bounds', 'out-of-bounds'],
  },
  {
    id: 'substitution',
    term: 'Substitution',
    definition: 'Replacing a skater on the track or in the Penalty Box with a teammate.',
  },
  {
    id: 'target-zones',
    term: 'Target Zones',
    definition:
      'The areas of an opponent\'s body that a skater is allowed to make contact with when blocking.',
    relatedTerms: ['blocking-zones', 'forceful-contact'],
  },
  {
    id: 'the-star',
    term: 'The Star',
    definition:
      'The Jammer\'s helmet cover. It has two stars on it, one on each side.',
    relatedTerms: ['jammer', 'passing-the-star', 'the-stripe'],
  },
  {
    id: 'the-stripe',
    term: 'The Stripe',
    definition:
      'The Pivot\'s helmet cover. It has one long stripe running down the middle.',
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
    definition: 'Any skater who is not Down. If you are on your skates, you are Upright.',
    relatedTerms: ['down', 'standing', 'in-play'],
  },
  {
    id: 'warning',
    term: 'Warning',
    definition:
      'When an Official tells a skater out loud that something is wrong or about to be wrong, giving the skater a chance to fix it before getting a penalty.',
  },
  {
    id: 'yielding',
    term: 'Yielding',
    definition:
      'When a skater is required to yield, they must give nearby skaters a fair chance to move ahead of them. As long as the skater waits a reasonable amount of time, they have yielded, even if no one took the opportunity.',
    relatedTerms: ['relative-position'],
  },
];
