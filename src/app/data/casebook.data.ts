import { CasebookScenario } from '../models/casebook';

export const CASEBOOK_SCENARIOS: CasebookScenario[] = [
  // =============================================
  // Section 2: Gameplay
  // =============================================

  // 2.2. Skater Roles
  {
    id: 'c2.2-1',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.F',
    situation: 'White Pivot is seated in the Penalty Box. Between Jams, three White Blockers — one of whom is wearing a Stripe — line up on the track.',
    choices: [
      'The Officials should send the extra White Pivot back to the bench.',
      'The Officials should direct the White Blocker on the track to remove their Stripe.',
      'Both Skaters wearing a Stripe should be penalized.',
      'The Jam should not start until the Stripe issue is resolved.'
    ],
    correctIndex: 1,
    outcome: 'If the Jam starts with two White Skaters wearing the Stripe, the Officials should direct the White Blocker on the track to remove their Stripe.',
    rationale: 'The Skater seated in the Box is considered to be the White Pivot for the Jam. As the White team fielded the correct number of Blockers, there is no need to send the "extra" White Pivot back to their bench.',
    keepInMind: 'If the White Blocker refuses to remove the Stripe, that White Blocker should be penalized. Refusal to obey an instruction about improper gameplay is insubordinate. If the White Blocker engages in any privileges reserved for the Pivot before they have removed the Stripe, even if no warning has yet been issued, that White Blocker should be penalized, as their illegal Stripe had impact on the game.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 2.2.1. Jammers
  {
    id: 'c2.2.1-1',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.1.A',
    situation: 'Red and White Skaters repeatedly shift positions between Jams. As the Jam starts, Red 34 is lined up fully behind the Jammer Line but is not wearing the Star, while Red 27 is lined up fully in front of the Jammer Line and is wearing the Star.',
    choices: [
      'Red 34 is the Jammer because they are behind the Jammer Line.',
      'Red 27 is the Jammer because they have the Star.',
      'Neither is the Jammer; the Jam should be called off.',
      'Both receive penalties, and the team has no Jammer for this Jam.'
    ],
    correctIndex: 1,
    outcome: 'Red 27 is the Jammer.',
    rationale: 'Red 27 is the Skater in possession of the Star. The Star denotes who the Jammer is. Both Skaters should receive a penalty for beginning the Jam fully out of position.',
    keepInMind: 'Once the Jam starts, the Jammer Referee should communicate to Red 27 that they are the Jammer for this Jam. Since the rules do not accommodate Jammers who forget their helmet covers, starting position should not take precedence over wearing the Star. In this case, both the Jammer (Red 27) and the Blocker (Red 34) have started the Jam in illegal starting positions.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c2.2.1-2',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.1.B',
    situation: 'Before the Jam-Starting Whistle, Red Jammer skates backward. They come to a quick stop and sprint forward at the Jam-Starting Whistle.',
    choices: [
      'This is always a false start regardless of direction at the whistle.',
      'If Red Jammer was moving clockwise or stopped when the whistle occurred, nothing should be done. If they turned counterclockwise earlier and was gaining speed, it should be treated as a false start.',
      'Red Jammer should be penalized for skating backward before the whistle.',
      'No action needed; Jammers can move freely before the whistle.'
    ],
    correctIndex: 1,
    outcome: 'If Red Jammer was moving clockwise or stopped when the whistle occurred, nothing should be done. If Red Jammer turned counterclockwise earlier and was gaining speed, this should be treated as a false start.',
    rationale: 'Jammers may not be gaining speed counterclockwise at the Jam-Starting Whistle.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 2.2.2. Lead Jammer
  {
    id: 'c2.2.2-1',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.2.A',
    situation: 'Red Jammer starts the Jam with their helmet cover inside-out. The stars are not visible with high contrast. They remove the cover, invert it, and put it back on their helmet. They then legally pass all Skaters, including the foremost Blocker.',
    choices: [
      'Red Jammer is not declared Lead because they removed the Star.',
      'Red Jammer is declared Lead.',
      'Red Jammer loses Lead eligibility for manipulating the Star.',
      'The Officials should have stopped play when the Star was inside-out.'
    ],
    correctIndex: 1,
    outcome: 'Red Jammer is declared Lead.',
    rationale: 'Since Red Jammer did not have the ability to gain Lead prior to removing the Star from their head, they did not lose that ability.',
    keepInMind: 'If Red Jammer had removed the Star when the stars were visible, they would have lost the ability to gain Lead.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c2.2.2-2',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.2.B',
    situation: 'Red Jammer exits the Engagement Zone but does not earn Lead Jammer. White Jammer is knocked down, but not Out of Bounds. While White Jammer is down, the opposing Blockers — including the foremost Blocker — all skate clockwise behind them. White Jammer then stands back up.',
    choices: [
      'No Jammer earns Lead this Jam.',
      'Red Jammer should be declared Lead since they exited the Engagement Zone first.',
      'White Jammer should be declared Lead when they stand.',
      'White Jammer cannot earn Lead because they were knocked down.'
    ],
    correctIndex: 2,
    outcome: 'White Jammer should be declared Lead when they stand.',
    rationale: 'By skating clockwise behind White Jammer, the Red Blockers gave up their superior position. As such, White Jammer earned those passes and they count toward earning Lead.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c2.2.2-3',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.2.C',
    situation: 'White Jammer makes their way through the Pack on their initial trip, while Red Jammer remains stuck at the rear. Through numerous blocks and changes in position, White Jammer earns a pass on all Blockers, but none of them are the foremost Blocker in the Pack when White Jammer earns the pass.',
    choices: [
      'White Jammer is declared Lead immediately.',
      'The Jammer Referee should not declare White Jammer Lead yet.',
      'White Jammer earns Lead because they passed all Blockers.',
      'Red Jammer is declared Lead because White Jammer did not pass the foremost Blocker.'
    ],
    correctIndex: 1,
    outcome: 'The Jammer Referee should not declare White Jammer Lead (yet).',
    rationale: 'White Jammer has earned a pass on all Blockers, but has never established superior position to the foremost Blocker in the Pack. Lead Jammer is earned when the Jammer has earned a pass on all in-play Blockers and established a superior position to the foremost in-play Blocker.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c2.2.2-4',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.2.D',
    situation: 'Red Jammer passes all Blockers on their initial trip through the Pack, except for one White Blocker. Red Jammer legally pushes White Blocker to the front of the Engagement Zone, and then out of play.',
    choices: [
      'Red Jammer is declared Lead as soon as White Blocker leaves the Engagement Zone.',
      'Red Jammer cannot earn Lead because they did not pass all Blockers.',
      'No Lead is declared because White Blocker was pushed out of play.',
      'Red Jammer must wait for White Blocker to return to play before Lead can be declared.'
    ],
    correctIndex: 0,
    outcome: 'Red Jammer is declared Lead as soon as White Blocker leaves the front of the Engagement Zone.',
    rationale: 'Red Jammer only needs to pass the in-play Blockers to earn Lead Jammer.',
    keepInMind: 'In JRDA Skill Level 1 gameplay, intentional contact is prohibited. The Red Jammer in this case is penalized for Illegal Contact ("Hitting") and is not declared Lead.',
    skillLevels: ['L2', 'L3']
  },
  {
    id: 'c2.2.2-5',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.2.E',
    situation: 'White Jammer and Red Jammer are both ahead of all Blockers except White Pivot. Red Jammer is ahead of White Jammer, and pushes White Pivot legally out of the Engagement Zone.',
    choices: [
      'White Jammer is declared Lead.',
      'Red Jammer is declared Lead.',
      'No Lead is declared because White Pivot was pushed out.',
      'Both Jammers are declared Lead simultaneously.'
    ],
    correctIndex: 1,
    outcome: 'Red Jammer is declared Lead.',
    rationale: 'At the moment that White Pivot left play, both Jammers had passed all in play Blockers. Because Red Jammer was foremost, Red Jammer was declared Lead.',
    keepInMind: 'In JRDA Skill Level 1 gameplay, intentional contact is prohibited. The Red Jammer in this case is penalized for Illegal Contact ("Hitting") and is not declared Lead.',
    skillLevels: ['L2', 'L3']
  },
  {
    id: 'c2.2.2-6',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.2.F',
    situation: 'Red Jammer passes all Blockers on their initial trip through the Pack, except White Pivot. Due to unrelated gameplay, Officials declare a No Pack situation. Red Jammer remains behind White Pivot.',
    choices: [
      'Red Jammer is declared Lead because of the No Pack situation.',
      'The Jammer Referee should not declare Red Jammer Lead yet.',
      'Red Jammer earns Lead automatically when No Pack is declared.',
      'Neither Jammer can earn Lead during a No Pack situation.'
    ],
    correctIndex: 1,
    outcome: 'The Jammer Referee should not declare Red Jammer Lead (yet).',
    rationale: 'Although White Pivot is now out of play, No Pack situations are different from Out of Play situations regarding earning passes and gaining position to earn Lead Jammer status. During a No Pack situation, a Jammer must still earn passes and may not illegally gain position on Skaters while the Jammer is out of bounds.',
    keepInMind: 'As White Pivot is currently the foremost Blocker, Red Jammer could earn Lead Jammer status by passing White Pivot. If the Pack was reformed and White Pivot was ahead of the Engagement Zone, at that point Red Jammer would meet the requirements to earn Lead Jammer status.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 2.2.4. Passing the Star
  {
    id: 'c2.2.4-1',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.4.A',
    situation: 'White Jammer removes their helmet cover and directly hands it to a White Non-Pivot Blocker. White Jammer releases the helmet cover. White Non-Pivot Blocker immediately drops the helmet cover.',
    choices: [
      'White Jammer is penalized for an illegal Star Pass.',
      'White Non-Pivot Blocker is penalized for touching the Star.',
      'No penalty.',
      'Both Skaters are penalized for the illegal Star Pass.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'While White Jammer may only pass the Star to their Pivot, because the White Blocker immediately dropped the Star, there has been no impact on gameplay.',
    keepInMind: 'If White Blocker did not immediately relinquish control of the helmet cover, a penalty would be issued to White Jammer. If White Jammer were holding the Star and White Blocker wrested it from their grasp, it would have been White Blocker who initiated the illegal Star Pass, and thus White Blocker would be penalized.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c2.2.4-2',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.4.B',
    situation: 'White Jammer removes their helmet cover and hands it to White Pivot. Before White Jammer releases their grip on the Star, White Pivot is knocked Out of Bounds. White Jammer then releases the Star to the out-of-bounds Pivot.',
    choices: [
      'The Star Pass is successful; White Pivot is now the Jammer.',
      'The Star Pass is unsuccessful. Both Skaters retain their existing Roles. No penalty is warranted, but the Pivot is warned they are not the Jammer.',
      'White Jammer is penalized for passing the Star to an out-of-bounds Skater.',
      'White Pivot is penalized for being out of bounds during the Star Pass.'
    ],
    correctIndex: 1,
    outcome: 'The Star Pass is unsuccessful. Both Skaters retain their existing Roles. No penalty is warranted at this time, but the Pivot is warned they are not the Jammer.',
    rationale: 'Although White Jammer attempted to pass the Star while White Pivot was eligible, a Star Pass is a single point of exchange: the moment at which the Star is released. Since the Skaters\' Roles are not affected, and it is legal for the Pivot to control the helmet cover, there is no impact on gameplay.',
    keepInMind: 'If, after being warned that they are not the Jammer, the Pivot puts the Star on (or fails to remove it), they should be penalized.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c2.2.4-3',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.4.C',
    situation: 'White Pivot\'s Stripe falls off in normal gameplay. White Jammer removes their helmet cover, hands it to White Pivot, and releases the Star.',
    choices: [
      'The Star Pass is successful; White Pivot becomes the Jammer.',
      'The Star Pass is unsuccessful. Both Skaters retain their existing Roles. No penalty is warranted, but the Pivot is instructed to drop the Star.',
      'White Jammer is penalized for passing to a Pivot without a visible Stripe.',
      'White Pivot is penalized for accepting the Star without a Stripe.'
    ],
    correctIndex: 1,
    outcome: 'The Star Pass is unsuccessful. Both Skaters retain their existing Roles. No penalty is warranted at this time, but the Pivot is instructed to drop the Star.',
    rationale: 'A Pivot who is not visibly wearing the Stripe cannot use the privileges of being a Pivot, such as receiving a Star Pass or even recovering the Star after an incomplete Star Pass. Because the Pivot\'s helmet cover came off due to gameplay (as opposed to the Pivot intentionally removing it), they are warned that they are not the Pivot and allowed to relinquish control of the Star.',
    keepInMind: 'Once White Pivot is aware that they are not visibly wearing the Stripe, they must immediately relinquish control of the Star.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c2.2.4-4',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.4.D',
    situation: 'Red 21 is the Jammer. They remove their helmet cover and throw it at Red 45, who is the Pivot. Red 45 (still the Pivot) catches the helmet cover and hands it back to Red 21 (still the Jammer). Both Skaters grip the Star, then Red 21 releases it. Red 45 maintains control of the Star and puts it on their helmet.',
    choices: [
      'The Star Pass is incomplete because the Star was thrown.',
      'Red 45 is now the Jammer.',
      'Red 21 remains the Jammer because the throw invalidated the Star Pass.',
      'Both Skaters are penalized for the unusual Star Pass.'
    ],
    correctIndex: 1,
    outcome: 'Red 45 is now the Jammer.',
    rationale: 'Throwing the Star is an incomplete Star Pass, not an illegal one. A Star Pass cannot be successfully completed by throwing. Catching the Star (out of the air) is equivalent to retrieving it (from the floor); the Pivot is not required to let the Star fall to the track first. Once Red Jammer clutches the helmet cover, they reestablish their control of the Star regardless of whether the Pivot lets go or not. They then complete the Star Pass in a legal fashion.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c2.2.4-5',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.4.E',
    situation: 'While moving through the Pack, the Star comes off Red Jammer\'s helmet and sticks to the Velcro on White Blocker\'s wrist guard. White Blocker pulls the helmet cover free and drops it.',
    choices: [
      'White Blocker is penalized for controlling the Star.',
      'White Blocker is not issued a penalty.',
      'Red Jammer is penalized for losing control of the Star.',
      'The Jam should be called off due to the Star being on the wrong Skater.'
    ],
    correctIndex: 1,
    outcome: 'White Blocker is not issued a penalty.',
    rationale: 'White Blocker gained temporary possession of the helmet cover and dropped it. Because White Blocker did not intentionally attempt to remove the Star from Red Jammer\'s helmet, they should not be issued a penalty for accidentally coming into control of the Star as long as they immediately relinquish control of the Star. The Star may get moved as part of normal gameplay, but may not be controlled by anyone other than the Jammer or Pivot.',
    keepInMind: 'If White Blocker had not touched the Star, which was stuck to their wrist guard and allowed Red Jammer or Pivot to recover it once they were aware of it, similarly no penalty would be warranted. If White Blocker had pulled the Star off their Velcro, but not immediately relinquished control of the Star once they removed it from their wrist guard, a penalty would be warranted.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c2.2.4-6',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.4.F',
    situation: 'White Jammer legally passes the Star to White Pivot. Later in the Jam, White Pivot-turned-Jammer receives a penalty and goes to the Penalty Box. The Jam ends and Red team calls an Official Review. As a result of the review, the original White Jammer receives a penalty for an illegal action they took as Jammer.',
    choices: [
      'The original White Jammer serves the penalty immediately as a Blocker.',
      'The additional penalty should be served by White Pivot-turned-Jammer and recorded for the original White Jammer. The original White Jammer should not be allowed to participate in the game until time for the penalty they earned has completed.',
      'The penalty is assigned to the White team Captain instead.',
      'The penalty is dismissed because the Skater is no longer the Jammer.'
    ],
    correctIndex: 1,
    outcome: 'The additional penalty should be served by White Pivot-turned-Jammer and recorded for the original White Jammer. The original White Jammer should not be allowed to participate in the game until time for the penalty they earned has completed.',
    rationale: 'White Jammer legally passed the Star, making White Pivot the new Jammer, but received a penalty upon review for an action committed while they were the Jammer. This would put two different White Skaters in the Box as a Jammer. A penalty is assigned to a Skater. The penalty time is assigned to a Role, with the Skater originally in the Role not allowed to participate until it has been served.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 2.2.6. Skater Starting Locations
  {
    id: 'c2.2.6-1',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.6.A',
    situation: 'As the Jam-Starting Whistle sounds, Red Jammer\'s left skate has rolled forward, past the Jammer Line.',
    choices: [
      'Red Jammer is immediately penalized for illegal positioning.',
      'Red Jammer is issued a False Start warning and must yield their position to all Skaters in their immediate vicinity.',
      'No action is taken; minor positioning issues are ignored.',
      'The Jam is restarted with correct positioning.'
    ],
    correctIndex: 1,
    outcome: 'Red Jammer is issued a False Start warning and must yield their position to all Skaters in their immediate vicinity. If they do not Yield, they will receive a penalty.',
    rationale: 'At the Jam-Starting Whistle, Red Jammer was touching both their correct starting location and an illegal starting location.',
    keepInMind: 'Until they have been issued this warning, they cannot be penalized for failure to Yield.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c2.2.6-2',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.6.B',
    situation: 'As the Jam-Starting Whistle sounds, White Pivot has lined up entirely in front of the Pivot Line.',
    choices: [
      'White Pivot is issued a False Start warning and must yield.',
      'White Pivot immediately receives a penalty for illegal positioning.',
      'White Pivot is sent back to their bench.',
      'No action; Pivots can line up anywhere near the Pivot Line.'
    ],
    correctIndex: 1,
    outcome: 'White Pivot immediately receives a penalty for illegal positioning.',
    rationale: 'White Pivot was entirely out of position, having both skates ahead of the Pivot Line. They are immediately penalized, rather than warned and allowed to yield, because this is a flagrant violation of the rules regarding starting positions.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c2.2.6-3',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.6.C',
    situation: 'As the Jam-Starting Whistle sounds, White Blocker is Out of Bounds on the inside of the track.',
    choices: [
      'White Blocker receives a penalty for illegal positioning.',
      'White Blocker is issued a False Start warning.',
      'White Blocker is directed to return to their bench and cannot participate in the Jam.',
      'White Blocker must yield to nearby Skaters.'
    ],
    correctIndex: 2,
    outcome: 'White Blocker is directed to return to their bench and cannot participate in the Jam.',
    rationale: 'White Blocker was not on the track at the start of the Jam and cannot participate in that Jam.',
    keepInMind: 'Even if White Blocker were Straddling, they would still be considered Out of Bounds, thus not on the track, thus not allowed to participate in the Jam.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c2.2.6-4',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.6.D',
    situation: 'All White Blockers (including White Pivot) line up legally between Jams at the Pivot Line, but not touching the line. Red Pivot lines up behind them. Immediately before the Jam starts, Red Pivot reaches forward with their leg and places their skate on the Pivot Line.',
    choices: [
      'Red Pivot is penalized for illegal positioning.',
      'The White Non-Pivot Blockers should all be issued False Start warnings, and must Yield their positions to all nearby Skaters.',
      'No action is needed; Red Pivot touched the line legally.',
      'The Jam should be restarted.'
    ],
    correctIndex: 1,
    outcome: 'The White Non-Pivot Blockers should all be issued False Start warnings, and must Yield their positions to all nearby Skaters; any who do not Yield should receive a penalty.',
    rationale: 'Red Pivot established their position in contact with the Pivot Line before the beginning of the Jam. Non-Pivot Blockers must begin the Jam behind the hips of any Pivots in contact with the Pivot Line. All Non-Pivot Blockers with hips ahead of the Red Pivot are therefore required to Yield.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c2.2.6-5',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.6.E',
    situation: 'In an attempt to reach the track before the Jam begins, Red Blocker jumps from out of bounds. The Jam-Starting Whistle blows while they are still airborne. Red Blocker lands in bounds and upright after the Jam begins.',
    choices: [
      'Red Blocker may participate in the Jam since they landed in bounds.',
      'Red Blocker attempted to enter the track from an out of bounds state and was still airborne at the start of the Jam. They should be ordered back to their bench and may not participate in the Jam.',
      'Red Blocker receives a penalty for the illegal entry.',
      'Red Blocker must yield to all nearby Skaters.'
    ],
    correctIndex: 1,
    outcome: 'Red Blocker attempted to enter the track from an out of bounds state and was still airborne at the start of the Jam. They should be ordered back to their bench and may not participate in the Jam.',
    rationale: 'While airborne, a Skater retains the attributes of their previous status. Red Blocker\'s previous status was Out of Bounds. As such, they remain Out of Bounds while airborne. Red Blocker was not on the track when the Jam began.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c2.2.6-6',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.6.F',
    situation: 'As the Jam-Starting Whistle sounds, Red Pivot\'s left skate has rolled backward, behind the Jammer Line. Red Pivot is issued a False Start warning. Red Pivot disengages from play, attempting to Yield to Skaters in the immediate proximity. No other Skaters take advantage of Red Pivot\'s attempt to Yield.',
    choices: [
      'Red Pivot is penalized for the False Start.',
      'Red Pivot is no longer required to Yield and may continue to play.',
      'Red Pivot must continue yielding until the end of the Jam.',
      'Red Pivot must return behind the Jammer Line.'
    ],
    correctIndex: 1,
    outcome: 'Red Pivot is no longer required to Yield and may continue to play.',
    rationale: 'Red Pivot made a genuine attempt to Yield their position, allowing time for Skaters in proximity to take advantage. Giving Skaters in the immediate vicinity a reasonable opportunity to take advantage, even if that opportunity is not exercised, is enough to relieve Red Pivot of their requirement to Yield.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c2.2.6-7',
    sectionId: 'gameplay',
    ruleReference: 'C2.2.6.GH',
    situation: 'All four Red Blockers line up directly behind the Pivot Line, leaving no room for another Skater to be legally positioned in front of them. White Blocker positions themself in front of the Red Blockers by straddling the Pivot Line.',
    choices: [
      'White Blocker is issued a False Start warning.',
      'White Blocker is penalized immediately upon the Jam-Starting Whistle.',
      'No penalty; straddling is a legal position.',
      'Red Blockers are penalized for blocking the Pivot Line.'
    ],
    correctIndex: 1,
    outcome: 'White Blocker is penalized immediately upon the Jam-Starting Whistle.',
    rationale: 'Even though the White Blocker is partially legally positioned, they have intentionally adopted an illegal starting position to gain an advantage. Even if a False Start warning was issued, the White Blocker has already gained a strategic advantage by being positioned ahead of the Red Wall and impeding the Red Blockers\' ability to immediately move forward. Because of this advantage and the intentional nature of the illegal position, an immediate penalty is warranted.',
    keepInMind: 'If White Blocker had been touching or had part of their skate ahead of the Pivot Line, but are otherwise not ahead of it, a False Start warning should be issued, and they should be given an opportunity to yield their position. If the Red Blockers moved towards the Jammer Line so that the White Blocker\'s immediate advantage is removed, then a False Start Warning should be given.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 2.3. Pack & Engagement Zone
  {
    id: 'c2.3-1',
    sectionId: 'gameplay',
    ruleReference: 'C2.3.A',
    situation: 'Red Blocker 1 blocks White Blocker 1 out of bounds. There are no White Blockers within 10 ft (3.05 m) of any Red Blockers.',
    choices: [
      'Red Blocker 1 is penalized for destroying the Pack.',
      'No Pack. No penalty. White Blocker 1 must return in bounds to reform the Pack as soon as they legally can do so, and Red Blocker 1 must skate counterclockwise to allow White Blocker 1 to do so.',
      'White Blocker 1 is penalized for going out of bounds.',
      'The Jam is called off due to No Pack.'
    ],
    correctIndex: 1,
    outcome: 'No Pack. No penalty. White Blocker 1 must return in bounds to reform the Pack as soon as they legally can do so, and Red Blocker 1 must skate counterclockwise to allow White Blocker 1 to do so.',
    rationale: 'Because there were no White Blockers within 10 ft (3.05 m) of any Red Blockers, no Pack could be defined. All Blockers must work together to allow a Pack to reform as quickly as possible.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c2.3-2',
    sectionId: 'gameplay',
    ruleReference: 'C2.3.B',
    situation: 'The Red wall skates forward slowly while the White Blockers stand still. White Pivot is between the two groups.',
    choices: [
      '"No Pack" is declared. Red Blockers are penalized.',
      '"No Pack" is declared. White Pivot is penalized.',
      '"No Pack" is declared. No penalty.',
      'The Pack is maintained because White Pivot bridges the groups.'
    ],
    correctIndex: 2,
    outcome: '"No Pack" is declared. No penalty.',
    rationale: 'The Red Blockers\' slow skating provided opportunity for White Pivot to maintain a Pack, so the Red Blockers should not be penalized. White Pivot is not required to maintain the Pack, but is required to work to reform a Pack if there is no Pack. Also, White Pivot is prohibited from making sudden movements that destroy the Pack.',
    keepInMind: 'If, instead of moving forward, the Red Blockers stayed still while White Pivot skated backward or took a knee, White Pivot should be penalized. Roller derby is played in the counterclockwise direction, so clockwise movement is held to a different standard than counterclockwise movement, and taking a knee is always a sudden action. Subtle movements such as shifting one\'s weight while standing should not be considered sudden actions.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 2.5. Passing
  {
    id: 'c2.5-1',
    sectionId: 'gameplay',
    ruleReference: 'C2.5.A',
    situation: 'White Jammer is on their second trip through the Pack and has not yet earned any passes on Red Blockers. Red Pivot receives a penalty, and begins to exit the track. White Jammer passes Red Pivot while Red Pivot is still touching in bounds.',
    choices: [
      'No points; Red Pivot is penalized and cannot be scored upon.',
      'One point.',
      'The pass does not count because Red Pivot is exiting.',
      'Two points: one for Red Pivot and one for the penalty.'
    ],
    correctIndex: 1,
    outcome: 'One point.',
    rationale: 'Blockers who have been directed to the Penalty Box but are still touching in bounds (including straddling) can still be scored upon as if they had not been penalized. White Jammer earns a pass on penalized Red Pivot by gaining superior position before Red Pivot exits the track.',
    keepInMind: 'If there were other Red Blockers in the Penalty Box, earning a pass on Red Pivot would also result in earned passes on those penalized Red Blockers.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // =============================================
  // Section 3: Scoring
  // =============================================

  // 3.1. Earning Points
  {
    id: 'c3.1-1',
    sectionId: 'scoring',
    ruleReference: 'C3.1.A',
    situation: 'Red Jammer approaches the Pack for their second trip. Red Jammer passes all opponents except a White Non-Pivot Blocker, who blocks Red Jammer out, forcing Red Jammer to reenter behind the Pack. Before Red Jammer reenters the Pack, White Jammer passes the Star to White Pivot. Red Jammer reenters the Pack, passes all opponents again, and exits the Engagement Zone.',
    choices: [
      'Two points.',
      'Three points.',
      'Four points.',
      'Five points.'
    ],
    correctIndex: 2,
    outcome: 'Four points.',
    rationale: 'As a result of the successful Star Pass, the White Jammer and White Pivot exchange status in terms of scoring and being scored upon. Since the Red Jammer had already scored on the original White Pivot before the Star Pass, they have the point for the White Blocker (originally the White Jammer) in this trip and cannot score it again.',
    keepInMind: 'Were it White Pivot who blocked Red Jammer out, and White Pivot received a Star Pass and exited the Engagement Zone before being passed, Red Jammer could still score four points by earning a pass on the former White Jammer (now a Blocker). In JRDA Skill Level 1 gameplay, intentional contact is prohibited. In this case, the White Non-Pivot Blocker is penalized for Illegal Contact ("Hitting").',
    skillLevels: ['L2', 'L3']
  },
  {
    id: 'c3.1-2',
    sectionId: 'scoring',
    ruleReference: 'C3.1.B',
    situation: 'Red Jammer enters the Pack ahead of White Jammer, while White Jammer is approaching the Pack for their second trip. Red Jammer passes the Star, and the new Red Jammer escapes the Pack. White Jammer enters the Pack and passes all four Red Blockers (including the original Red Jammer).',
    choices: [
      'White Jammer scores three points.',
      'White Jammer scores four points.',
      'White Jammer scores five points.',
      'White Jammer scores two points.'
    ],
    correctIndex: 1,
    outcome: 'White Jammer scores four points.',
    rationale: 'All Blockers are considered to be tied together with respect to the opposing Jammer\'s trip through the Pack. Even though White Jammer did not lap the original Red Jammer, when Red Jammer became a Blocker, this gave White Jammer lapping position.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c3.1-3',
    sectionId: 'scoring',
    ruleReference: 'C3.1.D',
    situation: 'White Jammer is on their second trip through the Pack and jumps the apex, passing all four Red Blockers while mid-air. White Jammer\'s right skate lands in bounds, with their hips ahead of all Blockers. As a result of the same action, White Jammer\'s left skate subsequently lands out of bounds.',
    choices: [
      'No points; White Jammer went out of bounds.',
      'Two points for the Blockers passed before going out of bounds.',
      'Four points.',
      'Three points; one pass is invalidated by the out-of-bounds landing.'
    ],
    correctIndex: 2,
    outcome: 'Four points.',
    rationale: 'White Jammer\'s in-bounds status was maintained while airborne because the first part of their skate to touch back down touched in bounds. White Jammer\'s upright status was maintained while airborne because they touched the floor skate-first. The fact that White Jammer touched out of bounds with the other skate does not affect points (but does affect their subsequent position relative to the Skaters they passed while airborne).',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 3.2. Scoring Trips
  {
    id: 'c3.2-1',
    sectionId: 'scoring',
    ruleReference: 'C3.2.B',
    situation: 'White Pivot is sent to the Penalty Box shortly after the Jam begins. Red Jammer completes their first trip through the Pack, and begins their second. Red Jammer earns a pass on two White Blockers before White Pivot returns to the track and the Jam is called.',
    choices: [
      'Two points.',
      'Three points.',
      'Four points.',
      'One point.'
    ],
    correctIndex: 1,
    outcome: 'Three points.',
    rationale: 'On Red Jammer\'s second trip through the Pack, they earned a pass on White Pivot by earning a pass on the first White Blocker while White Pivot was penalized.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c3.2-2',
    sectionId: 'scoring',
    ruleReference: 'C3.2.C',
    situation: 'At the start of the Jam, Red Jammer blocks White Jammer out of bounds and skates clockwise. Red Jammer leaves the Engagement Zone from the rear, reenters it from the front, and skates in bounds to the rear of the Pack. White Jammer comes in behind Red Jammer, and gets stuck in the Pack prior to restarting their initial trip through the Pack. Red Jammer skates forward, exits the Engagement Zone from the front, enters the Engagement Zone from the rear, earns passes on all opponents, and completes their initial trip through the Pack.',
    choices: [
      'Four points.',
      'Two points.',
      'One point.',
      'Zero points.'
    ],
    correctIndex: 3,
    outcome: 'Zero points.',
    rationale: 'Even though Red Jammer earned passes while "lapping" all opposing Blockers on their initial trip through the Pack, passes prior to the initial trip do not count toward lapping Blockers.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c3.2-3',
    sectionId: 'scoring',
    ruleReference: 'C3.2.D',
    situation: 'White Blocker begins the Jam in the Penalty Box. Red Jammer finishes their first trip through the Pack and begins their second. White Blocker returns to the track behind Red Jammer. Red Jammer earns passes on all opponents and exits the front of the Engagement Zone.',
    choices: [
      'Three points.',
      'Four points.',
      'Five points.',
      'Two points.'
    ],
    correctIndex: 1,
    outcome: 'Four points.',
    rationale: 'Because White Blocker returned to the track behind Red Jammer, Red Jammer could still earn a pass on them by earning a pass on another White Blocker.',
    keepInMind: 'If White Blocker had passed Red Jammer before Red Jammer earned a pass on another opposing Blocker, Red Jammer would have to earn a pass on the returning White Blocker to score their point as usual.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 3.3. Scoring Avoidance
  {
    id: 'c3.3-1',
    sectionId: 'scoring',
    ruleReference: 'C3.3.A',
    situation: 'White Jammer is on their second trip through the Pack and earns a pass on all opposing Blockers except Red Pivot, who is in front of them. White Jammer exits the front of the Engagement Zone with Red Pivot still in front of them.',
    choices: [
      'Three points.',
      'Four points.',
      'Three points, because Red Pivot was ahead of White Jammer.',
      'Zero points; the trip was not completed.'
    ],
    correctIndex: 1,
    outcome: 'Four points.',
    rationale: 'Leaving the Engagement Zone ahead of the opposing Jammer is not a valid means for a Blocker such as Red Pivot to avoid being scored upon. Via this action, they denied White Jammer the opportunity to earn a pass on them during their second trip through the Pack. Thus, White Jammer is considered to have earned a pass on Red Pivot upon completing their second trip through the Pack.',
    keepInMind: 'Had the Jam ended before White Jammer exited the Engagement Zone but while Red Pivot was ahead of them and also ahead of the Engagement Zone, White Jammer would have earned the pass on Red Pivot for the same reason because the Jam ending completes the scoring trip. However, had Red Pivot remained inside the Engagement Zone but ahead of White Jammer, White Jammer would not have earned a pass on Red Pivot because they had the opportunity to do so while inside the Engagement Zone.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c3.3-2',
    sectionId: 'scoring',
    ruleReference: 'C3.3.B',
    situation: 'White Jammer is on their second trip through the Pack. They earn a pass on all opposing Blockers except Red Pivot, who is in front of them. Red Pivot forces White Jammer out of bounds, and then goes out of play. Red Pivot turns around, returns to play, and ends up behind White Jammer who is still out of bounds. White Jammer re-enters in front of Red Pivot, and just ahead of the Engagement Zone.',
    choices: [
      'Four points.',
      'Three points.',
      'Two points.',
      'Zero points; White Jammer went out of bounds.'
    ],
    correctIndex: 1,
    outcome: 'Three points.',
    rationale: 'When White Jammer re-entered the track outside the Engagement Zone, their second trip through the Pack was complete. At that time, Red Pivot was in play. As such, White Jammer had the opportunity to earn a pass on Red Pivot during that trip through the Pack by returning to play inside the Engagement Zone, and then passing the Red Pivot.',
    keepInMind: 'For JRDA Skill Level 1 gameplay, intentional contact is prohibited. In this case Red Pivot is penalized for Illegal Contact ("Hitting") and White Jammer is awarded four points due to not having an opportunity to earn a pass on the penalized Red Pivot.',
    skillLevels: ['L2', 'L3']
  },
  {
    id: 'c3.3-3',
    sectionId: 'scoring',
    ruleReference: 'C3.3.C',
    situation: 'White Jammer begins their second trip through the Pack. Red Blocker 1 is sent to the Penalty Box. Red Blocker 2 removes themself from play to address an equipment issue. White Jammer has not passed Red Blockers 3 or 4. The Jam is then called off.',
    choices: [
      'Four points.',
      'Two points.',
      'One point.',
      'Zero points.'
    ],
    correctIndex: 3,
    outcome: 'Zero points.',
    rationale: 'White Jammer did not earn a pass on any opponents before the Jam ended.',
    keepInMind: 'White Jammer had the opportunity to earn a pass on Red Blockers 3 or 4, and would have thereby earned a pass on Red Blocker 1 and Red Blocker 2 for a total of three points.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c3.3-4',
    sectionId: 'scoring',
    ruleReference: 'C3.3.D',
    situation: 'White Jammer begins their second trip through the Pack. Red Blockers 1 and 2 are already seated in the Penalty Box. Red Blocker 3 goes to the Box for a penalty. Red Blocker 4 removes themself from play to address an equipment issue. White Jammer skates past their own teammates.',
    choices: [
      'Zero points.',
      'Two points.',
      'Three points.',
      'Four points.'
    ],
    correctIndex: 3,
    outcome: 'Four points.',
    rationale: 'Because there was no opportunity for White Jammer to earn a pass on any of their opponents, White Jammer earns a pass on all of them by completing the trip through the Engagement Zone as defined during a No Pack situation.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c3.3-5',
    sectionId: 'scoring',
    ruleReference: 'C3.3.E',
    situation: 'White Jammer begins their second trip through the Pack. Red Blockers 1 and 2 are already seated in the Penalty Box. Red Blocker 3 loses a toe stop and removes themself from active play. Red Blocker 4 is issued a penalty and is told to remain on the track, but skates off anyway. White Jammer skates past their teammates and Red Blocker 4 while the Officials tell Red Blocker 4 to return to the track.',
    choices: [
      'Two points.',
      'Three points.',
      'Four points.',
      'Zero points.'
    ],
    correctIndex: 2,
    outcome: 'Four points.',
    rationale: 'Because Red Blocker 4 was not sent off the track to the Box, that Blocker is still part of active gameplay (just out of bounds). When White Jammer skated past Red Blocker 4, the pass was earned as usual even though Red Blocker 4 was out of bounds at the time.',
    keepInMind: 'If Red Blocker 4 had taken off quickly so that White Jammer was denied the opportunity to earn a pass on Red Blocker 4, then when White Jammer completed their trip through the Engagement Zone, they would have earned the pass on Red Blocker 4 just as though Red Blocker 4 were ahead of the Engagement Zone (but still in bounds).',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c3.3-6',
    sectionId: 'scoring',
    ruleReference: 'C3.3.F',
    situation: 'Red Jammer commits a penalty at the beginning of their second trip through the Pack, not having earned any passes on opponents during that trip. While Red Jammer is in the Penalty Box, two White Blockers are sent to the Box. Red Jammer is released and returns to the Engagement Zone. The Pack is moving fast, and Red Jammer does not pass anybody. The other two White Blockers are released and return to the track behind Red Jammer. The Jam ends.',
    choices: [
      'Four points.',
      'Two points.',
      'One point.',
      'Zero points.'
    ],
    correctIndex: 3,
    outcome: 'Zero points.',
    rationale: 'Red Jammer had an opportunity to earn a pass on the two penalized White Blockers by earning a pass on one of the unpenalized White Blockers.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c3.3-7',
    sectionId: 'scoring',
    ruleReference: 'C3.3.I',
    situation: 'Red Jammer completes their first trip through the Pack and has passed one opposing Blocker when they remove the Star. While the Star is off, the three other opposing Blockers commit penalties and are sent to the Penalty Box. The Jam ends while Red Jammer\'s Star is still in their hand.',
    choices: [
      'Zero points.',
      'One point.',
      'Four points.',
      'Three points.'
    ],
    correctIndex: 1,
    outcome: 'One point.',
    rationale: 'Red Jammer was not able to earn points while the Star was off, but they still receive the point earned while the Star was on.',
    keepInMind: 'If Red Jammer had put the Star back on before the end of the Jam, they would have earned points for the other opposing Blockers as soon as the Star was back on their helmet.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c3.3-8',
    sectionId: 'scoring',
    ruleReference: 'C3.3.J',
    situation: 'Red Jammer begins a scoring trip and is ahead of White Jammer. Red Jammer earns passes on three White Blockers but remains behind White Pivot. White Jammer successfully passes the Star to White Pivot, but remains behind Red Jammer. Red Jammer completes their scoring trip having never earned a pass on the original White Jammer (now Blocker).',
    choices: [
      'Three points.',
      'Four points.',
      'Five points.',
      'Two points.'
    ],
    correctIndex: 1,
    outcome: 'Four points.',
    rationale: 'Red Jammer must have at least one opportunity to earn a pass on all opposing Blockers on every trip through the Pack, including a Jammer-turned-Blocker as a result of a Star Pass. When the Jammer becomes a Blocker, they are considered a Blocker returning to active gameplay.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 3.4. Penalized Jammers
  {
    id: 'c3.4-1',
    sectionId: 'scoring',
    ruleReference: 'C3.4.A',
    situation: 'Red Jammer completes their first trip through the Pack and has not passed any opposing Blockers when they commit two penalties in quick succession. They are sent to the Penalty Box for 60 seconds, during which all four opposing Blockers also commit penalties and are sent to the Box. Red Jammer returns to the rear of the Pack, but the Jam ends before they can pass any opponents.',
    choices: [
      'Four points.',
      'Two points.',
      'One point.',
      'Zero points.'
    ],
    correctIndex: 3,
    outcome: 'Zero points.',
    rationale: 'Red Jammer did not earn a pass on any opposing Blockers, so they were not eligible to earn any Not-On-the-Track points.',
    keepInMind: 'If Red Jammer had earned a pass on any opposing Blockers before their penalty was served, they would have earned points for the other opposing Blockers upon returning to the track. If Red Jammer had earned a pass on an opposing Blocker once they returned from serving their penalty but before the Jam ended, they would have also earned a point on any opposing Blockers still seated in the Box or any opposing Blockers returning from the Box behind Red Jammer.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // =============================================
  // Section 4: Penalties
  // =============================================

  // 4.1.1. Impact to an Illegal Target Zone
  {
    id: 'c4.1.1-1',
    sectionId: 'penalties',
    ruleReference: 'C4.1.1.A',
    situation: 'White Blocker, falling as a result of contact with Red Blocker, "falls small" by tucking their arms and legs close into their body. Red Jammer, skating close behind, trips over White Blocker and falls.',
    choices: [
      'White Blocker is penalized for being a hazard.',
      'Red Jammer is penalized for tripping.',
      'No penalty.',
      'Red Blocker is penalized for initiating the chain of events.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'White Blocker did everything in their power to prevent themself from being a hazard.',
    keepInMind: 'Were this the third time White Blocker had caused an opponent to fall in this manner, they should receive a penalty. While "falling small" mitigates the safety risk of a Skater falling on the track, excessive falling with impact represents a larger safety risk that should result in a penalty.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.1-2',
    sectionId: 'penalties',
    ruleReference: 'C4.1.1.B',
    situation: 'Red Jammer skates along the inside line and attempts to jump the apex to pass the Pack. White Pivot legally initiates a block to Red Jammer\'s upper arm, which knocks Red Jammer off balance, and their jump comes up short. Red Jammer falls out of bounds. They fall small, but their momentum causes them to slide back onto the track, into White Blocker\'s legs. White Blocker trips over Red Jammer and falls.',
    choices: [
      'White Pivot is penalized for the block.',
      'No penalty for anyone.',
      'Red Jammer is penalized.',
      'White Blocker is penalized for tripping.'
    ],
    correctIndex: 2,
    outcome: 'Red Jammer is penalized.',
    rationale: 'Red Jammer is considered in bounds when White Pivot initiates a legal block. Though Red Jammer fell small, their forward momentum back onto the track means that they are a safety risk for more than just a "small" space. White Blocker\'s loss of position as a result of that risk is enough to warrant a penalty.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.1-3',
    sectionId: 'penalties',
    ruleReference: 'C4.1.1.C',
    situation: 'Red Pivot and two Red Blockers form a three-person wall. White Blocker initiates a block to the back of Red Pivot with a Legal Blocking Zone. Red Pivot does not fall but is pushed out of the center of the wall. White Jammer is able to pass the other two Red Blockers at the hips before Red Pivot reclaims their position.',
    choices: [
      'No penalty; the block was to a Legal Target Zone.',
      'White Blocker is penalized.',
      'Red Pivot is penalized for losing position.',
      'White Jammer\'s points are invalidated.'
    ],
    correctIndex: 1,
    outcome: 'White Blocker is penalized.',
    rationale: 'White Blocker did not gain advantage from their block to an Illegal Target Zone, but a teammate did: White Jammer earned passes and therefore scored points.',
    keepInMind: 'If White Blocker had fully moved through the wall and continued on, that would also justify a penalty for gaining position, even though they were not scoring points.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.1-4',
    sectionId: 'penalties',
    ruleReference: 'C4.1.1.D',
    situation: 'Red Blocker initiates a chest-to-chest block against White Blocker. The force of the impact causes secondary contact of Red Blocker\'s upper arm to White Blocker\'s neck. White Blocker\'s head jerks back, but they do not fall off balance or go down.',
    choices: [
      'No penalty; it was secondary contact.',
      'Red Blocker is penalized.',
      'White Blocker is penalized for not avoiding the contact.',
      'Both Skaters receive a penalty.'
    ],
    correctIndex: 1,
    outcome: 'Red Blocker is penalized.',
    rationale: 'Though Red Blocker\'s hit was to a Legal Target Zone with a Legal Blocking Zone, and White Blocker lost neither position nor advantage, forceful contact to the head or neck should always result in a penalty.',
    keepInMind: 'Incidental contact to the neck or head that is not forceful and does not have any other impact should not result in a penalty.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.1-5',
    sectionId: 'penalties',
    ruleReference: 'C4.1.1.E',
    situation: 'Red Blocker skates clockwise when White Blocker steps behind them, positionally blocking Red Blocker\'s back with a Legal Target Zone. Red Blocker stops skating clockwise.',
    choices: [
      'White Blocker is penalized for positional blocking to the back.',
      'Red Blocker is penalized for skating clockwise.',
      'No penalty.',
      'Both Skaters are warned.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'A Skater cannot be penalized for positionally blocking an Illegal Target Zone. Skaters may be oriented and be moving in various directions during a game.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.1-6',
    sectionId: 'penalties',
    ruleReference: 'C4.1.1.F',
    situation: 'White Jammer approaches the rear of the Pack, targeting Red Blocker. Well before impact is made, Red Blocker side-steps, presenting their back (an Illegal Target Zone). White Jammer makes contact anyway and knocks Red Blocker down.',
    choices: [
      'Red Blocker is penalized for presenting their back.',
      'No penalty; Red Blocker presented the Illegal Target Zone.',
      'White Jammer is penalized.',
      'Both Skaters are penalized.'
    ],
    correctIndex: 2,
    outcome: 'White Jammer is penalized.',
    rationale: 'Red Blocker established a new position before White Jammer made contact. White Jammer is responsible for their initiated block, regardless of what their original target had been.',
    keepInMind: 'If White Jammer had no reasonable opportunity to avoid Red Blocker\'s Illegal Target Zone because Red Blocker had presented that Illegal Target Zone at the last moment, Red Blocker would then be initiating with their back, a Legal Blocking Zone. Because White Jammer would not be considered the initiator, no penalty is warranted.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.1-7',
    sectionId: 'penalties',
    ruleReference: 'C4.1.1.G',
    situation: 'White Jammer skates fast and directly into Red Blocker\'s back, who was not prepared for the contact. Red Blocker falls wildly and slides into the skates of a wall of White Blockers in front of them, who fall.',
    choices: [
      'White Jammer and Red Blocker are both penalized.',
      'Red Blocker is penalized for falling into the wall.',
      'White Jammer is penalized. Red Blocker is not penalized.',
      'No penalty; this is normal gameplay.'
    ],
    correctIndex: 2,
    outcome: 'White Jammer is penalized. Red Blocker is not penalized.',
    rationale: 'White Jammer made illegal contact to Red Blocker. Due to this illegal contact, Red Blocker was unable to avoid committing their illegal action and should not be penalized.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.1-8',
    sectionId: 'penalties',
    ruleReference: 'C4.1.1.H',
    situation: 'Red Jammer skates around the track at a high rate of speed. They slam very forcefully into White Blocker\'s back without making any attempt to avoid illegal contact. White Blocker, however, does not fall and Red Jammer does not gain position on anybody as a result of this action.',
    choices: [
      'No penalty; there was no impact.',
      'Red Jammer is penalized.',
      'Red Jammer is penalized and should be considered for an expulsion.',
      'White Blocker is penalized for being in the way.'
    ],
    correctIndex: 2,
    outcome: 'Red Jammer is penalized and should be considered for an expulsion.',
    rationale: 'Contact to an opponent\'s back is illegal, in part, because it is unsafe. A flagrant violation of this rule poses a safety hazard to White Blocker, which has sufficient impact on the game to expel Red Jammer if judged to be negligent, intentional, or reckless, regardless of if White Blocker lost position.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.1-9',
    sectionId: 'penalties',
    ruleReference: 'C4.1.1.I',
    situation: 'Red Jammer is stuck behind a wall of White Blockers. Red Jammer forcefully blocks White Blocker 1 in the back, but due to a legal assist from White Blocker 2, White Blocker 1 remains in position.',
    choices: [
      'No penalty; White Blocker 1 did not lose position.',
      'Red Jammer is penalized.',
      'White Blocker 2 is penalized for the assist.',
      'Both Red Jammer and White Blocker 2 are penalized.'
    ],
    correctIndex: 1,
    outcome: 'Red Jammer is penalized.',
    rationale: 'Contact to an opponent\'s back is illegal, in part, because it is unsafe. Red Jammer was in control of their actions and initiated illegal forceful contact to the back of White Blocker 1. This action is penalized regardless of impact or outcome.',
    keepInMind: 'If Red Jammer initiated non-forceful contact to the back of White Blocker 1 with a Legal Blocking Zone, the threshold for a penalty would be that of Illegal Target Zone contact.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.1-10',
    sectionId: 'penalties',
    ruleReference: 'C4.1.1.J',
    situation: 'Red Jammer is approaching White Blocker 1. White Blocker 2 initiates a legal block on Red Jammer at the last second, forcing them out of their trajectory and directly into the back of White Blocker 1 (without any opportunity to recover before making contact). White Blocker 1 receives forceful contact but maintains their position ahead of Red Jammer and does not otherwise lose position.',
    choices: [
      'Red Jammer is penalized for contact to the back.',
      'White Blocker 2 is penalized for causing the illegal contact.',
      'No penalty.',
      'White Blocker 1 is penalized.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'Red Jammer was hit into the illegal contact with White Blocker 1 by an opponent\'s legal gameplay; as such, their forceful contact to the back was unavoidable. The illegal contact did not result in any other impact (such as loss of position) that warranted a penalty.',
    keepInMind: 'A Skater is responsible for maintaining control of their body and the contact they initiate as a result of legal gameplay. If White Blocker 1 had lost position, Red Jammer would be penalized. If Red Jammer made forceful contact to the back of White Blocker 1 due to the assist of a Red teammate, then the contact would be considered avoidable and Red Jammer penalized.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.1.2. Impact with an Illegal Blocking Zone
  {
    id: 'c4.1.2-1',
    sectionId: 'penalties',
    ruleReference: 'C4.1.2.A',
    situation: 'Red Jammer initiates a block with their forearms tucked into their torso, to a Legal Target Zone of White Blocker. White Blocker is knocked out of bounds.',
    choices: [
      'Red Jammer is penalized for using forearms.',
      'No penalty.',
      'White Blocker is penalized for going out of bounds.',
      'Red Jammer is warned about forearm usage.'
    ],
    correctIndex: 1,
    outcome: 'No penalty.',
    rationale: 'Red Jammer\'s forearms were fully tucked into their torso. While forearms are an Illegal Blocking Zone, tucking them into the torso effectively makes them part of the torso, and thus a Legal Blocking Zone.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.2-2',
    sectionId: 'penalties',
    ruleReference: 'C4.1.2.B',
    situation: 'White Blocker initiates a block against Red Jammer, using their upper arm against a Legal Target Zone. The natural momentum of the impact causes additional contact, sliding down to White Blocker\'s elbow. Red Jammer ends up out of bounds as a result of the action.',
    choices: [
      'White Blocker is penalized for the elbow contact.',
      'Red Jammer is penalized for going out of bounds.',
      'No penalty.',
      'Both Skaters are warned.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'White Blocker used their upper arm to initiate the block. Red Jammer\'s loss of position was a result of a block from a Legal Blocking Zone and not the additional contact that resulted from the momentum of the impact. Both examples are legal play.',
    keepInMind: 'Many legal blocks include incidental or meaningless contact using an Illegal Blocking Zone, or to an Illegal Target Zone. If the illegal contact does not have further impact, no penalty should be assessed.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.2-3',
    sectionId: 'penalties',
    ruleReference: 'C4.1.2.D',
    situation: 'As White Jammer advances, Red Blocker is knocked off balance and into White Jammer\'s path, bending over and positionally placing their head in front of White Jammer. White Jammer comes to a complete stop to avoid contact with Red Blocker\'s head.',
    choices: [
      'Red Blocker is penalized for using their head as a blocker.',
      'White Jammer is penalized for stopping.',
      'No penalty.',
      'Red Blocker is expelled for dangerous play.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'Though White Jammer lost significant momentum as a result of Red Blocker\'s positional block with an Illegal Blocking Zone (head), unintentional positional blocking with the head does not warrant a penalty.',
    keepInMind: 'If Red Blocker had intentionally presented their head in order to slow White Jammer\'s momentum, or continued to use the threat of harm to their own head as a barrier, Red Blocker should be penalized for unsafe and unsporting conduct.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.2-4',
    sectionId: 'penalties',
    ruleReference: 'C4.1.2.E',
    situation: 'White Blocker is knocked off balance and grabs hold of Red Blocker\'s jersey in an attempt to regain their balance. Red Blocker remains standing, but is significantly slowed by the pulling at their jersey. White Blocker regains their balance.',
    choices: [
      'No penalty; White Blocker was just regaining balance.',
      'Red Blocker is penalized.',
      'White Blocker is penalized.',
      'Both Skaters are warned.'
    ],
    correctIndex: 2,
    outcome: 'White Blocker is penalized.',
    rationale: 'Assists taken from an opponent, such as whips or braces, are penalizable if they result in some kind of advantage for the initiator or disadvantage for the opponent. White Blocker significantly slowed Red Blocker by using an Illegal Blocking Zone.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.2-5',
    sectionId: 'penalties',
    ruleReference: 'C4.1.2.F',
    situation: 'White Pivot attempts to join the other White Blockers but is held back by a wall of Red Blockers. White Pivot wiggles past Red Blocker on the outside line, using their forearms on those Red Blockers to hold themself in bounds.',
    choices: [
      'No penalty; White Pivot stayed in bounds.',
      'Red Blockers are penalized for blocking White Pivot.',
      'White Pivot is penalized.',
      'White Pivot is warned about forearm usage.'
    ],
    correctIndex: 2,
    outcome: 'White Pivot is penalized.',
    rationale: 'White Pivot gained superior position to Red Blocker by using their forearms to remain in bounds during an action that would have otherwise taken them out of bounds.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.2-6',
    sectionId: 'penalties',
    ruleReference: 'C4.1.2.G',
    situation: 'Red Jammer has passed all but the foremost White Blocker. White Blocker faces clockwise with their arms outstretched and initiates a block against Red Jammer with the entirety of their arm: upper arm, elbow, and forearm. Red Jammer is not knocked down, but they are brought to a stop.',
    choices: [
      'No penalty; Red Jammer was not knocked down.',
      'Red Jammer is penalized.',
      'White Blocker is penalized.',
      'Both Skaters are penalized.'
    ],
    correctIndex: 2,
    outcome: 'White Blocker is penalized.',
    rationale: 'Though Red Jammer did not lose position, their progress was significantly impeded by Illegal Blocking Zones.',
    keepInMind: 'If White Blocker had dropped their forearm and elbow as soon as contact was made, no penalty should be called. It was the prolonged impact of the forearm and elbow that made the action penalizable.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.2-7',
    sectionId: 'penalties',
    ruleReference: 'C4.1.2.H',
    situation: 'Red Jammer enters the rear of the pack and is blocked towards the outside line by White Pivot. Red Jammer is knocked off-balance and grabs onto White Pivot\'s jersey, which prevents Red Jammer from stepping out of bounds. Red Jammer regains their balance in-bounds, without gaining relative position. White Pivot remains stable and unimpeded.',
    choices: [
      'No penalty; Red Jammer did not gain position.',
      'Red Jammer is penalized.',
      'White Pivot is penalized.',
      'Both are warned.'
    ],
    correctIndex: 1,
    outcome: 'Red Jammer is penalized.',
    rationale: 'Red Jammer used their forearms to maintain an in-bounds position that they otherwise would not have been able to maintain.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.2-8',
    sectionId: 'penalties',
    ruleReference: 'C4.1.2.I',
    situation: 'Red Pivot loses their balance due to a teammate\'s action and grabs onto White Blocker\'s arm - which prevents Red Pivot from falling down.',
    choices: [
      'No penalty; it was due to a teammate\'s action.',
      'Red Pivot is penalized.',
      'White Blocker is penalized.',
      'Red Pivot\'s teammate is penalized.'
    ],
    correctIndex: 1,
    outcome: 'Red Pivot is penalized.',
    rationale: 'Red Pivot used their forearms to maintain an upright position that they otherwise would not have been able to maintain.',
    keepInMind: 'If White Blocker had grabbed onto and stabilized Red Pivot, preventing Red Pivot from falling - no penalty would be warranted.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.1.3. Other Illegal Contact
  {
    id: 'c4.1.3-1',
    sectionId: 'penalties',
    ruleReference: 'C4.1.3.A',
    situation: 'White Pivot stands still on their toe stops and initiates a block against Red Jammer. Red Jammer counter-blocks, but is brought to a stop by the White Pivot, who remains stopped.',
    choices: [
      'Red Jammer is penalized for counter-blocking.',
      'No penalty; blocking on toe stops is legal.',
      'White Pivot is penalized.',
      'Both Skaters are warned.'
    ],
    correctIndex: 2,
    outcome: 'White Pivot is penalized.',
    rationale: 'If Red Jammer loses position or has their momentum or trajectory severely affected by a block initiated in an illegal way, the initiator should receive a penalty. In this example, if White Pivot had not maintained their stopped position, but had returned to counterclockwise motion while blocking, no penalty would be warranted.',
    keepInMind: 'It is not the use of toe stops that warrants penalization in this scenario, but the fact that the White Pivot had an impact on the Red Jammer while stopped. If White Pivot had continued to move counter-clockwise on the track while on their toe stops, no penalty would have been warranted.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.3-2',
    sectionId: 'penalties',
    ruleReference: 'C4.1.3.B',
    situation: 'Red Blocker uses a Legal Blocking Zone to initiate a block to a Legal Target Zone of White Blocker. White Blocker is pushed until one skate is in bounds and one skate is out of bounds. Red Blocker continues to block until White Blocker is fully out of bounds. Red Blocker re-initiates a new block that knocks White Blocker down.',
    choices: [
      'No penalty; the initial block was legal.',
      'White Blocker is penalized for being out of bounds.',
      'Red Blocker is penalized.',
      'Both Skaters are warned.'
    ],
    correctIndex: 2,
    outcome: 'Red Blocker is penalized.',
    rationale: 'A Skater should not expect to be blocked while out of bounds. It is only legal to block a Skater who is in bounds or straddling. The secondary block is what warrants the penalty.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.3-3',
    sectionId: 'penalties',
    ruleReference: 'C4.1.3.C',
    situation: 'Red Blocker is knocked out of bounds and recycled to the rear of the Pack. They accelerate and move in bounds, directly into White Blocker, who falls.',
    choices: [
      'No penalty; both Skaters were in bounds.',
      'White Blocker is penalized for falling.',
      'Red Blocker is penalized.',
      'No penalty; it was a legal block.'
    ],
    correctIndex: 2,
    outcome: 'Red Blocker is penalized.',
    rationale: 'Even if the Target and Blocking Zones were legal and both Skaters were in bounds, Red Blocker gained an unexpected advantage by accelerating while out of bounds into the block. White Blocker should not expect to be blocked by an out-of-bounds opponent.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.3-4',
    sectionId: 'penalties',
    ruleReference: 'C4.1.3.D',
    situation: 'Red Blocker is knocked out of bounds by White Blocker, who also goes out of bounds, leaving an opening on the inside line. The out-of-bounds Red Blocker grabs the in-bounds Red Jammer by the hips and pushes them past the in-bounds White Blockers.',
    choices: [
      'No penalty; it was a teammate assist.',
      'Red Jammer is penalized.',
      'White Blocker is penalized for going out of bounds.',
      'Red Blocker is penalized.'
    ],
    correctIndex: 3,
    outcome: 'Red Blocker is penalized.',
    rationale: 'The threshold for penalization of assists follows similar metrics to blocks. They cannot come from an unblockable position, such as out of bounds, while down, or while stopped. Because Red Blocker could not legally be blocked, it would also be illegal to provide an assist.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.3-5',
    sectionId: 'penalties',
    ruleReference: 'C4.1.3.E',
    situation: 'White Jammer, having lined up just behind the Jammer Line, is contacted by Red Jammer attempting to take the same space. White Jammer falls Out of Bounds before the Jam-Starting Whistle.',
    choices: [
      'White Jammer is penalized for being out of bounds.',
      'No penalty; it was before the Jam.',
      'Red Jammer is penalized for blocking before Jam start. White Jammer is allowed to participate in this Jam. Red Jammer has lost the ability to earn Lead Jammer status in this Jam.',
      'Both Jammers are penalized.'
    ],
    correctIndex: 2,
    outcome: 'Red Jammer is penalized for blocking before the Jam start. White Jammer is allowed to participate in this Jam. Red Jammer has lost the ability to earn Lead Jammer status in this Jam.',
    rationale: 'It is illegal to block before a Jam has begun. Because White Jammer was not in a legal starting position due to an opponent\'s illegal action, they are allowed to participate in the Jam.',
    keepInMind: 'Should White Jammer be blocked into a false starting position rather than Out of Bounds, White Jammer is allowed to participate in the Jam (without the need to yield). Red Jammer would still receive a penalty for blocking before the Jam start. A Skater penalized before the start of a Jam should serve their penalty in the Role in which they appear to be acting.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.3-6',
    sectionId: 'penalties',
    ruleReference: 'C4.1.3.F',
    situation: 'White Blocker initiates contact to Red Jammer during the Jam-Ending Whistle. Red Jammer stumbles significantly off balance after the Jam-Ending Whistle.',
    choices: [
      'White Blocker is penalized for blocking after the Jam.',
      'White Blocker initiated legally before the end of the Jam. No penalty.',
      'Red Jammer is penalized for not maintaining balance.',
      'Both Skaters are warned.'
    ],
    correctIndex: 1,
    outcome: 'White Blocker initiated legally before the end of the Jam. No penalty.',
    rationale: 'It is illegal to block after a Jam has ended. It is, however, legal to initiate during the Jam-Ending Whistle, even if the outcome happens once the Jam has ended.',
    keepInMind: 'Should that same hit start after the Jam-Ending Whistle, Red Jammer need not fall nor be knocked Out of Bounds. Being hit significantly off balance after the Jam-Ending Whistle is sufficient to penalize the initiator of that hit. A Skater penalized after the end of the Jam should serve their penalty in the Role in which they appear to be acting.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.3-7',
    sectionId: 'penalties',
    ruleReference: 'C4.1.3.G',
    situation: 'Red Jammer is 18 ft (5.48 m) ahead of the Pack alongside White Pivot. They continue to skate, and an Official gives an Out of Play warning to both players. White Pivot continues to skate alongside Red Jammer, and then blocks Red Jammer, making hip-to-hip contact. Red Jammer counter-blocks White Pivot in an attempt to remain upright and continue on their way. White Pivot falls as a result.',
    choices: [
      'Both Skaters are penalized.',
      'Red Jammer is penalized.',
      'White Pivot is penalized. Red Jammer is not.',
      'No penalty for either Skater.'
    ],
    correctIndex: 2,
    outcome: 'White Pivot is penalized. Red Jammer is not.',
    rationale: 'White Pivot received an Out of Play warning and failed to immediately attempt to return to the Engagement Zone; rather, they continued to block Red Jammer. Skaters who are illegally blocked while out of play may legally counter-block, so Red Jammer\'s actions do not warrant a penalty.',
    keepInMind: 'If Red Jammer\'s action was not a counter-block, but instead a separate and distinct initiation of a block, Red Jammer should be penalized as White Pivot falling is enough impact to warrant a penalty for illegal contact.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.3-8',
    sectionId: 'penalties',
    ruleReference: 'C4.1.3.H',
    situation: 'Red Jammer is 18 ft (5.48 m) ahead of the pack. White Pivot is alongside Red Jammer. They skate forward, and an Official gives an Out of Play warning to both players. After the warning is given, White Pivot initiates a block to Red Jammer. Red Jammer counter-blocks and is able to maintain their upright status and their momentum. Red Jammer then actively continues blocking White Pivot until White Pivot is Out of Bounds.',
    choices: [
      'Only White Pivot is penalized.',
      'Only Red Jammer is penalized.',
      'Both players are penalized.',
      'No penalty for either player.'
    ],
    correctIndex: 2,
    outcome: 'Both players are penalized.',
    rationale: 'Both players received an Out of Play warning. White Pivot illegally failed to immediately attempt to return to the engagement zone. Skaters who are illegally blocked while Out of Play may legally counter-block, so Red Jammer\'s initial counter-block does not warrant a penalty. Red Jammer\'s continued blocking after absorbing the impact of White Pivot\'s block should be considered a new block. While Jammers are never considered Out of Play, blocking an Out of Play skater is illegal for all Skaters. By significantly altering White Pivot\'s trajectory, Red Jammer\'s illegal block had sufficient impact to warrant a penalty.',
    keepInMind: 'Initiating a block after an Out of Play warning is, by definition, failing to attempt to return to the engagement zone. As such, White Pivot should be penalized for maintaining an illegal position regardless of the impact of their block on the Red Jammer.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.3-9',
    sectionId: 'penalties',
    ruleReference: 'C4.1.3.I',
    situation: 'White Blocker is standing while legally out of bounds. A Red Blocker is blocked off the track and collides with the White Blocker. White Blocker moves toward the Red Blocker and brings up their arms to actively absorb the force of the contact and protect both Skaters. Red Blocker falls to the ground as a result of the contact.',
    choices: [
      'White Blocker is penalized for blocking while out of bounds.',
      'Red Blocker is penalized for going out of bounds.',
      'No penalty.',
      'Both Skaters are penalized.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'While White Blocker moved towards the opposing block, the purpose of the action was to actively absorb the contact, rather than intentionally force the Red Blocker down. The White Blocker\'s action was taken in the interest of safety, and should not be penalized. The preservation of player safety supersedes any gameplay concern not already enumerated in the Rules.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.3-10',
    sectionId: 'penalties',
    ruleReference: 'C4.1.3.J',
    situation: 'White Pivot is currently the only white Blocker in the Pack. White Jammer approaches White Pivot and initiates an assist off White Pivot, which abruptly reduces White Pivot\'s speed enough to cause them to fall back more than 10 ft. (3 meters).',
    choices: [
      'White Jammer is penalized for destroying the Pack.',
      'White Pivot is penalized for falling back.',
      'Officials declare a No Pack situation. No penalty.',
      'Both White Skaters are penalized.'
    ],
    correctIndex: 2,
    outcome: 'Officials declare a No Pack situation. No penalty.',
    rationale: 'The destruction of the Pack occurred as a result of normal gameplay. It should not be considered an illegal Pack destruction.',
    keepInMind: 'Taking or giving assists are considered parts of normal gameplay. If the White Jammer instead pushed White Pivot out of bounds or to the ground, White Jammer should be penalized instead. This action is considered a deliberate destruction of the Pack, and the White Jammer should be issued a penalty for Unsporting Conduct (Misconduct).',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.1.4. Multiplayer Blocks
  {
    id: 'c4.1.4-1',
    sectionId: 'penalties',
    ruleReference: 'C4.1.4.A',
    situation: 'Red Blockers form a three-person wall, separating White Pivot from the other White Blockers. The middle Red Blocker hooks arms with the outside Red Blocker. White Pivot initiates a block against the middle and outside Red Blockers, attempting to drive between the two Skaters, but fails to make any progress. All Blockers remain upright.',
    choices: [
      'White Pivot is penalized for blocking two Skaters.',
      'The middle Red Blocker was most responsible for hooking arms and should receive a penalty.',
      'No penalty; all Blockers are upright.',
      'The outside Red Blocker is penalized.'
    ],
    correctIndex: 1,
    outcome: 'The middle Red Blocker was most responsible for hooking arms and should receive a penalty.',
    rationale: 'The middle and outside Red Blockers gained an advantage by creating a link that White Pivot cannot break. Once White Pivot challenged that link, their action became worthy of a penalty.',
    keepInMind: 'If it cannot be determined who initiated the link, then the Skater closest to the Referee calling the penalty should be penalized. If the middle Red Blocker had also been hooked to the inside Red Blocker, no additional penalty would be warranted because White Pivot did not attempt to get between those two linked opponents.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.1.5. Unsporting Contact
  {
    id: 'c4.1.5-1',
    sectionId: 'penalties',
    ruleReference: 'C4.1.5.A',
    situation: 'White Jammer is stuck behind a Red wall. They push forward, but cannot find a way to break through. They strike their knee into Red Blocker\'s buttocks. Red Blocker stumbles but does not go down or out. White Jammer fails to break through the wall.',
    choices: [
      'No penalty; Red Blocker did not fall.',
      'Red Blocker is penalized for blocking.',
      'White Jammer is penalized.',
      'Both are warned.'
    ],
    correctIndex: 2,
    outcome: 'White Jammer is penalized.',
    rationale: 'A Skater who intentionally and forcefully jabs an opponent with their elbow or strikes with their knee should receive a penalty regardless of whether it leads to a loss of position or advantage. This action is unsafe and unsporting.',
    keepInMind: 'The fact that this action was intentional is only part of the reason a penalty is warranted. Intentional illegal action is not always penalized even though it is tacitly unsporting. Intentional actions designed to harm an opponent should always be penalized.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.5-2',
    sectionId: 'penalties',
    ruleReference: 'C4.1.5.B',
    situation: 'Red Blocker knocks down White Blocker. Red Blocker bends over at the waist, positioning their chest above White Blocker in such a way as to prevent White Blocker from standing.',
    choices: [
      'No penalty; positional blocks are generally legal.',
      'White Blocker is penalized for being down.',
      'Red Blocker is penalized.',
      'The Jam is called off.'
    ],
    correctIndex: 2,
    outcome: 'Red Blocker is penalized.',
    rationale: 'Though most positional blocks don\'t typically result in a penalty, in this instance, Red Blocker intentionally positionally blocks a downed opponent. White Blocker cannot initiate a block from a downed status and thus cannot reestablish their position without earning a penalty of their own. This is unsporting conduct on the part of Red Blocker.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.5-3',
    sectionId: 'penalties',
    ruleReference: 'C4.1.5.C',
    situation: 'Red Blocker is crouched with one hand on the track. White Blocker intentionally falls on top of Red Blocker, targeting a Legal Target Zone.',
    choices: [
      'White Blocker is penalized.',
      'No penalty; the target was legal.',
      'Red Blocker is penalized for being in a downed position.',
      'White Blocker is expelled from the game for Unsporting Conduct.'
    ],
    correctIndex: 3,
    outcome: 'White Blocker is expelled from the game for Unsporting Conduct.',
    rationale: 'Falling onto an opponent is extremely dangerous and is an extraordinary physical threat to Red Blocker. Even though White Blocker was attempting to initiate into a Legal Target Zone, intentionally falling onto an opponent is unsporting conduct.',
    keepInMind: 'A Skater who is crouched with one hand on the floor does not count as down. Skaters accidentally falling on each other due to natural gameplay is not unsporting conduct.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.5-4',
    sectionId: 'penalties',
    ruleReference: 'C4.1.5.D',
    situation: 'White Blocker is in a downed position on the track, directly at the skates of White Pivot. Red Blocker initiates contact to White Pivot, causing White Pivot to fall onto and over White Blocker.',
    choices: [
      'White Blocker is penalized for being a hazard.',
      'White Pivot is penalized for falling.',
      'Red Blocker is penalized.',
      'No penalty.'
    ],
    correctIndex: 2,
    outcome: 'Red Blocker is penalized.',
    rationale: 'It is dangerous to block a Skater onto or over another downed Skater.',
    keepInMind: 'If Red Blocker had committed to their block before White Blocker had fallen down, a penalty would not be warranted. If contact between White Pivot and White Blocker was not directly caused by Red Blocker\'s actions (for example, there was a significant distance between White Pivot and White Blocker), a penalty would not be warranted.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.5-5',
    sectionId: 'penalties',
    ruleReference: 'C4.1.5.E',
    situation: 'White Blocker and White Pivot make a two person wall with their shoulders touching. Red Jammer attempts to get between them by initiating with their shoulder. White Pivot disengages while White Blocker adjusts so that Red Jammer\'s shoulder is between the White Blocker\'s inner upper arm and body. White Blocker then exerts constant downward force on Red Jammer\'s shoulder.',
    choices: [
      'Red Jammer is penalized for initiating between two Blockers.',
      'No penalty; this is normal gameplay.',
      'White Blocker is penalized.',
      'White Pivot is penalized for disengaging.'
    ],
    correctIndex: 2,
    outcome: 'White Blocker is penalized.',
    rationale: 'Legal forms of blocking do not include holding an opponent, even when that contact is otherwise made with legal Blocking Zones and/or to legal Target Zones. A Skater must be able to disengage from a one-on-one block without breaking an opponent\'s hold.',
    keepInMind: 'During the course of normal gameplay Skaters may unintentionally become entangled. If this contact is accidental, such as due to two Skaters falling, no penalty is warranted. If instead of applying constant downwards force, White Blocker rapidly applied their entire body weight downwards onto Red Jammer\'s shoulder, White Blocker should be expelled.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.1.5-6',
    sectionId: 'penalties',
    ruleReference: 'C4.1.5.F',
    situation: 'Red Blocker initiates a shoulder-to-shoulder block against White Pivot. As White Pivot moves laterally, Red Blocker adjusts and places their leg in front of White Pivot\'s leg so that the back of their upper thigh initiates to the front of White Pivot\'s hip. White Pivot leans over and traps Red Blocker\'s thigh between their upper arm and body and does not release the contact when Red Blocker attempts to remove their leg.',
    choices: [
      'Red Blocker is penalized for tripping.',
      'White Pivot is expelled from the game.',
      'No penalty; this is normal gameplay.',
      'Both Skaters are penalized.'
    ],
    correctIndex: 1,
    outcome: 'White Pivot is expelled from the game.',
    rationale: 'Restricting opponents by intentionally trapping or grabbing is considered outside the realm of normal gameplay. Grabbing an opponent\'s leg in this way is an additionally dangerous and unsporting tactic, as it directly affects a Skater\'s ability to balance and maintain a safe skating stance.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // J4.1.5. JRDA Addenda of Contact Penalties by JRDA Level
  {
    id: 'jc4.1.5-1',
    sectionId: 'penalties',
    ruleReference: 'JC4.1.5.A',
    situation: 'In a JRDA Skill Level 1 game, Green Blocker initiates intentional contact with White Jammer using a legal Blocking Zone against a legal Target Zone. White Jammer falls down as a result of the contact.',
    choices: [
      'No penalty; the contact used legal zones.',
      'Green Blocker is penalized for Illegal Contact ("Hitting").',
      'White Jammer is penalized for falling.',
      'Green Blocker is warned about contact.'
    ],
    correctIndex: 1,
    outcome: 'Green Blocker is penalized for Illegal Contact ("Hitting").',
    rationale: 'Skaters in a Skill Level 1 game may only positionally block. All intentional contact with an opponent warrants a penalty.',
    skillLevels: ['L1']
  },
  {
    id: 'jc4.1.5-2',
    sectionId: 'penalties',
    ruleReference: 'JC4.1.5.B',
    situation: 'In a JRDA Skill Level 1 game, Green Blocker loses their balance and unintentionally initiates contact with White Pivot using a legal Blocking Zone against a legal Target Zone. White Pivot falls down as a result of the contact.',
    choices: [
      'Green Blocker is penalized for Illegal Contact.',
      'White Pivot is penalized for falling.',
      'No penalty.',
      'Both Skaters are warned.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'While Skaters in a Skill Level 1 game cannot initiate intentional contact with an opponent, unintentional contact that is otherwise legal should not be penalized.',
    skillLevels: ['L1']
  },
  {
    id: 'jc4.1.5-3',
    sectionId: 'penalties',
    ruleReference: 'JC4.1.5.C',
    situation: 'In a JRDA Skill Level 1 game, Green Pivot intentionally initiates Forceful Contact against White Jammer, using a legal Blocking Zone against a legal Target Zone. White Jammer is not affected by the contact - there is no change in relative position and White Jammer remains upright and in-bounds.',
    choices: [
      'No penalty; there was no impact.',
      'White Jammer is penalized.',
      'Green Pivot is penalized for Illegal Contact ("Hitting").',
      'Green Pivot is warned.'
    ],
    correctIndex: 2,
    outcome: 'Green Pivot is penalized for Illegal Contact ("Hitting").',
    rationale: 'Skaters in a Skill Level 1 game cannot initiate intentional contact with an opponent. Any avoidable Forceful Contact should be penalized, regardless of impact.',
    skillLevels: ['L1']
  },
  {
    id: 'jc4.1.5-4',
    sectionId: 'penalties',
    ruleReference: 'JC4.1.5.D',
    situation: 'In a JRDA Skill Level 2 game, Green Pivot accelerates towards White Jammer and initiates contact by lightly touching hips. Green Pivot then pushes hard, hip-to-hip. White Jammer falls as a result of the secondary contact.',
    choices: [
      'Green Pivot is penalized for Illegal Contact.',
      'No penalty.',
      'White Jammer is penalized for falling.',
      'Green Pivot is expelled.'
    ],
    correctIndex: 1,
    outcome: 'No penalty.',
    rationale: 'While skaters in a JRDA Skill Level 2 game cannot initiate Forceful Contact, Green Pivot\'s initial contact was not Forceful and the impact was a result of the secondary contact even though Green Pivot accelerated prior to initiating the primary contact.',
    skillLevels: ['L2']
  },
  {
    id: 'jc4.1.5-5',
    sectionId: 'penalties',
    ruleReference: 'JC4.1.5.E',
    situation: 'In a JRDA Skill Level 2 game, Green Pivot initiates contact with White Jammer by lightly touching shoulders. Green Pivot and White Jammer separate. Green Pivot then makes forceful contact, shoulder-to-shoulder.',
    choices: [
      'No penalty; shoulder-to-shoulder is legal.',
      'Green Pivot is penalized for Illegal Contact ("Hitting").',
      'White Jammer is penalized.',
      'Green Pivot is warned.'
    ],
    correctIndex: 1,
    outcome: 'Green Pivot is penalized for Illegal Contact ("Hitting").',
    rationale: 'The initial block was legal as it was not Forceful Contact; however, contact occurring after separation should be considered a separate new block. The secondary block was Forceful Contact which should be penalized regardless of impact in a JRDA Skill Level 2 game.',
    skillLevels: ['L2']
  },
  {
    id: 'jc4.1.5-6',
    sectionId: 'penalties',
    ruleReference: 'JC4.1.5.F',
    situation: 'In a JRDA Skill Level 2 game, Green Pivot makes non-forceful hip-to-hip contact with White Jammer. Green Pivot then swings their shoulder hard into White Jammer\'s shoulder.',
    choices: [
      'No penalty; it was hip-to-hip then shoulder-to-shoulder.',
      'White Jammer is penalized.',
      'Green Pivot is penalized for Illegal Contact ("Hitting").',
      'Both Skaters are warned.'
    ],
    correctIndex: 2,
    outcome: 'Green Pivot is penalized for Illegal Contact ("Hitting").',
    rationale: 'The initial block was legal as it was not Forceful Contact; however, new contact should be considered a separate new block. The new block was Forceful Contact which should be penalized regardless of impact in a JRDA Skill Level 2 game.',
    keepInMind: 'If non-forceful contact was initiated (either between hips, shoulders, or both) and this contact was then sustained, no penalty is warranted.',
    skillLevels: ['L2']
  },
  {
    id: 'jc4.1.5-7',
    sectionId: 'penalties',
    ruleReference: 'JC4.1.5.G',
    situation: 'In a JRDA Skill Level 2 game, Green Pivot is skating slowly next to White Jammer. Green Pivot swings their shoulder hard into White Jammer\'s shoulder.',
    choices: [
      'No penalty; shoulder contact is legal in Level 2.',
      'White Jammer is penalized.',
      'Green Pivot is penalized for Illegal Contact ("Hitting").',
      'Both are warned.'
    ],
    correctIndex: 2,
    outcome: 'Green Pivot is penalized for Illegal Contact ("Hitting").',
    rationale: 'Forceful Contact should be penalized regardless of impact or speed in a JRDA Skill Level 2 game.',
    skillLevels: ['L2']
  },

  // 4.2.1. Illegal Positioning
  {
    id: 'c4.2.1-1',
    sectionId: 'penalties',
    ruleReference: 'C4.2.1.A',
    situation: 'Red Pivot is the only Red Blocker on track. White Pivot forces Red Pivot out of bounds.',
    choices: [
      'White Pivot is penalized for destroying the Pack.',
      'Red Pivot is penalized for going out of bounds.',
      'Officials declare a No Pack situation. No penalty.',
      'The Jam is called off.'
    ],
    correctIndex: 2,
    outcome: 'Officials declare a No Pack situation. No penalty.',
    rationale: 'The destruction of the Pack occurred as a result of normal gameplay. It should not be considered an illegal Pack destruction.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.1-2',
    sectionId: 'penalties',
    ruleReference: 'C4.2.1.B',
    situation: 'Red Pivot is the only Red Blocker on the track. Red Pivot attempts to block White Jammer as they pass. Red Pivot misses, and ends up out of bounds.',
    choices: [
      'Red Pivot is penalized for destroying the Pack.',
      'Officials declare a No Pack situation. No penalty.',
      'White Jammer is penalized.',
      'Red Pivot must return immediately or be penalized.'
    ],
    correctIndex: 1,
    outcome: 'Officials declare a No Pack situation. No penalty.',
    rationale: 'The destruction of the Pack occurred as a result of normal gameplay. It should not be considered an illegal Pack destruction.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.1-3',
    sectionId: 'penalties',
    ruleReference: 'C4.2.1.C',
    situation: 'Red Pivot is the only Red Blocker on the track. Red Pivot intentionally skates out of bounds.',
    choices: [
      'No Pack. No penalty.',
      'Officials declare a No Pack situation. Red Pivot is instructed to remain on the track, and is penalized.',
      'Red Pivot is expelled.',
      'The Jam is called off.'
    ],
    correctIndex: 1,
    outcome: 'Officials declare a No Pack situation. Red Pivot is instructed to remain on the track, and is penalized.',
    rationale: 'Red Pivot\'s illegal action (stepping out of bounds) destroyed the Pack. Red Pivot is the final remaining Red Blocker, and must remain on the track so that a Pack can be formed.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.1-4',
    sectionId: 'penalties',
    ruleReference: 'C4.2.1.D',
    situation: 'Red Pivot is the only Red Blocker on the track, and is being blocked by White Pivot and White Blocker. White Pivot forces Red Pivot out of bounds, and Officials declare a No Pack situation. White Pivot and White Blocker immediately skate ahead of Red Pivot, who is now behind all other Blockers. Red Pivot still does not return to the track. As a result, the Pack is unable to be reformed.',
    choices: [
      'White Pivot and White Blocker are penalized.',
      'No penalty; Red Pivot will return eventually.',
      'Red Pivot is penalized and instructed to return to and remain on the track until another Red Blocker returns to the Pack.',
      'The Jam is called off.'
    ],
    correctIndex: 2,
    outcome: 'Red Pivot is penalized and instructed to return to and remain on the track until another Red Blocker returns to the Pack.',
    rationale: 'Red Pivot was able to legally reenter the track once all other Blockers were ahead of them. Red Pivot is not required to return to the track until they can legally do so, and is not required to skate clockwise in order to find a legal reentry point. In this scenario, however, Red Pivot had a legal opportunity because all other Blockers were ahead of them. Further, Red Pivot did not heed the warning from the Officials, and thus should be penalized for preventing a Pack from reforming.',
    keepInMind: 'If White Pivot or White Blocker had not skated forward, one or both of them would have been penalized instead of Red Pivot for preventing a Pack from reforming by forcing the only opposing Blocker to remain out of bounds.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.1-5',
    sectionId: 'penalties',
    ruleReference: 'C4.2.1.E',
    situation: 'Red Pivot is skating 9 ft (2.74 m) behind the White Blockers and 9 ft (2.74 m) ahead of the other Red Blockers. Their knee pad slips down their leg, and is no longer protecting their knee. Red Pivot takes themself off the track in order to adjust their equipment, creating a No Pack situation.',
    choices: [
      'Red Pivot is penalized for destroying the Pack.',
      'Officials declare a No Pack situation. No penalty.',
      'Red Pivot must be replaced by a substitute.',
      'The Jam is called off for safety.'
    ],
    correctIndex: 1,
    outcome: 'Officials declare a No Pack situation. No penalty.',
    rationale: 'Although Red Pivot\'s actions directly caused a No Pack situation, it was in order to resolve a safety issue. Skaters should not be penalized for rectifying a safety issue.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.1-6',
    sectionId: 'penalties',
    ruleReference: 'C4.2.1.F',
    situation: 'White Jammer removes their helmet cover and attempts to hand it to White Pivot. During this process, the Star falls, touching out of bounds. White Jammer leaves the track to retrieve the helmet cover.',
    choices: [
      'White Jammer is penalized for leaving the track.',
      'No penalty.',
      'White Pivot is penalized for a failed Star Pass.',
      'The Star Pass is considered complete.'
    ],
    correctIndex: 1,
    outcome: 'No penalty.',
    rationale: 'The Jammer and the Pivot may leave the track of their own accord to retrieve a helmet cover that has fallen at least partially out of bounds. Not allowing them to do so would leave them unable to recover the helmet cover.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.1-7',
    sectionId: 'penalties',
    ruleReference: 'C4.2.1.G',
    situation: 'White Jammer attempts an apex jump and fails to land in bounds. They land fully out of bounds, enter behind all Blockers, and continue to skate.',
    choices: [
      'White Jammer is penalized for leaving the track.',
      'White Jammer must yield to all nearby Skaters.',
      'No penalty.',
      'White Jammer loses Lead Jammer status.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'White Jammer did not intend to remove themself from gameplay.',
    keepInMind: 'Should White Jammer successfully make the apex jump but still remove themself due to the belief that they did not complete it successfully, no penalty would be applicable.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.1-8',
    sectionId: 'penalties',
    ruleReference: 'C4.2.1.H',
    situation: 'White Jammer is calling off the Jam. They skate out of bounds during the Jam-Ending Whistle.',
    choices: [
      'White Jammer is penalized for skating out of bounds.',
      'White Jammer loses any points earned on that trip.',
      'No penalty.',
      'White Jammer is warned.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'Skating out of bounds during the four whistles of a Jam call-off does not allow a Skater to score additional points nor gain meaningful advantage over any other Skater.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.1-9',
    sectionId: 'penalties',
    ruleReference: 'C4.2.1.I',
    situation: 'Immediately after the Jam-Starting Whistle, all Red Blockers remain stationary. All White Blockers skate counterclockwise, resulting in more than 10 ft (3.05 m) between any White Blocker and Red Blocker.',
    choices: [
      'Red Blockers are penalized for destroying the Pack.',
      'White Blockers are penalized for destroying the Pack.',
      'Officials declare a No Pack situation. No penalty. Officials assess penalties for failing to reform a Pack, as warranted.',
      'Both teams are penalized.'
    ],
    correctIndex: 2,
    outcome: 'Officials declare a No Pack situation. No penalty. Officials assess penalties for failing to reform a Pack, as warranted.',
    rationale: 'Destroying the Pack penalties are issued when Skaters illegally create a No Pack situation. For a penalty to be issued, one team or Skater must be clearly at fault for the Pack\'s destruction. In this scenario, neither team\'s speed has changed: Red team remained stationary, while White team skated counterclockwise when the Jam started. As there has been no speed change, neither team is clearly at fault for the Pack\'s destruction. No penalty is warranted.',
    keepInMind: 'Had White skated clockwise at the start of the jam and caused a No Pack, a penalty for destroying the pack should be issued, as destroying the pack by skating clockwise is illegal when there is no established pack speed.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.1-10',
    sectionId: 'penalties',
    ruleReference: 'C4.2.1.J',
    situation: 'White Blockers form a four-person wall, blocking Red Jammer at the rear of the Pack when "No Pack" is declared. One White Blocker skates forward to reform the Pack but does not do so for several seconds. The remaining three White Blockers continue to actively block Red Jammer before the Pack is declared reformed.',
    choices: [
      'No penalty; they are trying to reform.',
      'Red Jammer is penalized.',
      'One of the White Blockers who was actively blocking Red Jammer should be penalized.',
      'All three White Blockers are penalized.'
    ],
    correctIndex: 2,
    outcome: 'One of the White Blockers who was actively blocking Red Jammer should be penalized.',
    rationale: 'All Blockers are obligated to attempt to reform the Pack, not just those who choose to do so. Continued blocking during a No Pack situation is considered a failure to attempt to reform the Pack.',
    keepInMind: 'If the Pack had been reformed immediately, no penalty should be issued. If all the White Blockers had been accelerating in an attempt to reform the Pack, no penalty should be issued, even if they did so while maintaining their wall and holding Red Jammer back.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.1-11',
    sectionId: 'penalties',
    ruleReference: 'C4.2.1.K',
    situation: 'Red Jammer passes all members of the Pack except for White Pivot, who forces Red Jammer out of bounds to the outside of the track. While Red Jammer is out of bounds, the Pack skates counterclockwise ahead of Red Jammer. Red Jammer takes several strides while out of bounds, counterclockwise, to maintain their position ahead of the Pack and behind White Pivot, before returning in bounds.',
    choices: [
      'No penalty; Red Jammer was maintaining position.',
      'Red Jammer is penalized.',
      'White Pivot is penalized for the block.',
      'Both Skaters are penalized.'
    ],
    correctIndex: 1,
    outcome: 'Red Jammer is penalized.',
    rationale: 'Skaters are not allowed to accelerate or maintain speed while out of bounds, unless they are doing so to hasten their return to the track or entry to the Penalty Box.',
    keepInMind: 'Accelerating or maintaining speed while out of bounds in the clockwise direction should not be penalized, as it does not allow the out-of-bounds Skater to maintain their position relative to in-bounds Skaters.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.1-12',
    sectionId: 'penalties',
    ruleReference: 'C4.2.1.L',
    situation: 'Red Blocker is serving a penalty in the Penalty Box. Once their time completes, they are informed by the Penalty Box Official with the proper verbal cue, but Red Blocker remains within the designated Penalty Box area. The Penalty Box Official notices and warns Red Blocker to return to play. Red Blocker acknowledges the warning but remains in the Penalty Box area.',
    choices: [
      'No penalty; Red Blocker acknowledged the warning.',
      'Red Blocker is penalized.',
      'Red Blocker is expelled.',
      'Red team Captain is penalized.'
    ],
    correctIndex: 1,
    outcome: 'Red Blocker is penalized.',
    rationale: 'By remaining in the Penalty Box beyond their allotted penalty time, a Skater maintains an unblockable position. The Skater\'s maintained position also interferes with normal Penalty Box operation.',
    keepInMind: 'If a Skater has been warned multiple times within the course of a game but returns to play after each warning, the Skater should receive a penalty. Skaters who maintain their position in or near the Penalty Box momentarily due to safety reasons (for example, waiting for an Outside Pack Referee to pass) before they return to play should not be warned or penalized.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.1-13',
    sectionId: 'penalties',
    ruleReference: 'C4.2.1.M',
    situation: 'White Blockers form a four-person wall blocking Red Jammer at the front of the Pack when "No Pack" is declared. White Blockers continue to engage the Red Jammer and make no attempt to reform the Pack. Red Blockers in the rear of the Pack remain stationary for several seconds until one of the Red Blockers skates forward to reform the Pack.',
    choices: [
      'Only White Blockers are penalized.',
      'Only Red Blockers are penalized.',
      'One White Blocker and one Red Blocker should be penalized.',
      'No penalty.'
    ],
    correctIndex: 2,
    outcome: 'One White Blocker and one Red Blocker should be penalized.',
    rationale: 'All Blockers are obligated to attempt to reform the Pack, not just those who choose to do so.',
    keepInMind: 'Even if multiple blockers fail to reform the Pack, only one blocker per team should be penalized, as it is the team\'s responsibility to maintain a Pack. Both teams should be penalized again if the Pack continues to remain undefined.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.1-14',
    sectionId: 'penalties',
    ruleReference: 'C4.2.1.N',
    situation: 'White Jammer removes their helmet cover and attempts to pass it to White Pivot. During this process, White Jammer drops the Star. White Pivot takes a knee briefly to recover the star before handing the Star back to White Jammer.',
    choices: [
      'White Pivot is penalized for taking a knee.',
      'White Jammer is penalized for dropping the Star.',
      'No penalty.',
      'The Star Pass is considered complete.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'The Jammer or Pivot may briefly adopt a Down position to recover a helmet cover on the ground. There is not sufficient impact on gameplay if the Skater immediately acts to reestablish themself in a legal position after the recovery.',
    keepInMind: 'Assuming a downed position to recover a helmet cover is only legal if it is brief and has no other impact on gameplay. A Skater who fails to immediately return to a blockable status (by crawling or continued kneeling, for example) should be penalized.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.2.2. Gaining Position
  {
    id: 'c4.2.2-1',
    sectionId: 'penalties',
    ruleReference: 'C4.2.2.A',
    situation: 'White Pivot and White Blocker are ahead of Red Pivot. Red Pivot is forced out of bounds by White Pivot. White Blocker skates clockwise behind both Skaters. Red Pivot reenters the track behind White Pivot and ahead of White Blocker.',
    choices: [
      'No penalty; Red Pivot entered behind White Pivot.',
      'Red Pivot is penalized.',
      'White Pivot is penalized for the block.',
      'White Blocker is penalized for skating clockwise.'
    ],
    correctIndex: 1,
    outcome: 'Red Pivot is penalized.',
    rationale: 'White Blocker had superior position when Red Pivot went out of bounds. Red Pivot is required to reenter behind both White Pivot and White Blocker.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.2-2',
    sectionId: 'penalties',
    ruleReference: 'C4.2.2.B',
    situation: 'White Pivot and White Blocker are ahead of Red Pivot when "No Pack" is declared. Red Pivot is forced out of bounds by White Pivot. White Blocker skates clockwise behind both Skaters. Red Pivot reenters the track behind White Pivot and ahead of White Blocker.',
    choices: [
      'Only Red Pivot is penalized.',
      'Only White Pivot is penalized.',
      'White Pivot and Red Pivot are both penalized.',
      'No penalty.'
    ],
    correctIndex: 2,
    outcome: 'White Pivot and Red Pivot are both penalized.',
    rationale: 'White Pivot is penalized because they executed a block while out of play (due to the No Pack situation). Accordingly, Red Pivot was not required to reenter behind White Pivot. Even though there is no Pack, White Blocker had superior position when Red Pivot went out of bounds. Red Pivot must enter behind White Blocker.',
    keepInMind: 'If White Blocker were more than 20 ft (6.10 m) from the last defined Pack, Red Pivot should not be penalized.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.2-3',
    sectionId: 'penalties',
    ruleReference: 'C4.2.2.C',
    situation: 'White Pivot and White Blocker are ahead of Red Pivot. White Pivot forces Red Pivot out of bounds. White Blocker skates clockwise behind both Skaters. White Blocker loses their balance, takes a knee, and returns upright. Red Pivot reenters the track behind White Pivot and ahead of White Blocker.',
    choices: [
      'No penalty; White Blocker was down.',
      'Red Pivot is penalized.',
      'White Blocker is penalized.',
      'White Pivot is penalized.'
    ],
    correctIndex: 1,
    outcome: 'Red Pivot is penalized.',
    rationale: 'Although White Blocker lost their superior position briefly while down, they returned upright before Red Pivot reentered. White Blocker was not the initiator of the block that forced Red Pivot out of bounds, and thus is able to reestablish their superior position.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.2-4',
    sectionId: 'penalties',
    ruleReference: 'C4.2.2.D',
    situation: 'Red Blocker blocks White Jammer out of bounds to the outside just as White Blocker blocks Red Jammer out of bounds to the inside. Both Blockers were ahead of both Jammers before the blocks, and raced clockwise to pull their opposing Jammers to the rear of the Pack. White Jammer returns behind all opponents, but Red Jammer returns behind White Blocker but ahead of Red Blocker.',
    choices: [
      'Red Jammer is penalized for cutting.',
      'No penalty.',
      'White Jammer is penalized.',
      'Both Jammers are penalized.'
    ],
    correctIndex: 1,
    outcome: 'No penalty.',
    rationale: 'Cutting a single teammate does not have enough impact to warrant a penalty.',
    keepInMind: 'Cutting more than one teammate should be penalized. The same metrics should be applied when a Skater is returning to play from the Penalty Box.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.2-5',
    sectionId: 'penalties',
    ruleReference: 'C4.2.2.E',
    situation: 'Red Pivot is forced out of bounds by White Pivot. White Blocker, who is behind both Pivots, skates counterclockwise past both Pivots, and then clockwise to their previous position. Red Pivot reenters the track behind White Pivot and ahead of White Blocker.',
    choices: [
      'Red Pivot is penalized.',
      'White Blocker is penalized.',
      'No penalty.',
      'Both are penalized.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'When Red Pivot went out of bounds, White Blocker did not have superior position. Red Pivot is only required to reenter behind White Pivot.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.2-6',
    sectionId: 'penalties',
    ruleReference: 'C4.2.2.F',
    situation: 'White Pivot is in bounds but down. Red Pivot dodges White Pivot, ending up out of bounds. White Pivot returns to an upright position. Red Pivot reenters the track ahead of White Pivot.',
    choices: [
      'Red Pivot is penalized.',
      'White Pivot is penalized.',
      'No penalty.',
      'Red Pivot is warned.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'Downed Skaters do not have superior position to out-of-bounds Skaters.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.2-7',
    sectionId: 'penalties',
    ruleReference: 'C4.2.2.G',
    situation: 'White Pivot and White Blocker are ahead of Red Pivot. White Blocker forces Red Pivot out of bounds illegally and receives a penalty. As White Blocker leaves the track, they accidentally clip the skates of their teammate, White Pivot, who falls. Red Pivot reenters the track ahead of both Skaters.',
    choices: [
      'Red Pivot is penalized.',
      'White Blocker is penalized again.',
      'No penalty.',
      'White Pivot is penalized.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'White Pivot was down when Red Pivot reentered the track, and did not have superior position.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.2-8',
    sectionId: 'penalties',
    ruleReference: 'C4.2.2.H',
    situation: 'White Pivot, White Blocker, and Red Jammer are 18 ft (5.48 m) ahead of a stopped Pack. Red Jammer is blocked out of bounds by White Pivot. White Pivot and White Blocker roll forward, and both are given an Out of Play warning. White Pivot and White Blocker skate clockwise back to the Pack. Red Jammer reenters the track ahead of both Skaters.',
    choices: [
      'Red Jammer is penalized.',
      'White Pivot is penalized.',
      'No penalty.',
      'All three Skaters are penalized.'
    ],
    correctIndex: 0,
    outcome: 'Red Jammer is penalized.',
    rationale: 'White Pivot, as initiator of the block, lost their superior position on Red Jammer by leaving the Engagement Zone. Although White Blocker lost their superior position briefly by going out of play, they regained it by returning to the Engagement Zone before Red Jammer reentered. White Blocker was not the initiator of the block that forced Red Jammer out of bounds, and thus is able to reestablish their superior position.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.2-9',
    sectionId: 'penalties',
    ruleReference: 'C4.2.2.I',
    situation: 'White Pivot, White Blocker, and Red Jammer are 18 ft (5.48 m) ahead of a stopped Pack. White Blocker skates forward and is given an Out of Play warning as White Pivot blocks Red Jammer out of bounds. White Blocker skates clockwise back to the Pack. Red Jammer reenters the track ahead of White Blocker and behind White Pivot.',
    choices: [
      'Red Jammer is penalized.',
      'White Blocker is penalized.',
      'No penalty.',
      'White Pivot is penalized.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'White Blocker was out of play when Red Jammer went out of bounds, and thus did not have superior position.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.2-10',
    sectionId: 'penalties',
    ruleReference: 'C4.2.2.J',
    situation: 'Red Pivot blocks White Jammer to the inside and forward, across the apex. White Jammer returns fully in bounds with both skates for a moment, and then immediately leaves the track.',
    choices: [
      'White Jammer is penalized for cutting.',
      'Red Pivot is penalized.',
      'No penalty.',
      'White Jammer is warned.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'White Jammer did not meaningfully gain position on anybody because they immediately left the track.',
    keepInMind: 'If White Jammer had not immediately left the track, they should be penalized.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.2-11',
    sectionId: 'penalties',
    ruleReference: 'C4.2.2.K',
    situation: 'Red Jammer is on their second trip through the Pack, having passed no White Blockers. Before Red Jammer can pass any opponent, White Pivot forces Red Jammer out of bounds across the apex. Red Jammer, while down, slides back in behind White Pivot. White Blocker skates clockwise behind Red Jammer. Red Jammer stands completely in bounds and starts skating forward.',
    choices: [
      'No penalty; Red Jammer returned behind White Pivot.',
      'Red Jammer is penalized.',
      'White Pivot is penalized.',
      'White Blocker is penalized.'
    ],
    correctIndex: 1,
    outcome: 'Red Jammer is penalized.',
    rationale: 'Skaters cannot reestablish their position on the track while down. Despite being completely in bounds, the downed Red Jammer did not reestablish their in-bounds position until they were upright and not immediately exiting the track. White Blocker had superior position to Red Jammer when Red Jammer left the track, so Red Jammer cannot gain superior position due to their out-of-bounds status.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.2-12',
    sectionId: 'penalties',
    ruleReference: 'C4.2.2.L',
    situation: 'Immediately after the Jam start, White Jammer blocks Red Jammer out of bounds. The Pack remains stopped while White Jammer skates clockwise around the track. Red Jammer remains out of bounds. White Jammer approaches the front of the Pack and legally passes the Star to White Pivot. Red Jammer reenters the track behind the Pack, and ahead of both the new and former White Jammers.',
    choices: [
      'Red Jammer is penalized.',
      'White Jammer is penalized.',
      'No penalty.',
      'White Pivot is penalized.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'When out of bounds, Skaters must reenter the track without improving their position relative to other Skaters. Because the new White Jammer did not earn position on Red Jammer, Red Jammer did not need to reenter behind the new White Jammer. The former White Jammer, by becoming a Blocker, is considered to be far ahead of Red Jammer (like all the other Blockers).',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.2-13',
    sectionId: 'penalties',
    ruleReference: 'C4.2.2.M',
    situation: 'Red Jammer passes all members of the Pack except for White Pivot, who forces Red Jammer out of bounds on the inside of the track. While Red Jammer is out of bounds, White Pivot skates clockwise behind the stopped Pack and past Red Jammer. Red Jammer takes several skating strides while out of bounds, counterclockwise, but reenters the track ahead of the Engagement Zone.',
    choices: [
      'Red Jammer is penalized for gaining position while out of bounds.',
      'White Pivot is penalized.',
      'No penalty.',
      'Both are penalized.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'When out of bounds to the inside of the track, Skaters may skate in any direction to return to the track. By reentering the track ahead of the Engagement Zone, rather than being penalized, Red Jammer is considered to be entering to the rear of the Engagement Zone, behind the Pack and White Pivot.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.2.3. Interfering with the Flow of the Game
  {
    id: 'c4.2.3-1',
    sectionId: 'penalties',
    ruleReference: 'C4.2.3.A',
    situation: 'White Pivot is issued a penalty, leaves the track, and reports to the Penalty Box. The Penalty Box is full at this time, and White Pivot is waved back onto the track. Just as White Pivot returns to the Pack, the Jam is called off. White Pivot returns to their team bench.',
    choices: [
      'No action needed.',
      'Officials should attempt to warn White Pivot that they are in queue for a penalty. If not successful when 30 seconds have passed since the end of the previous Jam, Officials must call an Official Timeout instead of starting the next Jam. White Pivot should be penalized.',
      'White Pivot\'s penalty is cancelled.',
      'White team Captain is penalized.'
    ],
    correctIndex: 1,
    outcome: 'Officials should attempt to warn White Pivot that White Pivot is in queue for a penalty. If they are not successful, when 30 seconds have passed since the end of the previous Jam, Officials must call an Official Timeout instead of starting the next Jam. White Pivot should be penalized.',
    rationale: 'White Pivot is in queue to serve their penalty, and must be on the track so they can serve their penalty during the next Jam.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.3-2',
    sectionId: 'penalties',
    ruleReference: 'C4.2.3.B',
    situation: 'Officials give Skaters a five-second warning before the start of the next Jam. White team finishes their discussion, and five White Skaters approach the track. All are out of bounds or straddling as the lineup time expires.',
    choices: [
      'The Jam starts normally.',
      'Instead of starting the next Jam, the Officials must call an Official Timeout. White Captain is penalized.',
      'White Skaters are given additional time.',
      'All five White Skaters are penalized.'
    ],
    correctIndex: 1,
    outcome: 'Instead of starting the next Jam, at that moment, the Officials must call an Official Timeout. White Captain is penalized.',
    rationale: 'White team\'s failure to field any Skaters in correct position prevented the Jam from starting in a timely manner, thus stopping the period clock illegally.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.3-3',
    sectionId: 'penalties',
    ruleReference: 'C4.2.3.C',
    situation: 'Officials give Skaters a five-second warning before the start of the next Jam. White team finishes their discussion, and five White Skaters approach the track. All are in bounds, but ahead of the Pivot Line as the lineup time expires.',
    choices: [
      'The Jam starts with False Start warnings.',
      'Instead of starting the next Jam, the Officials must call an Official Timeout. White Captain is penalized.',
      'No action needed; the Skaters are in bounds.',
      'White Skaters must yield.'
    ],
    correctIndex: 1,
    outcome: 'Instead of starting the next Jam, at that moment, the Officials must call an Official Timeout instead of starting the next Jam. White Captain is penalized.',
    rationale: 'White team\'s failure to field any Blockers in the correct position prevented the Jam from starting in a timely manner.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.3-4',
    sectionId: 'penalties',
    ruleReference: 'C4.2.3.D',
    situation: 'As the lineup time expires, White team has four Blockers correctly positioned, but White Jammer is still out of bounds.',
    choices: [
      'The Jam starts without the White Jammer.',
      'Instead of starting the next Jam, the Officials must call an Official Timeout. White Captain is penalized.',
      'White Jammer is penalized.',
      'No action; the Jammer can enter late.'
    ],
    correctIndex: 1,
    outcome: 'Instead of starting the next Jam, at that moment, the Officials must call an Official Timeout. White Captain is penalized.',
    rationale: 'White team\'s failure to field a Jammer in the correct position prevented the Jam from starting in a timely manner.',
    keepInMind: 'If Red Jammer had also been out of bounds, both Captains would have received a penalty for preventing the Jam from starting in a timely manner. If a White Skater had been correctly positioned as a Jammer but did not possess a visible Star, they are not the Jammer. Assuming the White team does not have a Jammer serving a penalty, White team\'s Captain would receive a penalty for preventing the Jam from starting in a timely fashion.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.3-5',
    sectionId: 'penalties',
    ruleReference: 'C4.2.3.E',
    situation: 'White team has used three Team Timeouts during the game. White Captain calls for a Team Timeout. Officials, mistakenly believing that White team has timeouts remaining, grants the request.',
    choices: [
      'The timeout is cancelled.',
      'If White team has an Official Review remaining, they should be considered to have used it as a timeout. If not, White Captain is penalized and the next Jam is started as soon as possible, but at least 30 seconds after the end of the previous Jam.',
      'White Captain is expelled.',
      'No penalty; it was the Officials\' mistake.'
    ],
    correctIndex: 1,
    outcome: 'If White team has an Official Review remaining, they should be considered to have used it as a timeout. If not, White Captain is penalized and the next Jam is started as soon as possible, but at least 30 seconds after the end of the previous Jam.',
    rationale: 'White Captain\'s successful, but illegal attempt to stop the period clock prevented the next Jam from starting in a timely manner. If White Captain had legal means to prevent the Jam from starting, legal means should be assumed.',
    keepInMind: 'Officials should deny requests for a Team Timeout if that team has none remaining. No penalty is warranted if an invalid request for a Team Timeout is denied.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.3-6',
    sectionId: 'penalties',
    ruleReference: 'C4.2.3.F',
    situation: 'Jam 23 is called off for an injury sustained by White Pivot. The same Skater lines up on the track for the start of Jam 26.',
    choices: [
      'White Pivot may participate normally.',
      'Officials should attempt to communicate to the White Skater that they are not allowed to participate. If the Officials fail, when 30 seconds have passed since the end of the previous Jam, Officials must call an Official Timeout instead of starting the next Jam. White Pivot is returned to their team bench. White Captain is penalized.',
      'White Pivot is penalized.',
      'No action needed after three Jams.'
    ],
    correctIndex: 1,
    outcome: 'Officials should attempt to communicate to the White Skater that they are not allowed to participate. If the Officials fail, when 30 seconds have passed since the end of the previous Jam, Officials must call an Official Timeout instead of starting the next Jam. White Pivot is returned to their team bench to sit out the remaining Jam, as required. White Captain is penalized.',
    rationale: 'The White Skater\'s failure to sit out the required number of Jams prevented the next Jam from starting in a timely manner. The White Skater cannot serve the penalty at this time for the same reason, so it is issued to their Captain.',
    keepInMind: 'If Officials believe the White Skater\'s injury poses a serious and immediate threat to that Skater or others, Officials should not allow the White Skater to skate no matter how many Jams have elapsed.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.3-7',
    sectionId: 'penalties',
    ruleReference: 'C4.2.3.G',
    situation: 'White Pivot (who is neither the Captain nor the Designated Alternate) walks up to an Official and requests a Team Timeout. That Official, mistakenly believing White Pivot is the Captain, grants the request.',
    choices: [
      'No penalty; it was the Official\'s mistake.',
      'White Pivot is penalized. Officials must call an Official Timeout. The next Jam is started as soon as possible, but at least 30 seconds after the end of the previous Jam.',
      'White team Captain is penalized.',
      'The timeout is valid.'
    ],
    correctIndex: 1,
    outcome: 'When the mistake is realized, Officials must call an Official Timeout. White Pivot is penalized. The next Jam is started as soon as possible, but at least 30 seconds after the end of the previous Jam.',
    rationale: 'White Pivot\'s successful, but illegal attempt to stop the period clock prevented the next Jam from starting in a timely manner.',
    keepInMind: 'If the illegal requester is not a Skater, the penalty is issued to the Captain instead. Officials should deny requests for a Team Timeout if the requester is neither a Captain nor a Designated Alternate. No penalty is warranted if an invalid request for a Team Timeout is denied.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.3-8',
    sectionId: 'penalties',
    ruleReference: 'C4.2.3.H',
    situation: 'White Pivot (who is neither the Captain nor the Designated Alternate) uses hand signals to communicate with their Captain, asking for a Team Timeout to be called. Officials, mistaking the White Pivot\'s hand signals for a legal request, call a Team Timeout.',
    choices: [
      'White Pivot is penalized.',
      'White team Captain is penalized.',
      'When the mistake is realized, Officials must call an Official Timeout. White Pivot is not issued a penalty. White team is not charged a Team Timeout. The next Jam is started as soon as possible. No penalty.',
      'The timeout stands as called.'
    ],
    correctIndex: 2,
    outcome: 'When the mistake is realized, Officials must call an Official Timeout. White Pivot is not issued a penalty. White team is not charged a Team Timeout. The next Jam is started as soon as possible, but at least 30 seconds after the end of the previous Jam. No penalty.',
    rationale: 'White Pivot was attempting to communicate with their Captain. They were not attempting to request a Team Timeout from the Officials.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.3-9',
    sectionId: 'penalties',
    ruleReference: 'C4.2.3.I',
    situation: 'During the lineup time, a Red Blocker is seated in the Penalty Box. Red team fields four Blockers on the track. Officials do not notice the extra Blocker, and the next Jam begins. Immediately after the Jam starts an Official notices and instructs a Red Blocker to return to their team bench. The Red Blocker leaves as instructed.',
    choices: [
      'Red Captain is penalized.',
      'The extra Red Blocker is penalized.',
      'No penalty.',
      'The Jam is called off.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'The extra Blocker was removed from gameplay before their presence had any impact on the Jam in progress. If the Skater who was instructed to leave instead remains on the track, the Officials should end the Jam and assess a penalty to the Skater.',
    keepInMind: 'If the extra Blocker was not noticed before having impact on the Jam in progress, the Officials should end the Jam and assess a penalty to the Captain instead. If an Official notices the extra Blocker before the five-second warning, they should attempt to warn the team that there are too many Skaters on the track before the five-second warning occurs.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.2.4. Other Illegal Procedures
  {
    id: 'c4.2.4-1',
    sectionId: 'penalties',
    ruleReference: 'C4.2.4.A',
    situation: 'White Captain is not visibly wearing a "C". They signal for a Team Timeout to be called.',
    choices: [
      'Officials deny the timeout request.',
      'Officials grant the Team Timeout. White Captain is penalized.',
      'No penalty; the Captain can always call timeouts.',
      'White team loses a timeout without penalty.'
    ],
    correctIndex: 1,
    outcome: 'Officials grant the Team Timeout. White Captain is penalized.',
    rationale: 'Despite not visibly wearing a "C", the Captain retains the privilege of calling a Team Timeout. However, exercising a privilege of the Captain while not visibly displaying a "C" warrants a penalty.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.4-2',
    sectionId: 'penalties',
    ruleReference: 'C4.2.4.D',
    situation: 'Red Jammer arrives at the Penalty Box for a penalty, sits, is told to stand 20 seconds later, and stands. They then watch the scoreboard count down 10 seconds, and leave the Box without being told to do so by an Official.',
    choices: [
      'No penalty; Red Jammer served their time.',
      'Red Jammer should be penalized if they completely left the Box even a fraction of a second early.',
      'Red Jammer receives a warning.',
      'The Jam is called off.'
    ],
    correctIndex: 1,
    outcome: 'Red Jammer should be penalized if they completely left the Box even a fraction of a second early.',
    rationale: 'Leaving the Box early without good reason should always be penalized.',
    keepInMind: 'If an Official had told the Red Jammer their time was up, Red Jammer had good reason to leave the Box early.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.4-3',
    sectionId: 'penalties',
    ruleReference: 'C4.2.4.G',
    situation: 'During the jam, an official notices a mouthguard on the track. No Skater is making an immediate attempt to retrieve the mouthguard.',
    choices: [
      'No penalty; officials pick up the mouthguard.',
      'The jam is immediately called off. An Illegal Procedure penalty is assessed to any Skater without a mouthguard.',
      'The Skater without the mouthguard is warned.',
      'Play continues until the next stoppage.'
    ],
    correctIndex: 1,
    outcome: 'The jam is immediately called off. An Illegal Procedure penalty is assessed to any Skater without a mouthguard.',
    rationale: 'A mouthguard is required safety equipment for all Skaters. If a skater is completely missing a required piece of safety equipment, unless it is immediately replaced, the jam should be called and the skater penalized.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // JC4.2.5. JRDA Game Structure Penalties
  {
    id: 'jc4.2.5-1',
    sectionId: 'penalties',
    ruleReference: 'JC4.2.5.A',
    situation: 'In a JRDA Skill Level 1 game, Green Pivot is the only Green Blocker on the track. Green Pivot intentionally skates out of bounds to avoid contact with White Jammer.',
    choices: [
      'Green Pivot is penalized for destroying the Pack.',
      'Officials declare No Pack. No penalty.',
      'White Jammer is penalized.',
      'Green team Captain is penalized.'
    ],
    correctIndex: 1,
    outcome: 'Officials declare No Pack. No penalty.',
    rationale: 'In a JRDA Skill Level 1 game, Skaters may adopt an illegal position, including leaving the track, exiting the engagement zone, or adopting a down position to avoid contact with an opponent, even in situations where the action results in No Pack being defined.',
    skillLevels: ['L1']
  },

  // 4.3. Penalties for Unsporting Conduct (Misconduct)
  {
    id: 'c4.3-1',
    sectionId: 'penalties',
    ruleReference: 'C4.3.A',
    situation: 'Red Jammer and White Blocker are in the Penalty Box. Red Jammer stands. After seven seconds, White Blocker suddenly says "Red, [number], done." Red Jammer, assuming they have been legally released by an Official, exits the Box and begins to return to the track.',
    choices: [
      'Red Jammer is penalized for leaving early.',
      'White Blocker is penalized. Red Jammer is not.',
      'Both are penalized.',
      'No penalty for either.'
    ],
    correctIndex: 1,
    outcome: 'White Blocker is penalized. Red Jammer is not. Officials should direct Red Jammer to return to the Box and complete their remaining penalty time.',
    rationale: 'White Blocker has imitated an Official\'s verbal instruction to try to force a penalty on the opposing Jammer, which is highly unsporting and is penalized as such.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-2',
    sectionId: 'penalties',
    ruleReference: 'C4.3.C',
    situation: 'White Blocker intentionally pulls off Red Jammer\'s helmet cover.',
    choices: [
      'White Blocker is penalized.',
      'White Blocker is expelled from the game.',
      'Red Jammer is penalized for losing their Star.',
      'No penalty; it was a legal play.'
    ],
    correctIndex: 1,
    outcome: 'White Blocker is expelled from the game.',
    rationale: 'Deliberately removing an opponent\'s helmet cover is unsporting behavior of the highest order. It must be penalized by expulsion, regardless of any impact to the Jammer\'s head.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-3',
    sectionId: 'penalties',
    ruleReference: 'C4.3.D',
    situation: 'The Jam starts and White Jammer quickly earns Lead. Red Jammer immediately pulls off their Star and tries to pass it over their opponents\' heads to Red Pivot, but is unable to do so. Red Jammer stuffs the Star into their jersey so they don\'t have to hold it as they work their way through the Pack.',
    choices: [
      'No penalty; the Star pass was attempted.',
      'Red Jammer is penalized for hiding their role.',
      'Red Pivot is penalized.',
      'The Jam is called off.'
    ],
    correctIndex: 1,
    outcome: 'Red Jammer has hidden the Star from their opponents, also hiding the fact that they are their team\'s Jammer. Red Jammer is penalized.',
    rationale: 'It is unsporting to attempt to hide your role in the Jam.',
    keepInMind: 'If Red Jammer had held onto the Star instead of hiding it in their jersey, no penalty would be issued because they would still be visibly in control of the Star.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-4',
    sectionId: 'penalties',
    ruleReference: 'C4.3.E',
    situation: 'Having been released from the Penalty Box, White Blocker heads back to the track, using a forearm to push a Referee out of the way so they can keep the line.',
    choices: [
      'White Blocker is penalized.',
      'White Blocker is expelled from the game.',
      'No penalty; contact with Officials happens.',
      'White Blocker receives a warning.'
    ],
    correctIndex: 1,
    outcome: 'White Blocker is expelled from the game.',
    rationale: 'Some intentional contact between Skaters and Officials, such as non-forceful touching to indicate location or actively absorbing contact to increase safety, is not an expellable offense. However forceful contact to Officials which is avoidable or negligent is unsporting.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-5',
    sectionId: 'penalties',
    ruleReference: 'C4.3.H',
    situation: 'White Blocker is standing in a wall alongside their teammates. Red Jammer, while attempting to pass White Blocker, jumps and unintentionally makes contact with their chest into White Blocker\'s shoulder. Red Jammer is completely airborne when the contact is made. White Blocker does not fall, but is pushed forward out of the wall.',
    choices: [
      'No penalty; it was unintentional.',
      'White Blocker is penalized.',
      'Red Jammer is penalized.',
      'The Jam is called off.'
    ],
    correctIndex: 2,
    outcome: 'Red Jammer is penalized.',
    rationale: 'Initiating a block while airborne is dangerous play. White Blocker lost their established position in the wall due to Red Jammer\'s illegal contact.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-6',
    sectionId: 'penalties',
    ruleReference: 'C4.3.I',
    situation: 'White Blocker is standing in a wall alongside their teammates. Red Jammer jumps at White Blocker, making forceful contact while airborne. Red Jammer had no reasonable expectation of landing in a legal manner. White Blocker, however, remains upright.',
    choices: [
      'Red Jammer is penalized.',
      'Red Jammer should be considered for expulsion.',
      'No penalty; White Blocker remained upright.',
      'White Blocker is penalized.'
    ],
    correctIndex: 1,
    outcome: 'Red Jammer should be considered for expulsion.',
    rationale: 'Initiating a block while airborne is dangerous play. A flagrant violation of this rule poses a safety hazard. An expulsion would be warranted if the action was judged to be negligent, intentional, or reckless, regardless of whether White Blocker lost position.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-7',
    sectionId: 'penalties',
    ruleReference: 'C4.3.L',
    situation: 'An Official overhears a Skater making hateful, prejudiced, and/or bigoted remarks.',
    choices: [
      'The Skater is warned.',
      'The Skater is penalized.',
      'The Skater is expelled.',
      'No action; it is not gameplay-related.'
    ],
    correctIndex: 2,
    outcome: 'The Skater is expelled.',
    rationale: 'Abusive conduct, including but not limited to making remarks or gestures of a racist / sexist / homophobic / transphobic / ableist nature is degrading to the sport and others.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-8',
    sectionId: 'penalties',
    ruleReference: 'C4.3.N',
    situation: 'Red Jammer moves through the Pack and is legally blocked by White Blocker into the infield, immediately colliding with the Jammer Referee which causes the Jammer Referee to fall.',
    choices: [
      'Red Jammer is penalized.',
      'Red Jammer is not penalized.',
      'White Blocker is penalized.',
      'Both Skaters are penalized.'
    ],
    correctIndex: 1,
    outcome: 'Red Jammer is not penalized.',
    rationale: 'Skaters and Officials routinely collide during the course of normal gameplay. This is usually unintentional and unavoidable, in which case it should not be penalized even if the contact is considered forceful.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-9',
    sectionId: 'penalties',
    ruleReference: 'C4.3.O',
    situation: 'Having been assessed a penalty, White Pivot exits the track and heads towards the Penalty Box. As White Pivot skates they approach an Outside Pack Referee, who is skating at a consistent speed and distance from the track boundary. White Pivot does not adjust their trajectory, and impacts the Outside Pack Referee in the back, which causes the Referee to stumble briefly.',
    choices: [
      'White Pivot is penalized.',
      'White Pivot is expelled from the game.',
      'No penalty; it was unavoidable.',
      'The Referee is at fault.'
    ],
    correctIndex: 1,
    outcome: 'White Pivot is expelled from the game.',
    rationale: 'Contact to an Official who does not expect it or to an Official who is not wearing safety equipment is unsafe and negligent.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // JC4.3.1. JRDA Misconduct
  {
    id: 'jc4.3.1-1',
    sectionId: 'penalties',
    ruleReference: 'JC4.3.1.A',
    situation: 'A spectator wearing a black shirt bearing the Green Team\'s logo directs an abusive remark at an Official.',
    choices: [
      'The spectator is expelled from the venue immediately.',
      'The Officials call an Official Timeout. The Head Referee informs the teams and offers each team\'s captain the opportunity to serve a penalty.',
      'No action; spectators are not subject to the rules.',
      'The Green team Captain is automatically penalized.'
    ],
    correctIndex: 1,
    outcome: 'The Officials call an Official Timeout at the earliest between-jams opportunity. The Head Referee informs the teams of the Code of Conduct violation by the spectator and offers each team\'s captain the opportunity to serve a penalty. If neither team accepts the penalty the spectator is expelled from the venue.',
    rationale: 'The JRDA Code of Conduct applies to all participants, including spectators.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'jc4.3.1-2',
    sectionId: 'penalties',
    ruleReference: 'JC4.3.1.B',
    situation: 'Green Blocker initiates a legal block to White Blocker. White Blocker swears audibly, but it is not directed at the Green Blocker.',
    choices: [
      'No penalty; the language was not directed at anyone.',
      'White Blocker is penalized and warned against continued use of profanity.',
      'White Blocker is expelled.',
      'Green Blocker is penalized for causing the reaction.'
    ],
    correctIndex: 1,
    outcome: 'White Blocker is penalized and warned against continued use of profanity.',
    rationale: 'Profanity is prohibited whether or not it is directed.',
    keepInMind: 'There are instances where Officials should use discretion. For example, undirected exclamations due to pain or involuntary vocalizations (such as tics) should not be penalized.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // JC4.3.2. JRDA Expulsions for Unsporting Conduct
  {
    id: 'jc4.3.2-1',
    sectionId: 'penalties',
    ruleReference: 'JC4.3.2.A',
    situation: 'White Blocker is overheard directing abusive language at one of their coaches.',
    choices: [
      'White Blocker is penalized.',
      'White Blocker is expelled.',
      'The coach is asked to leave.',
      'No penalty; it was directed at their own coach.'
    ],
    correctIndex: 1,
    outcome: 'White Blocker is expelled.',
    rationale: 'Abusive comments and insults are prohibited regardless of whether profanity is used.',
    keepInMind: 'Repeated violations of the Code of Conduct warrant expulsion.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.4. Enforcing Penalties
  {
    id: 'c4.4-1',
    sectionId: 'penalties',
    ruleReference: 'C4.4.B',
    situation: 'Red Jammer is skating at the front of the Pack, close to the inside track boundary, when they are assessed a penalty. Red Jammer takes themself out of bounds to the inside of the track, and pauses to allow the Pack to skate past them. When their path is clear, Red Jammer skates across to the outside of the track, and then continues around toward the Penalty Box.',
    choices: [
      'Red Jammer receives an additional penalty.',
      'No additional penalty.',
      'The Jam is called off.',
      'Red Jammer is expelled.'
    ],
    correctIndex: 1,
    outcome: 'No additional penalty.',
    rationale: 'After receiving a penalty, Skaters are required to disengage from play and exit the track to the outside when they have a safe and legal opportunity to do so. Red Jammer momentarily entered the infield in order to remove themself from play. At the first safe and legal opportunity, they left the track to the outside.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.4-2',
    sectionId: 'penalties',
    ruleReference: 'C4.4.C',
    situation: 'Red Pivot is skating along the straightaway opposite the Pivot and Jammer Lines, close to the inside track boundary. They are assessed a penalty and take themself out of bounds to the inside of the track. Red Pivot then skates across the infield and the straightaway with the Pivot and Jammer Lines to enter the Penalty Box.',
    choices: [
      'No additional penalty; Red Pivot went to the Box.',
      'Red Pivot is assessed an additional penalty.',
      'The Jam is called off.',
      'Red Pivot receives a warning.'
    ],
    correctIndex: 1,
    outcome: 'Red Pivot is assessed an additional penalty.',
    rationale: 'After receiving a penalty, Skaters are required to exit the track to the outside relative to where that penalty was issued. Red Pivot exits the track to the opposite side of where they were initially penalized.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.4.1. Penalty Enforcement for Blockers
  {
    id: 'c4.4.1-1',
    sectionId: 'penalties',
    ruleReference: 'C4.4.1.A',
    situation: 'White Blocker arrives at the Penalty Box and is instructed by a Penalty Box Official to sit in the right-most seat. White Blocker sits in the left-most seat.',
    choices: [
      'White Blocker receives an additional penalty.',
      'The Penalty Box Official should begin timing the penalty then ask White Blocker to move to the preferred seat.',
      'The Jam is called off.',
      'White Blocker is warned.'
    ],
    correctIndex: 1,
    outcome: 'The Penalty Box Official should begin timing the penalty then ask White Blocker to move to the preferred seat.',
    rationale: 'Penalty time begins as soon as the penalized Skater is seated in the Penalty Box. Timing does not stop while they move seats.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.4.3. Skaters Unable to Serve Penalties
  {
    id: 'c4.4.3-1',
    sectionId: 'penalties',
    ruleReference: 'C4.4.3.A',
    situation: 'White Pivot arrives at the Penalty Box between Jams. They call to their coach and signal that they are injured. The coach sends a new Skater to the Box. White Pivot gives the new Skater the Stripe and returns to the bench.',
    choices: [
      'White Pivot is penalized for leaving the Box.',
      'White Pivot\'s penalty time is served by the substitute. White Pivot may not skate in the following three Jams.',
      'The substitute serves no penalty time.',
      'White Pivot must return to skate.'
    ],
    correctIndex: 1,
    outcome: 'White Pivot\'s penalty time is served by the substitute. White Pivot may not skate in the following three Jams.',
    rationale: 'Skaters may remove themselves from play when injured. A substitute may serve penalty time for an injured Skater, but the injured Skater may not participate in the next three Jams and the substituting Skater must fill the same Role the injured Skater filled.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.4.4. Protective Gear in the Penalty Box
  {
    id: 'c4.4.4-1',
    sectionId: 'penalties',
    ruleReference: 'C4.4.4.A',
    situation: 'While seated in the Penalty Box, White Blocker removes their mouthguard. They are instructed to stand by a Penalty Box Official and they do so without putting their mouthguard back into their mouth. White Blocker skates to the corner of the Box and is instructed that their penalty is done. They put their mouthguard back into their mouth and return to play.',
    choices: [
      'White Blocker is penalized for not wearing their mouthguard.',
      'No penalty.',
      'White Blocker receives a warning.',
      'The Jam is called off.'
    ],
    correctIndex: 1,
    outcome: 'No penalty.',
    rationale: 'Players are allowed to have their mouthguard out while in the Box, regardless of whether they are standing or sitting.',
    keepInMind: 'If White Blocker leaves the Box without putting their mouthguard back in, even if they put it back in before they return in bounds, this should result in a penalty.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.5. Fouling Out and Expulsions
  {
    id: 'c4.5-1',
    sectionId: 'penalties',
    ruleReference: 'C4.5.A',
    situation: 'While in bounds and in play, White Blocker initiates an extremely forceful block with a Legal Blocking Zone to a Legal Target Zone on Red Blocker. Red Blocker is knocked airborne, crashes to the track, and remains still until the Jam is called for injury. Red Captain calls an Official Review and requests that White Blocker be expelled for an egregious hit.',
    choices: [
      'White Blocker is expelled.',
      'No penalty.',
      'White Blocker is penalized but not expelled.',
      'Red Captain is penalized for the frivolous review.'
    ],
    correctIndex: 1,
    outcome: 'No penalty.',
    rationale: 'The rules dictate the manner in which Skaters may block and White Blocker met all those standards. A Skater may not be expelled for legal play.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.5-2',
    sectionId: 'penalties',
    ruleReference: 'C4.5.B',
    situation: 'Red Jammer races to the Penalty Box to serve their penalty. They shout, "I can\'t stop!" and crash into the Box. The chairs are knocked backward into a Penalty Box Official. Red Jammer apologizes but complains about how dirty the floor is in front of the Box.',
    choices: [
      'No penalty; it was an accident.',
      'Red Jammer is penalized.',
      'Red Jammer is expelled.',
      'Red Jammer receives a warning.'
    ],
    correctIndex: 2,
    outcome: 'Red Jammer is expelled.',
    rationale: 'Unsafe play in respect to Officials, especially those not wearing safety equipment, is held to a different standard than unsafe play in respect to other Skaters. It is incumbent on the Skater to enter the Box in a safe manner, not on the Official to avoid impact.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.5-3',
    sectionId: 'penalties',
    ruleReference: 'C4.5.C',
    situation: 'Red Blocker receives their seventh penalty and immediately leaves the track. Knowing they have fouled out of the game, they go to their bench, collect their belongings, and exit to the locker room without reporting to the Penalty Box.',
    choices: [
      'Red Blocker is assessed additional penalties.',
      'No additional penalties are warranted.',
      'The Jam is called off.',
      'Red team Captain is penalized.'
    ],
    correctIndex: 1,
    outcome: 'No additional penalties are warranted. Red Blocker\'s penalty time starts during the Jam once the Penalty Box Officials are made aware that Red Blocker has fouled out, or when a substitute is seated in the next Jam.',
    rationale: 'Once a Skater fouls out, their penalty time starts when they are seated in the Penalty Box; however, by not reporting to the Box to take a seat, that moment never happens. The Penalty Box Officials may be instructed to begin timing once the foul out is confirmed.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 5.4. Assessing Penalties (Officiating)
  {
    id: 'c5.4-1',
    sectionId: 'officiating',
    ruleReference: 'C5.4.A',
    situation: 'White Captain is the Jammer and commits a penalty. In response, the White Team Staff curses loudly at the Official who called the penalty.',
    choices: [
      'No penalty; Team Staff comments are not penalized.',
      'White Team Staff is expelled.',
      'A penalty is assessed to White Captain for their Team Staff\'s insubordination. White Captain\'s Jammer penalty time is not extended.',
      'White Captain receives an additional penalty as Jammer.'
    ],
    correctIndex: 2,
    outcome: 'A penalty is assessed to White Captain for their Team Staff\'s insubordination, but White Captain\'s time in the Penalty Box as Jammer is not extended. After the Jam, White Captain must report to the Box as a Blocker to serve the penalty earned by their Team Staff.',
    rationale: 'When a Captain serves a penalty due to the fact that they are the team\'s Captain, the penalty is served with the Captain as a Blocker.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c5.4-2',
    sectionId: 'officiating',
    ruleReference: 'C5.4.B',
    situation: 'White Blocker is penalized and directed to the Penalty Box. White Blocker seems unaware of the call and remains on the track. After several repeated calls, Officials are able to draw the attention of White Blocker, and they exit the track.',
    choices: [
      'No additional penalty.',
      'White Blocker is penalized for neglectfully failing to immediately exit the track for a penalty.',
      'White Blocker is expelled.',
      'White Blocker receives a warning.'
    ],
    correctIndex: 1,
    outcome: 'White Blocker is penalized for neglectfully failing to immediately exit the track for a penalty.',
    rationale: 'White Blocker has gained advantage and disrupted the flow of the game through lack of attention to clear instructions from the Officials.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c5.4-3',
    sectionId: 'officiating',
    ruleReference: 'C5.4.C',
    situation: 'White Blocker is penalized while blocking Red Jammer. After acknowledging the call, White Blocker continues blocking Red Jammer to allow White Blocker\'s teammate to get in position and impede Red Jammer\'s progress. White Blocker then exits the track.',
    choices: [
      'No additional penalty; White Blocker eventually exited.',
      'White Blocker is penalized for willfully failing to immediately exit the track for a penalty.',
      'White Blocker is expelled.',
      'Red Jammer is awarded points.'
    ],
    correctIndex: 1,
    outcome: 'White Blocker is penalized for willfully failing to immediately exit the track for a penalty.',
    rationale: 'White Blocker has gained advantage through intentional disregard of the rules.',
    keepInMind: 'A penalized Skater is not required to behave as if a penalty has been assessed until the Official has completed the appropriate hand signals and verbal cues.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c5.4-4',
    sectionId: 'officiating',
    ruleReference: 'C5.4.D',
    situation: 'White Blocker commits a penalty and is directed to the Penalty Box by an Official. White Blocker skates towards the Penalty Box, remaining in bounds for a significant distance before exiting the track.',
    choices: [
      'No additional penalty; White Blocker went to the Box.',
      'White Blocker is penalized for willfully failing to immediately exit the track for a penalty.',
      'White Blocker is expelled.',
      'White Blocker receives a warning.'
    ],
    correctIndex: 1,
    outcome: 'White Blocker is penalized for willfully failing to immediately exit the track for a penalty.',
    rationale: 'White Blocker has gained advantage through intentional disregard of the rules.',
    keepInMind: 'A penalized Skater who is attempting to exit the track legally, but does not have an opportunity due to gameplay conditions, should not be penalized in this manner.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.2.4. Other Illegal Procedures
  {
    id: 'c4.2.4-1',
    sectionId: 'penalties',
    ruleReference: 'C4.2.4.A',
    situation: 'White Captain is not visibly wearing a "C". They signal for a Team Timeout to be called.',
    choices: [
      'The request is denied.',
      'Officials grant the Team Timeout. White Captain is penalized.',
      'No penalty; the Captain can always call timeouts.',
      'The timeout is granted with no penalty.'
    ],
    correctIndex: 1,
    outcome: 'Officials grant the Team Timeout. White Captain is penalized.',
    rationale: 'Despite not visibly wearing a "C", the Captain retains the privilege of calling a Team Timeout. Officials should grant this request if they have a Team Timeout remaining; however, exercising a privilege of the Captain while not visibly displaying a "C" warrants a penalty.',
    keepInMind: 'This same principle should also be applied to a Designated Alternate not wearing an "A". If the Designated Alternate is not a Skater, the penalty is issued to the Captain.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.4-2',
    sectionId: 'penalties',
    ruleReference: 'C4.2.4.B',
    situation: 'White Captain calls an Official Review. Officials grant the request. Red Designated Alternate, while not visibly displaying an "A", conferences with the Head Referee during the Official Review.',
    choices: [
      'Red Designated Alternate is penalized.',
      'Red Captain is penalized.',
      'No penalty.',
      'The Official Review is invalidated.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'Red Designated Alternate\'s failure to visibly display an "A" while conferencing for an Official Review does not meaningfully affect the game, nor warrant a penalty.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.4-3',
    sectionId: 'penalties',
    ruleReference: 'C4.2.4.D',
    situation: 'Red Jammer arrives at the Penalty Box for a penalty, sits, is told to stand 20 seconds later, and stands. They then watch the scoreboard count down 10 seconds, and leave the Box without being told to do so by an Official.',
    choices: [
      'No penalty; Red Jammer waited the right amount of time.',
      'Red Jammer should be penalized if they completely left the Box even a fraction of a second early.',
      'Red Jammer is expelled.',
      'The Penalty Box Official is at fault.'
    ],
    correctIndex: 1,
    outcome: 'Red Jammer should be penalized if they completely left the Box even a fraction of a second early.',
    rationale: 'If Red Jammer\'s time had completed and they had not been released, this would be an officiating error and Red Jammer should not be punished for it. However, leaving the Box early without good reason should always be penalized.',
    keepInMind: 'If an Official had told the Red Jammer their time was up, Red Jammer had good reason to leave the Box early.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.4-4',
    sectionId: 'penalties',
    ruleReference: 'C4.2.4.E',
    situation: 'White Blocker is seated in the Penalty Box and asks someone on the bench to toss them their water bottle. A teammate on the bench throws a full bottle of water at White Blocker, who catches it just before it hits a Penalty Box Official in the face.',
    choices: [
      'No penalty; the bottle was caught.',
      'White Blocker is penalized.',
      'Whoever threw the water bottle should be penalized. If Team Staff threw the bottle, the team\'s Captain should be penalized. Officials should warn the White team that throwing things around is dangerous.',
      'The thrower is expelled immediately.'
    ],
    correctIndex: 2,
    outcome: 'Whoever threw the water bottle should be penalized. If Team Staff threw the bottle, the team\'s Captain should be penalized. Officials should warn the White team that throwing things around is dangerous. On a future offense, the thrower of the water bottle should be expelled.',
    rationale: 'This action is unsafe and thus inappropriate.',
    keepInMind: 'If the water bottle had hit the Official forcibly and unexpectedly, the thrower should be expelled on the first offense.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.4-5',
    sectionId: 'penalties',
    ruleReference: 'C4.2.4.F',
    situation: 'White Blocker, who is seated in the Penalty Box serving a penalty, is talking with their Captain, who is hovering near the Penalty Box boundary. While communicating, the Captain shifts their weight and one skate rolls over the Penalty Box boundary line and back.',
    choices: [
      'The Captain is penalized for entering the Box.',
      'White Blocker is penalized.',
      'No penalty.',
      'Both are warned.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'While the Captain is not allowed to enter the Box, this entry was brief and the Captain did not enter fully. Partial entry to the Box is not penalized.',
    keepInMind: 'If the Captain (or any unpenalized Skater/Team Staff) fully enters the Box and communicates with a penalized Skater or interferes with normal Penalty Box operation, they should be assessed a penalty. If the Captain (or Skater/Team Staff) had passed through the Box, without interacting with their penalized teammate or interrupting the operation of the Box, no penalty should be assessed even if the Captain (or Skater/Team Staff) had fully entered the Box.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.2.4-6',
    sectionId: 'penalties',
    ruleReference: 'C4.2.4.G',
    situation: 'During the jam, an official notices a mouthguard on the track. No Skater is making an immediate attempt to retrieve the mouthguard.',
    choices: [
      'The Jam continues; Officials retrieve the mouthguard.',
      'The jam is immediately called off. An Illegal Procedure penalty is assessed to any Skater without a mouthguard.',
      'A warning is given to both teams.',
      'The Official picks up the mouthguard and play continues.'
    ],
    correctIndex: 1,
    outcome: 'The jam is immediately called off. An Illegal Procedure penalty is assessed to any Skater without a mouthguard.',
    rationale: 'A mouthguard is required safety equipment for all Skaters. If a skater is completely missing a required piece of safety equipment, unless it is immediately replaced, the jam should be called and the skater penalized.',
    keepInMind: 'If the mouthguard was not removed intentionally, and a Skater immediately retrieves and replaces the mouthguard before the officials call off the jam, play may continue without a penalty. If the mouthguard is not immediately retrieved, officials should call off the jam and issue the penalty.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // JC4.2.4.H - JRDA specific
  {
    id: 'jc4.2.4-1',
    sectionId: 'penalties',
    ruleReference: 'JC4.2.4.H',
    situation: 'During a Jam in progress, an Official notices that Green Pivot does not have a clearly visible number on their right arm while attempting to assess a penalty to them.',
    choices: [
      'No additional penalty; the number issue is noted for later.',
      'Green Pivot is assessed an additional penalty.',
      'The Jam is called off.',
      'Green Pivot is expelled.'
    ],
    correctIndex: 1,
    outcome: 'Green Pivot is assessed an additional penalty.',
    rationale: 'Roster numbers must be clearly displayed on a Skater\'s back and upper arm areas. If an Official cannot identify the Skater\'s number because it is not clearly displayed in these required places, a penalty is warranted for the uniform violation.',
    keepInMind: 'If an Official is not assessing a penalty to a player with improperly displayed or missing numbers, a penalty should not be assessed for this technical infraction. The Official that notices the number is not displayed as required should warn the Skater at the first between-jams opportunity to correct the issue.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // J4.2.5 - JRDA Addenda of Game Structure Penalties
  {
    id: 'jc4.2.5-1',
    sectionId: 'penalties',
    ruleReference: 'JC4.2.5.A',
    situation: 'In a JRDA Skill Level 1 game, Green Pivot is the only Green Blocker on the track. Green Pivot intentionally skates out of bounds to avoid contact with White Jammer.',
    choices: [
      'Green Pivot is penalized for destroying the Pack.',
      'Officials declare No Pack. No penalty.',
      'Green Pivot is penalized for avoiding gameplay.',
      'White Jammer is awarded points.'
    ],
    correctIndex: 1,
    outcome: 'Officials declare No Pack. No penalty.',
    rationale: 'In a JRDA Skill Level 1 game, Skaters may adopt an illegal position, including leaving the track, exiting the engagement zone, or adopting a down position to avoid contact with an opponent, even in situations where the action results in No Pack being defined.',
    keepInMind: 'Green Pivot must return in bounds behind any upright and in bounds Skater(s) who were in front of them when they left the track. Even if Green Pivot could have avoided contact while maintaining the pack, no penalty is warranted. In a JRDA Skill Level 2 game, Skaters may adopt an illegal position to avoid Forceful Contact with an opponent, even in situations where the action results in No Pack being defined.',
    skillLevels: ['L1']
  },

  // 4.3. Penalties for Unsporting Conduct (Misconduct)
  {
    id: 'c4.3-1',
    sectionId: 'penalties',
    ruleReference: 'C4.3.A',
    situation: 'Red Jammer and White Blocker are in the Penalty Box. Red Jammer stands. After seven seconds, White Blocker suddenly says "Red, [number], done." Red Jammer, assuming they have been legally released by an Official, exits the Box and begins to return to the track.',
    choices: [
      'Red Jammer is penalized.',
      'White Blocker is penalized. Red Jammer is not.',
      'Both Skaters are penalized.',
      'No penalty; it was a misunderstanding.'
    ],
    correctIndex: 1,
    outcome: 'White Blocker is penalized. Red Jammer is not. Officials should direct Red Jammer to return to the Box and complete their remaining penalty time.',
    rationale: 'White Blocker has imitated an Official\'s verbal instruction to try to force a penalty on the opposing Jammer, which is highly unsporting and is penalized as such. Red Jammer left in good faith believing they had been released by the Officials. They should still serve the remainder of their original penalty time.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-2',
    sectionId: 'penalties',
    ruleReference: 'C4.3.C',
    situation: 'White Blocker intentionally pulls off Red Jammer\'s helmet cover.',
    choices: [
      'White Blocker receives a penalty.',
      'White Blocker is expelled from the game.',
      'Red Jammer is penalized for losing the Star.',
      'No penalty; the Star can be recovered.'
    ],
    correctIndex: 1,
    outcome: 'Red Jammer momentarily lost the ability to score or earn Lead Jammer status as a result of White Blocker intentionally removing their Star. White Blocker is expelled from the game.',
    rationale: 'Deliberately removing an opponent\'s helmet cover is unsporting behavior of the highest order. It must be penalized by expulsion, regardless of any impact to the Jammer\'s head, though intentional contact to an opponent\'s head also warrants expulsion.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-3',
    sectionId: 'penalties',
    ruleReference: 'C4.3.D',
    situation: 'The Jam starts and White Jammer quickly earns Lead. Red Jammer immediately pulls off their Star and tries to pass it over their opponents\' heads to Red Pivot, but is unable to do so. Red Jammer stuffs the Star into their jersey so they don\'t have to hold it as they work their way through the Pack.',
    choices: [
      'No penalty; Red Jammer still has the Star.',
      'Red Jammer is penalized for hiding the Star.',
      'Red Pivot is penalized.',
      'Red Jammer is expelled.'
    ],
    correctIndex: 1,
    outcome: 'Red Jammer has hidden the Star from their opponents, also hiding the fact that they are their team\'s Jammer. Red Jammer is penalized.',
    rationale: 'It is unsporting to attempt to hide your role in the Jam.',
    keepInMind: 'If Red Jammer had held onto the Star instead of hiding it in their jersey, no penalty would be issued because they would still be visibly in control of the Star.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-4',
    sectionId: 'penalties',
    ruleReference: 'C4.3.E',
    situation: 'Having been released from the Penalty Box, White Blocker heads back to the track, using a forearm to push a Referee out of the way so they can keep the line.',
    choices: [
      'White Blocker is penalized.',
      'No penalty; it was incidental.',
      'White Blocker is expelled from the game.',
      'The Referee is at fault for being in the way.'
    ],
    correctIndex: 2,
    outcome: 'White Blocker is expelled from the game.',
    rationale: 'Some intentional contact between Skaters and Officials, such as non-forceful touching to indicate location or actively absorbing contact to increase safety, is not an expellable offense. However forceful contact to Officials which is avoidable or negligent is unsporting.',
    keepInMind: 'Forceful contact to an Official which is avoidable or negligent always warrants an expulsion. These actions are considered sufficiently dangerous or unsporting and should not be reduced to a penalty without an accompanying expulsion.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-5',
    sectionId: 'penalties',
    ruleReference: 'C4.3.F',
    situation: 'White Blocker is assessed a penalty and swears.',
    choices: [
      'White Blocker is always penalized for swearing.',
      'Profane language is unsporting and degrading to the sport, but should not always be penalized. If said language was audible to the audience or via broadcast, or was directed at an Official, White Blocker is penalized. Otherwise, a few choice words directed at a teammate or opponent should result in a warning.',
      'White Blocker is expelled.',
      'No action; swearing is expected in competition.'
    ],
    correctIndex: 1,
    outcome: 'Profane, abusive, and obscene language is unsporting and degrading to the sport, but should not always be penalized. If said language was audible to the audience or via broadcast, White Blocker is penalized. If White Blocker\'s profanity was directed at an Official, White Blocker is penalized. Otherwise, a few choice words directed at a teammate or opponent should result in a warning and be penalized if the behavior continues.',
    rationale: 'As a competitive, physical sport, roller derby can raise Skaters\' adrenaline and cause tempers to flare; some discretion is in order. Audible offensive language degrades the sport, and abusive language directed at Officials is disrespectful and insubordinate.',
    keepInMind: 'JRDA Keep in Mind: Profanity is prohibited whether or not it is directed. White Blocker in this case is penalized. See Scenario JC 4.3.1.B. A Skater who utters a string of profanity or appears to have completely lost their temper should be expelled regardless of whether it is directed at anybody.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-6',
    sectionId: 'penalties',
    ruleReference: 'C4.3.H',
    situation: 'White Blocker is standing in a wall alongside their teammates. Red Jammer, while attempting to pass White Blocker, jumps and unintentionally makes contact with their chest into White Blocker\'s shoulder. Red Jammer is completely airborne when the contact is made. White Blocker does not fall, but is pushed forward out of the wall.',
    choices: [
      'No penalty; it was unintentional.',
      'White Blocker is penalized.',
      'Red Jammer is penalized.',
      'Both are warned.'
    ],
    correctIndex: 2,
    outcome: 'Red Jammer is penalized.',
    rationale: 'Initiating a block while airborne is dangerous play. White Blocker lost their established position in the wall due to Red Jammer\'s illegal contact.',
    keepInMind: 'Non-forceful and unintentional contact initiated by an airborne Skater (for example, brushing shoulders during an apex jump) should only be penalized if there is significant impact on the recipient. Skaters may initiate a block on an airborne opponent, if that opponent was a legal target prior to becoming airborne.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-7',
    sectionId: 'penalties',
    ruleReference: 'C4.3.I',
    situation: 'White Blocker is standing in a wall alongside their teammates. Red Jammer jumps at White Blocker, making forceful contact while airborne. Red Jammer had no reasonable expectation of landing in a legal manner. White Blocker, however, remains upright.',
    choices: [
      'No penalty; White Blocker stayed upright.',
      'Red Jammer is penalized.',
      'Red Jammer should be considered for expulsion.',
      'White Blocker is penalized.'
    ],
    correctIndex: 2,
    outcome: 'Red Jammer should be considered for expulsion.',
    rationale: 'Initiating a block while airborne is dangerous play. A flagrant violation of this rule poses a safety hazard to White Blocker. An expulsion would be warranted if the action was judged to be negligent, intentional, or reckless, regardless of whether White Blocker lost position.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-8',
    sectionId: 'penalties',
    ruleReference: 'C4.3.J',
    situation: 'A Governing Body policy limits the number of Staff allowed on the bench. Red team has the maximum allowed support staff on the bench; however, in between Jams, an additional support staff runs into the bench area and communicates with the Designated Alternate.',
    choices: [
      'No penalty; it was between Jams.',
      'A penalty for unsporting conduct is issued to the Red Captain, and the extra support staff is removed from the bench.',
      'The extra staff member is expelled.',
      'Red team forfeits the game.'
    ],
    correctIndex: 1,
    outcome: 'A penalty for unsporting conduct is issued to the Red Captain, and the extra support staff is removed from the bench.',
    rationale: 'Both teams agreed to play the game under the Governing Body policy. Violating agreed-upon terms is unsporting and should be penalized.',
    keepInMind: 'Policies may neither change nor override the published rules. In addition, policies also may not directly impact gameplay. Issues that are identified and resolved prior to the beginning of the game should not result in the assessment of penalties.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-9',
    sectionId: 'penalties',
    ruleReference: 'C4.3.L',
    situation: 'An Official overhears a Skater making hateful, prejudiced, and/or bigoted remarks.',
    choices: [
      'The Skater is warned.',
      'The Skater is penalized.',
      'The Skater is expelled.',
      'No action; remarks are not gameplay.'
    ],
    correctIndex: 2,
    outcome: 'The Skater is expelled.',
    rationale: 'Abusive conduct, including but not limited to making remarks or gestures of a racist / sexist / homophobic / transphobic / ableist nature is degrading to the sport and others.',
    keepInMind: 'Some instances of abusive conduct may be contextual and as a result of ignorance. If the Skater was not reasonably aware that their conduct was abusive, a warning or penalty may be appropriate. Applying in-game penalties for abusive conduct does not prevent event organizers from taking additional actions external-to-gameplay as they deem appropriate.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-10',
    sectionId: 'penalties',
    ruleReference: 'C4.3.M',
    situation: 'During the lineup time, Red team has eight Blockers between the Pivot and Jammer lines, and two Jammers behind the Jammer line. Officials give Skaters a five-second warning, and the extraneous skaters begin to leave the track.',
    choices: [
      'No action needed; the extra Skaters are leaving.',
      'Instead of starting the next Jam, the Officials must call an Official Timeout. Red Captain is penalized.',
      'All extra Skaters are penalized.',
      'The Jam starts normally once the Skaters leave.'
    ],
    correctIndex: 1,
    outcome: 'Instead of starting the next Jam, at that moment, the Officials must call an Official Timeout. Red Captain is Penalized.',
    rationale: 'While fielding an extra skater may happen accidentally (See Scenario 4.2.3.I), intentionally fielding several more Skaters than allowed in the Rules is considered unsporting. The deliberate involvement of these extraneous Skaters (Blockers and/or Jammers) affects the starting positions of the Skaters intending to play in the next Jam.',
    keepInMind: 'Other situations which include the deliberate positioning of too many Skaters on or near the track area (such as standing next to the track boundary) during the Lineup time are also considered unsporting.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-11',
    sectionId: 'penalties',
    ruleReference: 'C4.3.N',
    situation: 'Red Jammer moves through the Pack and is legally blocked by White Blocker into the infield, immediately colliding with the Jammer Referee which causes the Jammer Referee to fall.',
    choices: [
      'Red Jammer is penalized for contact with an Official.',
      'White Blocker is penalized.',
      'Red Jammer is not penalized.',
      'Both are penalized.'
    ],
    correctIndex: 2,
    outcome: 'Red Jammer is not penalized.',
    rationale: 'Skaters and Officials routinely collide during the course of normal gameplay. This is usually unintentional and unavoidable, in which case it should not be penalized even if the contact is considered forceful.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-12',
    sectionId: 'penalties',
    ruleReference: 'C4.3.O',
    situation: 'Having been assessed a penalty, White Pivot exits the track and heads towards the Penalty Box. As White Pivot skates they approach an Outside Pack Referee, who is skating at a consistent speed and distance from the track boundary. White Pivot does not adjust their trajectory, and impacts the Outside Pack Referee in the back, which causes the Referee to stumble briefly.',
    choices: [
      'No penalty; it was unintentional.',
      'White Pivot is penalized.',
      'White Pivot is expelled from the game.',
      'The Referee is at fault.'
    ],
    correctIndex: 2,
    outcome: 'White Pivot is expelled from the game.',
    rationale: 'Contact to an Official who does not expect it or to an Official who is not wearing safety equipment is unsafe and negligent.',
    keepInMind: 'If the Outside Pack Referee had a sudden change of position causing White Pivot to collide with them, White Pivot should not be penalized as the contact is considered unavoidable in this instance.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.3-13',
    sectionId: 'penalties',
    ruleReference: 'C4.3.P',
    situation: 'Red Blocker attempts to block White Jammer, misses, and ends up Out of Bounds. While attempting to return In Bounds, Red Blocker\'s shoulder brushes the elbow pad of an Outside Pack Referee.',
    choices: [
      'Red Blocker is penalized.',
      'Red Blocker is expelled.',
      'Red Blocker is not penalized.',
      'Red Blocker is warned.'
    ],
    correctIndex: 2,
    outcome: 'Red Blocker is not penalized.',
    rationale: 'The contact between Red Blocker and the Official was not forceful. No penalty should be assessed, even if the contact is considered avoidable.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // J4.3.1 - JRDA Addenda for Unsporting Conduct
  {
    id: 'jc4.3.1-1',
    sectionId: 'penalties',
    ruleReference: 'JC4.3.1.A',
    situation: 'A spectator wearing a black shirt bearing the Green Team\'s logo directs an abusive remark at an Official.',
    choices: [
      'No action; spectators are not players.',
      'The Officials call an Official Timeout at the earliest between-jams opportunity. The Head Referee informs the teams of the Code of Conduct violation by the spectator and offers each team\'s captain the opportunity to serve a penalty. If neither team accepts the penalty the spectator is expelled from the venue.',
      'The Green team Captain is automatically penalized.',
      'The game is suspended.'
    ],
    correctIndex: 1,
    outcome: 'The Officials call an Official Timeout at the earliest between-jams opportunity. The Head Referee informs the teams of the Code of Conduct violation by the spectator and offers each team\'s captain the opportunity to serve a penalty. If neither team accepts the penalty the spectator is expelled from the venue.',
    rationale: 'The JRDA Code of Conduct applies to all participants, including spectators.',
    keepInMind: 'If a team accepts the penalty, the spectator will be warned by the Head Referee or their designee that further violations of the Code of Conduct will result in expulsion from the venue. Some behavior warrants expulsion regardless of previous warnings and / or penalties.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'jc4.3.1-2',
    sectionId: 'penalties',
    ruleReference: 'JC4.3.1.B',
    situation: 'Green Blocker initiates a legal block to White Blocker. White Blocker swears audibly, but it is not directed at the Green Blocker.',
    choices: [
      'No penalty; it was not directed at anyone.',
      'White Blocker is penalized and warned against continued use of profanity.',
      'White Blocker is expelled.',
      'Green Blocker is penalized for the block.'
    ],
    correctIndex: 1,
    outcome: 'White Blocker is penalized and warned against continued use of profanity.',
    rationale: 'Profanity is prohibited whether or not it is directed.',
    keepInMind: 'There are instances where Officials should use discretion. For example, undirected exclamations due to pain or involuntary vocalizations (such as tics) should not be penalized.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // J4.3.2 - JRDA Expulsions for Unsporting Conduct
  {
    id: 'jc4.3.2-1',
    sectionId: 'penalties',
    ruleReference: 'JC4.3.2.A',
    situation: 'White Blocker is overheard directing abusive language at one of their coaches.',
    choices: [
      'White Blocker is warned.',
      'White Blocker is penalized.',
      'White Blocker is expelled.',
      'The coach is removed.'
    ],
    correctIndex: 2,
    outcome: 'White Blocker is expelled.',
    rationale: 'Abusive comments and insults are prohibited regardless of whether profanity is used.',
    keepInMind: 'Repeated violations of the Code of Conduct warrant expulsion.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.4. Enforcing Penalties
  {
    id: 'c4.4-1',
    sectionId: 'penalties',
    ruleReference: 'C4.4.B',
    situation: 'Red Jammer is skating at the front of the Pack, close to the inside track boundary, when they are assessed a penalty. Red Jammer takes themself out of bounds to the inside of the track, and pauses to allow the Pack to skate past them. When their path is clear, Red Jammer skates across to the outside of the track, and then continues around toward the Penalty Box.',
    choices: [
      'Red Jammer receives an additional penalty for going to the infield.',
      'No additional penalty.',
      'Red Jammer is expelled for delay of game.',
      'Red Jammer\'s penalty time is extended.'
    ],
    correctIndex: 1,
    outcome: 'No additional penalty.',
    rationale: 'After receiving a penalty, Skaters are required to disengage from play and exit the track to the outside when they have a safe and legal opportunity to do so. Red Jammer momentarily entered the infield in order to remove themself from play. At the first safe and legal opportunity, they left the track to the outside. No additional penalty is warranted.',
    keepInMind: 'Skaters remain liable for additional penalties related to safety and must not interfere with Officials performing their duties.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.4-2',
    sectionId: 'penalties',
    ruleReference: 'C4.4.C',
    situation: 'Red Pivot is skating along the straightaway opposite the Pivot and Jammer Lines, close to the inside track boundary. They are assessed a penalty and take themself out of bounds to the inside of the track. Red Pivot then skates across the infield and the straightaway with the Pivot and Jammer Lines to enter the Penalty Box.',
    choices: [
      'No additional penalty.',
      'Red Pivot is assessed an additional penalty.',
      'Red Pivot\'s penalty time is extended.',
      'Red Pivot is expelled.'
    ],
    correctIndex: 1,
    outcome: 'Red Pivot is assessed an additional penalty.',
    rationale: 'After receiving a penalty, Skaters are required to exit the track to the outside relative to where that penalty was issued. Red Pivot exits the track to the opposite side of where they were initially penalized.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.4-3',
    sectionId: 'penalties',
    ruleReference: 'C4.4.D',
    situation: 'Red Pivot is assessed a penalty at the end of the straightaway opposite the Pivot and Jammer Lines, just before the turn. They acknowledge the penalty, and skate directly towards the Penalty Box. The path they take toward the Penalty Box results in them exiting the track near the Jammer Line.',
    choices: [
      'No additional penalty; they went to the Box efficiently.',
      'Red Pivot is assessed an additional penalty.',
      'Red Pivot is warned.',
      'Red Pivot\'s penalty time is reduced for efficiency.'
    ],
    correctIndex: 1,
    outcome: 'Red Pivot is assessed an additional penalty.',
    rationale: 'After receiving a penalty, Skaters are required to exit the track to the outside, relative to where that penalty was issued. Red Pivot exits the track a significant distance from where they were initially penalized.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.4.1. Penalty Enforcement for Blockers
  {
    id: 'c4.4.1-1',
    sectionId: 'penalties',
    ruleReference: 'C4.4.1.A',
    situation: 'White Blocker arrives at the Penalty Box and is instructed by a Penalty Box Official to sit in the right-most seat. White Blocker sits in the left-most seat.',
    choices: [
      'White Blocker is penalized for disobedience.',
      'The Penalty Box Official should begin timing the penalty then ask White Blocker to move to the preferred seat.',
      'White Blocker\'s penalty time is extended.',
      'No action; seat choice doesn\'t matter.'
    ],
    correctIndex: 1,
    outcome: 'The Penalty Box Official should begin timing the penalty then ask White Blocker to move to the preferred seat.',
    rationale: 'Penalty time begins as soon as the penalized Skater is seated in the Penalty Box. Timing does not stop while they move seats.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.4.1-2',
    sectionId: 'penalties',
    ruleReference: 'C4.4.1.B',
    situation: 'Red Pivot stands in the Penalty Box. The dimensions of the Box are not very deep and their skates already touch the line. Two Red Blockers enter the Box together. Red Pivot attempts to give them room to sit, and in doing so, their skates fully move out of the Penalty Box boundary. They immediately return inside the boundary.',
    choices: [
      'Red Pivot is penalized for leaving the Box early.',
      'No penalty.',
      'Red Pivot\'s penalty time is restarted.',
      'Red Pivot is warned.'
    ],
    correctIndex: 1,
    outcome: 'No penalty.',
    rationale: 'Though Skaters are not allowed to leave the Box early, the mitigating circumstances of this example make the impact to the game negligible. Red Pivot was not attempting to gain some kind of illegal advantage or negligently exiting illegally, but was constrained by the shape of the Penalty Box.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.4.2. Penalty Enforcement for Jammers
  {
    id: 'c4.4.2-1',
    sectionId: 'penalties',
    ruleReference: 'C4.4.2.A',
    situation: 'White Jammer receives a penalty, reports to the Penalty Box, and is seated. They serve 25 seconds of their penalty when Red Jammer arrives and sits to serve their own penalty. White Jammer is released, thus consigning Red Jammer to serve 25 seconds. White Jammer returns to the track illegally, and is back in the Box 10 seconds after their prior release to serve their second penalty. Red Jammer leaves the Box.',
    choices: [
      'Red Jammer served their full time; no further action.',
      'Red Jammer is penalized for leaving the Box 15 seconds early. White Jammer owes 30 seconds from the time they are seated.',
      'Red Jammer owes no additional time.',
      'White Jammer\'s second penalty cancels Red Jammer\'s remaining time.'
    ],
    correctIndex: 1,
    outcome: 'Red Jammer is penalized for leaving the Box 15 seconds early. White Jammer owes 30 seconds from the time they are seated.',
    rationale: 'To serve the same amount of time "per penalty," Red Jammer must serve all 25 seconds that White Jammer served initially. In other words, White Jammer sitting for an unrelated penalty does not affect the time that Red Jammer owed.',
    keepInMind: 'Red Jammer owes 45 more seconds: 15 from their first penalty, and 30 from their second. Red Jammer\'s second penalty could reduce the time White Jammer owes for their own second penalty, but the 15 seconds from Red Jammer\'s first penalty cannot be reduced.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.4.2-2',
    sectionId: 'penalties',
    ruleReference: 'C4.4.2.B',
    situation: 'White Jammer arrives at the Penalty Box immediately behind Red Jammer. Both attempt to be the first one seated, and in so doing, they sit at the exact same moment.',
    choices: [
      'Red Jammer is released first because they arrived first.',
      'White Jammer is released first.',
      'The Penalty Box Official should inform both Jammers that their time is complete and release them from the Box.',
      'Neither is released; both serve full time.'
    ],
    correctIndex: 2,
    outcome: 'The Penalty Box Official should inform both Jammers that their time is complete and release them from the Box.',
    rationale: 'When sitting simultaneously in the Box, or when arriving between Jams, Jammers cancel each other\'s penalties. Both should be immediately released.',
    keepInMind: 'If there is any time differential at all between Jammers sitting, it is not considered to be simultaneous. If both Jammers sit between Jams, they are considered to have sat simultaneously and must be released immediately at the beginning of the following Jam.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.4.2-3',
    sectionId: 'penalties',
    ruleReference: 'C4.4.2.C',
    situation: 'Red Jammer is seated in the Penalty Box and has served 15 seconds when the Jam ends. White Jammer receives a penalty at the Jam-Ending Whistle and reports to the Box between Jams.',
    choices: [
      'Red Jammer\'s remaining time carries over to the next Jam.',
      'White Jammer reported to the Box between Jams, which will end Red Jammer\'s penalty at the start of the next Jam. A Penalty Box Official must instruct Red Jammer to stand and inform them their penalty time is done at the Jam-Starting Whistle. White Jammer must serve 15 seconds.',
      'Both Jammers are released immediately.',
      'Red Jammer serves the remainder at the start of the next Jam.'
    ],
    correctIndex: 1,
    outcome: 'White Jammer reported to the Box between Jams, which will end Red Jammer\'s penalty at the start of the next Jam. A Penalty Box Official must instruct Red Jammer to stand and inform them their penalty time is done at the Jam-Starting Whistle. White Jammer must serve 15 seconds.',
    rationale: 'Though White Jammer\'s penalty ended Red Jammer\'s penalty early, Red Jammer must still begin the next Jam from the Box. Penalties are only timed while Jams are active; as such, Jammer swaps only happen while a Jam is ongoing.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.4.2-4',
    sectionId: 'penalties',
    ruleReference: 'C4.4.2.D',
    situation: 'White Jammer receives a penalty and sits in the Penalty Box for 15 seconds. Red Jammer receives a penalty and arrives at the Box, but before they sit, White Jammer leaves. Red Jammer sits. White Jammer is issued a penalty for leaving early and returns to the Box. White Jammer sits and Red Jammer is released.',
    choices: [
      'Red Jammer serves full 30 seconds.',
      'White Jammer is penalized for leaving the Box early. Red Jammer sat in the Box when no other Jammer was serving time. Red Jammer is released upon White Jammer\'s return. White Jammer serves the time remaining from their first penalty, plus the amount of time Red Jammer served while seated in the Box.',
      'Both Jammers serve full penalties.',
      'White Jammer\'s second penalty is cancelled.'
    ],
    correctIndex: 1,
    outcome: 'White Jammer is penalized for leaving the Box early. Red Jammer sat in the Box when no other Jammer was serving time. Red Jammer is released upon White Jammer\'s return. White Jammer serves the time remaining from their first penalty, plus the amount of time Red Jammer served while seated in the Box.',
    rationale: 'A Jammer serving time in the Box is only released by another Jammer being seated in the Box to serve a penalty. Even though White Jammer was penalized first, they were not present when Red Jammer sat. Thus, Red Jammer was the "Jammer serving time in the Box" who was released by the White Jammer "being seated in the Box to serve a penalty."',
    keepInMind: 'Each penalty is a 30-second segment that may be shortened as long as the Jammers serve equivalent time.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.4.3. Skaters Unable to Serve Penalties
  {
    id: 'c4.4.3-1',
    sectionId: 'penalties',
    ruleReference: 'C4.4.3.A',
    situation: 'White Pivot arrives at the Penalty Box between Jams. They call to their coach and signal that they are injured. The coach sends a new Skater to the Box. White Pivot gives the new Skater the Stripe and returns to the bench.',
    choices: [
      'White Pivot must serve their own penalty.',
      'White Pivot\'s penalty time is served by the substitute. White Pivot may not skate in the following three Jams.',
      'The substitute serves the penalty and White Pivot can return immediately.',
      'White Pivot is expelled for leaving the Box.'
    ],
    correctIndex: 1,
    outcome: 'White Pivot\'s penalty time is served by the substitute. White Pivot may not skate in the following three Jams.',
    rationale: 'Skaters may remove themselves from play when injured. A substitute may serve penalty time for an injured Skater, but the injured Skater may not participate in the next three Jams and the substituting Skater must fill the same Role the injured Skater filled.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.4.4. Protective Gear in the Penalty Box
  {
    id: 'c4.4.4-1',
    sectionId: 'penalties',
    ruleReference: 'C4.4.4.A',
    situation: 'While seated in the Penalty Box, White Blocker removes their mouthguard. They are instructed to stand by a Penalty Box Official and they do so without putting their mouthguard back into their mouth. White Blocker skates to the corner of the Box and is instructed that their penalty is done. They put their mouthguard back into their mouth and return to play.',
    choices: [
      'White Blocker is penalized for not having their mouthguard in.',
      'No penalty.',
      'White Blocker\'s penalty time is extended.',
      'White Blocker is warned.'
    ],
    correctIndex: 1,
    outcome: 'No penalty.',
    rationale: 'Players are allowed to have their mouthguard out while in the Box, regardless of whether they are standing or sitting.',
    keepInMind: 'If White Blocker leaves the Box without putting their mouthguard back in, even if they put it back in before they return in bounds, this should result in a penalty.',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // 4.5. Fouling Out and Expulsions
  {
    id: 'c4.5-1',
    sectionId: 'penalties',
    ruleReference: 'C4.5.A',
    situation: 'While in bounds and in play, White Blocker initiates an extremely forceful block with a Legal Blocking Zone to a Legal Target Zone on Red Blocker. Red Blocker is knocked airborne, crashes to the track, and remains still until the Jam is called for injury. Red Captain calls an Official Review and requests that White Blocker be expelled for an egregious hit.',
    choices: [
      'White Blocker is expelled.',
      'White Blocker is penalized.',
      'No penalty.',
      'White Blocker is warned.'
    ],
    correctIndex: 2,
    outcome: 'No penalty.',
    rationale: 'The rules dictate the manner in which Skaters may block and White Blocker met all those standards. A Skater may not be expelled for legal play.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.5-2',
    sectionId: 'penalties',
    ruleReference: 'C4.5.B',
    situation: 'Red Jammer races to the Penalty Box to serve their penalty. They shout, "I can\'t stop!" and crash into the Box. The chairs are knocked backward into a Penalty Box Official. Red Jammer apologizes but complains about how dirty the floor is in front of the Box.',
    choices: [
      'No penalty; it was an accident.',
      'Red Jammer is penalized.',
      'Red Jammer is expelled.',
      'Red Jammer is warned.'
    ],
    correctIndex: 2,
    outcome: 'Red Jammer is expelled.',
    rationale: 'Unsafe play in respect to Officials, especially those not wearing safety equipment, is held to a different standard than unsafe play in respect to other Skaters. It is incumbent on the Skater to enter the Box in a safe manner, not on the Official to avoid impact.',
    keepInMind: 'If an Official is unable to avoid the impact because of the constraints of the venue, this still represents unsafe play. The Skater must be aware of their track environments, including any limitations of space in the Box. Mitigating environmental factors that aren\'t expected to be present, such as water on the track, can be taken into consideration when deciding whether to expel the Skater.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c4.5-3',
    sectionId: 'penalties',
    ruleReference: 'C4.5.C',
    situation: 'Red Blocker receives their seventh penalty and immediately leaves the track. Knowing they have fouled out of the game, they go to their bench, collect their belongings, and exit to the locker room without reporting to the Penalty Box.',
    choices: [
      'Red Blocker is penalized again for not reporting to the Box.',
      'No additional penalties are warranted. Red Blocker\'s penalty time starts during the Jam once the Penalty Box Officials are made aware that Red Blocker has fouled out, or when a substitute is seated in the next Jam.',
      'Red Blocker\'s team forfeits.',
      'Red Blocker is expelled.'
    ],
    correctIndex: 1,
    outcome: 'No additional penalties are warranted. Red Blocker\'s penalty time starts during the Jam once the Penalty Box Officials are made aware that Red Blocker has fouled out, or when a substitute is seated in the next Jam.',
    rationale: 'Once a Skater fouls out, their penalty time starts when they are seated in the Penalty Box; however, by not reporting to the Box to take a seat, that moment never happens. The Penalty Box Officials may be instructed to begin timing once the foul out is confirmed, but if that communication is not possible before the end of the Jam, then the fouled-out Skater\'s time begins when a substitute takes their place for the next Jam.',
    keepInMind: 'If the Skater has not fouled out but leaves the Jam for other reasons (such as equipment malfunction or injury), their time does not start until they are seated (or a substitute is seated in their place for the next Jam).',
    skillLevels: ['L1', 'L2', 'L3']
  },

  // =============================================
  // Section 5: Officiating
  // =============================================

  // 5.4. Assessing Penalties
  {
    id: 'c5.4-1',
    sectionId: 'officiating',
    ruleReference: 'C5.4.A',
    situation: 'White Captain is the Jammer and commits a penalty. In response, the White Team Staff curses loudly at the Official who called the penalty.',
    choices: [
      'White Team Staff is expelled.',
      'A penalty is assessed to White Captain for their Team Staff\'s insubordination, but White Captain\'s time in the Penalty Box as Jammer is not extended. After the Jam, if White Captain is no longer seated in the Box as the Jammer, White Captain must report to the Box as a Blocker to serve the penalty earned by their Team Staff.',
      'No penalty; Team Staff are not Skaters.',
      'The Team Staff is removed from the bench.'
    ],
    correctIndex: 1,
    outcome: 'A penalty is assessed to White Captain for their Team Staff\'s insubordination, but White Captain\'s time in the Penalty Box as Jammer is not extended. After the Jam, if White Captain is no longer seated in the Box as the Jammer, White Captain must report to the Box as a Blocker to serve the penalty earned by their Team Staff.',
    rationale: 'When a Captain serves a penalty due to the fact that they are the team\'s Captain, the penalty is served with the Captain as a Blocker. In this scenario, the Captain was unable to immediately serve the penalty as a Blocker because they could not hold the Role of Blocker. As soon as they are able to skate as a Blocker, they should report to the Box as a Blocker in order to receive that penalty.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c5.4-2',
    sectionId: 'officiating',
    ruleReference: 'C5.4.B',
    situation: 'White Blocker is penalized and directed to the Penalty Box. White Blocker seems unaware of the call and remains on the track. After several repeated calls, Officials are able to draw the attention of White Blocker, and they exit the track.',
    choices: [
      'No additional penalty.',
      'White Blocker is penalized for neglectfully failing to immediately exit the track for a penalty.',
      'White Blocker is expelled.',
      'White Blocker\'s penalty time is extended.'
    ],
    correctIndex: 1,
    outcome: 'White Blocker is penalized for neglectfully failing to immediately exit the track for a penalty.',
    rationale: 'White Blocker has gained advantage and disrupted the flow of the game through lack of attention to clear instructions from the Officials.',
    keepInMind: 'Before assessing an additional penalty in this manner, Officials must ensure that: 1. The penalty was called using the correct hand signal and verbal cue. 2. The Official calling the penalty was correctly positioned for the Skater to potentially see the call. 3. The Official calling the penalty did so loudly enough to be heard, given the Official\'s position, and the constraints and volume of the venue.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c5.4-3',
    sectionId: 'officiating',
    ruleReference: 'C5.4.C',
    situation: 'White Blocker is penalized while blocking Red Jammer. After acknowledging the call, White Blocker continues blocking Red Jammer to allow White Blocker\'s teammate to get in position and impede Red Jammer\'s progress. White Blocker then exits the track.',
    choices: [
      'No additional penalty; White Blocker acknowledged the call.',
      'White Blocker is penalized for willfully failing to immediately exit the track for a penalty.',
      'White Blocker is expelled.',
      'White Blocker\'s teammate is penalized.'
    ],
    correctIndex: 1,
    outcome: 'White Blocker is penalized for willfully failing to immediately exit the track for a penalty.',
    rationale: 'White Blocker has gained advantage through intentional disregard of the rules.',
    keepInMind: 'A penalized Skater is not required to behave as if a penalty has been assessed until the Official has completed the appropriate hand signals and verbal cues.',
    skillLevels: ['L1', 'L2', 'L3']
  },
  {
    id: 'c5.4-4',
    sectionId: 'officiating',
    ruleReference: 'C5.4.D',
    situation: 'White Blocker commits a penalty and is directed to the Penalty Box by an Official. White Blocker skates towards the Penalty Box, remaining in bounds for a significant distance before exiting the track.',
    choices: [
      'No additional penalty; White Blocker went to the Box.',
      'White Blocker is penalized for willfully failing to immediately exit the track for a penalty.',
      'White Blocker is expelled.',
      'White Blocker is warned.'
    ],
    correctIndex: 1,
    outcome: 'White Blocker is penalized for willfully failing to immediately exit the track for a penalty.',
    rationale: 'White Blocker has gained advantage through intentional disregard of the rules.',
    keepInMind: 'Factors that an Official would use to determine that a Skater has failed to immediately exit the track include, but are not limited to: 1. The Skater has substantially reduced the distance they needed to skate in order to enter the Penalty Box. 2. Intentional disruption of gameplay, substantially more than would be expected from a Skater who is safely, legally, and immediately exiting the track. A penalized Skater who is attempting to exit the track legally, but does not have an opportunity due to gameplay conditions, should not be penalized in this manner.',
    skillLevels: ['L1', 'L2', 'L3']
  },
];
