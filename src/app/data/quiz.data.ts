import { QuizTopic } from '../models/quiz';

export const QUIZ_TOPICS: QuizTopic[] = [
  // ─────────────────────────────────────────────
  // 1. Game Basics
  // ─────────────────────────────────────────────
  {
    id: 'game-basics',
    title: 'Game Basics',
    description: 'Test your knowledge of game timing, teams, timeouts, winning, and overtime.',
    icon: '\u23F1\uFE0F',
    sectionId: 'game-parameters',
    questions: [
      {
        id: 'gb-1',
        question: 'How long is a full roller derby game?',
        options: [
          '30 minutes',
          '60 minutes',
          '90 minutes',
          '45 minutes',
        ],
        correctIndex: 1,
        explanation:
          'A game lasts for 60 minutes of play, divided into two 30-minute periods with a halftime between them.',
        ruleReference: '1.1',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'gb-2',
        question: 'What is the maximum length of a single Jam?',
        options: [
          '1 minute',
          '90 seconds',
          '2 minutes',
          '3 minutes',
        ],
        correctIndex: 2,
        explanation:
          'A Jam can last up to two minutes. Jams may be called off earlier by the Lead Jammer or by Officials.',
        ruleReference: '1.1',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'gb-3',
        question: 'How many timeouts does each team get per game?',
        options: [
          'One',
          'Two',
          'Three',
          'Unlimited',
        ],
        correctIndex: 2,
        explanation:
          'Each team may take three timeouts during the game. Team Timeouts last for 60 seconds.',
        ruleReference: '1.3.1',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'gb-4',
        question: 'How many Official Reviews does each team receive per period?',
        options: [
          'None',
          'One',
          'Two',
          'Three',
        ],
        correctIndex: 1,
        explanation:
          'Both teams begin each period with one Official Review which they may use during that period.',
        ruleReference: '1.3.2',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'gb-5',
        question: 'What happens if the score is tied at the end of the game?',
        options: [
          'The game ends in a tie',
          'A coin toss decides the winner',
          'An Overtime Jam is played',
          'Each team picks a Jammer for a shootout',
        ],
        correctIndex: 2,
        explanation:
          'If the game ends with the score tied, the second period is extended by at least one additional Overtime Jam.',
        ruleReference: '1.5.1',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'gb-6',
        question: 'During an Overtime Jam, which of the following is true?',
        options: [
          'No Lead Jammer is declared',
          'Jams last up to 5 minutes',
          'Only one Jammer is on the track',
          'Teams get extra timeouts',
        ],
        correctIndex: 0,
        explanation:
          'During Overtime, no Lead Jammer is declared. The Lineup Time is 60 seconds, and both Jammers begin scoring on their first trip through the Pack.',
        ruleReference: '1.5.1',
        skillLevels: ['L2', 'L3'],
      },
      {
        id: 'gb-7',
        question: 'What is the minimum time that must elapse between Jams?',
        options: [
          '15 seconds',
          '30 seconds',
          '45 seconds',
          '60 seconds',
        ],
        correctIndex: 1,
        explanation:
          'At least 30 seconds must elapse between Jams. More than 30 seconds may not elapse unless a timeout is called.',
        ruleReference: '1.1',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'gb-8',
        question: 'Who can request a Team Timeout?',
        options: [
          'Any skater on the team',
          'Only the team\'s Captain or Alternate',
          'Only the Jammer',
          'Any Blocker',
        ],
        correctIndex: 1,
        explanation:
          'Team Timeouts may only be requested by the team\'s Captain or Alternate. Captains or Alternates currently serving a penalty cannot request one.',
        ruleReference: '1.3.1',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'gb-9',
        question: 'What type of skates must players wear during a JRDA game?',
        options: [
          'Any type of roller skates',
          'Inline skates only',
          'Quad-style roller skates',
          'Either quad or inline skates',
        ],
        correctIndex: 2,
        explanation:
          'Skaters must wear quad-style roller skates and protective gear during play. Inline skates are not permitted.',
        ruleReference: '1.2',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'gb-10',
        question: 'A team may elect to use an unused Official Review as what?',
        options: [
          'An extra Jam',
          'A 60-second timeout',
          'A challenge to reverse a penalty',
          'A free substitution',
        ],
        correctIndex: 1,
        explanation:
          'A team may elect to use any of their Official Reviews as a 60-second timeout. In this case, the review will not be retained.',
        ruleReference: '1.3.2',
        skillLevels: ['L2', 'L3'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. Gameplay Fundamentals
  // ─────────────────────────────────────────────
  {
    id: 'gameplay-fundamentals',
    title: 'Gameplay Fundamentals',
    description: 'Questions about the track, skater positions, Lead Jammer, and passing the star.',
    icon: '\uD83D\uDEDE',
    sectionId: 'gameplay',
    questions: [
      {
        id: 'gf-1',
        question: 'How many Blockers can each team have on the track during a Jam?',
        options: [
          'Three',
          'Four',
          'Five',
          'Six',
        ],
        correctIndex: 1,
        explanation:
          'For each Jam, a team must field one Jammer and at most four Blockers. One of these Blockers may be designated as the Pivot.',
        ruleReference: '2.2',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'gf-2',
        question: 'What does a Jammer wear to be identified?',
        options: [
          'A helmet cover with a stripe',
          'A helmet cover with a star',
          'A special colored jersey',
          'An armband',
        ],
        correctIndex: 1,
        explanation:
          'The Jammer is denoted as the Skater in visible possession of the Jammer helmet cover (a.k.a. the Star) at the beginning of the Jam.',
        ruleReference: '2.2.1',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'gf-3',
        question: 'What does the Pivot wear on their helmet?',
        options: [
          'A helmet cover with a star',
          'A helmet cover with a stripe',
          'Nothing special',
          'A numbered sticker',
        ],
        correctIndex: 1,
        explanation:
          'The Pivot is a Blocker denoted as the Skater in possession of the Pivot helmet cover (a.k.a. the Stripe) at the Jam-Starting Whistle.',
        ruleReference: '2.2.3',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'gf-4',
        question: 'How does the Lead Jammer call off a Jam?',
        options: [
          'By raising one hand',
          'By yelling "Stop!"',
          'By repeatedly placing their hands on their hips',
          'By skating off the track',
        ],
        correctIndex: 2,
        explanation:
          'The Lead Jammer calls off the Jam by repeatedly placing their hands on their hips. They retain this ability even if they are not wearing the Star.',
        ruleReference: '2.2.2',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'gf-5',
        question: 'What is a "Star Pass"?',
        options: [
          'When the Jammer scores 4 points in one trip',
          'When the Jammer hands the Star to their team\'s Pivot',
          'When the Jammer passes all opposing Blockers',
          'When the Star falls off the Jammer\'s helmet',
        ],
        correctIndex: 1,
        explanation:
          'A Star Pass is when the Jammer transfers their Role to their team\'s Pivot by handing the Star to the Pivot. Both Skaters must be Upright, In Bounds, and In Play.',
        ruleReference: '2.2.4',
        skillLevels: ['L2', 'L3'],
      },
      {
        id: 'gf-6',
        question: 'Who is the only Skater that can score points for their team?',
        options: [
          'The Pivot',
          'Any Blocker',
          'The Jammer',
          'The Captain',
        ],
        correctIndex: 2,
        explanation:
          'The Jammer is the only Skater who can score points for their team. Blockers and Pivots cannot score unless the Pivot receives a Star Pass and becomes the new Jammer.',
        ruleReference: '2.2.1',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'gf-7',
        question: 'Where do Jammers line up at the start of a Jam?',
        options: [
          'In front of the Pivot Line',
          'Behind the Jammer Line',
          'Anywhere on the track',
          'In the Penalty Box area',
        ],
        correctIndex: 1,
        explanation:
          'Jammers must be behind or touching the Jammer Line at the start of a Jam. Blockers must be behind the Pivot Line and ahead of the Jammer Line.',
        ruleReference: '2.2.6',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'gf-8',
        question: 'Who becomes the Lead Jammer?',
        options: [
          'The Jammer who wins a coin toss',
          'The first eligible Jammer to pass all in-play Blockers',
          'Whichever Jammer the referee chooses',
          'The Jammer from the home team',
        ],
        correctIndex: 1,
        explanation:
          'The Lead Jammer is the first eligible Jammer who establishes superior position to the foremost in-play Blocker, having already earned a pass on all Blockers excluding those ahead of the Engagement Zone.',
        ruleReference: '2.2.2',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'gf-9',
        question: 'Can a Pivot who receives the Star via a Star Pass become Lead Jammer?',
        options: [
          'Yes, always',
          'Only if the original Jammer was already Lead',
          'No, a Pivot who receives the Star cannot become Lead',
          'Only during Overtime',
        ],
        correctIndex: 2,
        explanation:
          'Only Skaters who begin the Jam as Jammers may become Lead. A Pivot who receives the Star cannot become Lead Jammer.',
        ruleReference: '2.2.2',
        skillLevels: ['L2', 'L3'],
      },
      {
        id: 'gf-10',
        question: 'In which direction do Skaters travel around the track?',
        options: [
          'Clockwise',
          'Counterclockwise',
          'Either direction',
          'It alternates each period',
        ],
        correctIndex: 1,
        explanation:
          'Skaters gain superior position on other Skaters by passing them in the counterclockwise direction. Skating clockwise to destroy the Pack is illegal.',
        ruleReference: '2.5',
        skillLevels: ['L1', 'L2', 'L3'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Pack & Engagement Zone
  // ─────────────────────────────────────────────
  {
    id: 'pack-and-engagement',
    title: 'Pack & Engagement Zone',
    description: 'Questions about pack definition, the engagement zone, and out-of-play rules.',
    icon: '\uD83D\uDC65',
    sectionId: 'gameplay',
    questions: [
      {
        id: 'pe-1',
        question: 'What defines the Pack?',
        options: [
          'All Skaters on the track',
          'The largest group of in-bounds, upright Blockers in proximity from both teams',
          'The four Blockers closest to the Pivot Line',
          'All Blockers from the team with the most players on the track',
        ],
        correctIndex: 1,
        explanation:
          'The Pack is the largest group of In Bounds and Upright Blockers in proximity and containing members from both teams.',
        ruleReference: '2.3',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'pe-2',
        question: 'What distance defines "proximity" for Pack purposes?',
        options: [
          '5 feet (1.52 m)',
          '10 feet (3.05 m)',
          '15 feet (4.57 m)',
          '20 feet (6.10 m)',
        ],
        correctIndex: 1,
        explanation:
          'Proximity is defined as not more than 10 ft (3.05 m), in front of or behind the nearest Pack Skater.',
        ruleReference: '2.3',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'pe-3',
        question: 'How far does the Engagement Zone extend from the Pack?',
        options: [
          '10 feet (3.05 m) forward and backward',
          '15 feet (4.57 m) forward and backward',
          '20 feet (6.10 m) forward and backward',
          '30 feet (9.14 m) forward and backward',
        ],
        correctIndex: 2,
        explanation:
          'The Engagement Zone extends forward and backward 20 ft (6.10 m) from the foremost and rearmost Pack Skaters, respectively.',
        ruleReference: '2.3',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'pe-4',
        question: 'What happens to a Blocker who is outside the Engagement Zone?',
        options: [
          'They are sent to the Penalty Box',
          'They are considered Out of Play and cannot engage or be engaged',
          'They automatically become the Jammer',
          'Nothing, they can play normally',
        ],
        correctIndex: 1,
        explanation:
          'Any Blocker outside of the Engagement Zone is Out of Play and cannot engage or be engaged.',
        ruleReference: '2.3',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'pe-5',
        question: 'Is it legal for Blockers to block each other when there is no Pack?',
        options: [
          'Yes, blocking is always allowed',
          'No, blocks with impact while there is no Pack should be penalized',
          'Only if they are within 10 feet of each other',
          'Only the Pivot can block when there is no Pack',
        ],
        correctIndex: 1,
        explanation:
          'Blocks on or by Blockers which have impact while there is no Pack should be penalized.',
        ruleReference: '2.3',
        skillLevels: ['L2', 'L3'],
      },
      {
        id: 'pe-6',
        question: 'When there is no Pack, what must all Blockers do?',
        options: [
          'Stop skating immediately',
          'Leave the track',
          'Act to reform a Pack',
          'Return to the Jammer Line',
        ],
        correctIndex: 2,
        explanation:
          'When there is no Pack, all Blockers from both teams must act to reform a Pack. This includes stepping or skating counterclockwise, braking, coasting, or coming to a complete stop.',
        ruleReference: '2.3',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'pe-7',
        question: 'Whose responsibility is it to maintain a Pack?',
        options: [
          'Only the Pivots',
          'Only the team that is ahead in points',
          'All Blockers from both teams',
          'The Jammers',
        ],
        correctIndex: 2,
        explanation:
          'It is the responsibility of all Blockers to maintain a Pack, and intentionally destroying the Pack is illegal.',
        ruleReference: '2.3',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'pe-8',
        question: 'What must Blockers outside the Engagement Zone do when warned?',
        options: [
          'Call a timeout',
          'Immediately attempt to return to the Engagement Zone',
          'Sit down on the track',
          'Wait for the next Jam',
        ],
        correctIndex: 1,
        explanation:
          'Blockers who are outside of the Engagement Zone will be warned, and will be penalized if they do not immediately attempt to return to the Engagement Zone.',
        ruleReference: '2.3',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'pe-9',
        question: 'Can a Jammer legally remain outside the Engagement Zone?',
        options: [
          'No, Jammers must stay in the Engagement Zone',
          'Yes, Jammers may legally exit and remain outside the Engagement Zone',
          'Only during their initial trip',
          'Only if they are Lead Jammer',
        ],
        correctIndex: 1,
        explanation:
          'Jammers may legally exit and remain outside of the Engagement Zone. This is a privilege unique to the Jammer position.',
        ruleReference: '2.2.1',
        skillLevels: ['L2', 'L3'],
      },
      {
        id: 'pe-10',
        question: 'Can there be a "No Pack" situation even if Blockers from both teams are on the track?',
        options: [
          'No, there is always a Pack if both teams have Blockers',
          'Yes, if no single group of Blockers contains members from both teams',
          'Only during timeouts',
          'Only if a Jammer is in the Penalty Box',
        ],
        correctIndex: 1,
        explanation:
          'If no single group of Blockers meets the Pack definition (largest group in proximity containing members from both teams), there is no Pack, even if there are multiple groups of the same size.',
        ruleReference: '2.3',
        skillLevels: ['L2', 'L3'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Scoring
  // ─────────────────────────────────────────────
  {
    id: 'scoring',
    title: 'Scoring',
    description: 'Questions about earning points, scoring trips, Not-on-the-Track points, and penalties affecting scoring.',
    icon: '\uD83C\uDFC6',
    sectionId: 'scoring',
    questions: [
      {
        id: 'sc-1',
        question: 'How does a Jammer score a point?',
        options: [
          'By completing a lap of the track',
          'By lapping an opposing Blocker (passing them for the second time)',
          'By passing their own Blockers',
          'By reaching the front of the Pack',
        ],
        correctIndex: 1,
        explanation:
          'Jammers score one point every time they lap an opposing Blocker. This means passing that opponent twice in a row without that opponent having passed the Jammer.',
        ruleReference: '3.1',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'sc-2',
        question: 'What is a "scoring trip"?',
        options: [
          'A trip to the Penalty Box',
          'One pass through the Pack by the Jammer',
          'A full lap of the track by any Skater',
          'When a team scores 10 or more points',
        ],
        correctIndex: 1,
        explanation:
          'Points are grouped by trips through the Pack. One trip ends, and the next begins, when the Jammer exits the front of the Engagement Zone.',
        ruleReference: '3.2',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'sc-3',
        question: 'What is the maximum number of points a Jammer can earn in a single scoring trip?',
        options: [
          'Three',
          'Four',
          'Five',
          'There is no fixed maximum',
        ],
        correctIndex: 1,
        explanation:
          'A Jammer can score up to four points per trip -- one for each opposing Blocker. Additional Not-on-the-Track points can also be earned, but the base is four opposing Blockers.',
        ruleReference: '3.1',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'sc-4',
        question: 'What are "Not on the Track" (NOTT) points?',
        options: [
          'Bonus points for skating fast',
          'Points earned for opponents who are not actively on the track',
          'Points deducted as a penalty',
          'Points earned during timeouts',
        ],
        correctIndex: 1,
        explanation:
          'When a Jammer earns a pass on an opposing Blocker, they also earn a pass on any blockers who are "not on the track" (in the Penalty Box, injured, etc.) and who leave active gameplay before the scoring trip ends.',
        ruleReference: '2.5',
        skillLevels: ['L2', 'L3'],
      },
      {
        id: 'sc-5',
        question: 'When a Jammer is penalized, what happens to their scoring ability?',
        options: [
          'They continue scoring normally',
          'They are considered no longer on the track and cannot earn further passes until the penalty is complete',
          'They lose all points from the current period',
          'Their points transfer to the opposing team',
        ],
        correctIndex: 1,
        explanation:
          'When a Jammer is penalized, they are considered to no longer be on the track. They cannot earn passes on any further opponents until they complete their penalty.',
        ruleReference: '3.4',
        skillLevels: ['L2', 'L3'],
      },
      {
        id: 'sc-6',
        question: 'Can only Blockers be scored upon?',
        options: [
          'No, Jammers can also be scored upon',
          'Yes, only Blockers can be scored upon',
          'No, all Skaters including Officials can be scored upon',
          'Yes, but only opposing Pivots',
        ],
        correctIndex: 1,
        explanation:
          'Only Blockers can be scored upon. All Blockers are considered to be on the same trip, including former Jammers who have passed the Star.',
        ruleReference: '3.1',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'sc-7',
        question: 'For a Jammer\'s pass to be "earned," what must be true?',
        options: [
          'The Jammer must be wearing the Star with the stars showing and be Upright and In Bounds',
          'The Jammer only needs to be on the track',
          'The Jammer must be ahead of all Blockers',
          'The pass must be confirmed by a referee whistle',
        ],
        correctIndex: 0,
        explanation:
          'Jammers only earn a pass if the pass occurs while the Jammer is wearing the Star on their helmet with the stars showing, and the Jammer is Upright and In Bounds during the pass.',
        ruleReference: '2.5',
        skillLevels: ['L2', 'L3'],
      },
      {
        id: 'sc-8',
        question: 'What happens if a Jammer enters the Engagement Zone from the front?',
        options: [
          'They earn bonus points',
          'They return to their previous scoring trip until they exit the front again',
          'The Jam is called off',
          'They are penalized',
        ],
        correctIndex: 1,
        explanation:
          'If a Jammer enters the Engagement Zone from the front, they return to their previous trip until they exit the Engagement Zone from the front again.',
        ruleReference: '3.2',
        skillLevels: ['L2', 'L3'],
      },
      {
        id: 'sc-9',
        question: 'A Jammer removes their own Star while on a scoring trip. What happens to NOTT points they would have earned?',
        options: [
          'Those NOTT points are lost forever',
          'Those NOTT points are earned once the Jammer is able to score again',
          'Those NOTT points go to the opposing Jammer',
          'The Jammer is expelled',
        ],
        correctIndex: 1,
        explanation:
          'If a Jammer renders themself unable to score (e.g., by removing the Star), any Not-On-The-Track points they would have earned while unable to score are earned once they become able to score again.',
        ruleReference: '3.3',
        skillLevels: ['L3'],
      },
      {
        id: 'sc-10',
        question: 'During overtime, when do Jammers begin scoring?',
        options: [
          'On their second trip through the Pack, like a normal Jam',
          'On their first trip through the Pack',
          'Only after the first 30 seconds',
          'They cannot score during overtime',
        ],
        correctIndex: 1,
        explanation:
          'During Overtime, both Jammers begin scoring on their first trip through the Pack. Each Jammer is in position to lap the opposing Blockers on their first earned pass.',
        ruleReference: '1.5.1',
        skillLevels: ['L2', 'L3'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. Contact Rules
  // ─────────────────────────────────────────────
  {
    id: 'contact-rules',
    title: 'Contact Rules',
    description: 'Questions about legal and illegal contact zones, blocking rules, and JRDA skill-level-specific contact rules.',
    icon: '\uD83D\uDCA5',
    sectionId: 'penalties',
    questions: [
      {
        id: 'cr-1',
        question: 'In a JRDA Skill Level 1 game, what type of contact is allowed?',
        options: [
          'Full contact like adult roller derby',
          'Only Lean Blocking (gentle contact first)',
          'Only Positional Blocking; intentional contact with an opponent is prohibited',
          'No blocking of any kind is allowed',
        ],
        correctIndex: 2,
        explanation:
          'At Skill Level 1, only Positional Blocking is allowed. Intentional contact with an opponent is prohibited.',
        ruleReference: 'J2.4.5',
        skillLevels: ['L1'],
      },
      {
        id: 'cr-2',
        question: 'In a JRDA Skill Level 2 game, what type of blocking is allowed?',
        options: [
          'No blocking at all',
          'Only Positional Blocking',
          'Lean Blocking -- gentle initiation of contact, then force may be applied to legal zones',
          'Full WFTDA contact',
        ],
        correctIndex: 2,
        explanation:
          'At Skill Level 2, only Lean Blocking is allowed. Initiating Forceful Contact is prohibited. After gentle initial contact, players may apply force to legal Target Zones with legal Blocking Zones.',
        ruleReference: 'J2.4.5',
        skillLevels: ['L2'],
      },
      {
        id: 'cr-3',
        question: 'In a Skill Level 1 game, a Skater lifts a skate to lean into an opponent. Is this legal?',
        options: [
          'Yes, leaning is always fine',
          'No, lifting a skate to apply pressure is considered Forceful Contact and is penalized at L1',
          'Yes, as long as they use their torso',
          'Only if the opponent is a Jammer',
        ],
        correctIndex: 1,
        explanation:
          'At Skill Level 1, any avoidable Forceful Contact should be penalized. Lifting a skate to apply pressure is considered Forceful Contact.',
        ruleReference: 'J4.1.6',
        skillLevels: ['L1'],
      },
      {
        id: 'cr-4',
        question: 'At Skill Level 3, what contact rules apply?',
        options: [
          'No contact is allowed',
          'Only Positional Blocking',
          'Only Lean Blocking',
          'All contact otherwise considered legal in The Rules of Flat Track Roller Derby',
        ],
        correctIndex: 3,
        explanation:
          'Skaters in a JRDA Skill Level 3 game can initiate any contact that is otherwise legal as defined by The Rules of Flat Track Roller Derby.',
        ruleReference: 'J2.4.5',
        skillLevels: ['L3'],
      },
      {
        id: 'cr-5',
        question: 'Which of the following is a legal Target Zone (area you may block)?',
        options: [
          'The back of the body',
          'The head and neck',
          'The chest, front and sides of the torso, arms, hands, hips, and front of legs above mid-thigh',
          'Below the knees',
        ],
        correctIndex: 2,
        explanation:
          'It is only legal to initiate a block to an opponent\'s chest, front and sides of the torso, arms, hands, hips, and the front and sides of the legs above mid-thigh.',
        ruleReference: '2.4.1',
        skillLevels: ['L2', 'L3'],
      },
      {
        id: 'cr-6',
        question: 'Which body parts are legal Blocking Zones (parts you can block with)?',
        options: [
          'Head, elbows, and knees',
          'Torso, arms above the elbow, and legs above mid-thigh',
          'Hands and forearms only',
          'Any body part',
        ],
        correctIndex: 1,
        explanation:
          'It is only legal to initiate a block using one\'s torso, arms above the elbow, and legs above mid-thigh. Forearms are legal when held close against the initiator\'s torso.',
        ruleReference: '2.4.2',
        skillLevels: ['L2', 'L3'],
      },
      {
        id: 'cr-7',
        question: 'Is it legal for Skaters to link arms to form an impenetrable wall?',
        options: [
          'Yes, it is a common defensive strategy',
          'Only if they are from the same team',
          'No, Skaters may not form a wall by linking with or grasping a teammate',
          'Only during the initial trip',
        ],
        correctIndex: 2,
        explanation:
          'Skaters may not form a wall by linking with or grasping a teammate, or otherwise forming an impenetrable connection. This is a Multiplayer Block penalty.',
        ruleReference: '4.1.4',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'cr-8',
        question: 'In a Skill Level 2 game, a Skater swings their hips forcefully to initiate contact. Is this legal?',
        options: [
          'Yes, hips are a legal Blocking Zone',
          'No, Forceful Contact initiated by swinging hips or shoulders is penalized at L2',
          'Only if the target is in a legal zone',
          'Only the Jammer may do this',
        ],
        correctIndex: 1,
        explanation:
          'At Skill Level 2, Forceful Contact initiated by swinging the hips, shoulders, or other legal blocking zones should be penalized. Contact must be initiated gently first.',
        ruleReference: 'J4.1.6',
        skillLevels: ['L2'],
      },
      {
        id: 'cr-9',
        question: 'Forceful contact to the head or neck should be penalized:',
        options: [
          'Only if it causes the opponent to fall',
          'Only if it was intentional',
          'Regardless of impact',
          'Only at Skill Level 3',
        ],
        correctIndex: 2,
        explanation:
          'For safety reasons, any forceful contact to the head or neck should be penalized regardless of impact. Avoidable forceful contact to the back is also penalized regardless of impact.',
        ruleReference: '4.1.1',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'cr-10',
        question: 'What is "Positional Blocking"?',
        options: [
          'Blocking while standing still',
          'Positioning oneself to impede an opponent\'s speed or movement without physical contact',
          'Blocking from behind an opponent',
          'Using your arms to push an opponent',
        ],
        correctIndex: 1,
        explanation:
          'Positional Blocking refers to any attempt to position oneself so that an opponent\'s speed or movement is impeded without the use of contact, whether or not the action is successful.',
        ruleReference: '2.4',
        skillLevels: ['L1', 'L2', 'L3'],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. Penalties & Procedures
  // ─────────────────────────────────────────────
  {
    id: 'penalties-procedures',
    title: 'Penalties & Procedures',
    description: 'Questions about penalty types, the penalty box, fouling out, and expulsions.',
    icon: '\u26A0\uFE0F',
    sectionId: 'penalties',
    questions: [
      {
        id: 'pp-1',
        question: 'How long does a Skater serve in the Penalty Box for each penalty?',
        options: [
          '15 seconds of Jam time',
          '30 seconds of Jam time',
          '60 seconds of Jam time',
          '2 minutes of Jam time',
        ],
        correctIndex: 1,
        explanation:
          'Skaters serve 30 seconds of Jam time for each penalty assessed to them. The final 10 seconds must be served while standing.',
        ruleReference: '4.4',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'pp-2',
        question: 'How many penalties cause a Skater to foul out of the game?',
        options: [
          'Five',
          'Six',
          'Seven',
          'Ten',
        ],
        correctIndex: 2,
        explanation:
          'When seven penalties are recorded for a Skater, that Skater fouls out of the game. This includes penalties assessed on behalf of someone else.',
        ruleReference: '4.5',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'pp-3',
        question: 'What must a JRDA skater do after being removed from a game (foul out or expulsion)?',
        options: [
          'Leave the venue immediately',
          'Go to the locker room alone',
          'Report to the Designated Chaperone for their team',
          'Sit in the Penalty Box for the rest of the game',
        ],
        correctIndex: 2,
        explanation:
          'A JRDA skater removed from the game must report to the Designated Chaperone for that skater\'s team and may not be forced to leave the competition area unsupervised.',
        ruleReference: 'J4.5.1',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'pp-4',
        question: 'How many Blockers from the same team can sit in the Penalty Box at the same time?',
        options: [
          'One',
          'Two',
          'Three',
          'Unlimited',
        ],
        correctIndex: 1,
        explanation:
          'No more than two Blockers for the same team may sit in the Penalty Box at the same time. A third Blocker will be placed In Queue and instructed to return to play.',
        ruleReference: '4.4.1',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'pp-5',
        question: 'What happens when both Jammers are sent to the Penalty Box?',
        options: [
          'The Jam is immediately called off',
          'They both serve full penalties independently',
          'They serve equivalent time and one is released as soon as the other sits',
          'The team Captains serve in their place',
        ],
        correctIndex: 2,
        explanation:
          'When both Jammers receive penalties, they serve as little time as possible. A Jammer who is to be released due to the other Jammer sitting should be released immediately once the other Jammer sits.',
        ruleReference: '4.4.2',
        skillLevels: ['L2', 'L3'],
      },
      {
        id: 'pp-6',
        question: 'What is "cutting the track"?',
        options: [
          'Skating in a zigzag pattern',
          'Using the out-of-bounds area to gain position on someone who is Upright and In Bounds',
          'Skating clockwise around the track',
          'Leaving the track to avoid a block',
        ],
        correctIndex: 1,
        explanation:
          'It is illegal for a Skater to use the out-of-bounds area to gain position on someone who is Upright and In Bounds. Skaters who are Out of Bounds must return behind any Upright and In-Bounds Skater they were behind when they left the track.',
        ruleReference: '4.2.2',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'pp-7',
        question: 'Who has the authority to expel a Skater from the game?',
        options: [
          'Any referee',
          'The team Captain',
          'Only the Head Referee',
          'The opposing team\'s Coach',
        ],
        correctIndex: 2,
        explanation:
          'Only the Head Referee has the authority to expel Skaters and coaches. Other Officials may recommend expulsions to the Head Referee.',
        ruleReference: '4.5',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'pp-8',
        question: 'Is penalty time counted between Jams?',
        options: [
          'Yes, the clock always runs',
          'No, penalties are only timed while a Jam is in progress',
          'Only during the second period',
          'Only during overtime',
        ],
        correctIndex: 1,
        explanation:
          'Penalties are only timed while a Jam is in progress. Penalty timing is paused between Jams, and timing for Skaters who sit between Jams does not begin until the start of the following Jam.',
        ruleReference: '4.4',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'pp-9',
        question: 'If a Skater is put Out of Bounds by an opponent\'s block, where must they return to the track?',
        options: [
          'Anywhere they want',
          'At the Jammer Line',
          'Behind the opponent who blocked them',
          'In front of all Blockers',
        ],
        correctIndex: 2,
        explanation:
          'If a Skater is put Out of Bounds due to an opponent\'s block, the Skater must return In Bounds behind that opponent, even if the Skater was in front of the opponent before being blocked.',
        ruleReference: '4.2.2',
        skillLevels: ['L1', 'L2', 'L3'],
      },
      {
        id: 'pp-10',
        question: 'What protective gear may a Skater remove while seated in the Penalty Box?',
        options: [
          'Any protective gear they want',
          'Only their mouthguard',
          'Only their helmet',
          'None -- all gear must stay on',
        ],
        correctIndex: 1,
        explanation:
          'Skaters may remove their mouthguard, but no other protective gear, while seated in the Penalty Box. They must replace their mouthguard before leaving.',
        ruleReference: '4.4.4',
        skillLevels: ['L1', 'L2', 'L3'],
      },
    ],
  },
];
