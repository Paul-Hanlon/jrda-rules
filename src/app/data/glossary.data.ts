import { GlossaryTerm } from '../models/glossary';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'actively-absorbing',
    term: 'Actively Absorbing',
    definition:
      'Any movement toward oncoming contact intended only to protect the recipient of the contact.',
    relatedTerms: ['counter-block', 'forceful-contact'],
  },
  {
    id: 'ahead',
    term: 'Ahead',
    definition:
      'One thing (for example, a Skater, a line, the Pack) is "ahead" of another thing, in relation to the track, if it is nearer in the counterclockwise direction than the clockwise direction (see also Behind).',
    relatedTerms: ['behind'],
  },
  {
    id: 'alternate',
    term: 'Alternate',
    definition:
      'The Captain designates an additional person to act on their team\'s behalf via a visible "A" on their uniform or body; this person is the Alternate. The Alternate may be a teammate, coach, or manager. A team may only have one Alternate. If one has not been selected or has left the game, the Captain may designate a different Alternate by informing the Head Referee.',
    relatedTerms: ['captain'],
  },
  {
    id: 'apex-jump',
    term: 'Apex Jump',
    definition:
      'An attempt to legally shorten the distance traveled around the curve of the track by leaping over the track boundary and landing back In Bounds.',
    relatedTerms: ['in-bounds'],
  },
  {
    id: 'assist',
    term: 'Assist',
    definition:
      'Physically affecting a teammate. Common examples include a push or a whip.',
    relatedTerms: ['engaging', 'initiator'],
    ruleReferences: ['2.4'],
  },
  {
    id: 'behind',
    term: 'Behind',
    definition:
      'One thing (for example, a Skater, a line, the Pack) is "behind" another thing, in relation to the track, if it is nearer in the clockwise direction than the counterclockwise direction (see also Ahead).',
    relatedTerms: ['ahead'],
  },
  {
    id: 'blocker',
    term: 'Blocker',
    definition:
      'The Skaters who form the Pack. Up to four Blockers from each team may skate, per Jam. One Blocker per Jam, for each team, may be a Pivot.',
    relatedTerms: ['pack', 'pivot', 'jammer', 'role'],
    ruleReferences: ['2.2'],
  },
  {
    id: 'blocking-zones',
    term: 'Blocking Zones',
    definition:
      'Areas of the body that may be used to hit an opponent when performing a block.',
    relatedTerms: ['target-zones', 'forceful-contact'],
  },
  {
    id: 'captain',
    term: 'Captain',
    definition:
      'The Skater identified, via a visible "C" on their body or clothing, to speak on the team\'s behalf. If one has not been selected or has left the game, the team may determine one at any time by informing the Head Referee, and must determine one if necessary (for example, if a penalty is to be assessed to a Captain, the team must determine a Captain).',
    relatedTerms: ['alternate'],
  },
  {
    id: 'ceding',
    term: 'Ceding',
    definition:
      'A Skater who enters the track from Out Of Bounds in a way that results in an illegal gain of position may Cede that gain without penalty. In order to Cede, the Skater must immediately return Fully Out of Bounds before re-entering the track. Straddling the track boundary is not sufficient to constitute Ceding.',
    relatedTerms: ['out-of-bounds', 'out-of-bounds-fully', 'straddling'],
  },
  {
    id: 'counter-block',
    term: 'Counter-Block',
    definition:
      'Any motion/movement toward an oncoming block by the receiving opponent designed to counteract an opponent\'s block. Counter-blocking is treated as blocking and held to the same standards and rules (except where specified). Continued engagement which goes beyond countering the initial effect of the opponent\'s block should be considered a separate block, and judged separately.',
    relatedTerms: ['actively-absorbing', 'initiator'],
  },
  {
    id: 'designated-chaperone',
    term: 'Designated Chaperone',
    definition:
      'A Designated Chaperone is an adult representative of a team designated during the pre-game meeting to perform duties as detailed in the JRDA Sanctioning Policy.',
  },
  {
    id: 'down',
    term: 'Down',
    definition:
      'A Skater is down when part of the Skater\'s body or equipment (aside from skates) is touching the floor. A Skater whose only contact with the floor (aside from skates) is one hand is not considered down. Once down, a Skater is considered down until the Skater is standing, stepping, or skating.',
    relatedTerms: ['upright', 'standing', 'falling-small'],
  },
  {
    id: 'engagement-zone',
    term: 'Engagement Zone',
    definition:
      'The zone in which Blockers are In Play and may legally engage and be engaged. The Engagement Zone extends from 20 ft (6.10 m) behind the rearmost Pack Skater to 20 ft (6.10 m) in front of the foremost Pack Skater, between the inside and outside track boundaries.',
    relatedTerms: ['in-play', 'pack', 'pack-skater'],
  },
  {
    id: 'engaging',
    term: 'Engaging',
    definition:
      'Any interaction with another Skater on the track during a Jam (see also Assist and Blocking Section 2.4).',
    relatedTerms: ['assist', 'blocking-zones'],
    ruleReferences: ['2.4'],
  },
  {
    id: 'established-position',
    term: 'Established Position',
    definition:
      'Where a Skater is physically; an area of the track where the Skater has secured their place. Examples include up, In Bounds, Down, Out of Bounds, In Play, and Out of Play.',
    relatedTerms: ['in-bounds', 'down', 'out-of-bounds', 'in-play', 'out-of-play'],
  },
  {
    id: 'exiting-the-track',
    term: 'Exiting the Track',
    definition:
      '(Penalty Enforcement) Exiting the track to the outside in order to report to the Penalty Box.',
  },
  {
    id: 'expulsion',
    term: 'Expulsion',
    definition:
      'Removal by the Head Referee of a Skater or Team Staff from the remainder of the game for a serious illegal action, such as physical violence or any action deemed by the Officials to cause an extraordinary physical threat to others.',
    relatedTerms: ['fouling-out', 'head-referee'],
  },
  {
    id: 'falling-small',
    term: 'Falling Small',
    definition:
      'A Skater is said to have "fallen small" if they fall with the arms and legs controlled, tucked into the body, and not flailing or sprawled.',
    relatedTerms: ['down'],
  },
  {
    id: 'forceful-contact',
    term: 'Forceful Contact',
    definition:
      'Abrupt contact (such as hitting or striking) with a significant amount of strength and energy or any contact that either has the potential to harm the recipient or significantly alter their position, balance, speed, trajectory, etc. (regardless of whether that potential is actualized).',
    relatedTerms: ['blocking-zones', 'target-zones'],
  },
  {
    id: 'fouling-out',
    term: 'Fouling Out',
    definition:
      'Removal, by an Official, of a Skater from the remainder of the game for having seven penalties recorded for that Skater.',
    relatedTerms: ['penalty', 'expulsion'],
  },
  {
    id: 'governing-body',
    term: 'Governing Body',
    definition:
      'The organization responsible for the sanctioning of the game; or in an unsanctioned game, the organization responsible for determining the terms of the game, such as a tournament, local league, or other person(s) serving in that role.',
  },
  {
    id: 'grasping',
    term: 'Grasping',
    definition:
      'Actively gripping something; for example, grabbing a teammate\'s uniform or helmet cover, or holding hands. The grasping Skater\'s arm, from the hand up to (but not including) the shoulder, is considered to be part of the "grasp." The teammate is not considered part of the grasp, unless the teammate is independently grasping.',
    relatedTerms: ['linking'],
  },
  {
    id: 'head-referee',
    term: 'Head Referee',
    definition:
      'One Referee will be designated the Head Referee. The Head Referee is the ultimate authority of the game.',
    relatedTerms: ['expulsion'],
  },
  {
    id: 'hips',
    term: 'Hips',
    definition:
      'The laterally-projecting prominence of the pelvis or pelvic region from the waist to the thigh. The central point of this area determines a pass, regardless of the direction the Skater is facing.',
    relatedTerms: ['pass', 'skating-direction-of-travel'],
  },
  {
    id: 'illegal-procedure',
    term: 'Illegal Procedure',
    definition:
      'Any technical (non-contact) infraction that violates the rules.',
    relatedTerms: ['penalty'],
  },
  {
    id: 'immediately',
    term: 'Immediately',
    definition:
      'The first safe and legal opportunity in which someone may complete an action.',
  },
  {
    id: 'impeding',
    term: 'Impeding',
    definition:
      'Actions that restrict an opponent\'s speed and/or trajectory, in any direction on the track.',
    relatedTerms: ['positional-blocking'],
  },
  {
    id: 'impenetrable',
    term: 'Impenetrable',
    definition:
      'A wall is considered to be impenetrable from a certain direction when, to achieve a pass on one or more of the Skaters who comprise the wall, an opponent would need to physically break bones or joints. The parts that would need to be physically broken in order to pass are considered the "impenetrable" parts. For example, if two teammates are skating forward with their arms around each other\'s backs, the arms constitute an impenetrable wall, so that an opponent could not pass between the pair without breaking one of those Blockers\' arms.',
    relatedTerms: ['linking', 'grasping'],
  },
  {
    id: 'in-bounds',
    term: 'In Bounds',
    definition:
      'A Skater is In Bounds if the only points at which they are touching the floor are on or in between the track boundary lines. A Skater who touches the floor beyond the track boundary with only one arm or hand is still considered In Bounds (see also out of bounds, straddling).',
    relatedTerms: ['out-of-bounds', 'straddling'],
  },
  {
    id: 'in-play',
    term: 'In Play',
    definition:
      'A Blocker is In Play when they are In Bounds and Upright within the Engagement Zone. Jammers who are In Bounds and Upright are always In Play.',
    relatedTerms: ['in-bounds', 'upright', 'engagement-zone', 'out-of-play'],
  },
  {
    id: 'in-position',
    term: 'In Position',
    definition:
      'A Skater is in position when they are on the track, In Bounds, and in the designated starting area for their Role when the Jam-Starting Whistle is blown.',
    relatedTerms: ['in-bounds', 'role', 'jam'],
  },
  {
    id: 'in-queue',
    term: 'In Queue',
    definition:
      'Actively skating while having a penalty pending, usually after having been waved back to the track due to the Penalty Box being full, or having been assessed a penalty while being the only Blocker on the track.',
    relatedTerms: ['penalty'],
  },
  {
    id: 'initiator',
    term: 'Initiator',
    definition:
      'The Skater who is responsible for contact happening to an opponent (initiating a block) or teammate (initiating an assist). A Skater can also initiate their own assist by taking a whip off of a teammate\'s body, or initiate a counter-block in response to an opponent\'s block. The initiator of a block or assist is always responsible for the legality of the contact. After a counter-block, continued engagement by the counter-blocking skater should be considered a new action, with the skater responsible for the continued contact considered the initiator. The legality of this action should be judged separately from the initial block and counter-block.',
    relatedTerms: ['assist', 'counter-block'],
  },
  {
    id: 'insubordination',
    term: 'Insubordination',
    definition:
      'Willfully or neglectfully failing to comply with an Official\'s orders. Wrongful or improper behavior motivated by intentional disregard for the rules.',
  },
  {
    id: 'jam',
    term: 'Jam',
    definition:
      'The basic unit of play for the game. A Jam can last up to two minutes.',
    relatedTerms: ['lineup-time'],
  },
  {
    id: 'jammer',
    term: 'Jammer',
    definition: 'The point scorer for a team.',
    relatedTerms: ['blocker', 'pivot', 'role', 'the-star', 'lead-jammer'],
    ruleReferences: ['2.2'],
  },
  {
    id: 'lap-lapping',
    term: 'Lap / Lapping',
    definition:
      'One Skater has lapped an opponent if the Skater has passed the opponent twice in a row without the opponent having passed the lapping Skater in between. If a Jammer passes an opponent for the second time, but the second pass was not "earned," the Jammer is still said to have lapped their opponent, and may earn a "re-pass" on said opponent to score the missed point.',
    relatedTerms: ['pass', 're-pass'],
  },
  {
    id: 'lead-jammer',
    term: 'Lead Jammer',
    definition:
      'The Lead Jammer is the first Jammer to establish superior position to the foremost in-play Blocker, having already earned a pass on all Blockers excluding those ahead of the Engagement Zone.',
    relatedTerms: ['jammer', 'engagement-zone', 'pass'],
  },
  {
    id: 'linking',
    term: 'Linking',
    definition:
      'Interlocking of arms via crooking of an elbow. Both Skaters\' arms, up to (but not including) the shoulder are considered to be part of the link.',
    relatedTerms: ['grasping', 'impenetrable'],
  },
  {
    id: 'lineup-time',
    term: 'Lineup Time',
    definition:
      'The time where the period clock continues to run between the end of one Jam, and either until the start of the next Jam (when a maximum of 30 seconds have elapsed) or a timeout is called, whichever occurs first. There may only be one Lineup Time between two consecutive Jams, and the Lineup Time cannot be restarted if stopped for a timeout.',
    relatedTerms: ['jam'],
  },
  {
    id: 'no-impact',
    term: 'No Impact',
    definition:
      'A violation of the rules of the game that has limited impact on safety or gameplay, and does not warrant a penalty.',
    relatedTerms: ['penalty'],
  },
  {
    id: 'no-pack',
    term: 'No Pack',
    definition:
      'When there is not a group of Blockers (from both teams) skating within 10 ft (3.05 m) of each other, or when there are two or more equally numbered groups of Blockers not skating within 10 ft (3.05 m) of each other.',
    relatedTerms: ['pack'],
  },
  {
    id: 'not-on-the-track-point',
    term: 'Not-On-the-Track (NOTT) Point',
    definition:
      'A point given for an opponent who is not on the track (such as Skaters in the Penalty Box) that the Jammer earns immediately upon earning a pass on any opposing Blocker, per trip through the Pack.',
    relatedTerms: ['trip-through-the-pack', 'pass', 'jammer'],
  },
  {
    id: 'out-of-bounds',
    term: 'Out of Bounds',
    definition:
      'A Skater is Out of Bounds when part of the Skater\'s body or equipment is touching the floor beyond the track boundary. One arm or hand touching the floor beyond the track boundary does not render a Skater Out of Bounds (see also In Bounds, Straddling, Ceding).',
    relatedTerms: ['in-bounds', 'straddling', 'ceding', 'out-of-bounds-fully'],
  },
  {
    id: 'out-of-bounds-fully',
    term: 'Out of Bounds (Fully)',
    definition:
      'A Skater is fully Out of Bounds when they meet the criteria for being Out of Bounds, and no parts of the Skater\'s body or equipment are touching the floor on or between the track boundary lines (also see Out of Bounds, In Bounds, Straddling).',
    relatedTerms: ['out-of-bounds', 'in-bounds', 'straddling'],
  },
  {
    id: 'out-of-play',
    term: 'Out of Play',
    definition:
      'A Blocker who is In Bounds, but positioned outside of the Engagement Zone. If no Pack is defined, all Blockers are Out of Play. When a Jammer is Out of Bounds, they are Out of Play.',
    relatedTerms: ['in-play', 'engagement-zone', 'no-pack'],
  },
  {
    id: 'pack',
    term: 'Pack',
    definition:
      'The largest group of in-bounds Blockers, skating or standing in proximity (within 10 ft [3.05 m]), containing members from both teams. The Jammers are independent of this definition.',
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
    definition: 'Earned Pass: See Section 2.5.',
    relatedTerms: ['hips', 'lap-lapping', 're-pass', 'not-on-the-track-point'],
    ruleReferences: ['2.5'],
  },
  {
    id: 'passing-the-star',
    term: 'Passing the Star',
    definition:
      'Star Pass: The act of transferring Jammer status, which is accomplished by the Jammer handing their helmet cover (the Star) to the Pivot.',
    relatedTerms: ['the-star', 'jammer', 'pivot'],
  },
  {
    id: 'penalty',
    term: 'Penalty',
    definition:
      'A violation of the rules of the game requiring the Skater to serve time in the Penalty Box, or the specific punishment of serving time in the Penalty Box due to the commission of such a violation.',
    relatedTerms: ['no-impact', 'fouling-out', 'expulsion'],
  },
  {
    id: 'pivot',
    term: 'Pivot',
    definition: 'A Blocker with additional abilities (see Section 2.2.3).',
    relatedTerms: ['blocker', 'the-stripe', 'passing-the-star', 'role'],
    ruleReferences: ['2.2.3'],
  },
  {
    id: 'points-awarded-in-error',
    term: 'Points Awarded in Error',
    definition:
      'Points that have not been legally earned by a Jammer and have been awarded to the team incorrectly and/or erroneously by an Official or as the result of a technology malfunction.',
    relatedTerms: ['points-denied-in-error'],
  },
  {
    id: 'points-denied-in-error',
    term: 'Points Denied in Error',
    definition:
      'Similar to Points Awarded in Error, points denied in error are points that have been legally earned by a Jammer but have not been added to the Official Score due to delay, an error by an Official, or as the result of a technology malfunction.',
    relatedTerms: ['points-awarded-in-error'],
  },
  {
    id: 'positional-blocking',
    term: 'Positional Blocking',
    definition:
      'Blocking without contact; positioning oneself so as to impede an opponent\'s movement on the track. Positional blocking need not be intentional.',
    relatedTerms: ['impeding'],
  },
  {
    id: 'protective-gear',
    term: 'Protective Gear',
    definition:
      'Skaters must wear a helmet, mouthguard, wrist guards, elbow pads, and knee pads so long as they provide additional protection and the Skater is physically able to wear them. Skaters shall not be penalized if the equipment does not provide additional protection for the Skater.',
  },
  {
    id: 're-pass',
    term: 'Re-Pass',
    definition:
      'The act of passing an opponent who has already been passed during the current lap. Most relevant to a Jammer who ends up ahead of an opponent without "earning" the pass. Such a Jammer would not score a point on that opponent, but could re-pass that opponent, earning their second pass, in order to score that point.',
    relatedTerms: ['pass', 'lap-lapping'],
  },
  {
    id: 'relative-position',
    term: 'Relative Position',
    definition:
      'A Skater\'s location, when In Bounds and Upright, in relation to other Skaters. Relative position is said to be "gained" or "lost" if this location changes in a way that gives or loses some advantage (for example, one Skater passing another, or being knocked down, Out of Bounds, or Out of Play). Relative position is only measured in the counterclockwise direction.',
    relatedTerms: ['in-bounds', 'upright', 'yielding'],
  },
  {
    id: 'role',
    term: 'Role',
    definition:
      'Each Skater has one of three Roles: Jammer, Pivot, or Blocker. The Role of Jammer may be transferred to the Pivot once per jam by a Star Pass. The Role of Pivot may not be transferred during a Jam.',
    relatedTerms: ['jammer', 'pivot', 'blocker', 'passing-the-star'],
  },
  {
    id: 'roster',
    term: 'Roster',
    definition:
      'The list of Skaters for a team, and their identifying numbers, who are eligible to play in the game.',
  },
  {
    id: 'sitting',
    term: 'Sitting',
    definition:
      'A Skater whose buttocks are in full contact with the seat of a chair or bench.',
    relatedTerms: ['standing', 'down'],
  },
  {
    id: 'skating-direction-of-travel',
    term: 'Skating - Direction of Travel',
    definition:
      'A Skater\'s direction of travel (for example, counterclockwise, lateral, or clockwise) is measured by the skates moving relative to a line perpendicular to the inside track boundary. If the skates are moving in opposite directions, direction of travel is determined by the hips.',
    relatedTerms: ['hips'],
  },
  {
    id: 'standing',
    term: 'Standing',
    definition:
      'A Skater holding their body weight on their skates, such that they are not down and it is obvious to Officials, Skaters, and spectators that they are not sitting.',
    relatedTerms: ['down', 'sitting', 'upright'],
  },
  {
    id: 'stopped',
    term: 'Stopped',
    definition:
      'A Skater not making any directional movement with their skates.',
  },
  {
    id: 'straddling',
    term: 'Straddling',
    definition:
      'A Skater is straddling when they are simultaneously touching the floor on or between the track boundary lines and beyond the track boundary. Touching the floor beyond the track boundary with only one arm or hand does not render a Skater straddling. Straddling Skaters are considered Out of Bounds, except where otherwise noted (see also In Bounds).',
    relatedTerms: ['in-bounds', 'out-of-bounds'],
  },
  {
    id: 'substitution',
    term: 'Substitution',
    definition:
      'Replacing a Skater on the track or in the Penalty Box with a teammate.',
  },
  {
    id: 'target-zones',
    term: 'Target Zones',
    definition:
      'Areas of the body on an opponent that a Skater makes contact to when blocking.',
    relatedTerms: ['blocking-zones', 'forceful-contact'],
  },
  {
    id: 'the-star',
    term: 'The Star',
    definition:
      'The Jammer helmet cover, which has two stars on it, one on each side.',
    relatedTerms: ['jammer', 'passing-the-star', 'the-stripe'],
  },
  {
    id: 'the-stripe',
    term: 'The Stripe',
    definition:
      'The Pivot helmet cover, which has one long stripe down the middle of it.',
    relatedTerms: ['pivot', 'the-star'],
  },
  {
    id: 'trip-through-the-pack',
    term: 'Trip Through the Pack',
    definition:
      'Jammers make trips through the Pack. Each trip represents an opportunity to score points on opponents (see Section 3).',
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
      'A formal verbal indication from the Official that play is currently or is about to be improper, so that a Skater can take corrective action.',
  },
  {
    id: 'yielding',
    term: 'Yielding',
    definition:
      'A Skater who is required to Yield must allow any Skaters in their vicinity to assume a superior Relative Position. A Skater who allows a reasonable time for this to occur has Yielded, whether or not any Skaters took advantage of the opportunity.',
    relatedTerms: ['relative-position'],
  },
];
