import { Rule, RuleSection } from '../models/rule';
import { SkillLevel } from '../models/skill-level';

const ALL_LEVELS: SkillLevel[] = ['L1', 'L2', 'L3'];
const CONTACT_LEVELS: SkillLevel[] = ['L2', 'L3'];
const FULL_CONTACT_ONLY: SkillLevel[] = ['L3'];

export const RULE_SECTIONS: RuleSection[] = [
  {
    id: 'game-parameters',
    number: '1',
    title: 'Game Parameters & Safety',
    description:
      'Timing, teams, timeouts, game information, and winning conditions for JRDA flat track roller derby.',
    icon: '\u23F1\uFE0F',
    rules: [
      {
        id: '1.1',
        number: '1.1',
        title: 'Timing',
        content:
          'A game lasts 60 minutes of play, divided into two 30-minute periods with a halftime. Periods are broken into Jams, the basic unit of play.',
        skillLevels: ALL_LEVELS,
        subrules: [
          {
            id: '1.1.1',
            number: '1.1.1',
            title: 'Jam Timing',
            content:
              'A Jam can last up to two minutes. Each Jam starts with a single short whistle blast and ends with four short whistle blasts. At least 30 seconds must elapse between Jams.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '1.1.2',
            number: '1.1.2',
            title: 'Period Timing',
            content:
              'A period starts on the Jam-Starting Whistle of the first Jam. The period clock does not stop between Jams unless a timeout is called. If the clock reaches zero before the next Jam starts, the period ends.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '1.1.3',
            number: '1.1.3',
            title: 'Additional Jams',
            content:
              'If a Jam is called off due to officiating discretion or there is an officiating error impacting the outcome with less than 30 seconds remaining, an additional Jam may be run at the Head Referee\'s discretion.',
            skillLevels: ALL_LEVELS,
            jrdaAddendum:
              'JRDA has two additional scenarios: Sudden Scoring (large score differential at halftime) and Injury Call-offs (Jams called off due to player injury).',
          },
        ],
      },
      {
        id: '1.2',
        number: '1.2',
        title: 'Teams',
        content:
          'A team is composed of Skaters uniquely identified by a roster number. Each team must have a jersey of the same base color with high contrast between the two teams.',
        skillLevels: ALL_LEVELS,
        jrdaAddendum:
          'J1.2.1: The Head Referee must declare a forfeit if a team has fewer than five active players. J1.2.2: The Head Referee may suspend gameplay or declare a Safety Default if venue conditions or gameplay pose an undue risk to participants\' safety.',
        subrules: [
          {
            id: '1.2.1',
            number: '1.2.1',
            title: 'Skater Identification',
            content:
              'Roster numbers must be clearly displayed on a Skater\'s back and upper arm areas. Each team must have helmet covers to identify their Jammer and Pivot.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '1.2.2',
            number: '1.2.2',
            title: 'Captains and Alternates',
            content:
              'Each team may have one Captain and one Alternate. The Captain must be a Skater able to serve penalties. They are identified by wearing a "C" and "A" respectively.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '1.2.3',
            number: '1.2.3',
            title: 'Equipment',
            content:
              'Skaters must wear quad-style roller skates and protective gear during play. Inline skates are not permitted. Protective gear may not be removed during play.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '1.2.4',
            number: '1.2.4',
            title: 'Injured Skaters',
            content:
              'Injured Skaters may return to play once no longer apparently injured or bleeding. A Skater whose injury alters the flow of the game may not participate for the following three Jams.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '1.2.5',
            number: '1.2.5',
            title: 'Forfeits',
            content:
              'The Head Referee may declare a forfeit if a team has five or fewer eligible Skaters or refuses to field Skaters on the track.',
            skillLevels: ALL_LEVELS,
          },
        ],
      },
      {
        id: '1.3',
        number: '1.3',
        title: 'Timeouts',
        content:
          'Teams and Officials may stop the period clock by calling a timeout. Timeouts may only be called between Jams. There are three types of timeouts.',
        skillLevels: ALL_LEVELS,
        subrules: [
          {
            id: '1.3.1',
            number: '1.3.1',
            title: 'Team Timeouts',
            content:
              'Each team may take three timeouts during the game. Team Timeouts may only be requested by the Captain or Alternate and last for 60 seconds.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '1.3.2',
            number: '1.3.2',
            title: 'Official Reviews',
            content:
              'Both teams begin each period with one Official Review. An Official Review is a formal request to review a specific officiating decision. The Head Referee\'s decision after review is final.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '1.3.3',
            number: '1.3.3',
            title: 'Official Timeouts',
            content:
              'Officials may take timeouts to ensure the game is running smoothly and correctly. Officials may end a Jam to call an Official Timeout.',
            skillLevels: ALL_LEVELS,
          },
        ],
      },
      {
        id: '1.4',
        number: '1.4',
        title: 'Game Information',
        content:
          'Critical game information must be displayed in a highly visible manner, including the period clock, Jam clock, and official score. Errors should be corrected as quickly as possible.',
        skillLevels: ALL_LEVELS,
      },
      {
        id: '1.5',
        number: '1.5',
        title: 'Winning',
        content: 'The team with the most points at the end of the game wins.',
        skillLevels: ALL_LEVELS,
        subrules: [
          {
            id: '1.5.1',
            number: '1.5.1',
            title: 'Overtime',
            content:
              'If the game ends tied, the second period is extended with at least one additional Overtime Jam. Overtime Jams have a 60-second lineup time, no Lead Jammer is declared, and both Jammers begin scoring on their first trip.',
            skillLevels: ALL_LEVELS,
          },
        ],
      },
    ],
  },
  {
    id: 'gameplay',
    number: '2',
    title: 'Gameplay',
    description:
      'Track specifications, skater roles, pack definition, blocking and contact rules, and passing mechanics.',
    icon: '\uD83D\uDEDE',
    rules: [
      {
        id: '2.1',
        number: '2.1',
        title: 'The Track',
        content:
          'The track must conform to WFTDA Track Specifications. It must be flat, clean, and suitable for roller skating, with high-contrast boundary lines.',
        skillLevels: ALL_LEVELS,
        jrdaAddendum:
          'J2.1.1: Where necessary due to venue size restrictions, the track may be shortened to comply with JRDA Alternative Track dimensions.',
        subrules: [
          {
            id: '2.1.1',
            number: '2.1.1',
            title: 'Boundary Lines',
            content:
              'The track boundary must stand in high contrast to the floor. The boundary counts as part of the track (in bounds) and may not vary in width.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '2.1.2',
            number: '2.1.2',
            title: 'Penalty Box and Team Areas',
            content:
              'Near the track, areas must be marked for each team (Team Bench Area) and for the Penalty Box. Only Skaters actively serving a penalty may enter the Penalty Box Area.',
            skillLevels: ALL_LEVELS,
          },
        ],
      },
      {
        id: '2.2',
        number: '2.2',
        title: 'Skater Roles',
        content:
          'For each Jam, a team must field one Jammer and at most four Blockers. One Blocker may be designated as the Pivot. Teams must field at least one Blocker who is not serving a penalty.',
        skillLevels: ALL_LEVELS,
        subrules: [
          {
            id: '2.2.1',
            number: '2.2.1',
            title: 'Jammers',
            content:
              'The Jammer is the Skater wearing the Star helmet cover at the beginning of the Jam. The Jammer is the only Skater who can score points and may legally exit and remain outside the Engagement Zone.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '2.2.2',
            number: '2.2.2',
            title: 'Lead Jammer',
            content:
              'The Lead Jammer is the first eligible Jammer who establishes superior position to the foremost in-play Blocker, having earned a pass on all Blockers excluding those ahead of the Engagement Zone. The Lead Jammer may call off the Jam by repeatedly placing hands on hips.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '2.2.3',
            number: '2.2.3',
            title: 'Pivot',
            content:
              'The Pivot is a Blocker wearing the Stripe helmet cover. The Pivot may become the Jammer via a Star Pass, may control the Star, and may begin a Jam while touching the Pivot Line.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '2.2.4',
            number: '2.2.4',
            title: 'Passing the Star',
            content:
              'A Jammer may transfer the Jammer role to their team\'s Pivot by handing the Star to the Pivot while both are Upright, In Bounds, In Play, and not en route to the Penalty Box. An illegal Star Pass results in both Skaters retaining their existing roles.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '2.2.5',
            number: '2.2.5',
            title: 'Blockers',
            content:
              'All other Skaters are considered Blockers. Non-Pivot Blockers may not have markings on their helmets that could be confused for the Stripe or Star.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '2.2.6',
            number: '2.2.6',
            title: 'Skater Starting Locations',
            content:
              'Jammers must be behind the Jammer Line. Blockers must be behind the Pivot Line and ahead of the Jammer Line. Pivots may touch the Pivot Line. Illegally positioned or false-starting Skaters must yield their position.',
            skillLevels: ALL_LEVELS,
          },
        ],
      },
      {
        id: '2.3',
        number: '2.3',
        title: 'Pack & Engagement Zone',
        content:
          'The Pack is the largest group of in-bounds, upright Blockers in proximity (within 10 ft) containing members from both teams. The Engagement Zone extends 20 ft forward and backward from the Pack.',
        skillLevels: ALL_LEVELS,
        subrules: [
          {
            id: '2.3.1',
            number: '2.3.1',
            title: 'Maintaining the Pack',
            content:
              'All Blockers are responsible for maintaining a Pack. Intentionally destroying the Pack is illegal. When there is no Pack, all Blockers must act to reform one.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '2.3.2',
            number: '2.3.2',
            title: 'Engagement Zone',
            content:
              'The Engagement Zone is the area where Blockers may legally engage or be engaged. Blockers outside the Engagement Zone are Out of Play and must immediately attempt to return.',
            skillLevels: ALL_LEVELS,
          },
        ],
      },
      {
        id: '2.4',
        number: '2.4',
        title: 'Blocks and Assists',
        content:
          'Blocking refers to any attempt at making physical contact to impede an opponent\'s speed or movement. Positional Blocking impedes an opponent without contact.',
        skillLevels: ALL_LEVELS,
        jrdaAddendum:
          'J2.4.5: JRDA gameplay is divided into three Skill Levels with distinct contact allowances. L1: Only Positional Blocking; intentional contact prohibited. L2: Only Lean Blocking; initiating Forceful Contact prohibited. L3: All contact otherwise legal in the Rules is allowed.',
        subrules: [
          {
            id: '2.4.1',
            number: '2.4.1',
            title: 'Target Zones',
            content:
              'It is only legal to initiate a block to an opponent\'s chest, front and sides of the torso, arms, hands, hips, and the front and sides of the legs above mid-thigh.',
            skillLevels: CONTACT_LEVELS,
          },
          {
            id: '2.4.2',
            number: '2.4.2',
            title: 'Blocking Zones',
            content:
              'It is only legal to initiate a block using one\'s torso, arms above the elbow, and legs above mid-thigh.',
            skillLevels: CONTACT_LEVELS,
          },
          {
            id: '2.4.3',
            number: '2.4.3',
            title: 'Counter Blocking',
            content:
              'Counter-blocking is any movement toward an oncoming block by the receiving Skater designed to counteract the opponent\'s block. Counter-blocking is considered blocking.',
            skillLevels: CONTACT_LEVELS,
          },
          {
            id: '2.4.4',
            number: '2.4.4',
            title: 'Illegal Blocks and Assists',
            content:
              'Skaters may not block or assist while Out of Bounds, Out of Play, down, stopped, or moving clockwise. Skaters may not initiate a block on an opponent who is down, Out of Play, or fully Out of Bounds.',
            skillLevels: ALL_LEVELS,
          },
        ],
      },
      {
        id: '2.5',
        number: '2.5',
        title: 'Passing',
        content:
          'Skaters gain superior position by passing opponents in the counterclockwise direction. Jammers earn a pass only while wearing the Star with stars showing, being Upright and in bounds.',
        skillLevels: ALL_LEVELS,
        subrules: [
          {
            id: '2.5.1',
            number: '2.5.1',
            title: 'Not on the Track Points',
            content:
              'When a Jammer earns a pass on an opposing Blocker, they also earn a pass on any blockers not on the track (penalty box, injured, etc.) who cease to be part of active gameplay before the scoring trip ends.',
            skillLevels: ALL_LEVELS,
          },
        ],
      },
    ],
  },
  {
    id: 'scoring',
    number: '3',
    title: 'Scoring',
    description:
      'How points are earned, scoring trips, scoring avoidance, penalized Jammers, and score corrections.',
    icon: '\uD83C\uDFC6',
    rules: [
      {
        id: '3.1',
        number: '3.1',
        title: 'Earning Points',
        content:
          'Jammers score one point every time they lap an opposing Blocker. A Jammer laps a Blocker by passing them twice in a row without that Blocker having passed the Jammer. Only Blockers can be scored upon.',
        skillLevels: ALL_LEVELS,
      },
      {
        id: '3.2',
        number: '3.2',
        title: 'Scoring Trips',
        content:
          'Points are grouped by trips through the Pack. A trip ends and the next begins when the Jammer exits the front of the Engagement Zone. A trip\'s score is final once completed.',
        skillLevels: ALL_LEVELS,
        subrules: [
          {
            id: '3.2.1',
            number: '3.2.1',
            title: 'Returning to the Previous Trip',
            content:
              'If a Jammer enters the Engagement Zone from the front, they return to their previous trip until they exit the front again. A Jammer cannot fall behind by more than one trip.',
            skillLevels: ALL_LEVELS,
          },
        ],
      },
      {
        id: '3.3',
        number: '3.3',
        title: 'Scoring Avoidance',
        content:
          'Opponents can avoid being scored upon by remaining ahead of the Jammer or by ensuring the pass is not earned. If a Jammer completes a trip without the opportunity to earn a pass, the pass is awarded.',
        skillLevels: ALL_LEVELS,
      },
      {
        id: '3.4',
        number: '3.4',
        title: 'Penalized Jammers',
        content:
          'When a Jammer is penalized, they are considered no longer on the track and cannot earn further passes until completing their penalty. Upon release, the Jammer returns to the same trip.',
        skillLevels: ALL_LEVELS,
      },
      {
        id: '3.5',
        number: '3.5',
        title: 'Errors in Scoring & Score Reporting',
        content:
          'The Official Score is that which is reported and visible to teams, Officials, and spectators. Score errors may be corrected no later than the end of the Jam after the one in which the error occurred.',
        skillLevels: ALL_LEVELS,
      },
    ],
  },
  {
    id: 'penalties',
    number: '4',
    title: 'Penalties',
    description:
      'Contact penalties, game structure penalties, misconduct, penalty enforcement, and fouling out/expulsions.',
    icon: '\u26A0\uFE0F',
    rules: [
      {
        id: '4.1',
        number: '4.1',
        title: 'Contact Penalties',
        content:
          'Gaining position on an opponent, or causing an opponent to lose position to another teammate, due to illegal contact is always considered to have sufficient impact. Star Passes may only be blocked by legal means.',
        skillLevels: ALL_LEVELS,
        jrdaAddendum:
          'J4.1.6: Contact penalties vary by Skill Level. L1: Any intentional contact with an opponent is penalized regardless of Target/Blocking Zone; any avoidable Forceful Contact is penalized regardless of impact. L2: Initiating Forceful Contact to an opponent warrants a penalty regardless of impact; gentle lean blocking is allowed. L3: All contact otherwise legal under the full rules is allowed.',
        subrules: [
          {
            id: '4.1.1',
            number: '4.1.1',
            title: 'Impact to an Illegal Target Zone',
            content:
              'Making contact to an Illegal Target Zone (back, head/neck, legs below mid-thigh) should be penalized based on impact. Avoidable forceful contact to the back or any forceful contact to the head/neck is penalized regardless of impact.',
            skillLevels: CONTACT_LEVELS,
          },
          {
            id: '4.1.2',
            number: '4.1.2',
            title: 'Impact with an Illegal Blocking Zone',
            content:
              'Making contact with an Illegal Blocking Zone (head/neck, forearms, legs below mid-thigh) should be penalized based on impact. Forceful contact initiated with the head or neck is penalized regardless of impact.',
            skillLevels: CONTACT_LEVELS,
          },
          {
            id: '4.1.3',
            number: '4.1.3',
            title: 'Other Illegal Contact',
            content:
              'A block is legal when initiated while moving counterclockwise, In Play, Upright, In Bounds, using Legal Contact Zones. Blocks while down, out of bounds, out of play, stopped, or clockwise are illegal.',
            skillLevels: CONTACT_LEVELS,
          },
          {
            id: '4.1.4',
            number: '4.1.4',
            title: 'Multiplayer Blocks',
            content:
              'Skaters may not form a wall by linking with or grasping a teammate, or otherwise forming an impenetrable connection. This warrants a penalty if an opponent fails to get through.',
            skillLevels: CONTACT_LEVELS,
          },
          {
            id: '4.1.5',
            number: '4.1.5',
            title: 'Unsporting Contact',
            content:
              'Contact that falls outside normal gameplay or is inherently unsafe is unsporting. Examples include pinning an opponent, dangerous illegal actions, and intentional forceful jabbing with elbows or knees.',
            skillLevels: ALL_LEVELS,
          },
        ],
      },
      {
        id: '4.2',
        number: '4.2',
        title: 'Game Structure Penalties',
        content:
          'When basic rules are violated giving a team an advantage (opponent unable to block, gain of position, game flow altered), the violating individual or team should be penalized.',
        skillLevels: ALL_LEVELS,
        jrdaAddendum:
          'J4.2.5: In L1 games, Skaters may adopt an illegal position (leave the track, exit the engagement zone, go down) to avoid contact with an opponent, even if it causes No Pack. In L2 games, the same applies to avoid Forceful Contact.',
        subrules: [
          {
            id: '4.2.1',
            number: '4.2.1',
            title: 'Illegal Positioning',
            content:
              'Destroying the Pack, preventing Pack reformation, or intentionally adopting an unblockable position (out of bounds, out of play) is penalizable. Skaters must immediately act to regain a legal position.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '4.2.2',
            number: '4.2.2',
            title: 'Gaining Position',
            content:
              'It is illegal to use the out-of-bounds area to gain position on someone who is Upright and In Bounds (cutting the track). Skaters who are Out of Bounds must return behind any Upright and in-bounds Skater they were behind when they left.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '4.2.3',
            number: '4.2.3',
            title: 'Interfering with the Flow of the Game',
            content:
              'Any inappropriate action that interferes with the game (causing the clock to stop, preventing a Jam from starting, or ending a Jam prematurely) should be penalized.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '4.2.4',
            number: '4.2.4',
            title: 'Other Illegal Procedures',
            content:
              'Skaters who violate the rules should be penalized if the violation has significant impact on the game. Skaters and Officials should work to rectify illegal play before it warrants penalization.',
            skillLevels: ALL_LEVELS,
          },
        ],
      },
      {
        id: '4.3',
        number: '4.3',
        title: 'Penalties for Unsporting Conduct (Misconduct)',
        content:
          'All participants must be respectful of one another. Misconduct includes deceiving Officials, disrespectful conduct, forceful contact to an Official, abusive behavior, and failure to abide by Governing Body policies.',
        skillLevels: ALL_LEVELS,
        jrdaAddendum:
          'J4.3.1: Behavior intended to taunt, harass, or intimidate opposing players, coaches, Officials, or spectators is unsporting. Violations of the JRDA Code of Conduct should be penalized. J4.3.2: Some behavior warrants expulsion on the first instance, including repeated/excessive unsporting conduct, directed insults or slurs, threats, and failure to remove inappropriate symbols.',
        subrules: [
          {
            id: '4.3.1',
            number: '4.3.1',
            title: 'Expulsions for Misconduct',
            content:
              'Only the Head Referee may expel Skaters and coaches. Some behaviors warrant immediate expulsion, including repeated dangerous conduct, directed slurs, threats to health or well-being, and failure to remove inappropriate language or symbols.',
            skillLevels: ALL_LEVELS,
          },
        ],
      },
      {
        id: '4.4',
        number: '4.4',
        title: 'Enforcing Penalties',
        content:
          'Penalized Skaters must immediately leave the track and sit in the Penalty Box. Skaters serve 30 seconds of Jam time per penalty. The final 10 seconds must be served standing. Penalties are only timed during Jams.',
        skillLevels: ALL_LEVELS,
        subrules: [
          {
            id: '4.4.1',
            number: '4.4.1',
            title: 'Penalty Enforcement for Blockers',
            content:
              'No more than two Blockers for the same team may sit in the Penalty Box at once. A third Blocker reporting is placed In Queue and instructed to return to play.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '4.4.2',
            number: '4.4.2',
            title: 'Penalty Enforcement for Jammers',
            content:
              'A Jammer\'s penalty time may be shortened if the other Jammer also receives a penalty. The two Jammers serve an equivalent amount of time per penalty, ensuring at least one Jammer is always not serving.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '4.4.3',
            number: '4.4.3',
            title: 'Skaters Unable to Serve Penalties',
            content:
              'If a Skater cannot serve a penalty due to injury or equipment malfunction, a substitute may serve in their place once the Jam ends. The unable Skater may not skate for the following three Jams.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '4.4.4',
            number: '4.4.4',
            title: 'Protective Gear in the Penalty Box',
            content:
              'Skaters may remove their mouthguard, but no other protective gear, while seated in the Penalty Box. The mouthguard must be replaced before leaving.',
            skillLevels: ALL_LEVELS,
          },
        ],
      },
      {
        id: '4.5',
        number: '4.5',
        title: 'Fouling Out & Expulsions',
        content:
          'When seven penalties are recorded for a Skater, that Skater fouls out of the game. Expulsions remove a Skater or Team Staff member for a sufficiently dangerous or unsporting act. A substitute must serve the penalty for an expelled Skater.',
        skillLevels: ALL_LEVELS,
        jrdaAddendum:
          'J4.5.1: A removed JRDA skater must report to the Designated Chaperone and may not be forced to leave the competition area unsupervised. The skater must remain in the venue accompanied by an adult.',
        subrules: [
          {
            id: '4.5.1',
            number: '4.5.1',
            title: 'Timing Skaters Removed From Play',
            content:
              'When a Skater is removed (foul out or expulsion), their penalty time begins as soon as possible. If removed mid-Jam, timing proceeds as if a Skater were seated. Substitutions may occur after the Jam ends.',
            skillLevels: ALL_LEVELS,
          },
        ],
      },
    ],
  },
  {
    id: 'officiating',
    number: '5',
    title: 'Officiating',
    description:
      'Official staffing requirements, duties, communication with Skaters, and penalty assessment procedures.',
    icon: '\uD83C\uDFC1',
    rules: [
      {
        id: '5.1',
        number: '5.1',
        title: 'Staffing',
        content:
          'Each game must staff enough on-skates Officials (Referees) to track Pack location, Engagement Zone, out-of-play Blockers, Jammers, Lead Jammer status, and points scored. One Referee is designated the Head Referee.',
        skillLevels: ALL_LEVELS,
        subrules: [
          {
            id: '5.1.1',
            number: '5.1.1',
            title: 'Distinction',
            content:
              'Referees are responsible for assessing and enforcing penalties, must be on skates, and must be uniformed in a manner that clearly identifies them as Referees. They must be distinguishable from each other.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '5.1.2',
            number: '5.1.2',
            title: 'Requirements',
            content:
              'Each game must also staff enough Officials to effectively track the state of the game in real time, including the Official Score, Jam Time, Period Time, penalties assessed and served, and Skater eligibility.',
            skillLevels: ALL_LEVELS,
          },
        ],
      },
      {
        id: '5.2',
        number: '5.2',
        title: 'Duties',
        content:
          'Officials are responsible for keeping the game running safely and smoothly by ensuring rules are followed. This includes tracking Skater counts, timing, signaling Jam starts/ends, Lead Jammer, and points. Officials may call off Jams at their discretion for safety or other reasons.',
        skillLevels: ALL_LEVELS,
      },
      {
        id: '5.3',
        number: '5.3',
        title: 'Communication Between Skaters & Officials',
        content:
          'All communication between Skaters, Team Staff, and Officials must be respectful. Officials should provide information necessary for Skaters to know their In Play status.',
        skillLevels: ALL_LEVELS,
        subrules: [
          {
            id: '5.3.1',
            number: '5.3.1',
            title: 'Erroneous Official Communication',
            content:
              'If an Official provides erroneous information to a Skater, the Skater will not be penalized for actions taken based on that information. An absence of information is not considered erroneous.',
            skillLevels: ALL_LEVELS,
          },
        ],
      },
      {
        id: '5.4',
        number: '5.4',
        title: 'Assessing Penalties',
        content:
          'All Referees may assess penalties for illegal actions that have an impact on the game. No penalty should be assessed unless the Official is certain it is warranted. If Officials disagree, the Head Referee\'s decision is final.',
        skillLevels: ALL_LEVELS,
        subrules: [
          {
            id: '5.4.1',
            number: '5.4.1',
            title: 'Penalties with Uncertain Recipients',
            content:
              'If it is unclear whom to penalize, the penalty is assessed to the nearest Blocker of the appropriate team mid-Jam, or the team\'s Captain between Jams.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '5.4.2',
            number: '5.4.2',
            title: 'Penalties Assessed to Off Skates Staff',
            content:
              'If off-skates Team Staff commit a penalty, the penalty should be assessed to the appropriate team\'s Captain.',
            skillLevels: ALL_LEVELS,
          },
          {
            id: '5.4.3',
            number: '5.4.3',
            title: 'Penalties Assessed to Team Captains',
            content:
              'If a penalty is assessed to the Captain due to their role as Captain, they will serve the penalty in the next Jam in which they are able to serve as a Blocker.',
            skillLevels: ALL_LEVELS,
          },
        ],
      },
    ],
  },
];
